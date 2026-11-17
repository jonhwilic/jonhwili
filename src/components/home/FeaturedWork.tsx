import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal, SplitWords } from "../fx/Reveal";

const cardClassName = "group relative block overflow-hidden rounded-3xl border";

/** Live projects open the real site; the others open their detail view on /projects. */
const ProjectLink = ({
	projectId,
	url,
	children,
}: {
	projectId: string;
	url: string | null;
	children: ReactNode;
}) =>
	url ? (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={cardClassName}
		>
			{children}
		</a>
	) : (
		<Link to={`/projects?p=${projectId}`} className={cardClassName}>
			{children}
		</Link>
	);

const FeaturedWork = () => {
	const { t } = useLanguage();
	const workCopy = t.home.work;
	const featuredProjects = projects.filter((project) => project.featured);

	return (
		<section id="work" className="relative py-24 sm:py-32">
			<div className="container">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<div>
						<Reveal>
							<span className="eyebrow">{workCopy.eyebrow}</span>
						</Reveal>
						<h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
							<SplitWords text={workCopy.title} className="block" />
							<SplitWords
								text={workCopy.titleAccent}
								delay={0.15}
								className="accent-serif text-aura block"
							/>
						</h2>
					</div>
					<Reveal delay={0.1}>
						<Link to="/projects" className="btn-ghost group">
							{workCopy.all}{" "}
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Reveal>
				</div>

				<div className="mt-14 grid gap-5 md:grid-cols-2">
					{featuredProjects.map((project, projectPosition) => {
						const projectCopy = t.projects.items[project.titleKey];
						const isHighlight = projectPosition === 0;

						return (
							<Reveal
								key={project.id}
								delay={projectPosition * 0.08}
								className={isHighlight ? "md:col-span-2" : ""}
							>
								<ProjectLink projectId={project.id} url={project.url}>
									<div
										className={`relative overflow-hidden ${isHighlight ? "aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/5] sm:aspect-[4/3]"}`}
										style={{ background: "hsl(var(--card))" }}
									>
										<img
											src={project.gif}
											alt={projectCopy.title}
											loading="lazy"
											decoding="async"
											className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
									</div>

									<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
										<div>
											<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
												{projectCopy.category}
											</span>
											<h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-4xl">
												{projectCopy.title}
											</h3>
											<ul className="mt-3 hidden flex-wrap gap-2 sm:flex">
												{projectCopy.stack.slice(0, 4).map((technology) => (
													<li
														key={technology}
														className="tag-chip bg-background/50 backdrop-blur"
													>
														{technology}
													</li>
												))}
											</ul>
										</div>
										<span
											className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"
											aria-hidden="true"
										>
											<ArrowUpRight className="h-5 w-5" />
										</span>
									</div>
								</ProjectLink>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FeaturedWork;
