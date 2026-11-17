import {
	AnimatePresence,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type PointerEvent, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

const previewSpring = { stiffness: 300, damping: 30, mass: 0.5 };

type IndexViewProps = { onOpen: (projectId: string) => void };

/** Editorial index: big rows, with a live preview that follows the cursor. */
const IndexView = ({ onOpen }: IndexViewProps) => {
	const { t } = useLanguage();
	const prefersReducedMotion = useReducedMotion();
	const [activePosition, setActivePosition] = useState<number | null>(null);
	const previewX = useSpring(useMotionValue(0), previewSpring);
	const previewY = useSpring(useMotionValue(0), previewSpring);
	const activeProject =
		activePosition === null ? null : projects[activePosition];

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (event.pointerType !== "mouse") return;
		previewX.set(event.clientX);
		previewY.set(event.clientY);
	};

	return (
		<div
			onPointerMove={handlePointerMove}
			onPointerLeave={() => setActivePosition(null)}
		>
			<p className="mb-6 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
				{t.projects.hoverHint}
			</p>
			<ul
				className="border-t"
				style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}
			>
				{projects.map((project, position) => {
					const projectCopy = t.projects.items[project.titleKey];
					const isDimmed =
						activePosition !== null && activePosition !== position;
					return (
						<li
							key={project.id}
							className="border-b"
							style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}
						>
							<button
								type="button"
								onClick={() => onOpen(project.id)}
								onPointerEnter={(event) => {
									if (event.pointerType === "mouse")
										setActivePosition(position);
								}}
								onFocus={() => setActivePosition(position)}
								onBlur={() => setActivePosition(null)}
								className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 text-left transition-opacity duration-500 sm:gap-8 sm:py-8"
								style={{ opacity: isDimmed ? 0.35 : 1 }}
							>
								<span className="font-mono text-xs text-muted-foreground">
									{String(position + 1).padStart(2, "0")}
								</span>
								<div className="min-w-0">
									<motion.span
										layoutId={`title-${project.id}`}
										className="block font-heading text-3xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl"
									>
										{projectCopy.title}
									</motion.span>
									<span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
										{projectCopy.category}
									</span>
									{/* mobile: inline thumbnail */}
									<img
										src={project.gif}
										alt=""
										loading="lazy"
										className="mt-4 aspect-[16/10] w-full rounded-xl border object-cover object-top md:hidden"
									/>
								</div>
								<span
									className="grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
									style={{ borderColor: "hsl(var(--foreground) / 0.15)" }}
								>
									<ArrowUpRight className="h-4 w-4" />
								</span>
							</button>
						</li>
					);
				})}
			</ul>

			{/* Cursor-following preview (desktop only). Portaled so page transforms don't offset it. */}
			{createPortal(
				<motion.div
					className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
					style={{
						x: previewX,
						y: previewY,
						translateX: "-50%",
						translateY: "-50%",
					}}
					aria-hidden="true"
				>
					<AnimatePresence>
						{activeProject && (
							<motion.div
								key="preview"
								initial={
									prefersReducedMotion
										? { opacity: 0 }
										: { opacity: 0, scale: 0.6, rotate: -6 }
								}
								animate={{ opacity: 1, scale: 1, rotate: -3 }}
								exit={
									prefersReducedMotion
										? { opacity: 0 }
										: { opacity: 0, scale: 0.6, rotate: 4 }
								}
								transition={{ type: "spring", stiffness: 260, damping: 24 }}
								className="relative h-[240px] w-[380px] overflow-hidden rounded-2xl border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
								style={{
									borderColor: "hsl(var(--foreground) / 0.15)",
									background: "hsl(var(--card))",
								}}
							>
								<AnimatePresence initial={false}>
									<motion.img
										key={activeProject.id}
										src={activeProject.gif}
										alt=""
										initial={{ clipPath: "inset(100% 0 0 0)" }}
										animate={{ clipPath: "inset(0% 0 0 0)" }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
										className="absolute inset-0 h-full w-full object-cover object-top"
									/>
								</AnimatePresence>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>,
				document.body,
			)}
		</div>
	);
};

export default IndexView;
