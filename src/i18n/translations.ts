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
    // Hero
    hero: {
      available: "Available for projects",
      headline: "Front-End Engineer",
      headlineAccent: "Web Systems Development",
      subheadline: "Next.js + TypeScript + Tailwind — performance, accessibility, and scalable UI systems.",
      viewProjects: "View Projects",
      downloadCV: "Download CV",
      contact: "Contact",
      credibility: [
        "6+ years Front-End",
        "MarTech",
        "TypeScript",
        "REST + GraphQL • React Query • Jest",
      ],
    },
    // What I Do
    whatIDo: {
      chip: "What I Do",
      title: "Building for",
      titleAccent: "impact",
      cards: [
        {
          title: "Performance & Core Web Vitals",
          description: "Fast websites aren't a luxury — they're a competitive advantage. I obsess over load times, SSR/SSG/ISR strategies, code splitting, and image optimization so your users never wait and Google always notices.",
        },
        {
          title: "Design Systems & Architecture",
          description: "Pixel-perfect interfaces that scale. I build component libraries with strict design tokens and composable patterns — so your team ships faster and your UI stays consistent as the product grows.",
        },
        {
          title: "MarTech Readiness",
          description: "Great front-ends don't just look good — they convert. I architect SEO-first, tracking-ready UIs built for experimentation, giving your marketing team the foundation to measure, test, and grow.",
        },
      ],
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
    // Badge
    badge: {
      role: "Front-End Engineer • MarTech",
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
    //
    // Hero
    hero: {
      available: "Disponível para projetos",
      headline: "Engenheiro Front-End",
      headlineAccent: "Desenvolvimento de sistemas web",
      subheadline: "Next.js + TypeScript + Tailwind — performance, acessibilidade e sistemas de UI escaláveis.",
      viewProjects: "Ver Projetos",
      downloadCV: "Baixar CV",
      contact: "Contato",
      credibility: [
        "6+ anos de Front-End",
        "MarTech",
        "TypeScript",
        "REST + GraphQL • React Query • Jest",
      ],
    },
    // What I Do
    whatIDo: {
      chip: "O que Faço",
      title: "Construindo com",
      titleAccent: "impacto",
      cards: [
        {
          title: "Performance & Core Web Vitals",
          description: "Site rápido não é detalhe — é vantagem competitiva. Cuido de cada milissegundo: estratégias SSR/SSG/ISR, carregamento inteligente e imagens otimizadas para que o usuário nunca espere e o Google sempre note.",
        },
        {
          title: "Design Systems & Arquitetura",
          description: "Interfaces que encantam e escalam. Crio bibliotecas de componentes com tokens de design rigorosos e padrões reutilizáveis — para que seu time entregue mais rápido e o produto cresça sem perder a consistência visual.",
        },
        {
          title: "Prontidão MarTech",
          description: "Bom front-end não é só bonito — ele converte. Construo interfaces SEO-first, prontas para rastreamento e experimentação, dando ao time de marketing a base para medir, testar e crescer de verdade.",
        },
      ],
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
    // Badge
    badge: {
      role: "Engenheiro Front-End • MarTech",
    },
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translations = typeof translations["en"] extends infer T ? { [K in keyof T]: any } & T : never;

