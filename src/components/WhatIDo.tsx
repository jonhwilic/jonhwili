import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal, SplitWords } from "./fx/Reveal";
import SpotlightCard from "./fx/SpotlightCard";
import EventFeed from "./fx/EventFeed";

/** Services — three disciplines, like the "O Estúdio" block of the reference. */
const WhatIDo = () => {
  const { t } = useLanguage();
  const s = t.home.services;

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal><span className="eyebrow">{s.eyebrow}</span></Reveal>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
            <SplitWords text={s.title} className="block" />
            <SplitWords text={s.titleAccent} delay={0.15} className="accent-serif text-aura block" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-muted-foreground sm:text-lg">{s.intro}</p>
          </Reveal>
        </div>

        <ol className="flex flex-col gap-4">
          {s.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <SpotlightCard as="li" className="p-6 sm:p-8">
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="pt-1 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{item.desc}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.keywords.map((k) => (
                        <li key={k} className="tag-chip">{k}</li>
                      ))}
                    </ul>
                    {i === 1 && (
                      <div className="mt-6 max-w-sm">
                        <EventFeed label={s.eventsLabel} />
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WhatIDo;
