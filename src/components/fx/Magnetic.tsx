import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";

const springConfig = { stiffness: 250, damping: 18, mass: 0.4 };

/** Subtle magnetic pull toward the cursor, inspired by KokonutUI "Magnet Button". */
const Magnetic = ({
	children,
	strength = 0.25,
	className = "",
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const offsetX = useSpring(useMotionValue(0), springConfig);
	const offsetY = useSpring(useMotionValue(0), springConfig);

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (
			prefersReducedMotion ||
			event.pointerType !== "mouse" ||
			!wrapperRef.current
		)
			return;
		const bounds = wrapperRef.current.getBoundingClientRect();
		offsetX.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
		offsetY.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
	};
	const resetPosition = () => {
		offsetX.set(0);
		offsetY.set(0);
	};

	return (
		<motion.div
			ref={wrapperRef}
			className={`inline-flex ${className}`}
			style={{ x: offsetX, y: offsetY }}
			onPointerMove={handlePointerMove}
			onPointerLeave={resetPosition}
		>
			{children}
		</motion.div>
	);
};

export default Magnetic;
