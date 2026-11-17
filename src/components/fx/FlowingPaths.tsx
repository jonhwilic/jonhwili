import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated flowing lines, inspired by KokonutUI "Background Paths".
 * Pure SVG + Framer Motion — no extra dependencies.
 */
const PathLayer = ({
	direction,
	pathCount,
}: {
	direction: number;
	pathCount: number;
}) => {
	const prefersReducedMotion = useReducedMotion();
	const paths = Array.from({ length: pathCount }, (_, pathNumber) => {
		const horizontalShift = pathNumber * 5 * direction;
		const verticalShift = pathNumber * 6;
		return {
			id: `path-${direction}-${pathNumber}`,
			opacity: 0.06 + pathNumber * 0.02,
			definition: `M-${380 - horizontalShift} -${189 + verticalShift}C-${380 - horizontalShift} -${189 + verticalShift} -${312 - horizontalShift} ${216 - verticalShift} ${152 - horizontalShift} ${343 - verticalShift}C${616 - horizontalShift} ${470 - verticalShift} ${684 - horizontalShift} ${875 - verticalShift} ${684 - horizontalShift} ${875 - verticalShift}`,
			strokeWidth: 0.5 + pathNumber * 0.03,
			duration: 22 + ((pathNumber * 7) % 11),
		};
	});

	return (
		<svg
			className="h-full w-full"
			viewBox="0 0 696 316"
			fill="none"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
		>
			{paths.map((path) => (
				<motion.path
					key={path.id}
					d={path.definition}
					stroke="currentColor"
					strokeWidth={path.strokeWidth}
					strokeOpacity={path.opacity}
					initial={
						prefersReducedMotion ? false : { pathLength: 0.3, opacity: 0.6 }
					}
					animate={
						prefersReducedMotion
							? undefined
							: {
									pathLength: 1,
									opacity: [0.3, 0.6, 0.3],
									pathOffset: [0, 1, 0],
								}
					}
					transition={{
						duration: path.duration,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}
		</svg>
	);
};

const FlowingPaths = ({
	className = "",
	count = 28,
}: {
	className?: string;
	count?: number;
}) => (
	<div className={`pointer-events-none absolute inset-0 ${className}`}>
		<div className="absolute inset-0 text-[hsl(var(--accent))]">
			<PathLayer direction={1} pathCount={count} />
		</div>
		<div className="absolute inset-0 text-[hsl(var(--foreground))]">
			<PathLayer direction={-1} pathCount={count} />
		</div>
	</div>
);

export default FlowingPaths;
