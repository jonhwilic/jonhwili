import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import HangingBadge from "./HangingBadge";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
      };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: "hsl(var(--primary))" }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ background: "hsl(var(--accent))" }} />

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div {...fadeUp(0.1)}>
              <span className="tag-chip mb-6 inline-flex">
                <span className="w-2 h-2 rounded-full mr-2 animate-glow-pulse" style={{ background: "hsl(var(--primary))" }} />
                {t.hero.available}
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {t.hero.headline}
              <br />
              <span className="neon-text">{t.hero.headlineAccent}</span>
            </motion.h1>

            <motion.p {...fadeUp(0.35)} className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {t.hero.subheadline}
            </motion.p>

            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mb-12">
              <Link to="/projects" className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                {t.hero.viewProjects} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#" className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-sm border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors">
                <Download className="w-4 h-4" /> {t.hero.downloadCV}
              </a>
              <Link to="/contact" className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                <Mail className="w-4 h-4" /> {t.hero.contact}
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-x-6 gap-y-2">
              {t.hero.credibility.map((item) => (
                <span key={item} className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.4)} style={{ zIndex: 1 }}>
            <HangingBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
