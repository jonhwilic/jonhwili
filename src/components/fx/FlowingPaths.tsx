import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated flowing lines, inspired by KokonutUI "Background Paths".
 * Pure SVG + Framer Motion — no extra dependencies.
 */
const Paths = ({ position, count }: { position: number; count: number }) => {
  const reduce = useReducedMotion();
  const paths = Array.from({ length: count }, (_, i) => {
    const o = i * 5 * position;
    return {
      id: i,
      d: `M-${380 - o} -${189 + i * 6}C-${380 - o} -${189 + i * 6} -${312 - o} ${216 - i * 6} ${152 - o} ${343 - i * 6}C${616 - o} ${470 - i * 6} ${684 - o} ${875 - i * 6} ${684 - o} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      duration: 22 + ((i * 7) % 11),
    };
  });

  return (
    <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((p) => (
        <motion.path
          key={p.id}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.width}
          strokeOpacity={0.06 + p.id * 0.02}
          initial={reduce ? false : { pathLength: 0.3, opacity: 0.6 }}
          animate={reduce ? undefined : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
};

const FlowingPaths = ({ className = "", count = 28 }: { className?: string; count?: number }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`}>
    <div className="absolute inset-0 text-[hsl(var(--accent))]">
      <Paths position={1} count={count} />
    </div>
    <div className="absolute inset-0 text-[hsl(var(--foreground))]">
      <Paths position={-1} count={count} />
    </div>
  </div>
);

export default FlowingPaths;
