import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, type Locale } from "./translations";

type TranslationsType = (typeof translations)["en"] | (typeof translations)["pt-BR"];

interface LanguageContextType {
  locale: Locale;
  t: TranslationsType;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale");
    return (saved === "pt-BR" ? "pt-BR" : "en") as Locale;
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "pt-BR" : "en";
      localStorage.setItem("locale", next);
      return next;
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
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
};
