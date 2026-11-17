import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/Layout";
import { LanguageProvider } from "@/i18n/LanguageContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

/** Same pages for every language: "" = English (root), "/pt" = Portuguese. */
const localePrefixes = ["", "/pt"];

/** Router-agnostic app: BrowserRouter wraps it in the browser, StaticRouter at build time (pre-rendering). */
const App = () => (
	<LanguageProvider>
		<Layout>
			<Routes>
				{localePrefixes.map((prefix) => (
					<Route key={prefix || "root"} path={prefix || "/"}>
						<Route index element={<Index />} />
						<Route path="projects" element={<Projects />} />
						<Route path="about" element={<About />} />
						<Route path="contact" element={<Contact />} />
					</Route>
				))}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Analytics />
		</Layout>
	</LanguageProvider>
);

export default App;
