export type Locale = "en" | "pt-BR";

export const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      timeline: "Timeline",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    // Command Palette
    command: {
      searchPlaceholder: "Search pages & projects...",
      noResults: "No results found.",
      pages: "Pages",
      projects: "Projects",
    },
    // Footer
    footer: {
      rights: "All rights reserved.",
    },
  },

  "pt-BR": {
    // Navbar
    nav: {
      home: "Início",
      timeline: "Linha do Tempo",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    // Command Palette
    command: {
      searchPlaceholder: "Buscar páginas e projetos...",
      noResults: "Nenhum resultado encontrado.",
      pages: "Páginas",
      projects: "Projetos",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translations = typeof translations["en"] extends infer T ? { [K in keyof T]: any } & T : never;

