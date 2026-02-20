import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import balletGif from "@/assets/ballet-da-cidade.gif";
import kardiahGif from "@/assets/kardiah.gif";
import portelaGif from "@/assets/portela-filmes.gif";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "ballet-da-cidade",
    gif: balletGif,
    titleKey: "balletDaCidade",
    url: null,
  },
  {
    id: "kardiah",
    gif: kardiahGif,
    titleKey: "kardiah",
    url: null,
  },
  {
    id: "portela-filmes",
    gif: portelaGif,
    titleKey: "portelaFilmes",
    url: null,
  },
];

const Projects = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium rounded-full border border-primary/30 text-primary bg-primary/5">
            {t.projects.chip}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.projects.title}{" "}
            <span className="neon-text">{t.projects.titleAccent}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="flex flex-col gap-20">
          {projects.map((project, i) => {
            const item = t.projects.items[project.titleKey as keyof typeof t.projects.items];
            const isEven = i % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${!isEven ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* GIF */}
                <div className="w-full md:w-3/5 rounded-xl overflow-hidden border border-border/30 shadow-lg group relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={project.gif}
                    alt={item.title}
                    className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Description */}
                <div className="w-full md:w-2/5 flex flex-col gap-4">
                  <span className="text-xs font-mono text-primary/70 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-md border border-border/50 text-muted-foreground bg-muted/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver projeto
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Projects;
