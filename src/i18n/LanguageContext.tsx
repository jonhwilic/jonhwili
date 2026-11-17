import { createContext, type ReactNode, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocaleFromPath, localizePath, stripLocale } from "./routing";
import { type Locale, translations } from "./translations";

type TranslationsType =
	| (typeof translations)["en"]
	| (typeof translations)["pt-BR"];

interface LanguageContextType {
	locale: Locale;
	t: TranslationsType;
	toggleLocale: () => void;
	/** Turns "/projects" into the URL of that page in the current language. */
	localizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

/** The language comes from the URL (/pt/... = Portuguese), so every language is crawlable and server-renderable. */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const { pathname, search, hash } = useLocation();
	const navigate = useNavigate();
	const locale = getLocaleFromPath(pathname);

	const toggleLocale = useCallback(() => {
		const nextLocale: Locale = locale === "en" ? "pt-BR" : "en";
		navigate(
			localizePath(`${stripLocale(pathname)}${search}${hash}`, nextLocale),
		);
	}, [locale, navigate, pathname, search, hash]);

	const localizedPath = useCallback(
		(path: string) => localizePath(path, locale),
		[locale],
	);

	return (
		<LanguageContext.Provider
			value={{ locale, t: translations[locale], toggleLocale, localizedPath }}
		>
			{children}
		</LanguageContext.Provider>
	);
};

const fallback: LanguageContextType = {
	locale: "en",
	t: translations.en,
	toggleLocale: () => {},
	localizedPath: (path) => path,
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	return context ?? fallback;
};
