import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

/** MemoryRouter (instead of react-router-dom/server) keeps this importable by plain Node ESM.
 * Used only at build time by scripts/prerender.mjs to turn each route into static HTML. */
export const render = (url: string) =>
	renderToString(
		<MemoryRouter initialEntries={[url]}>
			<App />
		</MemoryRouter>,
	);

export {
	buildHeadHtml,
	buildSitemapXml,
	getHtmlLang,
	PRERENDER_ROUTES,
} from "./seo/head";
