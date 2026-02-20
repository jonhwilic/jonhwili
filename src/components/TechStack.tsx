import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const techs = [
  { name: "React", icon: "⚛️", color: "var(--primary)" },
  { name: "Next.js", icon: "▲", color: "var(--foreground)" },
  { name: "TypeScript", icon: "TS", color: "var(--primary)" },
  { name: "Vue.js", icon: "◈", color: "var(--accent)" },
  { name: "Nuxt", icon: "△", color: "var(--accent)" },
  { name: "NestJS", icon: "◉", color: "var(--accent)" },
  { name: "Tailwind", icon: "◇", color: "var(--primary)" },
  { name: "GraphQL", icon: "⬡", color: "var(--accent)" },
  { name: "React Query", icon: "◈", color: "var(--primary)" },
  { name: "Node.js", icon: "⬡", color: "var(--primary)" },
  { name: "Git", icon: "⌥", color: "var(--foreground)" },
  { name: "Jest", icon: "✦", color: "var(--accent)" },
];

const stats = [
  { value: "7+", label: { en: "Years of experience", pt: "Anos de experiência" } },
  { value: "12+", label: { en: "Technologies mastered", pt: "Tecnologias dominadas" } },
  { value: "10+", label: { en: "Projects delivered", pt: "Projetos entregues" } },
  { value: "3", label: { en: "Academic degrees", pt: "Formações acadêmicas" } },
];

const TechStack = () => {
  const prefersReduced = useReducedMotion();
  const { locale } = useLanguage();
  const lang = locale === "pt-BR" ? "pt" : "en";

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="container relative z-10">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-16 border border-border/40 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{ background: "hsl(var(--card) / 0.5)", backdropFilter: "blur(12px)" }}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span
                className="font-heading font-bold text-4xl sm:text-5xl tracking-tight"
                style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-mono text-muted-foreground mt-2 text-center">{stat.label[lang]}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech chips label */}
        <motion.div
          className="text-center mb-8"
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
            {lang === "en" ? "— Tech Stack —" : "— Tecnologias —"}
          </span>
        </motion.div>

        {/* Scrolling tech chips */}
        <div className="relative">
          {/* Left/right fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, hsl(var(--background)) 0%, transparent 100%)" }}
          />

          <motion.div
            className="flex gap-4 w-max"
            animate={prefersReduced ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-border/50 whitespace-nowrap select-none"
                style={{
                  background: "hsl(var(--card) / 0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="text-sm font-mono font-bold w-5 text-center"
                  style={{ color: `hsl(${tech.color})` }}
                >
                  {tech.icon}
                </span>
                <span className="text-sm font-heading font-medium text-foreground/80">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
