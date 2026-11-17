/**
 * Soft drifting gradient atmosphere (CSS only). Plays the role of the
 * gradient video on theorigostudio.com without shipping a video file.
 */
const Aurora = ({ className = "", intensity = 1 }: { className?: string; intensity?: number }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    <div
      className="absolute -left-[10%] top-[-20%] h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
      style={{
        background: "radial-gradient(closest-side, hsl(var(--aura-indigo) / 0.55), transparent)",
        opacity: 0.55 * intensity,
        animation: "aurora-drift 26s ease-in-out infinite",
      }}
    />
    <div
      className="absolute right-[-15%] top-[10%] h-[55vmax] w-[55vmax] rounded-full blur-[120px]"
      style={{
        background: "radial-gradient(closest-side, hsl(var(--aura-violet) / 0.5), transparent)",
        opacity: 0.5 * intensity,
        animation: "aurora-drift 32s ease-in-out infinite reverse",
      }}
    />
    <div
      className="absolute bottom-[-30%] left-[30%] h-[45vmax] w-[45vmax] rounded-full blur-[120px]"
      style={{
        background: "radial-gradient(closest-side, hsl(var(--aura-teal) / 0.35), transparent)",
        opacity: 0.45 * intensity,
        animation: "aurora-drift 38s ease-in-out infinite",
      }}
    />
    {/* fade to canvas at the bottom so sections blend */}
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
  </div>
);

export default Aurora;
