import {
	AnimatePresence,
	motion,
	type PanInfo,
	useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import { type Testimonial, testimonials } from "@/data/testimonials";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";
import { Reveal, SplitWords } from "../fx/Reveal";

/** How far (px) or how fast (px/s) a card must be thrown to change recommendation. */
const SWIPE_DISTANCE = 110;
const SWIPE_VELOCITY = 500;
/** Cards visible behind the active one. */
const VISIBLE_DEPTH = 2;

const formatGivenAt = (isoDate: string, locale: Locale) =>
	new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${isoDate}T12:00:00Z`));

const formatCounter = (position: number) => String(position).padStart(2, "0");

const avatarSizes = {
	sm: { className: "h-9 w-9 text-[11px]", pixels: 36 },
	lg: { className: "h-14 w-14 text-sm", pixels: 56 },
} as const;

/** Photo with a gradient ring, or the initials when there is no photo yet. */
const Avatar = ({
	testimonial,
	size,
	className = "",
}: {
	testimonial: Testimonial;
	size: keyof typeof avatarSizes;
	className?: string;
}) => {
	const { className: sizeClassName, pixels } = avatarSizes[size];
	return (
		<span
			aria-hidden="true"
			className={`relative grid shrink-0 place-items-center rounded-full p-[2px] transition-all duration-500 ${sizeClassName} ${className}`}
			style={{
				background:
					"linear-gradient(135deg, hsl(var(--primary)), hsl(var(--aura-teal)))",
			}}
		>
			{testimonial.photo ? (
				<img
					src={testimonial.photo}
					alt=""
					width={pixels}
					height={pixels}
					loading="lazy"
					decoding="async"
					draggable={false}
					className="h-full w-full rounded-full bg-card object-cover"
				/>
			) : (
				<span className="font-heading font-semibold text-primary-foreground">
					{testimonial.initials}
				</span>
			)}
		</span>
	);
};

const QuoteCard = ({
	testimonial,
	locale,
}: {
	testimonial: Testimonial;
	locale: Locale;
}) => {
	const { t } = useLanguage();
	const copy = t.home.testimonials;
	const isTranslated = testimonial.originalLocale !== locale;

	return (
		<figure
			className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-10"
			style={{
				borderColor: "hsl(var(--foreground) / 0.12)",
				background:
					"radial-gradient(120% 80% at 100% 0%, hsl(var(--aura-violet) / 0.22), transparent 55%), radial-gradient(80% 70% at 0% 100%, hsl(var(--aura-indigo) / 0.18), transparent 60%), hsl(var(--card))",
			}}
		>
			<span
				aria-hidden="true"
				className="accent-serif text-aura -mb-6 block select-none text-[7rem] leading-[0.8] sm:text-[9rem]"
			>
				“
			</span>
			<blockquote
				lang={testimonial.originalLocale === locale ? undefined : locale}
				className="relative flex-1 space-y-4 font-heading text-xl font-medium leading-snug tracking-tight sm:text-2xl"
			>
				{testimonial.quote[locale].map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</blockquote>
			{isTranslated && (
				<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
					{copy.translatedNote}
				</p>
			)}
			<figcaption
				className="mt-8 flex items-center gap-4 border-t pt-6"
				style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}
			>
				<Avatar testimonial={testimonial} size="lg" />
				<div className="min-w-0 flex-1">
					<p className="font-heading font-semibold">{testimonial.name}</p>
					<p className="truncate text-sm text-muted-foreground">
						{testimonial.headline[locale]}
					</p>
					<p className="mt-0.5 text-xs text-muted-foreground">
						{testimonial.relationship[locale]} ·{" "}
						{formatGivenAt(testimonial.givenAt, locale)}
					</p>
				</div>
				<a
					href={testimonial.linkedinUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="grid h-11 w-11 shrink-0 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
					style={{ borderColor: "hsl(var(--foreground) / 0.15)" }}
					aria-label={`${copy.viewOnLinkedIn}: ${testimonial.name}`}
					title={copy.viewOnLinkedIn}
					onPointerDownCapture={(event) => event.stopPropagation()}
				>
					<Linkedin className="h-4 w-4" />
				</a>
			</figcaption>
		</figure>
	);
};

/** Recommendations as a deck of cards: throw the top card (or use the list/arrows) to see the next one. */
const Testimonials = () => {
	const { t, locale } = useLanguage();
	const copy = t.home.testimonials;
	const prefersReducedMotion = useReducedMotion();
	const [activePosition, setActivePosition] = useState(0);
	const testimonialCount = testimonials.length;

	const showRelative = (step: number) =>
		setActivePosition(
			(currentPosition) =>
				(currentPosition + step + testimonialCount) % testimonialCount,
		);

	const handleDragEnd = (_: unknown, info: PanInfo) => {
		const wasThrownLeft =
			info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY;
		const wasThrownRight =
			info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY;
		if (wasThrownLeft) showRelative(1);
		else if (wasThrownRight) showRelative(-1);
	};

	const handleDeckKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowRight") showRelative(1);
		if (event.key === "ArrowLeft") showRelative(-1);
	};

	return (
		<section id="testimonials" className="relative py-24 sm:py-32">
			<div className="container">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
					{/* Heading + people list */}
					<div className="flex flex-col">
						<Reveal>
							<span className="eyebrow">{copy.eyebrow}</span>
						</Reveal>
						<h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] sm:text-6xl">
							<SplitWords text={copy.title} className="block" />
							<SplitWords
								text={copy.titleAccent}
								delay={0.15}
								className="accent-serif text-aura block"
							/>
						</h2>
						<Reveal delay={0.2}>
							<p className="mt-6 max-w-md text-muted-foreground sm:text-lg">
								{copy.intro}
							</p>
						</Reveal>

						<ul
							className="mt-10 flex flex-col gap-1"
							aria-label={copy.carouselLabel}
						>
							{testimonials.map((testimonial, position) => {
								const isActive = position === activePosition;
								return (
									<li key={testimonial.id}>
										<button
											type="button"
											onClick={() => setActivePosition(position)}
											aria-current={isActive ? "true" : undefined}
											className={`relative flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
										>
											{isActive && (
												<motion.span
													layoutId="testimonial-active"
													className="absolute inset-0 rounded-2xl"
													style={{
														background: "hsl(var(--foreground) / 0.05)",
													}}
													transition={{
														type: "spring",
														stiffness: 400,
														damping: 34,
													}}
												/>
											)}
											<span
												className={`relative h-8 w-1 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-foreground/10"}`}
												aria-hidden="true"
											/>
											<Avatar
												testimonial={testimonial}
												size="sm"
												className={isActive ? "" : "grayscale opacity-70"}
											/>
											<span className="relative min-w-0">
												<span className="block font-heading font-semibold">
													{testimonial.name}
												</span>
												<span className="block truncate text-xs">
													{testimonial.relationship[locale]}
												</span>
											</span>
										</button>
									</li>
								);
							})}
						</ul>
					</div>

					{/* Card deck */}
					<Reveal delay={0.1} className="min-w-0">
						<div
							role="region"
							aria-roledescription="carousel"
							aria-label={copy.carouselLabel}
							tabIndex={0}
							onKeyDown={handleDeckKeyDown}
							className="relative grid grid-cols-1 rounded-[1.75rem] pb-10 outline-none focus-visible:ring-2 focus-visible:ring-primary"
						>
							<AnimatePresence initial={false}>
								{testimonials.map((testimonial, position) => {
									const depth =
										(position - activePosition + testimonialCount) %
										testimonialCount;
									const isTopCard = depth === 0;
									const isHidden = depth > VISIBLE_DEPTH;
									const tilt = depth === 0 ? 0 : depth % 2 === 1 ? -3 : 3;
									return (
										<motion.div
											key={testimonial.id}
											className={`col-start-1 row-start-1 min-w-0 ${isTopCard ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
											style={{
												zIndex: testimonialCount - depth,
												touchAction: "pan-y",
											}}
											aria-hidden={!isTopCard}
											aria-roledescription="slide"
											animate={
												prefersReducedMotion
													? { opacity: isTopCard ? 1 : 0 }
													: {
															y: depth * 18,
															scale: 1 - depth * 0.05,
															rotate: tilt,
															opacity: isHidden ? 0 : 1 - depth * 0.25,
														}
											}
											transition={{
												type: "spring",
												stiffness: 260,
												damping: 28,
											}}
											drag={isTopCard && !prefersReducedMotion ? "x" : false}
											dragSnapToOrigin
											dragElastic={0.6}
											whileDrag={{ rotate: 0, scale: 1.02 }}
											onDragEnd={handleDragEnd}
										>
											<QuoteCard testimonial={testimonial} locale={locale} />
										</motion.div>
									);
								})}
							</AnimatePresence>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<span
									className="font-mono text-xs text-muted-foreground"
									aria-live="polite"
								>
									{formatCounter(activePosition + 1)} /{" "}
									{formatCounter(testimonialCount)}
								</span>
								<div className="flex gap-1.5" aria-hidden="true">
									{testimonials.map((testimonial, position) => (
										<span
											key={testimonial.id}
											className={`h-1 rounded-full transition-all duration-500 ${position === activePosition ? "w-8 bg-primary" : "w-3 bg-foreground/15"}`}
										/>
									))}
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="mr-2 hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
									{copy.dragHint}
								</span>
								<button
									type="button"
									onClick={() => showRelative(-1)}
									className="btn-ghost h-11 px-4"
									aria-label={copy.previous}
								>
									<ArrowLeft className="h-4 w-4" />
								</button>
								<button
									type="button"
									onClick={() => showRelative(1)}
									className="btn-ghost h-11 px-4"
									aria-label={copy.next}
								>
									<ArrowRight className="h-4 w-4" />
								</button>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
