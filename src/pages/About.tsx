import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Code, Users, FileText, GitBranch } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import profilePhoto from "@/assets/foto_rosto.jpg";

const howIWorkIcons = [Users, GitBranch, FileText];

const About = () => {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
      };

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <motion.div {...fadeUp(0)}>
          <span className="tag-chip text-xs mb-4 inline-flex">{t.about.chip}</span>

          <div className="flex items-center gap-6 mt-3 mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-primary/30 overflow-hidden shrink-0">
              <img src={profilePhoto} alt="Jonh Wili" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              {t.about.greeting} <span className="neon-text">Jonh Wili</span>
            </h1>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-4 mb-16">
            {t.about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div {...fadeUp(0.1)}>
          <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-primary" /> {t.about.experience}
          </h2>
          <div className="space-y-6 mb-16">
            {t.about.timeline.map((item, i) => (
              <motion.div key={item.year} className="glass-card p-6 relative" {...fadeUp(0.15 + i * 0.1)}>
                <div className="absolute top-6 left-0 w-1 h-8 rounded-r-full" style={{ background: "hsl(var(--primary))" }} />
                <span className="text-xs font-mono text-primary">{item.year}</span>
                <h3 className="font-heading font-semibold mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How I work */}
        <motion.div {...fadeUp(0.2)}>
          <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-5 h-5 text-primary" /> {t.about.howIWork}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {t.about.howIWorkCards.map((item, i) => {
              const Icon = howIWorkIcons[i];
              return (
                <motion.div key={item.title} className="glass-card p-5 text-center" {...fadeUp(0.25 + i * 0.08)}>
                  <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div {...fadeUp(0.3)}>
          <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-primary" /> {t.about.education}
          </h2>
          <div className="space-y-4 mb-16">
            {t.about.educationList.map((item) => (
              <div key={item.title} className="glass-card p-5 flex items-center justify-between">
                <h3 className="font-heading font-medium text-sm">{item.title}</h3>
                <span className="text-xs font-mono text-muted-foreground">{item.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
