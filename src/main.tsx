import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");

const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// Pre-rendered pages already contain the markup for this exact URL: hydrate it.
// Anything else (e.g. 404.html served for an unknown /pt/... URL) renders from scratch.
const isPrerenderedForThisUrl =
	rootElement.hasChildNodes() &&
	rootElement.dataset.prerenderedPath === window.location.pathname;

if (isPrerenderedForThisUrl) hydrateRoot(rootElement, app);
else {
	rootElement.replaceChildren();
	createRoot(rootElement).render(app);
}
