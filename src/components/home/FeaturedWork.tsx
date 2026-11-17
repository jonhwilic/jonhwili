import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects } from "@/data/projects";
import { Reveal, SplitWords } from "../fx/Reveal";

const FeaturedWork = () => {
  const { t } = useLanguage();
  const w = t.home.work;
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="eyebrow">{w.eyebrow}</span></Reveal>
            <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
              <SplitWords text={w.title} className="block" />
              <SplitWords text={w.titleAccent} delay={0.15} className="accent-serif text-aura block" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link to="/projects" className="btn-ghost group">
              {w.all} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => {
            const item = t.projects.items[p.titleKey];
            const external = Boolean(p.url);
            const Wrapper = (props: { children: React.ReactNode; className: string }) =>
              external ? (
                <a href={p.url!} target="_blank" rel="noopener noreferrer" className={props.className}>{props.children}</a>
              ) : (
                <Link to="/projects" className={props.className}>{props.children}</Link>
              );

            return (
              <Reveal key={p.id} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <Wrapper className="group relative block overflow-hidden rounded-3xl border" >
                  <div
                    className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/5] sm:aspect-[4/3]"}`}
                    style={{ background: "hsl(var(--card))" }}
                  >
                    <img
                      src={p.gif}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.category}</span>
                      <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-4xl">{item.title}</h3>
                      <ul className="mt-3 hidden flex-wrap gap-2 sm:flex">
                        {item.stack.slice(0, 4).map((s) => <li key={s} className="tag-chip bg-background/50 backdrop-blur">{s}</li>)}
                      </ul>
                    </div>
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-label={external ? w.visit : undefined}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
