import { ArrowUpRight, Check, Download, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import curriculumPdf from "@/assets/archieve/curriculum_jonh.pdf";
import { social } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackCtaClick, trackCvDownload } from "@/lib/analytics";
import Magnetic from "../fx/Magnetic";
import { Reveal, SplitWords } from "../fx/Reveal";
import SpotlightCard from "../fx/SpotlightCard";

/** Two audiences, two doors — the portfolio's equivalent of the reference's "Planos". */
const WorkTogether = () => {
	const { t, localizedPath } = useLanguage();
	const workPaths = t.home.paths;

	return (
		<section id="work-with-me" className="relative py-24 sm:py-32">
			<div className="container">
				<Reveal>
					<span className="eyebrow">{workPaths.eyebrow}</span>
				</Reveal>
				<h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
					<SplitWords text={workPaths.title} className="block" />
					<SplitWords
						text={workPaths.titleAccent}
						delay={0.15}
						className="accent-serif text-aura block"
					/>
				</h2>

				<div className="mt-14 grid gap-5 lg:grid-cols-2">
					{/* Recruiters */}
					<Reveal>
						<SpotlightCard className="flex h-full flex-col p-7 sm:p-10">
							<span className="tag-chip w-fit">{workPaths.hire.tag}</span>
							<h3 className="mt-8 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
								{workPaths.hire.title}
							</h3>
							<p className="mt-3 max-w-md text-muted-foreground">
								{workPaths.hire.desc}
							</p>
							<ul className="mt-8 flex flex-col gap-3">
								{workPaths.hire.bullets.map((bullet) => (
									<li
										key={bullet}
										className="flex items-start gap-3 text-sm sm:text-base"
									>
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
										{bullet}
									</li>
								))}
							</ul>
							<div className="mt-10 flex flex-wrap gap-3 pt-2">
								<Magnetic>
									<a
										href={curriculumPdf}
										download="curriculum_jonh.pdf"
										onClick={() => trackCvDownload("work_together")}
										className="btn-ghost"
									>
										<Download className="h-4 w-4" /> {workPaths.hire.cta}
									</a>
								</Magnetic>
								<a
									href={social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
								>
									<Linkedin className="h-4 w-4" /> {workPaths.hire.secondary}
								</a>
							</div>
						</SpotlightCard>
					</Reveal>

					{/* Clients */}
					<Reveal delay={0.1}>
						<div
							className="relative h-full overflow-hidden rounded-2xl border p-7 sm:p-10"
							style={{ borderColor: "hsl(var(--accent) / 0.35)" }}
						>
							<div
								className="pointer-events-none absolute inset-0"
								style={{
									background:
										"radial-gradient(120% 90% at 100% 0%, hsl(var(--aura-violet) / 0.35), transparent 55%), radial-gradient(90% 80% at 0% 100%, hsl(var(--aura-indigo) / 0.35), transparent 60%), hsl(var(--card))",
								}}
								aria-hidden="true"
							/>
							<div className="relative flex h-full flex-col">
								<span className="tag-chip tag-chip-active w-fit">
									{workPaths.build.tag}
								</span>
								<h3 className="mt-8 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
									{workPaths.build.title}
								</h3>
								<p className="mt-3 max-w-md text-foreground/75">
									{workPaths.build.desc}
								</p>
								<ul className="mt-8 flex flex-col gap-3">
									{workPaths.build.bullets.map((bullet) => (
										<li
											key={bullet}
											className="flex items-start gap-3 text-sm sm:text-base"
										>
											<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
											{bullet}
										</li>
									))}
								</ul>
								<div className="mt-auto flex flex-wrap gap-3 pt-12">
									<Magnetic>
										<Link
											to={localizedPath("/contact")}
											onClick={() =>
												trackCtaClick("start_project", "work_together")
											}
											className="btn-signal group"
										>
											{workPaths.build.cta}
											<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
										</Link>
									</Magnetic>
									<Link
										to={localizedPath("/projects")}
										className="inline-flex items-center gap-2 px-3 py-3 text-sm text-foreground/75 hover:text-foreground"
									>
										{workPaths.build.secondary}
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
