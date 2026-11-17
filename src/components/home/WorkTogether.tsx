import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Download, Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { social } from "@/data/social";
import curriculumPdf from "@/assets/archieve/curriculum_jonh.pdf";
import { Reveal, SplitWords } from "../fx/Reveal";
import SpotlightCard from "../fx/SpotlightCard";
import Magnetic from "../fx/Magnetic";

/** Two audiences, two doors — the portfolio's equivalent of the reference's "Planos". */
const WorkTogether = () => {
  const { t } = useLanguage();
  const p = t.home.paths;

  return (
    <section id="work-with-me" className="relative py-24 sm:py-32">
      <div className="container">
        <Reveal><span className="eyebrow">{p.eyebrow}</span></Reveal>
        <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
          <SplitWords text={p.title} className="block" />
          <SplitWords text={p.titleAccent} delay={0.15} className="accent-serif text-aura block" />
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Recruiters */}
          <Reveal>
            <SpotlightCard className="flex h-full flex-col p-7 sm:p-10">
              <span className="tag-chip w-fit">{p.hire.tag}</span>
              <h3 className="mt-8 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{p.hire.title}</h3>
              <p className="mt-3 max-w-md text-muted-foreground">{p.hire.desc}</p>
              <ul className="mt-8 flex flex-col gap-3">
                {p.hire.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3 pt-2">
                <Magnetic>
                  <a href={curriculumPdf} download="curriculum_jonh.pdf" className="btn-ghost">
                    <Download className="h-4 w-4" /> {p.hire.cta}
                  </a>
                </Magnetic>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-4 w-4" /> {p.hire.secondary}
                </a>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Clients */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border p-7 sm:p-10" style={{ borderColor: "hsl(var(--accent) / 0.35)" }}>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 100% 0%, hsl(var(--aura-violet) / 0.35), transparent 55%), radial-gradient(90% 80% at 0% 100%, hsl(var(--aura-indigo) / 0.35), transparent 60%), hsl(var(--card))",
                }}
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col">
                <span className="tag-chip tag-chip-active w-fit">{p.build.tag}</span>
                <h3 className="mt-8 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{p.build.title}</h3>
                <p className="mt-3 max-w-md text-foreground/75">{p.build.desc}</p>
                <ul className="mt-8 flex flex-col gap-3">
                  {p.build.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-12">
                  <Magnetic>
                    <Link to="/contact" className="btn-signal group">
                      {p.build.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </Magnetic>
                  <Link to="/projects" className="inline-flex items-center gap-2 px-3 py-3 text-sm text-foreground/75 hover:text-foreground">
                    {p.build.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;
