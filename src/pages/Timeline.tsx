import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Award, BookOpen, Code2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  type: "professional" | "academic";
  icon: "briefcase" | "graduation" | "rocket" | "award" | "book" | "code";
  tags?: string[];
};

const iconMap = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  rocket: Rocket,
  award: Award,
  book: BookOpen,
  code: Code2,
};

const Timeline = () => {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const entries = t.timelinePage.entries as unknown as TimelineEntry[];

  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="tag-chip text-xs mb-4 inline-flex">{t.timelinePage.chip}</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-4">
            {t.timelinePage.title} <span className="neon-text">{t.timelinePage.titleAccent}</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">{t.timelinePage.subtitle}</p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--primary))" }} />
              <span className="text-xs font-mono text-muted-foreground">{t.timelinePage.professional}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--accent))" }} />
              <span className="text-xs font-mono text-muted-foreground">{t.timelinePage.academic}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1))",
            }}
          />

          <div className="space-y-12">
            {entries.map((entry, i) => {
              const Icon = iconMap[entry.icon];
              const isLeft = i % 2 === 0;
              const color = entry.type === "professional" ? "var(--primary)" : "var(--accent)";

              return (
                <motion.div
                  key={`${entry.year}-${i}`}
                  initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 pl-14 sm:pl-0 ${isLeft ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300">
                      {/* Year badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: `hsl(${color} / 0.15)`,
                            color: `hsl(${color})`,
                            border: `1px solid hsl(${color} / 0.3)`,
                          }}
                        >
                          {entry.year}
                        </span>
                        <span
                          className="text-[10px] font-mono uppercase tracking-wider"
                          style={{ color: `hsl(${color} / 0.7)` }}
                        >
                          {entry.type === "professional" ? t.timelinePage.professional : t.timelinePage.academic}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {entry.description}
                      </p>

                      {entry.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: `hsl(${color} / 0.15)`,
                        border: `2px solid hsl(${color} / 0.4)`,
                        boxShadow: `0 0 20px hsl(${color} / 0.2)`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: `hsl(${color})` }} />
                    </div>
                  </div>

                  {/* Empty space for opposite side (desktop) */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom glow */}
          <div className="flex justify-center mt-12">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
