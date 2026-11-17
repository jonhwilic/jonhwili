import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * "Ink in water" WebGL background, inspired by KokonutUI's Ink Background.
 * One fullscreen fragment shader (domain-warped fbm) — no dependencies.
 * - Plumes drift slowly; the cursor stirs the ink.
 * - Renders at reduced resolution, pauses off-screen / in hidden tabs.
 * - prefers-reduced-motion: draws a single still frame.
 * - No WebGL: renders nothing, the parent's fallback layer shows through.
 */
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStir;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  // cursor stir: a soft local swirl
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  vec2 dm = p - m;
  float fall = exp(-dot(dm, dm) * 6.0) * uStir;
  float ang = fall * 2.2;
  p = m + mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * dm;

  vec2 sp = p * 1.5 + vec2(0.0, -t * 1.2); // plumes rise
  vec2 q = vec2(fbm(sp + vec2(0.0, t)), fbm(sp + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(sp + 4.0 * q + vec2(1.7, 9.2) + 0.6 * t),
                fbm(sp + 4.0 * q + vec2(8.3, 2.8) - 0.5 * t));
  float f = fbm(sp + 4.0 * r);

  vec3 bg     = vec3(0.027, 0.039, 0.090);
  vec3 indigo = vec3(0.26, 0.30, 0.95);
  vec3 violet = vec3(0.60, 0.34, 0.95);
  vec3 teal   = vec3(0.10, 0.68, 0.85);

  float ink = smoothstep(0.38, 0.95, f);
  vec3 tint = mix(indigo, violet, clamp(length(q) * 0.9, 0.0, 1.0));
  tint = mix(tint, teal, clamp(r.y * r.y, 0.0, 1.0) * 0.55);

  vec3 col = bg + tint * ink * ink * 0.9 + tint * pow(ink, 5.0) * 0.6;

  // keep the reading zone (left/bottom) calmer and fade into the page
  col = mix(col, bg, smoothstep(0.45, 0.0, uv.y) * 0.85);
  col = mix(col, bg, smoothstep(0.55, 0.0, uv.x) * 0.35);
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const InkBackground = ({ className = "", resolution = 0.5 }: { className?: string; resolution?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uStir = gl.getUniformLocation(prog, "uStir");

    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * resolution;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * scale));
      canvas.height = Math.max(1, Math.round(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pointer → smoothed position + decaying stir strength
    const target = { x: canvas.width * 0.7, y: canvas.height * 0.6 };
    const mouse = { ...target };
    let stir = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY > r.bottom || e.clientY < r.top) return;
      target.x = (e.clientX - r.left) * scale;
      target.y = (r.bottom - e.clientY) * scale;
      stir = Math.min(1, stir + 0.08);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const draw = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      stir *= 0.985;
      gl.uniform1f(uTime, reduce ? 12.0 : (now - start) / 1000 + 12.0);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uStir, reduce ? 0 : stir);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && visible && !reduce) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduce, resolution]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
};

export default InkBackground;
