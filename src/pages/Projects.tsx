import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Layers, List } from "lucide-react";
import { lazy, Suspense, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import IndexView from "@/components/projects/IndexView";
import StackView from "@/components/projects/StackView";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/analytics";

/** The detail view only downloads when a project is opened. */
const ProjectDetail = lazy(() => import("@/components/projects/ProjectDetail"));

type View = "stack" | "index";

const Projects = () => {
	const { t, localizedPath } = useLanguage();
	const [searchParams, setSearchParams] = useSearchParams();
	const activeView: View =
		searchParams.get("view") === "index" ? "index" : "stack";
	const requestedProjectId = searchParams.get("p");
	const openProjectId = projects.some(
		(project) => project.id === requestedProjectId,
	)
		? requestedProjectId
		: null;

	// URL is the source of truth: views and open projects are shareable links
	const updateSearchParams = useCallback(
		(changes: Record<string, string | null>) => {
			setSearchParams(
				(currentParams) => {
					const nextParams = new URLSearchParams(currentParams);
					for (const [paramName, paramValue] of Object.entries(changes)) {
						if (paramValue === null) nextParams.delete(paramName);
						else nextParams.set(paramName, paramValue);
					}
					return nextParams;
				},
				{ replace: true, preventScrollReset: true },
			);
		},
		[setSearchParams],
	);
	const openProject = useCallback(
		(projectId: string) => {
			track("select_content", { content_type: "project", item_id: projectId });
			updateSearchParams({ p: projectId });
		},
		[updateSearchParams],
	);
	const closeProject = useCallback(
		() => updateSearchParams({ p: null }),
		[updateSearchParams],
	);

	const views: { id: View; label: string; icon: typeof Layers }[] = [
		{ id: "stack", label: t.projects.views.stack, icon: Layers },
		{ id: "index", label: t.projects.views.index, icon: List },
	];

	return (
		<LayoutGroup>
			<section className="relative pb-24 pt-36">
				<div className="container">
					{/* Header */}
					<div className="flex flex-wrap items-end justify-between gap-8">
						<div>
							<Reveal>
								<span className="eyebrow">{t.projects.chip}</span>
							</Reveal>
							<h1 className="mt-6 font-heading text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
								<SplitWords
									text={t.projects.title}
									animateOnMount
									className="block"
								/>
								<SplitWords
									text={t.projects.titleAccent}
									animateOnMount
									delay={0.12}
									className="accent-serif text-aura block"
								/>
							</h1>
							<Reveal delay={0.2}>
								<p className="mt-6 max-w-md text-muted-foreground sm:text-lg">
									{t.projects.subtitle}
								</p>
							</Reveal>
						</div>

						<Reveal
							delay={0.25}
							className="flex flex-col items-start gap-4 sm:items-end"
						>
							<p className="font-heading text-5xl font-semibold tracking-tight">
								{String(projects.length).padStart(2, "0")}
								<span className="ml-2 font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground">
									{t.projects.count}
								</span>
							</p>
							<div
								role="tablist"
								aria-label={t.projects.viewsLabel}
								className="relative flex rounded-full border p-1"
								style={{ borderColor: "hsl(var(--foreground) / 0.12)" }}
							>
								{views.map(({ id: viewId, label, icon: Icon }) => (
									<button
										type="button"
										key={viewId}
										role="tab"
										aria-selected={activeView === viewId}
										onClick={() =>
											updateSearchParams({
												view: viewId === "stack" ? null : viewId,
											})
										}
										className={`relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${activeView === viewId ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
									>
										{activeView === viewId && (
											<motion.span
												layoutId="view-pill"
												className="absolute inset-0 -z-10 rounded-full bg-primary"
												transition={{
													type: "spring",
													stiffness: 400,
													damping: 32,
												}}
											/>
										)}
										<Icon className="h-4 w-4" /> {label}
									</button>
								))}
							</div>
						</Reveal>
					</div>

					{/* Views */}
					<div className="mt-16 sm:mt-24">
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={activeView}
								initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
								animate={{
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
									transitionEnd: { filter: "none" },
								}}
								exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
								transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
							>
								{activeView === "stack" ? (
									<>
										<p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
											{t.projects.scrollHint}
										</p>
										<StackView
											onOpen={openProject}
											openProjectId={openProjectId}
										/>
									</>
								) : (
									<IndexView onOpen={openProject} />
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Conversion */}
					<Reveal className="mt-24 flex flex-col items-start justify-between gap-6 rounded-3xl border p-8 sm:flex-row sm:items-center sm:p-12">
						<p className="max-w-xl font-heading text-2xl font-semibold tracking-tight sm:text-4xl">
							{t.projects.ctaTitle}
						</p>
						<Link
							to={localizedPath("/contact")}
							className="btn-signal group shrink-0"
						>
							{t.projects.cta}
							<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</Link>
					</Reveal>
				</div>
			</section>

			<AnimatePresence>
				{openProjectId && (
					<Suspense key="detail" fallback={null}>
						<ProjectDetail
							projectId={openProjectId}
							onClose={closeProject}
							onNavigate={openProject}
						/>
					</Suspense>
				)}
			</AnimatePresence>
		</LayoutGroup>
	);
};

export default Projects;
