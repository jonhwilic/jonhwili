import { type PointerEvent, type ReactNode, useRef } from "react";

/** Card with a cursor-following soft light on hover. */
const SpotlightCard = ({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) => {
	const cardRef = useRef<HTMLDivElement>(null);

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const card = cardRef.current;
		if (!card) return;
		const bounds = card.getBoundingClientRect();
		card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
		card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
	};

	return (
		<div
			ref={cardRef}
			onPointerMove={handlePointerMove}
			className={`glass-card group ${className}`}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--accent) / 0.14), transparent 60%)",
				}}
				aria-hidden="true"
			/>
			<div className="relative">{children}</div>
		</div>
	);
};

export default SpotlightCard;
