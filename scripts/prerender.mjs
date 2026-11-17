/**
 * Build step: turns every route into a static HTML file with its own <head>
 * (title, description, canonical, hreflang, Open Graph, JSON-LD) and the page
 * content already rendered, then writes sitemap.xml and 404.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Production React on the server (dev React also warns about every useLayoutEffect in SSR)
process.env.NODE_ENV ??= "production";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const clientDir = path.join(projectRoot, "dist");
const serverEntry = path.join(projectRoot, "dist-server", "entry-server.js");

const {
	render,
	buildHeadHtml,
	buildSitemapXml,
	getHtmlLang,
	PRERENDER_ROUTES,
} = await import(pathToFileURL(serverEntry).href);

const template = await readFile(path.join(clientDir, "index.html"), "utf8");
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_DIV = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
	throw new Error(
		"index.html is missing the <!--seo:start--> block or the empty #root div",
	);
}

const renderPage = (url) =>
	template
		.replace('<html lang="en">', `<html lang="${getHtmlLang(url)}">`)
		.replace(SEO_BLOCK, buildHeadHtml(url))
		.replace(
			ROOT_DIV,
			`<div id="root" data-prerendered-path="${url}">${render(url)}</div>`,
		);

/** "/" → index.html, "/projects" → projects.html, "/pt/about" → pt/about.html (served without .html via cleanUrls). */
const outputFileFor = (url) =>
	url === "/" ? "index.html" : `${url.slice(1)}.html`;

for (const url of PRERENDER_ROUTES) {
	const outputFile = path.join(clientDir, outputFileFor(url));
	await mkdir(path.dirname(outputFile), { recursive: true });
	await writeFile(outputFile, renderPage(url));
	console.log(`prerendered ${url} → dist/${outputFileFor(url)}`);
}

await writeFile(path.join(clientDir, "404.html"), renderPage("/404"));
await writeFile(path.join(clientDir, "sitemap.xml"), buildSitemapXml());
await rm(path.join(projectRoot, "dist-server"), {
	recursive: true,
	force: true,
});
console.log("wrote 404.html and sitemap.xml");
