import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Cycles through words, inspired by KokonutUI "Dynamic Text". Purely visual: give the
 * surrounding heading an accessible sentence (see Hero's srHeadline). */
const RotatingWord = ({
	words,
	interval = 2400,
	className = "",
	wordClassName = "",
}: {
	words: readonly string[];
	interval?: number;
	className?: string;
	wordClassName?: string;
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const prefersReducedMotion = useReducedMotion();
	const wordCount = words.length;

	useEffect(() => {
		if (prefersReducedMotion || wordCount < 2) return;
		const intervalId = setInterval(
			() => setActiveIndex((currentIndex) => (currentIndex + 1) % wordCount),
			interval,
		);
		return () => clearInterval(intervalId);
	}, [wordCount, interval, prefersReducedMotion]);

	const longestWord = words.reduce(
		(longest, word) => (word.length > longest.length ? word : longest),
		"",
	);
	const activeWord = words[activeIndex];

	return (
		<span className={`relative inline-flex ${className}`}>
			<span
				className="relative -mb-[0.25em] inline-grid overflow-hidden align-bottom"
				aria-hidden="true"
			>
				{/* invisible sizer keeps layout stable with the longest word */}
				<span className="invisible col-start-1 row-start-1 pb-[0.25em]">
					{longestWord}
				</span>
				<AnimatePresence mode="popLayout" initial={false}>
					<motion.span
						key={activeWord}
						className={`col-start-1 row-start-1 pb-[0.25em] ${wordClassName}`}
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: "0%", opacity: 1 }}
						exit={{ y: "-100%", opacity: 0 }}
						transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					>
						{activeWord}
					</motion.span>
				</AnimatePresence>
			</span>
		</span>
	);
};

export default RotatingWord;
