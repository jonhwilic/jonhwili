import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { social } from "@/data/social";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackLead } from "@/lib/analytics";

const Footer = () => {
	const { t, localizedPath } = useLanguage();
	const navLinks = [
		{ label: t.nav.home, path: "/" },
		{ label: t.nav.projects, path: "/projects" },
		{ label: t.nav.about, path: "/about" },
		{ label: t.nav.contact, path: "/contact" },
	];
	const socialLinks = [
		{ label: "LinkedIn", href: social.linkedin, icon: Linkedin },
		{ label: "GitHub", href: social.github, icon: Github },
		{ label: social.email, href: `mailto:${social.email}`, icon: Mail },
	];

	return (
		<footer
			className="relative overflow-hidden border-t pt-16"
			style={{ borderColor: "hsl(var(--foreground) / 0.08)" }}
		>
			<div className="container">
				<div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
					<div>
						<Link
							to={localizedPath("/")}
							className="inline-flex items-center gap-2"
						>
							<img
								src="/favicon.svg"
								alt=""
								width={36}
								height={36}
								className="h-9 w-9"
							/>
							<span className="font-heading font-semibold">Jonh Wili</span>
						</Link>
						<p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
							{t.footer.tagline}
						</p>
						<p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
							{social.location}
						</p>
					</div>

					<nav aria-label="Footer">
						<h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
							{t.footer.navTitle}
						</h2>
						<ul className="mt-5 flex flex-col gap-2.5">
							{navLinks.map((navLink) => (
								<li key={navLink.path}>
									<Link
										to={localizedPath(navLink.path)}
										className="text-sm text-foreground/80 hover:text-foreground"
									>
										{navLink.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
							{t.footer.socialTitle}
						</h2>
						<ul className="mt-5 flex flex-col gap-2.5">
							{socialLinks.map(({ label, href, icon: Icon }) => (
								<li key={href}>
									<a
										href={href}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel="noopener noreferrer"
										onClick={() => {
											if (href.startsWith("mailto:"))
												trackLead("email", "footer");
										}}
										className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
									>
										<Icon className="h-3.5 w-3.5" /> {label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div
					className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t py-6 text-xs text-muted-foreground"
					style={{ borderColor: "hsl(var(--foreground) / 0.08)" }}
				>
					<p>
						© {new Date().getFullYear()} Jonh Wili. {t.footer.rights}
					</p>
					<button
						type="button"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="inline-flex items-center gap-2 hover:text-foreground"
					>
						{t.footer.backToTop} <ArrowUp className="h-3.5 w-3.5" />
					</button>
				</div>
			</div>

			<div
				aria-hidden="true"
				className="pointer-events-none select-none overflow-hidden"
			>
				<p className="wordmark-outline -mb-[0.22em] text-center font-heading text-[21vw] font-bold leading-none tracking-[-0.05em]">
					jonhwili
				</p>
			</div>
		</footer>
	);
};

export default Footer;
