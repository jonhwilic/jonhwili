/**
 * Measurement layer.
 * - Vercel Web Analytics + Speed Insights load from index.html (cookieless, no consent needed).
 * - GA4 is optional: set VITE_GA4_ID in Vercel's environment variables to enable it. It only
 *   loads after the visitor accepts the consent banner (LGPD), with ads storage always denied.
 * - track() sends the same event to GA4 (when loaded), the GTM dataLayer and Vercel.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		va?: (...args: unknown[]) => void;
	}
}

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const CONSENT_STORAGE_KEY = "analytics-consent";

export type ConsentChoice = "granted" | "denied";

export const isGa4Configured = Boolean(GA4_MEASUREMENT_ID);

export const readConsent = (): ConsentChoice | null => {
	try {
		const storedChoice = localStorage.getItem(CONSENT_STORAGE_KEY);
		return storedChoice === "granted" || storedChoice === "denied"
			? storedChoice
			: null;
	} catch {
		return null;
	}
};

let isGa4Loaded = false;

const loadGa4 = () => {
	if (!GA4_MEASUREMENT_ID || isGa4Loaded || typeof document === "undefined")
		return;
	isGa4Loaded = true;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag() {
		// gtag.js expects the original `arguments` object, not an array
		// biome-ignore lint/complexity/noArguments: required by the gtag.js snippet contract
		window.dataLayer?.push(arguments);
	};
	window.gtag("consent", "default", {
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
		analytics_storage: "granted",
	});
	window.gtag("js", new Date());
	window.gtag("config", GA4_MEASUREMENT_ID);
	const gtagScript = document.createElement("script");
	gtagScript.async = true;
	gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
	document.head.appendChild(gtagScript);
};

export const saveConsent = (choice: ConsentChoice) => {
	try {
		localStorage.setItem(CONSENT_STORAGE_KEY, choice);
	} catch {
		// storage unavailable (private mode): the choice lasts for this page view only
	}
	if (choice === "granted") loadGa4();
};

export const initAnalytics = () => {
	if (readConsent() === "granted") loadGa4();
};

/** Measurement plan events: generate_lead, file_download, select_content, cta_click. */
export const track = (eventName: string, params: EventParams = {}) => {
	if (typeof window === "undefined") return;
	window.dataLayer?.push({ event: eventName, ...params });
	window.gtag?.("event", eventName, params);
	window.va?.("event", { name: eventName, data: params });
};

export const trackCvDownload = (location: string) =>
	track("file_download", { file_name: "curriculum_jonh.pdf", location });

export const trackLead = (
	method: "whatsapp" | "email" | "form",
	location: string,
) => track("generate_lead", { method, location });

export const trackCtaClick = (cta: string, location: string) =>
	track("cta_click", { cta, location });
