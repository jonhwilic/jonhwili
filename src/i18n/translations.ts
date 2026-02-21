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
        "7+ years Front-End",
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
          title: "Performance and user experience",
          description: "I work to reduce load times and improve navigation smoothness, with a focus on Core Web Vitals and front-end best practices. This includes image optimization, efficient loading strategies, and approaches like SSR/SSG/ISR when they make sense for the project.",
        },
        {
          title: "Consistent UI that’s easy to scale",
          description: "I build a reusable component foundation (buttons, cards, forms) with clear styling rules. The result is a consistent interface, faster development, and new screens that don’t turn into a “Frankenstein.” (Design tokens, patterns, and architecture built for scale.)",
        },
        {
          title: "Built to measure and improve results",
          description: "It’s not just about looking good—it’s about being ready to grow. I deliver front-ends prepared for SEO, tracking (analytics/pixels), conversion events, and A/B testing, so marketing can measure what works and the product can evolve with data.",
        },
      ],
    },
    // Timeline
    timeline: {
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
         "I'm a Front-End Engineer with 7+ years of experience building web applications that perform, scale, and are accessible to everyone. I specialize in MarTech, building front-ends that marketing teams can measure, optimize, and experiment with.",
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
    // Projects
    projects: {
      chip: "Selected Work",
      title: "My",
      titleAccent: "Projects",
      subtitle: "A selection of institutional and creative websites I built.",
      items: {
        institutionalTotalpass: {
          title: "TotalPass",
          category: "Institutional | Corporate",
          description:
            "Institutional website for TotalPass. Built with a focus on elegance and visual storytelling, presenting the company's programs, identity, and corporate positioning.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS", "Rest API", "GraphQL", "Salesforce Integration"],
        },
        mapTotalpass: {
          title: "Gym Map",
          category: "Institutional | Corporate",
          description:
            "Web page for the TotalPass gym map. This project solved a recurring question when the product was presented: 'Which gyms can I use with TotalPass?'. Creating the map facilitated the product onboarding phase and consequently increased company revenue.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS", "Rest API", "GraphQL"],
        },
        blogTotalpass: {
          title: "TotalPass Blog",
          category: "Institutional | Corporate",
          description:
            "Blog created for TotalPass with a focus on sharing wellness, health, and more content for both corporate and individual audiences. The blog is ranked with high relevance in the content it aims to produce.",
          stack: ["PHP", "jQuery", "WordPress", "JavaScript"],
        },
        balletDaCidade: {
          title: "Ballet da Cidade",
          category: "Institutional | Dance School",
          description:
            "Institutional website for Ballet da Cidade, a cultural dance school. Built with a focus on elegance and visual storytelling, presenting the school's programs, schedule, and artistic identity.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        kardiah: {
          title: "Kardiah",
          category: "Institutional | Dance School",
          description:
            "Institutional website for Kardiah dance school. The design and construction of the site aimed to evoke the beauty and lightness of dance movements.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        portelaFilmes: {
          title: "Portela Filmes",
          category: "Institutional | Creative",
          description:
            "Portfolio website for Portela Filmes, a film production company. A visually immersive experience showcasing their work, reel, and creative identity.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
      },
    },
    // Contact
    contact: {
      chip: "Get in Touch",
      title: "Let's",
      titleAccent: "connect",
      subtitle: "Have a project in mind or want to discuss opportunities? Drop me a message.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      sent: "Message sent!",
      sentDesc: "Thanks for reaching out. I'll get back to you soon.",
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
        "7+ anos de Front-End",
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
          title: "Performance e experiência de uso",
          description: "Eu trabalho para reduzir tempo de carregamento e melhorar a fluidez da navegação, com foco em Core Web Vitals e boas práticas de front-end. Isso inclui otimização de imagens, carregamento eficiente e estratégias como SSR/SSG/ISR quando fazem sentido para o projeto.",
        },
        {
          title: "Interface consistente e fácil de evoluir",
          description: "Eu crio uma base de componentes reutilizáveis (botões, cards, formulários) com regras claras de estilo. O resultado: o produto fica bonito e consistente, o time desenvolve mais rápido, e novas telas saem sem virar um “Frankenstein”. (Tokens, padrões e arquitetura pensados pra escala.)",
        },
        {
          title: "Site pronto para medir e melhorar resultados",
          description: "Não é só “ficar bonito”: é estar pronto para vender e crescer. Eu entrego o front já preparado para SEO, rastreamento (analytics/pixels), eventos de conversão e testes A/B — pra marketing medir o que funciona e o produto evoluir com dados.",
        },
      ],
    },
    // Timeline
    timeline: {
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
    // Projects
    projects: {
      chip: "Trabalhos Selecionados",
      title: "Meus",
      titleAccent: "Projetos",
      subtitle: "Uma seleção de sites institucionais e criativos que desenvolvi.",
      items: {
        institutionalTotalpass: {
          title: "TotalPass",
          category: "Institucional | Empresa",
          description:
            "Site institucional para o Ballet da Cidade, uma escola cultural de dança. Desenvolvido com foco em elegância e narrativa visual, apresentando os programas, horários e identidade artística da escola.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS", "Rest API", "GraphQL", "Salesforce Integration"],
        },
        mapTotalpass: {
          title: "Mapa de Academias",
          category: "Institucional | Empresa",
          description:
            "Página web do mapa de academias TotalPass. Esse projeto solucionou uma questão recorrente quando o produto era apresentado: 'Quais academias posso usar com TotalPass?'. A criação do mapa facilitou a fase de contratação do produto e por consequência o aumento de receita da empresa.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS", "Rest API", "GraphQL"],
        },
        blogTotalpass: {
          title: "Blog TotalPass",
          category: "Institucional | Empresa",
          description:
            "Blog criado para a empresa TotalPass com foco em compartilhar conteúdos de bem-estar, saúde e muito mais para o ambiente corporativo e individual. O blog está rankeado com alta relevância nos conteúdos que se propõe a produzir.",
          stack: ["PHP", "jQuery", "WordPress", "JavaScript"],
        },
        balletDaCidade: {
          title: "Ballet da Cidade",
          category: "Institucional | Escola de Dança",
          description:
            "Site institucional para o Ballet da Cidade, uma escola cultural de dança. Desenvolvido com foco em elegância e narrativa visual, apresentando os programas, horários e identidade artística da escola.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        kardiah: {
          title: "Kardiah",
          category: "Institucional | Escola de Dança",
          description:
            "Site institucional para a escola de dança Kardiah. O design e construção do site buscou lembrar a beleza e leveza dos movimentos da dança.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
        portelaFilmes: {
          title: "Portela Filmes",
          category: "Institucional | Criativo",
          description:
            "Site de portfólio para a Portela Filmes, uma produtora audiovisual. Uma experiência visualmente imersiva que apresenta seus trabalhos, reel e identidade criativa.",
          stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        },
      },
    },
    // Contact
    contact: {
      chip: "Fale Comigo",
      title: "Vamos nos",
      titleAccent: "conectar",
      subtitle: "Tem um projeto em mente ou quer discutir oportunidades? Me envie uma mensagem.",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "Email",
      emailPlaceholder: "voce@exemplo.com",
      message: "Mensagem",
      messagePlaceholder: "Me conte sobre seu projeto...",
      send: "Enviar Mensagem",
      sent: "Mensagem enviada!",
      sentDesc: "Obrigado pelo contato. Responderei em breve.",
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

