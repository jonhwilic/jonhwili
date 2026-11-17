import { social } from "@/data/social";
import {
	getLocaleFromPath,
	localizePath,
	PAGE_PATHS,
	type PagePath,
	stripLocale,
} from "@/i18n/routing";
import type { Locale } from "@/i18n/translations";

/** Canonical origin: the site is served from www. */
export const SITE_URL = "https://www.jonhwili.dev";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const PROFILE_PHOTO = `${SITE_URL}/jonh-wili.jpg`;
/** Update a page's date only when its content really changes (Google ignores lastmod that changes on every deploy). */
const CONTENT_UPDATED_AT: Record<PagePath, string> = {
	"/": "2026-11-17",
	"/projects": "2026-11-17",
	"/about": "2026-11-17",
	"/contact": "2026-11-17",
};

type PageMeta = { title: string; description: string };

const PAGE_META: Record<Locale, Record<PagePath, PageMeta>> = {
	en: {
		"/": {
			title: "Jonh Wili — Full-Stack Developer · Front-End & MarTech",
			description:
				"Full-stack developer with 7+ years of front-end and MarTech expertise. Fast, measurable websites and web systems for teams hiring and businesses that need a site.",
		},
		"/projects": {
			title: "Projects — Websites & Web Systems · Jonh Wili",
			description:
				"Selected work by Jonh Wili: TotalPass's corporate website, gym map and blog, plus websites for Ballet da Cidade, Kardiah and Portela Filmes.",
		},
		"/about": {
			title: "About Jonh Wili — Full-Stack Developer in Espírito Santo, Brazil",
			description:
				"7+ years building web applications: front-end at TotalPass since 2022, a real estate ERP at 4U Homes and ERP work at Sankhya. Information Systems degree and web apps postgrad.",
		},
		"/contact": {
			title: "Contact — Start a Project or Hire Jonh Wili",
			description:
				"Have a website or web system in mind, or a role to fill? Talk to Jonh Wili, full-stack developer, by WhatsApp or email.",
		},
	},
	"pt-BR": {
		"/": {
			title: "Jonh Wili — Dev Full-Stack · Front-End & MarTech",
			description:
				"Dev full-stack com 7+ anos de front-end e MarTech. Sites e sistemas web rápidos e mensuráveis para empresas que contratam e negócios que precisam de um site.",
		},
		"/projects": {
			title: "Projetos — Sites e Sistemas Web · Jonh Wili",
			description:
				"Trabalhos de Jonh Wili: site institucional, mapa de academias e blog da TotalPass, além de sites para Ballet da Cidade, Kardiah e Portela Filmes.",
		},
		"/about": {
			title: "Sobre Jonh Wili — Dev Full-Stack no Espírito Santo",
			description:
				"7+ anos construindo aplicações web: front-end na TotalPass desde 2022, ERP imobiliário na 4U Homes e ERP na Sankhya. Sistemas de Informação e pós em aplicações web.",
		},
		"/contact": {
			title: "Contato — Comece um Projeto ou Contrate Jonh Wili",
			description:
				"Tem um site ou sistema web em mente, ou uma vaga? Fale com Jonh Wili, dev full-stack, pelo WhatsApp ou e-mail.",
		},
	},
};

const NOT_FOUND_META: Record<Locale, PageMeta> = {
	en: {
		title: "Page not found · Jonh Wili",
		description: "This page does not exist.",
	},
	"pt-BR": {
		title: "Página não encontrada · Jonh Wili",
		description: "Esta página não existe.",
	},
};

const OG_LOCALE: Record<Locale, string> = { en: "en_US", "pt-BR": "pt_BR" };
const HTML_LANG: Record<Locale, string> = { en: "en", "pt-BR": "pt-BR" };

const isPagePath = (path: string): path is PagePath =>
	(PAGE_PATHS as readonly string[]).includes(path);

