const en = {
  code: 'en',
  htmlLang: 'en',
  short: 'EN',
  name: 'English',
  meta: {
    title: 'João Pedro Soares | Full Stack Software Engineer',
    description:
      'Portfolio of João Pedro Soares, a full stack software engineer based in Granada, Spain. Java, Spring Boot, React, React Native and Node: APIs, automation and web and mobile products in production.',
  },
  terms: { IA: 'AI', Redes: 'Networking', 'Suporte Técnico': 'Technical Support' },
  common: {
    newTab: '(opens in a new tab)',
    language: 'Language',
  },
  nav: {
    aria: 'Main',
    home: 'João Pedro, back to top',
    tagline: 'Full Stack Engineer',
    skip: 'Skip to content',
    cta: "Let's talk",
    open: 'Open menu',
    close: 'Close menu',
    links: {
      film: 'Film',
      about: 'About',
      experience: 'Experience',
      tech: 'Skills',
      projects: 'Projects',
      recommendations: 'Recommendations',
      connect: 'Contact',
    },
  },
  hero: {
    status: 'Open to new opportunities',
    role: 'Full Stack Software Engineer',
    stackAria: 'Core technologies',
    lead: 'Full stack engineer with 3+ years building web, mobile and back-end systems with Java (Spring Boot), TypeScript (React, Node.js), Python and SQL. REST architecture, AI integration, process automation and database optimization across the financial, public and edtech sectors.',
    cv: 'Download CV',
    cvNote: 'PDF',
    ctaProjects: 'View projects',
    stats: ['Years of experience', 'Companies', 'Products live'],
    scroll: 'Scroll to explore',
  },
  film: {
    label: 'Film',
    title: 'From problems',
    highlight: 'to software',
    intro: 'Five minutes on how I work: full stack engineering, applied AI and automation built into real systems, and the results of the projects I took part in. Pick a chapter to jump straight to what interests you.',
    meta: 'English narration',
    play: 'Play the film',
    chaptersLabel: 'Film chapters',
    chapters: ['Intro', 'About me', 'How I work', 'Full stack engineering', 'Real impact', 'AI and automation', 'Projects', 'Career path', 'Contact'],
  },
  about: {
    label: 'About',
    title: 'Who',
    highlight: 'I am',
    intro: (
      <>
        I&apos;m <strong className="text-white font-normal">João Pedro Soares</strong>, a Brazilian full stack software
        engineer with <span className="text-orange-bright">3+ years of experience</span>, born in Natal, educated in João
        Pessoa and currently based in <span className="text-white">Granada, Spain</span>.
      </>
    ),
    bio: 'I build systems end to end: architecture, back-end, automation and integrations, with a focus on efficiency, process automation and digital transformation. My expertise covers Java, Spring Boot, Oracle APEX, UiPath, PHP and modern front-end technologies. I have delivered high-impact solutions for the public and financial sectors, always with clean code, scalability and information security (LGPD, Brazil\'s data protection law). I love learning fast and building reliable systems that create real value.',
    educationTitle: 'Education',
    education: [
      {
        tag: "Bachelor's degree · Completed",
        title: 'Computer Science',
        place: 'Centro Universitário de João Pessoa (Unipê), Brazil',
        detail: 'Feb 2022 - Dec 2025 · Grade 8.4/10',
        desc: 'Focused on software development, systems analysis, databases, algorithms, networking and telecommunications. Hands-on full stack engineering with Java, Spring Boot, React, JavaScript, REST APIs and relational databases, plus software architecture, cybersecurity and artificial intelligence.',
      },
      {
        tag: "Master's · In progress",
        title: "Master's in Business Process Management and Technologies",
        place: 'Universidad de Granada, Spain',
        detail: 'Sep 2026 - Sep 2027',
        desc: "Master's degree at the intersection of technology and business, with emphasis on business process management (BPM), digital transformation, enterprise systems, process optimization and applying technology to complex organizational challenges.",
      },
    ],
    languagesTitle: 'Languages',
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'C1 written · B2 spoken' },
      { name: 'Spanish', level: 'B2 comprehension · B1 spoken & written' },
    ],
  },
  experience: {
    label: 'Experience',
    title: 'The',
    highlight: 'journey',
    stackAria: 'Technologies used',
    items: {
      inovatec: {
        role: 'Full Stack Software Engineer · Contract',
        period: 'Oct 2025 - Aug 2026',
        location: 'João Pessoa, Brazil · Remote',
        impact: { value: '~70%', label: 'less processing time for field inspections with E-PROCON' },
        bullets: [
          'Developed, together with the team, the SiCAPS system for PROCON-PB, digitizing price data collection, organization and analysis: researcher and store registration, digital field collection, team assignment and geolocation-based monitoring, delivering greater efficiency, data accuracy and reliable real-time reports.',
          'Contributed to the E-PROCON Inspection System for PROCON-PB, modernizing, automating and fully digitizing field inspections and eliminating paper and pen at every stage: real-time digital issuing of fines and infractions, management dashboards and automated reports, LGPD-compliant secure access and agile communication with suppliers.',
          'Assisted in implementing a PDF generation system for the community and the Municipality of João Pessoa using BIRT, Jasper and Pentaho with Spring Boot and Java, built within two months, generating PDFs in multiple formats and compatible with different government agencies.',
        ],
      },
      ousepassar: {
        role: 'Software Engineer · Contract',
        period: 'Jan 2026 - Jul 2026',
        location: 'João Pessoa, Brazil · Hybrid',
        impact: { value: '3', label: 'platforms (iOS, Android and Web) shipped as the main developer' },
        bullets: [
          'Led the end-to-end development of Código da Vida as the main developer, from data modeling and back-end architecture to iOS and Android deployment, with load balancing and security mechanisms for high availability and automated multimedia content generation through native AI model integrations.',
          'Optimized monetization and checkout flows for Código da Vida and Ouse Passar, integrating payments and subscriptions through Hotmart and RevenueCat with real-time plan sync across web platforms and app stores, improving payment consistency and reducing reconciliation issues.',
          'Developed and refined AI-powered agents and automated workflows (OpenAI, Gemini and n8n) for Ouse Passar, automating complex back-end processes and business logic while contributing to a more robust and scalable architecture.',
          'Managed database migrations and legacy system evolution, configured infrastructure (Nginx, VPS and load balancing) and tuned SQL queries, eliminating performance bottlenecks and maintaining data integrity during critical hosting transitions.',
        ],
      },
      'sicredi-dev': {
        role: 'Software Development Intern',
        period: 'May 2024 - Sep 2025',
        location: 'João Pessoa, Brazil · On-site',
        impact: { value: '~10%', label: 'of system capacity freed up by UiPath automation bots' },
        bullets: [
          'Automated the removal of inactive accounts on the Sicredi platform with a complete UiPath robot that fully replaced the manual workflow: process mapping, automation architecture and accuracy checks, freeing approximately 10% of capacity for new active users.',
          "Updated the legacy system's PDF generator, replacing an outdated PHP library with modern technologies deployed straight to production: about 5% faster generation with significant gains in visual quality and user experience.",
          'Monitored and managed multiple cloud robots, identifying failures in real time and acting preventively to avoid downtime, keeping automations stable and continuously operational.',
          'Proposed and implemented an inventory management system for equipment check-in and check-out, streamlining workflows and preventing loss or misplacement of assets.',
        ],
      },
      'sicredi-support': {
        role: 'IT Support Technician',
        period: 'Oct 2023 - May 2024',
        location: 'João Pessoa, Brazil · On-site',
        bullets: [
          'Provided technical support to employees and members, troubleshooting internal systems and ensuring high availability of critical services for daily operations.',
          'Organized and prioritized internal IT requests, strengthening time management and ownership with consistent SLA compliance.',
          'Deepened expertise in Windows and Linux environments, increasing response speed and reducing resolution time for recurring issues.',
          'Configured and managed network infrastructure (switches, routers, EdgeRouter and DigiEye), improving performance, stability and reliability.',
          'Proactively monitored the corporate network and applied security measures to ensure stable connectivity, system integrity and less downtime.',
        ],
      },
      devdynamos: {
        role: 'Software Developer · Freelance',
        period: 'Mar 2023 - Oct 2023',
        location: 'São Paulo, Brazil · Remote',
        bullets: [
          'Designed the ER diagram for DevConnect, a platform connecting developers and recruiters, structuring the database to support its core features and scalability.',
          'Wrote clear, well-structured technical documentation, keeping the team aligned throughout the development lifecycle.',
          'Produced wireframes and ER diagrams in Figma, enabling early requirement validation and faster decisions before implementation.',
          'Applied agile methodologies with Jira and Confluence, improving project organization and delivery predictability.',
          'Followed software engineering best practices, resulting in clean, readable, scalable and maintainable code.',
        ],
      },
    },
  },
  tech: {
    label: 'Skills',
    title: 'The',
    highlight: 'arsenal',
    groups: {
      backend: 'Back-end & Languages',
      frontend: 'Front-end & Mobile',
      data: 'Data, Cloud & DevOps',
      ai: 'AI & Automation',
      enterprise: 'Enterprise & Reporting',
      tools: 'Tools & Practices',
    },
  },
  projects: {
    label: 'Projects',
    title: 'My',
    highlight: 'constellation',
    intro: 'Each star is a product running in production. Pick one to explore.',
    mapAria: 'Project constellation',
    prev: 'Previous',
    next: 'Next',
    live: 'View live',
    code: 'Code',
    codeSr: 'on GitHub',
    stackAria: 'Stack',
    academicTitle: 'Also on GitHub',
    academicSr: '(opens GitHub in a new tab)',
    items: {
      codigodavida: {
        type: 'App · iOS / Android / Web',
        description:
          'Mobile app built from scratch, from data modeling to store release. Load-balanced architecture and security protocols for high availability, with automated multimedia content generation (audio, text and image) through native integration with AI models.',
      },
      ousepassar: {
        type: 'Education Platform',
        description:
          'A platform that prepares students for Brazilian public service exams. I built intelligent AI agents to modernize user interaction, improved checkout and subscriptions (Hotmart and RevenueCat) with real-time sync, and led database migrations from legacy systems.',
      },
      shark: {
        type: 'E-commerce + Lounge',
        description:
          'E-commerce and lounge platform for the Shark Smokehouse tobacco shop, in production, which I designed and built. Checkout is recalculated and written on the server in a single transaction (prices, stock, coupon and order), with Mercado Pago PIX payments confirmed by signed webhooks. It includes a tiered loyalty program with rewards, a point-of-sale system, marketing automations, an operations dashboard and 28 Vitest test files.',
        highlight: { value: '61', label: 'registered users · in production' },
      },
    },
    allRepos: 'All repositories',
    academic: {
      tcc: 'Final degree project (highest grade, team project): equivalent CRUD APIs in Spring Boot and Quarkus on Kubernetes (GKE), load-tested with JMeter. Spring Boot delivered lower latency and higher throughput; Quarkus used ~21 MiB vs ~271 MiB at idle and scaled with 3 pods vs 10.',
      apex: 'Java/BIRT print server that generates reports (PDF, HTML, Excel) and plugs into Oracle APEX, with Maven and Docker.',
      all: 'All public repositories, including the source of Shark Smokehouse.',
    },
  },
  recommendations: {
    label: 'Recommendations',
    title: 'What they',
    highlight: 'say',
    intro: 'What teammates and classmates say about working with me.',
    translated: 'Translated from Portuguese',
    items: {
      carlos: {
        note: 'Worked with João Pedro on the Sicredi IT team',
        text: 'João Pedro was part of our IT team for two years and showed many talents, both in infrastructure and support and in software development, automation and RPA. His thirst for knowledge and dedication to learning new technologies meant he was often chosen for important tasks in our department. In development he showed creativity and initiative, always looking for ways to optimize processes and improve the user experience, and he contributed significantly to the success of key company projects. I am confident he will be a valuable addition to any team.',
      },
      monalisa: {
        note: 'Worked with João Pedro on the same team',
        text: 'João Pedro is an extremely helpful professional, always available to support others and share knowledge, with a strong drive to teach and collaborate. He is someone you can truly rely on: he never leaves his colleagues hanging and is there when support is needed, contributing to a healthy work environment. Without a doubt he adds value to any team, and I recommend him with complete confidence.',
      },
      miqueias: {
        note: 'Worked with João Pedro on the same team',
        text: 'I am glad to recommend João Pedro. I saw first-hand how skilled, dedicated and reliable he is, with strong IT expertise spanning infrastructure and support through software development, automation and RPA. Beyond his technical talent, he is a great teammate, always willing to help and to make processes more efficient. He delivers results while keeping collaboration at the center.',
      },
      luiz: {
        note: 'University classmate and thesis partner',
        text: 'I worked with João Pedro at university on several projects, including our final thesis. He stood out for his dedication, proactivity and innovative ideas, always getting his hands dirty. His work ethic and willingness to help were key to the success of our projects. It was a pleasure working with him.',
      },
    },
  },
  connect: {
    label: 'Contact',
    title: ["Let's", 'build', 'together'],
    intro: "Open to opportunities as a full stack developer and to high-impact projects. Let's create something extraordinary.",
    email: 'Email',
    copy: 'Copy email',
    copied: 'Copied!',
    sendEmail: 'Send email',
    footerRole: 'Full Stack Developer · Granada, Spain',
    cv: 'Download CV',
    built: 'Designed & built with',
    precision: 'precision',
    backToTop: 'Back to top',
  },
}

export default en
