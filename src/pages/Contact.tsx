import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { social } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackLead } from "@/lib/analytics";

const Contact = () => {
	const prefersReducedMotion = useReducedMotion();
	const [submitted, setSubmitted] = useState(false);
	const [honeypot, setHoneypot] = useState("");
	const { t } = useLanguage();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (honeypot) return;

		const form = event.currentTarget;
		const name = (
			form.elements.namedItem("name") as HTMLInputElement
		).value.trim();
		const email = (
			form.elements.namedItem("email") as HTMLInputElement
		).value.trim();
		const message = (
			form.elements.namedItem("message") as HTMLTextAreaElement
		).value.trim();

		const text = encodeURIComponent(
			`*Olá, eu vim do seu site!*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Mensagem:* ${message}`,
		);
		trackLead("form", "contact_page");
		window.open(`https://wa.me/${social.whatsapp}?text=${text}`, "_blank");
		setSubmitted(true);
	};

	const fadeUp = (delay: number) =>
		prefersReducedMotion
			? {}
			: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.5, delay, ease: "easeOut" as const },
				};

	return (
		<section className="pb-24 pt-36">
			<div className="container max-w-xl">
				<motion.div {...fadeUp(0)}>
					<span className="tag-chip text-xs mb-4 inline-flex">
						{t.contact.chip}
					</span>
					<h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-4">
						{t.contact.title}{" "}
						<span className="neon-text">{t.contact.titleAccent}</span>
					</h1>
					<p className="text-muted-foreground mb-10">{t.contact.subtitle}</p>
				</motion.div>

				{submitted ? (
					<motion.div
						className="glass-card p-8 text-center"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						<div
							className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
							style={{ background: "hsl(var(--primary) / 0.15)" }}
						>
							<Send className="w-5 h-5 text-primary" />
						</div>
						<h3 className="font-heading font-semibold text-lg mb-2">
							{t.contact.sent}
						</h3>
						<p className="text-sm text-muted-foreground">
							{t.contact.sentDesc}
						</p>
					</motion.div>
				) : (
					<motion.form
						onSubmit={handleSubmit}
						className="glass-card p-6 sm:p-8 space-y-5"
						{...fadeUp(0.15)}
					>
						<input
							type="text"
							name="website"
							value={honeypot}
							onChange={(event) => setHoneypot(event.target.value)}
							className="hidden"
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
						/>

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-heading font-medium mb-2"
							>
								{t.contact.name}
							</label>
							<input
								id="name"
								type="text"
								required
								className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
								placeholder={t.contact.namePlaceholder}
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-heading font-medium mb-2"
							>
								{t.contact.email}
							</label>
							<input
								id="email"
								type="email"
								required
								className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
								placeholder={t.contact.emailPlaceholder}
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-heading font-medium mb-2"
							>
								{t.contact.message}
							</label>
							<textarea
								id="message"
								required
								rows={5}
								className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
								placeholder={t.contact.messagePlaceholder}
							/>
						</div>

						<button
							type="submit"
							className="magnetic-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
						>
							{t.contact.send} <Send className="w-4 h-4" />
						</button>
					</motion.form>
				)}

				<motion.div
					{...fadeUp(0.3)}
					className="flex items-center justify-center gap-6 mt-10"
				>
					<a
						href={`mailto:${social.email}`}
						onClick={() => trackLead("email", "contact_page")}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
					>
						<Mail className="w-4 h-4" /> {social.email}
					</a>
				</motion.div>
				<motion.div
					{...fadeUp(0.35)}
					className="flex items-center justify-center gap-4 mt-4"
				>
					<a
						href={social.github}
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 text-muted-foreground hover:text-primary transition-colors"
						aria-label="GitHub"
					>
						<Github className="w-5 h-5" />
					</a>
					<a
						href={social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 text-muted-foreground hover:text-primary transition-colors"
						aria-label="LinkedIn"
					>
						<Linkedin className="w-5 h-5" />
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
