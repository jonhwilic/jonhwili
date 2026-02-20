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
    // Timeline page
    timelinePage: {
      chip: "My Journey",
      title: "Professional",
      titleAccent: "Timeline",
      subtitle: "A chronological view of my professional and academic milestones.",
      professional: "Professional",
      academic: "Academic",
      entries: [
        {
          year: "2026",
          title: "Teaching Degree in Mathematics — IFES",
          description: "Expected completion of teaching degree, combining analytical thinking with education skills.",
          type: "academic",
          icon: "graduation",
          tags: ["Mathematics", "Education", "IFES"],
        },
        {
          year: "2024 – 2025",
          title: "Postgraduate — Web Application Development",
          description: "Specialization at FACPRISMA focusing on modern web application development patterns and architecture.",
          type: "academic",
          icon: "award",
          tags: ["Web Development", "Architecture", "FACPRISMA"],
        },
        {
          year: "Jan 2025 – Nov 2025",
          title: "Front-End Engineer — Real Estate ERP · 4U Homes",
          description: "Led front-end development of a full end-to-end real estate construction ERP. The system managed the entire lifecycle — from land acquisition assessment to construction phases, property sales, investor management, and automated financial viability reports.",
          type: "professional",
          icon: "rocket",
          tags: ["Next.js", "NestJS", "TypeScript", "ERP", "Real Estate", "Finance"],
        },
        {
          year: "2022 – Present",
          title: "Frontend Developer — TotalPass Brasil",
          description: "Building and maintaining front-end solutions for a leading corporate wellness platform. Working remotely with a cross-functional team in São Paulo, delivering performant and accessible interfaces.",
          type: "professional",
          icon: "code",
          tags: ["Next.js", "React", "TypeScript", "PHP", "Remote"],
        },
        {
          year: "Jul 2021 – Feb 2022",
          title: "Software Developer — Sankhya Gestão de Negócios",
          description: "Developed and maintained features for Sankhya's ERP platform, one of Brazil's leading business management systems. Worked in a hybrid model in Espírito Santo.",
          type: "professional",
          icon: "briefcase",
          tags: ["SQL", "ERP", "Sankhya"],
        },
        {
          year: "2018 – 2022",
          title: "B.Sc. in Information Systems — UCL",
          description: "Bachelor's degree building a strong foundation in software engineering, databases, and system design.",
          type: "academic",
          icon: "book",
          tags: ["Computer Science", "UCL"],
        },
        {
          year: "May 2018 – Jul 2021",
          title: "IT Technician — FDV (Faculdade de Direito de Vitória)",
          description: "Provided IT support and developed internal systems for a law school in Espírito Santo. On-site role combining technical support with software development using SQL and PHP.",
          type: "professional",
          icon: "briefcase",
          tags: ["SQL", "PHP", "IT Support"],
        },
        {
          year: "Jun 2020 – Dec 2020",
          title: "Software Developer — Super Estágios",
          description: "Full-stack development for an internship platform. Built features using PHP, JavaScript, MySQL, and Bootstrap, and implemented Python-based process automation.",
          type: "professional",
          icon: "code",
          tags: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Python"],
        },
        {
          year: "Mar 2017 – Mar 2018",
          title: "Military Service — Marinha do Brasil",
          description: "Served in the Brazilian Navy, developing discipline, leadership under pressure, and teamwork in a structured operational environment.",
          type: "professional",
          icon: "award",
          tags: ["Military", "Leadership", "Marinha do Brasil"],
        },
      ],
    },
    // About
    about: {
      chip: "About",
      greeting: "Hi, I'm",
      bio: [
         "I'm a Front-End Engineer with 6+ years of experience building web applications that perform, scale, and are accessible to everyone. I specialize in MarTech, building front-ends that marketing teams can measure, optimize, and experiment with.",
         "I work with React and Next.js daily, using TypeScript 100% of the time. I care deeply about Core Web Vitals, semantic HTML, keyboard navigation, and building UI systems that teams can trust over time.",
         "Beyond front-end, I bring versatility: Python automations, ERP experience with TOTVS and Sankhya, Java development, and SQL data manipulation. I believe great front-end engineers understand the full stack.",
       ],
       experience: "Experience",
       timeline: [
         { year: "2018–2022", title: "Front-End Developer", desc: "Built e-commerce, institutional, and ERP web systems using React + TypeScript." },
         { year: "2022–Present", title: "Front-End Engineer — MarTech Specialist", desc: "Delivering MarTech platforms, analytics dashboards, and performance-oriented web applications." },
       ],
       howIWork: "How I Work",
       howIWorkCards: [
         { title: "Collaboration", desc: "Close partnership with designers and UX teams, translating Figma specs into pixel-perfect, accessible components." },
         { title: "Code Quality", desc: "GitHub PRs with thorough reviews, clear commit history, and a strong focus on maintainable code." },
         { title: "Documentation", desc: "Component documentation, ADRs, and knowledge sharing are part of my daily workflow." },
       ],
       education: "Education",
       educationList: [
         { title: "B.Sc. in Information Systems — UCL", detail: "Completed 2022" },
         { title: "Postgraduate — Web Application Development — FACPRISMA", detail: "Jun 2024 – Nov 2024" },
         { title: "Teaching Degree in Mathematics (in progress) — IFES", detail: "Expected Jun 2026" },
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
    // Timeline
    timelinePage: {
      chip: "Minha Jornada",
      title: "Linha do",
      titleAccent: "Tempo",
      subtitle: "Uma visão cronológica dos meus marcos profissionais e acadêmicos.",
      professional: "Profissional",
      academic: "Acadêmico",
      entries: [
        {
          year: "2026",
          title: "Licenciatura em Matemática — IFES",
          description: "Previsão de conclusão da licenciatura, combinando pensamento analítico com habilidades de educação.",
          type: "academic",
          icon: "graduation",
          tags: ["Matemática", "Educação", "IFES"],
        },
        {
          year: "2024 – 2025",
          title: "Pós-Graduação — Desenvolvimento de Aplicações Web",
          description: "Especialização na FACPRISMA com foco em padrões modernos de desenvolvimento e arquitetura de aplicações web.",
          type: "academic",
          icon: "award",
          tags: ["Desenvolvimento Web", "Arquitetura", "FACPRISMA"],
        },
        {
          year: "Jan 2025 – Nov 2025",
          title: "Engenheiro Front-End — ERP Imobiliário · 4U Homes",
          description: "Liderança do front-end de um ERP imobiliário completo de ponta a ponta. O sistema gerenciava todo o ciclo — desde a avaliação de terrenos para compra, passando pelas fases de construção, venda de imóveis, gestão de investidores e geração de relatórios automatizados de viabilidade e retorno financeiro.",
          type: "professional",
          icon: "rocket",
          tags: ["Next.js", "NestJS", "TypeScript", "ERP", "Imobiliário", "Finanças"],
        },
        {
          year: "2022 – Presente",
          title: "Desenvolvedor Frontend — TotalPass Brasil",
          description: "Desenvolvimento e manutenção de soluções front-end para uma das principais plataformas de bem-estar corporativo do Brasil. Trabalho remoto com equipe multifuncional em São Paulo, entregando interfaces performáticas e acessíveis.",
          type: "professional",
          icon: "code",
          tags: ["Next.js", "React", "TypeScript", "PHP", "Remoto"],
        },
        {
          year: "Jul 2021 – Fev 2022",
          title: "Desenvolvedor de Software — Sankhya Gestão de Negócios",
          description: "Desenvolvimento e manutenção de funcionalidades para o ERP da Sankhya, um dos principais sistemas de gestão empresarial do Brasil. Modelo híbrido no Espírito Santo.",
          type: "professional",
          icon: "briefcase",
          tags: ["SQL", "ERP", "Sankhya"],
        },
        {
          year: "2018 – 2022",
          title: "Bacharelado em Sistemas de Informação — UCL",
          description: "Graduação construindo uma base sólida em engenharia de software, bancos de dados e design de sistemas.",
          type: "academic",
          icon: "book",
          tags: ["Ciência da Computação", "UCL"],
        },
        {
          year: "Mai 2018 – Jul 2021",
          title: "Técnico de TI — FDV (Faculdade de Direito de Vitória)",
          description: "Suporte técnico e desenvolvimento de sistemas internos para uma faculdade de direito no Espírito Santo. Cargo presencial combinando suporte técnico com desenvolvimento usando SQL e PHP.",
          type: "professional",
          icon: "briefcase",
          tags: ["SQL", "PHP", "Suporte TI"],
        },
        {
          year: "Jun 2020 – Dez 2020",
          title: "Desenvolvedor de Software — Super Estágios",
          description: "Desenvolvimento full-stack para uma plataforma de estágios. Construção de funcionalidades com PHP, JavaScript, MySQL e Bootstrap, além de automações de processos com Python.",
          type: "professional",
          icon: "code",
          tags: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Python"],
        },
        {
          year: "Mar 2017 – Mar 2018",
          title: "Serviço Militar — Marinha do Brasil",
          description: "Serviço na Marinha do Brasil, desenvolvendo disciplina, liderança sob pressão e trabalho em equipe em um ambiente operacional estruturado.",
          type: "professional",
          icon: "award",
          tags: ["Militar", "Liderança", "Marinha do Brasil"],
        },
      ],
    },
    // About
    about: {
      chip: "Sobre",
      greeting: "Olá, eu sou",
      bio: [
        "Sou Engenheiro Front-End com mais de 6 anos de experiência construindo aplicações web que performam, escalam e são acessíveis para todos. Sou especialista no contexto MarTech, construindo front-ends que times de marketing podem medir, otimizar e experimentar.",
        "Trabalho com React e Next.js diariamente, usando TypeScript 100% do tempo. Me preocupo profundamente com Core Web Vitals, HTML semântico, navegação por teclado e construção de sistemas de UI confiáveis ao longo do tempo.",
        "Além do front-end, trago versatilidade: automações em Python, experiência com ERPs TOTVS e Sankhya, desenvolvimento Java e manipulação de dados SQL. Acredito que grandes engenheiros front-end entendem a stack completa.",
      ],
      experience: "Experiência",
      timeline: [
        { year: "2018–2022", title: "Desenvolvedor Front-End", desc: "Construí sistemas web de e-commerce, institucionais e ERP usando React + TypeScript." },
        { year: "2022–Presente", title: "Engenheiro Front-End — Foco em MarTech", desc: "Entregando plataformas MarTech, dashboards analíticos e aplicações web orientadas a performance." },
      ],
      howIWork: "Como Trabalho",
      howIWorkCards: [
        { title: "Colaboração", desc: "Parceria próxima com designers e times de UX, traduzindo specs do Figma em componentes pixel-perfect e acessíveis." },
        { title: "Qualidade de Código", desc: "PRs no GitHub com reviews detalhados, histórico de commits claro e forte foco em código manutenível." },
        { title: "Documentação", desc: "Documentação de componentes, ADRs e compartilhamento de conhecimento fazem parte do meu fluxo diário." },
      ],
      education: "Educação",
       educationList: [
         { title: "Bacharelado em Sistemas de Informação — UCL", detail: "Concluído em 2022" },
         { title: "Pós-Graduação — Desenvolvimento de Aplicações Web — FACPRISMA", detail: "Jun 2024 – Nov 2024" },
         { title: "Licenciatura em Matemática (em andamento) — IFES", detail: "Previsão Jun 2026" },
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

