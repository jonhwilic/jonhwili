import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Cycles through words, inspired by KokonutUI "Dynamic Text". */
const RotatingWord = ({ words, interval = 2400, className = "", wordClassName = "" }: { words: readonly string[]; interval?: number; className?: string; wordClassName?: string }) => {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  return (
    <span className={`relative inline-flex ${className}`}>
    <span className="relative inline-grid overflow-hidden align-bottom" aria-hidden="true">
      {/* invisible sizer keeps layout stable with the longest word */}
      <span className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className={`col-start-1 row-start-1 ${wordClassName}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
    <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
};

export default RotatingWord;