const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** Every URL that gets its own static HTML file at build time (both languages). */
export const PRERENDER_ROUTES = PAGE_PATHS.flatMap((pagePath) => [
	pagePath,
	localizePath(pagePath, "pt-BR"),
]);

export const getHtmlLang = (pathname: string) =>
	HTML_LANG[getLocaleFromPath(pathname)];

type HeadData = {
	locale: Locale;
	title: string;
	description: string;
	canonical: string | null;
	alternates: { hrefLang: string; href: string }[];
	indexable: boolean;
	structuredData: object[];
};

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

const buildPerson = (locale: Locale) => ({
	"@type": "Person",
	"@id": personId,
	name: "Jonh Wili",
	url: `${SITE_URL}/`,
	image: PROFILE_PHOTO,
	jobTitle: locale === "pt-BR" ? "Dev Full-Stack" : "Full-Stack Developer",
	description:
		locale === "pt-BR"
			? "Dev full-stack com 7+ anos de front-end e especialização em MarTech, baseado no Espírito Santo, Brasil."
			: "Full-stack developer with 7+ years of front-end experience and a MarTech specialization, based in Espírito Santo, Brazil.",
	address: {
		"@type": "PostalAddress",
		addressRegion: "Espírito Santo",
		addressCountry: "BR",
	},
	worksFor: {
		"@type": "Organization",
		name: "TotalPass",
		url: "https://totalpass.com/br/",
	},
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"Vue.js",
		"NestJS",
		"MarTech",
		"Web analytics",
		"Core Web Vitals",
		"SEO",
	],
	knowsLanguage: ["pt-BR", "en"],
	sameAs: [social.linkedin, social.github],
});

const pageTypeByPath: Record<PagePath, string> = {
	"/": "WebPage",
	"/projects": "CollectionPage",
	"/about": "ProfilePage",
	"/contact": "ContactPage",
};

const buildStructuredData = (
	pagePath: PagePath,
	locale: Locale,
	url: string,
	meta: PageMeta,
) => {
	const webPage = {
		"@type": pageTypeByPath[pagePath],
		"@id": `${url}#webpage`,
		url,
		name: meta.title,
		description: meta.description,
		inLanguage: HTML_LANG[locale],
		isPartOf: { "@id": websiteId },
		about: { "@id": personId },
		...(pagePath === "/about" ? { mainEntity: { "@id": personId } } : {}),
	};
	const graph: object[] = [buildPerson(locale), webPage];
	if (pagePath === "/") {
		graph.push({
			"@type": "WebSite",
			"@id": websiteId,
			url: `${SITE_URL}/`,
			name: "Jonh Wili",
			inLanguage: ["en", "pt-BR"],
			publisher: { "@id": personId },
		});
	}
	return [{ "@context": "https://schema.org", "@graph": graph }];
};

export const getHeadData = (pathname: string): HeadData => {
	const locale = getLocaleFromPath(pathname);
	const pagePath = stripLocale(pathname);
	if (!isPagePath(pagePath)) {
		const meta = NOT_FOUND_META[locale];
		return {
			locale,
			...meta,
			canonical: null,
			alternates: [],
			indexable: false,
			structuredData: [],
		};
	}
	const meta = PAGE_META[locale][pagePath];
	const englishUrl = absoluteUrl(localizePath(pagePath, "en"));
	const portugueseUrl = absoluteUrl(localizePath(pagePath, "pt-BR"));
	const canonical = locale === "pt-BR" ? portugueseUrl : englishUrl;
	return {
		locale,
		...meta,
		canonical,
		alternates: [
			{ hrefLang: "en", href: englishUrl },
			{ hrefLang: "pt-BR", href: portugueseUrl },
			{ hrefLang: "x-default", href: englishUrl },
		],
		indexable: true,
		structuredData: buildStructuredData(pagePath, locale, canonical, meta),
	};
};

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

