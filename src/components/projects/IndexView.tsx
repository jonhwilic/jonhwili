import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects } from "@/data/projects";

type Props = { onOpen: (id: string) => void };

/** Editorial index: big rows, with a live preview that follows the cursor. */
const IndexView = ({ onOpen }: Props) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <p className="mb-6 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">{t.projects.hoverHint}</p>
      <ul className="border-t" style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}>
        {projects.map((p, i) => {
          const item = t.projects.items[p.titleKey];
          const dimmed = active !== null && active !== i;
          return (
            <li key={p.id} className="border-b" style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}>
              <button
                onClick={() => onOpen(p.id)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 text-left transition-opacity duration-500 sm:gap-8 sm:py-8"
                style={{ opacity: dimmed ? 0.35 : 1 }}
              >
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <motion.span
                    layoutId={`title-${p.id}`}
                    className="block font-heading text-3xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl"
                  >
                    {item.title}
                  </motion.span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.category}</span>
                  {/* mobile: inline thumbnail */}
                  <img src={p.gif} alt="" loading="lazy" className="mt-4 aspect-[16/10] w-full rounded-xl border object-cover object-top md:hidden" />
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground" style={{ borderColor: "hsl(var(--foreground) / 0.15)" }}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview (desktop only). Portaled so page transforms don't offset it. */}
      {typeof document !== "undefined" &&
        createPortal(
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            aria-hidden="true"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="preview"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="relative h-[240px] w-[380px] overflow-hidden rounded-2xl border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                  style={{ borderColor: "hsl(var(--foreground) / 0.15)", background: "hsl(var(--card))" }}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={active}
                      src={projects[active].gif}
                      alt=""
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body,
        )}
    </div>
  );
};

export default IndexView;
