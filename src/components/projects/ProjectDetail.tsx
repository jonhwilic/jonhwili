import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import BrowserFrame from "./BrowserFrame";

type ProjectDetailProps = {
	projectId: string;
	onClose: () => void;
	onNavigate: (projectId: string) => void;
};

const formatPosition = (position: number) => String(position).padStart(2, "0");

/** Full-screen case view. The capture and title morph in from where they were clicked (shared layoutId). */
const ProjectDetail = ({
	projectId,
	onClose,
	onNavigate,
}: ProjectDetailProps) => {
	const { t } = useLanguage();
	const projectPosition = projects.findIndex(
		(project) => project.id === projectId,
	);
	const project = projects[projectPosition];
	const projectCopy = t.projects.items[project.titleKey];
	const previousProject =
		projects[(projectPosition - 1 + projects.length) % projects.length];
	const nextProject = projects[(projectPosition + 1) % projects.length];
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus({ preventScroll: true });
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowRight") onNavigate(nextProject.id);
			if (event.key === "ArrowLeft") onNavigate(previousProject.id);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, onNavigate, nextProject.id, previousProject.id]);

	return createPortal(
		<dialog
			open
			aria-modal="true"
			aria-labelledby={`detail-title-${project.id}`}
			className="fixed inset-0 z-[55] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-foreground"
		>
			{/* Backdrop: clicking outside closes. Hidden from keyboard/AT — the Close button covers that. */}
			<motion.button
				type="button"
				tabIndex={-1}
				aria-hidden="true"
				className="absolute inset-0 cursor-default"
				style={{
					background: "hsl(var(--background) / 0.82)",
					backdropFilter: "blur(14px)",
					WebkitBackdropFilter: "blur(14px)",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
			/>

			<div className="pointer-events-none relative flex h-full items-start justify-center overflow-y-auto px-4 py-20 sm:items-center sm:py-10">
				<div className="pointer-events-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
					<motion.div
						key={`frame-${project.id}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						<BrowserFrame
							id={project.id}
							src={project.gif}
							alt={projectCopy.title}
							url={project.url}
							eager
						/>
					</motion.div>

					<motion.div
						key={`info-${project.id}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								delay: 0.15,
								duration: 0.5,
								ease: [0.22, 1, 0.36, 1],
							},
						}}
						exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
					>
						<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
							{formatPosition(projectPosition + 1)} /{" "}
							{formatPosition(projects.length)} · {projectCopy.category}
						</span>
						<motion.h2
							id={`detail-title-${project.id}`}
							layoutId={`title-${project.id}`}
							className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl"
						>
							{projectCopy.title}
						</motion.h2>
						<p className="mt-5 leading-relaxed text-muted-foreground">
							{projectCopy.description}
						</p>
						<p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
							{t.projects.stackLabel}
						</p>
						<ul className="mt-3 flex flex-wrap gap-2">
							{projectCopy.stack.map((technology) => (
								<li key={technology} className="tag-chip">
									{technology}
								</li>
							))}
						</ul>
						<div className="mt-8">
							{project.url ? (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-signal group"
								>
									{t.projects.viewProject}
									<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</a>
							) : (
								<span className="font-mono text-xs text-muted-foreground">
									{t.projects.noLink}
								</span>
							)}
						</div>
					</motion.div>
				</div>
			</div>

			{/* Controls */}
			<motion.div
				className="fixed inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
			>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => onNavigate(previousProject.id)}
						className="btn-ghost h-11 px-4"
						aria-label={t.projects.prev}
					>
						<ArrowLeft className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => onNavigate(nextProject.id)}
						className="btn-ghost h-11 px-4"
						aria-label={t.projects.next}
					>
						<ArrowRight className="h-4 w-4" />
					</button>
				</div>
				<button
					type="button"
					ref={closeButtonRef}
					onClick={onClose}
					className="btn-ghost h-11 px-4"
				>
					<X className="h-4 w-4" /> {t.projects.close}
				</button>
			</motion.div>
		</dialog>,
		document.body,
	);
};

export default ProjectDetail;
