import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

/** Fade/slide-in when scrolled into view. */
export const Reveal = ({
	children,
	delay = 0,
	className = "",
	y = 24,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}) => {
	const prefersReducedMotion = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={prefersReducedMotion ? false : { opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.7, delay, ease: easeOutExpo }}
		>
			{children}
		</motion.div>
	);
};

/** Word-by-word masked reveal for headlines. */
export const SplitWords = ({
	text,
	className = "",
	delay = 0,
	animateOnMount = false,
	withAccessibleText = true,
}: {
	text: string;
	className?: string;
	delay?: number;
	animateOnMount?: boolean;
	/** Set to false when the parent already provides the full sentence (e.g. the hero H1). */
	withAccessibleText?: boolean;
}) => {
	const prefersReducedMotion = useReducedMotion();
	if (prefersReducedMotion) return <span className={className}>{text}</span>;

	// words can repeat inside a sentence, so the position is part of their stable id
	const words = text.split(" ").map((word, position, allWords) => ({
		id: `${position}-${word}`,
		word,
		delay: delay + position * 0.06,
		isLast: position === allWords.length - 1,
	}));
	const trigger = animateOnMount
		? { animate: "show" }
		: { whileInView: "show", viewport: { once: true, margin: "-40px" } };

	// The readable sentence is a sibling (not inside the gradient-clipped span, which would paint it);
	// the animated per-word copy is hidden from assistive tech and AI agents.
	return (
		<>
			{withAccessibleText && <span className="sr-only">{text}</span>}
			<motion.span
				className={className}
				initial="hidden"
				{...trigger}
				aria-hidden="true"
			>
				{words.map((entry) => (
					<span
						key={entry.id}
						className="inline-block overflow-hidden pb-[0.12em] align-bottom"
					>
						<motion.span
							className="inline-block"
							variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
							transition={{
								duration: 0.8,
								delay: entry.delay,
								ease: easeOutExpo,
							}}
						>
							{entry.word}
							{entry.isLast ? "" : " "}
						</motion.span>
					</span>
				))}
			</motion.span>
		</>
	);
};
