import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";

const tints = ["var(--aura-indigo)", "var(--aura-violet)", "var(--aura-teal)"];

type Props = { onOpen: (id: string) => void; openId: string | null };

/** The stacking effect needs room; on small screens cards simply flow. */
const useIsDesktop = () => {
  const query = "(min-width: 1024px)";
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return match;
};

const Card = ({ index, total, progress, onOpen, hidden }: { index: number; total: number; progress: MotionValue<number>; onOpen: (id: string) => void; hidden: boolean }) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const desktop = useIsDesktop();
  const reduce = reduceMotion || !desktop;
  const p = projects[index];
  const item = t.projects.items[p.titleKey];
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : targetScale]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, reduce || index === total - 1 ? 0 : 0.45]);
  const tint = tints[index % tints.length];

  return (
    <div
      className="relative mb-6 flex items-start justify-center lg:sticky lg:top-28 lg:mb-0 lg:h-[min(88vh,760px)]"
      style={{ paddingTop: desktop ? `${index * 14}px` : 0 }}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="relative w-full overflow-hidden rounded-[2rem] border"
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(90% 120% at 100% 0%, hsl(${tint} / 0.28), transparent 60%), hsl(var(--card))`, borderColor: "hsl(var(--foreground) / 0.1)" }}
          aria-hidden="true"
        />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-6xl font-semibold leading-none tracking-tighter text-foreground/15 sm:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.category}</span>
            </div>
            <motion.h2 layoutId={`title-${p.id}`} className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
              {item.title}
            </motion.h2>
            <p className="mt-4 line-clamp-4 text-muted-foreground sm:line-clamp-none">{item.description}</p>
            <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
              {item.stack.map((s) => <li key={s} className="tag-chip">{s}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => onOpen(p.id)} className="btn-ghost">
                <Maximize2 className="h-4 w-4" /> {t.projects.details}
              </button>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-3 text-sm text-muted-foreground hover:text-foreground">
                  {t.projects.viewProject} <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <button
            onClick={() => onOpen(p.id)}
            className="group block text-left"
            aria-label={`${t.projects.details}: ${item.title}`}
          >
            {/* while open, the frame "lives" in the modal — keep a placeholder so layout doesn't jump */}
            {hidden ? (
              <div className="aspect-[16/10] w-full rounded-2xl" />
            ) : (
              <BrowserFrame id={p.id} src={p.gif} alt={item.title} url={p.url} className="transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[1.015]" eager={index === 0} />
            )}
          </button>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-background" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  );
};

/** Projects as a deck of cards that stack and settle as you scroll. */
const StackView = ({ onOpen, openId }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {projects.map((p, i) => (
        <Card key={p.id} index={i} total={projects.length} progress={scrollYProgress} onOpen={onOpen} hidden={openId === p.id} />
      ))}
    </div>
  );
};

export default StackView;
