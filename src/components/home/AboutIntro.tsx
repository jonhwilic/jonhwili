import {
	motion,
	type MotionValue,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/foto_rosto.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "../fx/Reveal";

/** One word whose opacity follows the scroll — the manifesto "reads itself" as you scroll. */
const Word = ({
	children,
	progress,
	range,
}: {
	children: string;
	progress: MotionValue<number>;
	range: [number, number];
}) => {
	const opacity = useTransform(progress, range, [0.18, 1]);
	return (
		<span className="relative mr-[0.25em] inline-block">
			<motion.span style={{ opacity }}>{children}</motion.span>
		</span>
	);
};

/** "Who's behind this" — puts a face, a voice and a track record right after the hero. */
const AboutIntro = () => {
	const { t } = useLanguage();
	const intro = t.home.intro;
	const prefersReducedMotion = useReducedMotion();
	const manifestoRef = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: manifestoRef,
		offset: ["start 0.85", "end 0.45"],
	});
	// each word lights up over its own slice of the scroll progress
	const manifestoWords = intro.manifesto
		.split(" ")
		.map((word, position, allWords) => ({
			id: `${position}-${word}`,
			word,
			range: [position / allWords.length, (position + 1) / allWords.length] as [
				number,
				number,
			],
		}));

	return (
		<section id="about-me" className="relative py-24 sm:py-32">
			<div className="container">
				<Reveal>
					<span className="eyebrow">{intro.eyebrow}</span>
				</Reveal>

				<div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
					{/* Portrait card */}
					<Reveal className="lg:sticky lg:top-28 lg:self-start">
						<figure
							className="group relative mx-auto max-w-sm overflow-hidden rounded-3xl border lg:mx-0"
							style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}
						>
							<div className="aspect-[4/5] overflow-hidden">
								<img
									src={profilePhoto}
									alt="Jonh Wili"
									loading="lazy"
									className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
							<figcaption className="absolute inset-x-0 bottom-0 p-5">
								<p className="font-heading text-2xl font-semibold tracking-tight">
									Jonh Wili
								</p>
								<p className="mt-1 text-sm text-foreground/80">{intro.role}</p>
								<p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
									<MapPin className="h-3 w-3" /> {intro.location}
								</p>
							</figcaption>
						</figure>
					</Reveal>

					<div className="min-w-0">
						<Reveal>
							<p className="accent-serif text-aura text-4xl sm:text-5xl">
								{intro.hello}
							</p>
						</Reveal>

						<p
							ref={manifestoRef}
							className="mt-6 font-heading text-2xl font-medium leading-[1.3] tracking-tight sm:text-[2.1rem]"
						>
							{prefersReducedMotion
								? intro.manifesto
								: manifestoWords.map((manifestoWord) => (
										<Word
											key={manifestoWord.id}
											progress={scrollYProgress}
											range={manifestoWord.range}
										>
											{manifestoWord.word}
										</Word>
									))}
						</p>

						<dl
							className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2"
							style={{
								borderColor: "hsl(var(--foreground) / 0.08)",
								background: "hsl(var(--foreground) / 0.08)",
							}}
						>
							{intro.facts.map((fact, factPosition) => (
								<Reveal
									key={fact.label}
									delay={factPosition * 0.06}
									className="bg-background p-5 sm:p-6"
								>
									<dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
										{fact.label}
									</dt>
									<dd className="mt-2 font-heading text-lg font-medium leading-snug">
										{fact.value}
									</dd>
									<dd className="mt-1 text-sm text-muted-foreground">
										{fact.detail}
									</dd>
								</Reveal>
							))}
						</dl>

						<Reveal delay={0.1}>
							<Link to="/about" className="btn-ghost group mt-8">
								{intro.more}{" "}
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutIntro;