/** The <head> tags that change per page; written into each pre-rendered HTML file. */
export const buildHeadHtml = (pathname: string) => {
	const head = getHeadData(pathname);
	const title = escapeHtml(head.title);
	const description = escapeHtml(head.description);
	const tags = [
		`<title>${title}</title>`,
		`<meta name="description" content="${description}" />`,
		head.indexable ? "" : `<meta name="robots" content="noindex" />`,
		head.canonical ? `<link rel="canonical" href="${head.canonical}" />` : "",
		...head.alternates.map(
			(alternate) =>
				`<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`,
		),
		`<meta property="og:type" content="website" />`,
		`<meta property="og:site_name" content="Jonh Wili" />`,
		`<meta property="og:locale" content="${OG_LOCALE[head.locale]}" />`,
		`<meta property="og:title" content="${title}" />`,
		`<meta property="og:description" content="${description}" />`,
		head.canonical
			? `<meta property="og:url" content="${head.canonical}" />`
			: "",
		`<meta property="og:image" content="${OG_IMAGE}" />`,
		`<meta property="og:image:width" content="1200" />`,
		`<meta property="og:image:height" content="630" />`,
		`<meta property="og:image:alt" content="Jonh Wili — Full-Stack Developer" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${title}" />`,
		`<meta name="twitter:description" content="${description}" />`,
		`<meta name="twitter:image" content="${OG_IMAGE}" />`,
		...head.structuredData.map(
			(data) =>
				`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
		),
	];
	return tags.filter(Boolean).join("\n    ");
};

export const buildSitemapXml = () => {
	const urls = PAGE_PATHS.flatMap((pagePath) =>
		(["en", "pt-BR"] as const).map((locale) => {
			const alternates = getHeadData(localizePath(pagePath, locale))
				.alternates.map(
					(alternate) =>
						`    <xhtml:link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.href}" />`,
				)
				.join("\n");
			return `  <url>\n    <loc>${absoluteUrl(localizePath(pagePath, locale))}</loc>\n    <lastmod>${CONTENT_UPDATED_AT[pagePath]}</lastmod>\n${alternates}\n  </url>`;
		}),
	);
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
};

const upsertHeadElement = (selector: string, create: () => HTMLElement) => {
	const existing = document.head.querySelector<HTMLElement>(selector);
	if (existing) return existing;
	const element = create();
	document.head.appendChild(element);
	return element;
};

const setMetaContent = (
	attribute: "name" | "property",
	key: string,
	content: string,
) => {
	const meta = upsertHeadElement(`meta[${attribute}="${key}"]`, () => {
		const element = document.createElement("meta");
		element.setAttribute(attribute, key);
		return element;
	});
	meta.setAttribute("content", content);
};

/** Keeps <head> in sync during client-side navigation (the pre-rendered HTML already has it right). */
export const applyHeadToDocument = (pathname: string) => {
	const head = getHeadData(pathname);
	document.documentElement.lang = HTML_LANG[head.locale];
	document.title = head.title;
	setMetaContent("name", "description", head.description);
	setMetaContent("property", "og:title", head.title);
	setMetaContent("property", "og:description", head.description);
	setMetaContent("property", "og:locale", OG_LOCALE[head.locale]);
	if (head.canonical) {
		setMetaContent("property", "og:url", head.canonical);
		const canonicalLink = upsertHeadElement('link[rel="canonical"]', () => {
			const element = document.createElement("link");
			element.rel = "canonical";
			return element;
		});
		canonicalLink.setAttribute("href", head.canonical);
	}
	for (const alternate of head.alternates) {
		const alternateLink = upsertHeadElement(
			`link[rel="alternate"][hreflang="${alternate.hrefLang}"]`,
			() => {
				const element = document.createElement("link");
				element.rel = "alternate";
				element.hreflang = alternate.hrefLang;
				return element;
			},
		);
		alternateLink.setAttribute("href", alternate.href);
	}
};
