import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";

type Props = { id: string; onClose: () => void; onNavigate: (id: string) => void };

/** Full-screen case view. The capture and title morph in from where they were clicked (shared layoutId). */
const ProjectDetail = ({ id, onClose, onNavigate }: Props) => {
  const { t } = useLanguage();
  const idx = projects.findIndex((p) => p.id === id);
  const p = projects[idx];
  const item = t.projects.items[p.titleKey];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(next.id);
      if (e.key === "ArrowLeft") onNavigate(prev.id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNavigate, next.id, prev.id]);

  return createPortal(
    <div className="fixed inset-0 z-[55]" role="dialog" aria-modal="true" aria-labelledby={`detail-title-${p.id}`}>
      <motion.div
        className="absolute inset-0"
        style={{ background: "hsl(var(--background) / 0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="pointer-events-none relative flex h-full items-start justify-center overflow-y-auto px-4 py-20 sm:items-center sm:py-10">
        <div className="pointer-events-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
          <motion.div key={`frame-${p.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <BrowserFrame id={p.id} src={p.gif} alt={item.title} url={p.url} eager />
          </motion.div>

          <motion.div
            key={`info-${p.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {item.category}
            </span>
            <motion.h2 id={`detail-title-${p.id}`} layoutId={`title-${p.id}`} className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
              {item.title}
            </motion.h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{item.description}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t.projects.stackLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((s) => <li key={s} className="tag-chip">{s}</li>)}
            </ul>
            <div className="mt-8">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-signal group">
                  {t.projects.viewProject}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="font-mono text-xs text-muted-foreground">{t.projects.noLink}</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <motion.div
        className="fixed inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex gap-2">
          <button onClick={() => onNavigate(prev.id)} className="btn-ghost h-11 px-4" aria-label={t.projects.prev}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={() => onNavigate(next.id)} className="btn-ghost h-11 px-4" aria-label={t.projects.next}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <button ref={closeRef} onClick={onClose} className="btn-ghost h-11 px-4">
          <X className="h-4 w-4" /> {t.projects.close}
        </button>
      </motion.div>
    </div>,
    document.body,
  );
};

export default ProjectDetail;
