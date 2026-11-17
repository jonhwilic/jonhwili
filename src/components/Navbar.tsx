import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from "framer-motion";
import { ArrowUpRight, Command } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { localizePath, stripLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Floating, minimal header.
 * - Detached pill centred at the top, glass surface.
 * - Compacts after the first scroll, hides while scrolling down, returns on scroll up.
 * - Hover highlight slides between links (shared layout), in the spirit of KokonutUI nav pieces.
 */
const Navbar = () => {
	const location = useLocation();
	const { locale, t, localizedPath } = useLanguage();
	const otherLocale = locale === "en" ? "pt-BR" : "en";
	// a real link (not a button) so crawlers discover the other language version
	const alternateLanguagePath = localizePath(
		`${stripLocale(location.pathname)}${location.search}`,
		otherLocale,
	);
	const prefersReducedMotion = useReducedMotion();
	const { scrollY } = useScroll();

	const [isScrolled, setIsScrolled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hoveredPath, setHoveredPath] = useState<string | null>(null);

	useMotionValueEvent(scrollY, "change", (scrollPosition) => {
		const previousScrollPosition = scrollY.getPrevious() ?? 0;
		setIsScrolled(scrollPosition > 24);
		setIsHidden(
			!isMenuOpen &&
				scrollPosition > 480 &&
				scrollPosition > previousScrollPosition + 4,
		);
		if (scrollPosition < previousScrollPosition - 4) setIsHidden(false);
	});

	const closeMenu = () => setIsMenuOpen(false);

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsMenuOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isMenuOpen]);

	const navItems = [
		{ label: t.nav.projects, path: "/projects" },
		{ label: t.nav.about, path: "/about" },
		{ label: t.nav.contact, path: "/contact" },
	];
	const currentPagePath = stripLocale(location.pathname);
	const isActive = (path: string) =>
		currentPagePath === path || currentPagePath.startsWith(`${path}/`);

	const openPalette = () =>
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "k", metaKey: true }),
		);

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
			>
				{t.nav.skip}
			</a>

			<motion.header
				className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
				initial={prefersReducedMotion ? false : { y: -80, opacity: 0 }}
				animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
				transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className="relative w-full max-w-[44rem]">
					<nav
						aria-label="Main"
						className={cn(
							"flex items-center justify-between gap-2 rounded-full border pl-2 pr-2 transition-all duration-500",
							isScrolled || isMenuOpen
								? "h-12 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]"
								: "h-14",
						)}
						style={{
							borderColor: "hsl(var(--foreground) / 0.1)",
							background:
								isScrolled || isMenuOpen
									? "hsl(var(--background) / 0.72)"
									: "hsl(var(--background) / 0.35)",
							backdropFilter: "blur(18px) saturate(140%)",
							WebkitBackdropFilter: "blur(18px) saturate(140%)",
						}}
					>
						{/* Wordmark */}
						<Link
							to={localizedPath("/")}
							className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-3"
							aria-label="Jonh Wili — home"
						>
							<img
								src="/favicon.svg"
								alt=""
								width={32}
								height={32}
								className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-8deg]"
							/>
							<span className="hidden font-heading text-sm font-semibold tracking-tight sm:inline">
								jonhwili<span className="text-muted-foreground">.dev</span>
							</span>
						</Link>

						{/* Desktop links */}
						<ul
							className="hidden items-center md:flex"
							onMouseLeave={() => setHoveredPath(null)}
						>
							{navItems.map((navItem) => (
								<li key={navItem.path} className="relative">
									<Link
										to={localizedPath(navItem.path)}
										onMouseEnter={() => setHoveredPath(navItem.path)}
										onFocus={() => setHoveredPath(navItem.path)}
										onBlur={() => setHoveredPath(null)}
										aria-current={isActive(navItem.path) ? "page" : undefined}
										className={cn(
											"relative z-10 block rounded-full px-4 py-1.5 text-sm transition-colors",
											isActive(navItem.path)
												? "text-foreground"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{navItem.label}
										{isActive(navItem.path) && (
											<span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
										)}
									</Link>
									{hoveredPath === navItem.path && (
										<motion.span
											layoutId="nav-hover"
											className="absolute inset-0 rounded-full"
											style={{ background: "hsl(var(--foreground) / 0.07)" }}
											transition={{
												type: "spring",
												stiffness: 450,
												damping: 35,
											}}
										/>
									)}
								</li>
							))}
						</ul>

						{/* Right cluster */}
						<div className="flex items-center gap-1.5">
							<Link
								to={alternateLanguagePath}
								hrefLang={otherLocale}
								className="hidden h-8 items-center rounded-full px-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
								aria-label={
									locale === "en" ? "Mudar para português" : "Switch to English"
								}
							>
								<span className={locale === "en" ? "text-foreground" : ""}>
									en
								</span>
								<span className="mx-1 opacity-40">/</span>
								<span className={locale === "pt-BR" ? "text-foreground" : ""}>
									pt
								</span>
							</Link>

							<button
								type="button"
								onClick={openPalette}
								className="hidden h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground lg:grid"
								aria-label="Open command palette (⌘K)"
								title="⌘K"
							>
								<Command className="h-3.5 w-3.5" />
							</button>

							<Link
								to={localizedPath("/contact")}
								className="group hidden h-9 items-center gap-1.5 rounded-full bg-primary pl-4 pr-3 font-heading text-[13px] font-semibold text-primary-foreground transition-shadow hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.7)] md:inline-flex"
							>
								{t.nav.cta}
								<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
							</Link>

							{/* Mobile toggle */}
							<button
								type="button"
								onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
								className="inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[13px] font-medium md:hidden"
								style={{ borderColor: "hsl(var(--foreground) / 0.14)" }}
								aria-expanded={isMenuOpen}
								aria-controls="mobile-menu"
							>
								<span className="relative block h-2.5 w-3.5" aria-hidden="true">
									<span
										className={cn(
											"absolute left-0 h-px w-full bg-current transition-all duration-300",
											isMenuOpen ? "top-1/2 rotate-45" : "top-0",
										)}
									/>
									<span
										className={cn(
											"absolute left-0 h-px w-full bg-current transition-all duration-300",
											isMenuOpen ? "top-1/2 -rotate-45" : "bottom-0",
										)}
									/>
								</span>
								{isMenuOpen ? t.nav.close : t.nav.menu}
							</button>
						</div>
					</nav>

					{/* Mobile sheet */}
					<AnimatePresence>
						{isMenuOpen && (
							<motion.div
								id="mobile-menu"
								initial={{ opacity: 0, y: -8, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 0.98 }}
								transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
								className="absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border p-3 md:hidden"
								style={{
									borderColor: "hsl(var(--foreground) / 0.1)",
									background: "hsl(var(--background) / 0.92)",
									backdropFilter: "blur(20px)",
									WebkitBackdropFilter: "blur(20px)",
								}}
							>
								<ul className="flex flex-col">
									{[{ label: t.nav.home, path: "/" }, ...navItems].map(
										(mobileItem, position) => (
											<motion.li
												key={mobileItem.path}
												initial={{ opacity: 0, x: -8 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.04 * position }}
											>
												<Link
													to={localizedPath(mobileItem.path)}
													onClick={closeMenu}
													className="flex items-center justify-between rounded-2xl px-4 py-3 font-heading text-2xl font-semibold tracking-tight hover:bg-foreground/5"
												>
													{mobileItem.label}
													<span className="font-mono text-xs text-muted-foreground">
														0{position + 1}
													</span>
												</Link>
											</motion.li>
										),
									)}
								</ul>
								<div
									className="mt-2 flex items-center gap-2 border-t pt-3"
									style={{ borderColor: "hsl(var(--foreground) / 0.08)" }}
								>
									<Link
										to={localizedPath("/contact")}
										onClick={closeMenu}
										className="btn-signal flex-1 justify-center"
									>
										{t.nav.cta} <ArrowUpRight className="h-4 w-4" />
									</Link>
									<Link
										to={alternateLanguagePath}
										hrefLang={otherLocale}
										onClick={closeMenu}
										className="btn-ghost px-4 font-mono text-xs uppercase"
									>
										{locale === "en" ? "pt" : "en"}
									</Link>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.header>
		</>
	);
};

export default Navbar;
