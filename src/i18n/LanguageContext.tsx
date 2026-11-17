import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { type Locale, translations } from "./translations";

type TranslationsType =
	| (typeof translations)["en"]
	| (typeof translations)["pt-BR"];

interface LanguageContextType {
	locale: Locale;
	t: TranslationsType;
	toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [locale, setLocale] = useState<Locale>(() => {
		const saved = localStorage.getItem("locale");
		return (saved === "pt-BR" ? "pt-BR" : "en") as Locale;
	});

	const toggleLocale = useCallback(() => {
		setLocale((currentLocale) => {
			const nextLocale = currentLocale === "en" ? "pt-BR" : "en";
			localStorage.setItem("locale", nextLocale);
			return nextLocale;
		});
	}, []);

	const t = translations[locale];

	return (
		<LanguageContext.Provider value={{ locale, t, toggleLocale }}>
			{children}
		</LanguageContext.Provider>
	);
};

const fallback: LanguageContextType = {
	locale: "en",
	t: translations["en"],
	toggleLocale: () => {},
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	return context ?? fallback;
};
