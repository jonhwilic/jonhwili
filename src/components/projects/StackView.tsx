import {
	motion,
	type MotionValue,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import BrowserFrame from "./BrowserFrame";

const cardTints = [
	"var(--aura-indigo)",
	"var(--aura-violet)",
	"var(--aura-teal)",
];
const DESKTOP_QUERY = "(min-width: 1024px)";
/** How far each card in the deck sits below the previous one, in px. */
const STACK_OFFSET = 14;
/** How much each card shrinks for every card stacked on top of it. */
const SCALE_STEP = 0.04;

/** The stacking effect needs room; on small screens cards simply flow. */
const useIsDesktop = () => {
	// starts false on the server and on the first client render (same markup → clean hydration)
	const [isDesktop, setIsDesktop] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia(DESKTOP_QUERY);
		const handleChange = () => setIsDesktop(mediaQuery.matches);
		handleChange();
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);
	return isDesktop;
};

type ProjectCardProps = {
	position: number;
	deckSize: number;
	deckProgress: MotionValue<number>;
	onOpen: (projectId: string) => void;
	isOpenInDetail: boolean;
};

const ProjectCard = ({
	position,
	deckSize,
	deckProgress,
	onOpen,
	isOpenInDetail,
}: ProjectCardProps) => {
	const { t } = useLanguage();
	const prefersReducedMotion = useReducedMotion();
	const isDesktop = useIsDesktop();
	const isStatic = prefersReducedMotion || !isDesktop;
	const project = projects[position];
	const projectCopy = t.projects.items[project.titleKey];
	const isLastCard = position === deckSize - 1;

	const finalScale = 1 - (deckSize - position - 1) * SCALE_STEP;
	const scale = useTransform(
		deckProgress,
		[position / deckSize, 1],
		[1, isStatic ? 1 : finalScale],
	);
	const shadeOpacity = useTransform(
		deckProgress,
		[position / deckSize, (position + 1) / deckSize],
		[0, isStatic || isLastCard ? 0 : 0.45],
	);
	const cardTint = cardTints[position % cardTints.length];
	const openDetail = () => onOpen(project.id);

	return (
		<div
			className="relative mb-6 flex items-start justify-center lg:sticky lg:top-28 lg:mb-0 lg:h-[min(88vh,760px)]"
			style={{ paddingTop: isDesktop ? `${position * STACK_OFFSET}px` : 0 }}
		>
			<motion.article
				style={{ scale, transformOrigin: "top center" }}
				className="relative w-full overflow-hidden rounded-[2rem] border"
			>
				<div
					className="absolute inset-0"
					style={{
						background: `radial-gradient(90% 120% at 100% 0%, hsl(${cardTint} / 0.28), transparent 60%), hsl(var(--card))`,
					}}
					aria-hidden="true"
				/>
				<div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
					<div className="flex flex-col">
						<div className="flex items-baseline gap-4">
							<span className="font-heading text-6xl font-semibold leading-none tracking-tighter text-foreground/15 sm:text-8xl">
								{String(position + 1).padStart(2, "0")}
							</span>
							<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
								{projectCopy.category}
							</span>
						</div>
						<motion.h2
							layoutId={`title-${project.id}`}
							className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-5xl"
						>
							{projectCopy.title}
						</motion.h2>
						<p className="mt-4 line-clamp-4 text-muted-foreground sm:line-clamp-none">
							{projectCopy.description}
						</p>
						<ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
							{projectCopy.stack.map((technology) => (
								<li key={technology} className="tag-chip">
									{technology}
								</li>
							))}
						</ul>
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<button type="button" onClick={openDetail} className="btn-ghost">
								<Maximize2 className="h-4 w-4" /> {t.projects.details}
							</button>
							{project.url && (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
								>
									{t.projects.viewProject} <ArrowUpRight className="h-4 w-4" />
								</a>
							)}
						</div>
					</div>

					<button
						type="button"
						onClick={openDetail}
						className="group block text-left"
						aria-label={`${t.projects.details}: ${projectCopy.title}`}
					>
						{/* while open, the frame "lives" in the detail view — keep a placeholder so the layout doesn't jump */}
						{isOpenInDetail ? (
							<div className="aspect-video w-full rounded-2xl" />
						) : (
							<BrowserFrame
								id={project.id}
								video={project.video}
								poster={project.poster}
								alt={projectCopy.title}
								url={project.url}
								className="transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[1.015]"
							/>
						)}
					</button>
				</div>
				<motion.div
					className="pointer-events-none absolute inset-0 bg-background"
					style={{ opacity: shadeOpacity }}
					aria-hidden="true"
				/>
			</motion.article>
		</div>
	);
};

type StackViewProps = {
	onOpen: (projectId: string) => void;
	openProjectId: string | null;
};

/** Projects as a deck of cards that stack and settle as you scroll. */
const StackView = ({ onOpen, openProjectId }: StackViewProps) => {
	const deckRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: deckRef,
		offset: ["start start", "end end"],
	});

	return (
		<div ref={deckRef} className="relative">
			{projects.map((project, position) => (
				<ProjectCard
					key={project.id}
					position={position}
					deckSize={projects.length}
					deckProgress={scrollYProgress}
					onOpen={onOpen}
					isOpenInDetail={openProjectId === project.id}
				/>
			))}
		</div>
	);
};

export default StackView;
