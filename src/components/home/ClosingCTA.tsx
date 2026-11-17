import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { social } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackLead } from "@/lib/analytics";
import Aurora from "../fx/Aurora";
import FlowingPaths from "../fx/FlowingPaths";
import Magnetic from "../fx/Magnetic";
import { Reveal, SplitWords } from "../fx/Reveal";

const ClosingCTA = () => {
	const { t, locale, localizedPath } = useLanguage();
	const closing = t.home.closing;
	const whatsappMessage = encodeURIComponent(
		locale === "pt-BR"
			? "Olá Jonh, vim do seu site!"
			: "Hi Jonh, I found you through your website!",
	);

	return (
		<section className="relative isolate overflow-hidden py-28 sm:py-40">
			<div className="absolute inset-0 -z-10">
				<Aurora intensity={0.8} />
				<FlowingPaths
					count={20}
					className="opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
				/>
			</div>

			<div className="container text-center">
				<Reveal>
					<span className="eyebrow justify-center">{closing.eyebrow}</span>
				</Reveal>
				<Reveal delay={0.05}>
					<p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl">
						{closing.title}
					</p>
				</Reveal>
				<h2 className="mt-4 font-heading text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
					<SplitWords text={closing.big} className="accent-serif text-aura" />
				</h2>

				<Reveal
					delay={0.2}
					className="mt-12 flex flex-wrap items-center justify-center gap-3"
				>
					<Magnetic>
						<a
							href={`mailto:${social.email}`}
							onClick={() => trackLead("email", "closing")}
							className="btn-signal group"
						>
							<Mail className="h-4 w-4" /> {closing.email}
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href={`https://wa.me/${social.whatsapp}?text=${whatsappMessage}`}
							onClick={() => trackLead("whatsapp", "closing")}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-ghost"
						>
							<MessageCircle className="h-4 w-4" /> {closing.whatsapp}
						</a>
					</Magnetic>
					<Link
						to={localizedPath("/contact")}
						className="group inline-flex items-center gap-1.5 px-3 py-3 text-sm text-muted-foreground hover:text-foreground"
					>
						{closing.form}{" "}
						<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
					</Link>
				</Reveal>
				<Reveal delay={0.3}>
					<p className="mt-6 font-mono text-xs text-muted-foreground">
						{social.email}
					</p>
				</Reveal>
			</div>
		</section>
	);
};

export default ClosingCTA;
