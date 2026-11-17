import type { Locale } from "./translations";

/** English lives at the root, Portuguese under /pt — each language has its own indexable URL. */
export const LOCALE_PREFIX: Record<Locale, string> = { en: "", "pt-BR": "/pt" };

export const PAGE_PATHS = ["/", "/projects", "/about", "/contact"] as const;
export type PagePath = (typeof PAGE_PATHS)[number];

export const getLocaleFromPath = (pathname: string): Locale =>
	pathname === "/pt" || pathname.startsWith("/pt/") ? "pt-BR" : "en";

/** "/pt/projects" → "/projects", "/pt" → "/", "/about" → "/about". */
export const stripLocale = (pathname: string): string => {
	if (getLocaleFromPath(pathname) !== "pt-BR") return pathname || "/";
	const withoutPrefix = pathname.slice(LOCALE_PREFIX["pt-BR"].length);
	return withoutPrefix === "" ? "/" : withoutPrefix;
};

/** Adds the locale prefix to an internal path, keeping any query string or hash. */
export const localizePath = (path: string, locale: Locale): string => {
	const prefix = LOCALE_PREFIX[locale];
	if (!prefix) return path;
	const [pathname, ...rest] = path.split(/(?=[?#])/);
	const localizedPathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
	return `${localizedPathname}${rest.join("")}`;
};
