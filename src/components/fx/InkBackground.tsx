import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * "Ink in water" WebGL background, inspired by KokonutUI's Ink Background.
 * One fullscreen fragment shader (domain-warped fbm) — no dependencies.
 * - Plumes drift slowly; the cursor stirs the ink.
 * - Renders at reduced resolution, pauses off-screen / in hidden tabs.
 * - prefers-reduced-motion: draws a single still frame.
 * - No WebGL: renders nothing, the parent's fallback layer shows through.
 */
const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uStir;

float hash(vec2 point){ return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453); }

float valueNoise(vec2 point){
  vec2 cell = floor(point);
  vec2 cellOffset = fract(point);
  vec2 blend = cellOffset * cellOffset * (3.0 - 2.0 * cellOffset);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), blend.x),
             mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), blend.x), blend.y);
}

float fractalNoise(vec2 point){
  float total = 0.0;
  float amplitude = 0.5;
  mat2 octaveRotation = mat2(1.6, 1.2, -1.2, 1.6);
  for (int octave = 0; octave < 5; octave++){
    total += amplitude * valueNoise(point);
    point = octaveRotation * point;
    amplitude *= 0.5;
  }
  return total;
}

void main(){
  vec2 screenUv = gl_FragCoord.xy / uResolution;
  vec2 point = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float time = uTime * 0.05;

  // cursor stir: a soft local swirl
  vec2 pointer = (uPointer - 0.5 * uResolution) / uResolution.y;
  vec2 toPointer = point - pointer;
  float stirFalloff = exp(-dot(toPointer, toPointer) * 6.0) * uStir;
  float swirlAngle = stirFalloff * 2.2;
  point = pointer + mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle)) * toPointer;

  vec2 flowPoint = point * 1.5 + vec2(0.0, -time * 1.2); // plumes rise
  vec2 firstWarp = vec2(fractalNoise(flowPoint + vec2(0.0, time)), fractalNoise(flowPoint + vec2(5.2, 1.3) - time));
  vec2 secondWarp = vec2(fractalNoise(flowPoint + 4.0 * firstWarp + vec2(1.7, 9.2) + 0.6 * time),
                         fractalNoise(flowPoint + 4.0 * firstWarp + vec2(8.3, 2.8) - 0.5 * time));
  float density = fractalNoise(flowPoint + 4.0 * secondWarp);

  vec3 canvasColor = vec3(0.027, 0.039, 0.090);
  vec3 indigo = vec3(0.26, 0.30, 0.95);
  vec3 violet = vec3(0.60, 0.34, 0.95);
  vec3 teal = vec3(0.10, 0.68, 0.85);

  float ink = smoothstep(0.38, 0.95, density);
  vec3 inkTint = mix(indigo, violet, clamp(length(firstWarp) * 0.9, 0.0, 1.0));
  inkTint = mix(inkTint, teal, clamp(secondWarp.y * secondWarp.y, 0.0, 1.0) * 0.55);

  vec3 color = canvasColor + inkTint * ink * ink * 0.9 + inkTint * pow(ink, 5.0) * 0.6;

  // keep the reading zone (left/bottom) calmer and fade into the page
  color = mix(color, canvasColor, smoothstep(0.45, 0.0, screenUv.y) * 0.85);
  color = mix(color, canvasColor, smoothstep(0.55, 0.0, screenUv.x) * 0.35);
  gl_FragColor = vec4(color, 1.0);
}`;

const VERTEX_SHADER =
	"attribute vec2 aPosition; void main(){ gl_Position = vec4(aPosition, 0.0, 1.0); }";

/** One triangle that covers the whole viewport. */
const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3]);

const createProgram = (webgl: WebGLRenderingContext) => {
	const program = webgl.createProgram();
	const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
	const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
	if (!program || !vertexShader || !fragmentShader) return null;

	webgl.shaderSource(vertexShader, VERTEX_SHADER);
	webgl.compileShader(vertexShader);
	webgl.shaderSource(fragmentShader, FRAGMENT_SHADER);
	webgl.compileShader(fragmentShader);
	webgl.attachShader(program, vertexShader);
	webgl.attachShader(program, fragmentShader);
	webgl.linkProgram(program);
	return webgl.getProgramParameter(program, webgl.LINK_STATUS) ? program : null;
};

const InkBackground = ({
	className = "",
	resolution = 0.5,
}: {
	className?: string;
	resolution?: number;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const webgl = canvas.getContext("webgl", {
			antialias: false,
			alpha: false,
			powerPreference: "low-power",
		});
		if (!webgl) return;
		const program = createProgram(webgl);
		if (!program) return;
		// biome-ignore lint/correctness/useHookAtTopLevel: WebGL API method, not a React hook
		webgl.useProgram(program);

		const vertexBuffer = webgl.createBuffer();
		webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
		webgl.bufferData(
			webgl.ARRAY_BUFFER,
			FULLSCREEN_TRIANGLE,
			webgl.STATIC_DRAW,
		);
		const positionLocation = webgl.getAttribLocation(program, "aPosition");
		webgl.enableVertexAttribArray(positionLocation);
		webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

		const resolutionUniform = webgl.getUniformLocation(program, "uResolution");
		const timeUniform = webgl.getUniformLocation(program, "uTime");
		const pointerUniform = webgl.getUniformLocation(program, "uPointer");
		const stirUniform = webgl.getUniformLocation(program, "uStir");

		const pixelScale = Math.min(window.devicePixelRatio || 1, 1.5) * resolution;
		const resizeCanvas = () => {
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.max(1, Math.round(bounds.width * pixelScale));
			canvas.height = Math.max(1, Math.round(bounds.height * pixelScale));
			webgl.viewport(0, 0, canvas.width, canvas.height);
			webgl.uniform2f(resolutionUniform, canvas.width, canvas.height);
		};
		resizeCanvas();
		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(canvas);

		// pointer → smoothed position + decaying stir strength
		const pointerTarget = { x: canvas.width * 0.7, y: canvas.height * 0.6 };
		const smoothedPointer = { ...pointerTarget };
		let stirStrength = 0;
		const handlePointerMove = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			if (event.clientY > bounds.bottom || event.clientY < bounds.top) return;
			pointerTarget.x = (event.clientX - bounds.left) * pixelScale;
			pointerTarget.y = (bounds.bottom - event.clientY) * pixelScale;
			stirStrength = Math.min(1, stirStrength + 0.08);
		};
		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});

		let animationFrameId = 0;
		let isOnScreen = true;
		const startTime = performance.now();
		const drawFrame = (timestamp: number) => {
			smoothedPointer.x += (pointerTarget.x - smoothedPointer.x) * 0.06;
			smoothedPointer.y += (pointerTarget.y - smoothedPointer.y) * 0.06;
			stirStrength *= 0.985;
			const elapsedSeconds = prefersReducedMotion
				? 0
				: (timestamp - startTime) / 1000;
			webgl.uniform1f(timeUniform, elapsedSeconds + 12);
			webgl.uniform2f(pointerUniform, smoothedPointer.x, smoothedPointer.y);
			webgl.uniform1f(stirUniform, prefersReducedMotion ? 0 : stirStrength);
			webgl.drawArrays(webgl.TRIANGLES, 0, 3);
		};
		const renderLoop = (timestamp: number) => {
			drawFrame(timestamp);
			if (isOnScreen && !document.hidden)
				animationFrameId = requestAnimationFrame(renderLoop);
		};
		const restartLoop = () => {
			cancelAnimationFrame(animationFrameId);
			if (isOnScreen && !document.hidden && !prefersReducedMotion)
				animationFrameId = requestAnimationFrame(renderLoop);
		};

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			isOnScreen = entry.isIntersecting;
			restartLoop();
		});
		visibilityObserver.observe(canvas);
		document.addEventListener("visibilitychange", restartLoop);

		if (prefersReducedMotion) drawFrame(performance.now());

		return () => {
			cancelAnimationFrame(animationFrameId);
			visibilityObserver.disconnect();
			resizeObserver.disconnect();
			window.removeEventListener("pointermove", handlePointerMove);
			document.removeEventListener("visibilitychange", restartLoop);
			webgl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [prefersReducedMotion, resolution]);

	// decorative: the wrapper hides it from assistive tech (aria-hidden on <canvas> itself is flagged)
	return (
		<div aria-hidden="true" className={`absolute inset-0 ${className}`}>
			<canvas ref={canvasRef} className="h-full w-full" />
		</div>
	);
};

export default InkBackground;
