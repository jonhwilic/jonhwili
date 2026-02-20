import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Layers, BarChart3 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Gauge, Layers, BarChart3];

const WhatIDo = () => {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="relative py-24">
      <div className="container">
        <div className="text-center mb-14">
          <span className="tag-chip text-xs mb-4 inline-flex">{t.whatIDo.chip}</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-3">
            {t.whatIDo.title} <span className="neon-text">{t.whatIDo.titleAccent}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {t.whatIDo.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={card.title}
                className="glass-card p-6 sm:p-8 text-center group"
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
