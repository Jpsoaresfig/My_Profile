const pt = {
  code: 'pt',
  htmlLang: 'pt-BR',
  short: 'PT',
  name: 'Português',
  meta: {
    title: 'João Pedro Soares | Engenheiro de Software Full Stack',
    description:
      'Portfólio de João Pedro Soares, engenheiro de software full stack em João Pessoa (PB). Java, Spring Boot, React, React Native e Node: APIs, automação e produtos web e mobile em produção.',
  },
  terms: {},
  common: {
    newTab: '(abre em nova aba)',
    language: 'Idioma',
  },
  nav: {
    aria: 'Principal',
    home: 'João Pedro, voltar ao topo',
    tagline: 'Full Stack Engineer',
    skip: 'Pular para o conteúdo',
    cta: 'Vamos conversar',
    open: 'Abrir menu',
    close: 'Fechar menu',
    links: {
      about: 'Sobre',
      experience: 'Experiência',
      tech: 'Tecnologias',
      projects: 'Projetos',
      recommendations: 'Recomendações',
      connect: 'Contato',
    },
  },
  hero: {
    status: 'Disponível para novas oportunidades',
    role: 'Engenheiro de Software Full Stack',
    stackAria: 'Principais tecnologias',
    lead: 'Engenheiro full stack com 3+ anos construindo sistemas web, mobile e back-end com Java (Spring Boot), TypeScript (React, Node.js), Python e SQL. Arquitetura REST, integração com IA, automação de processos e otimização de bancos nos setores financeiro, público e de educação.',
    cv: 'Baixar CV',
    cvNote: 'PDF em inglês',
    ctaProjects: 'Ver projetos',
    stats: ['Anos de experiência', 'Empresas', 'Produtos no ar'],
    scroll: 'Role para explorar',
  },
  about: {
    label: 'Sobre',
    title: 'Quem',
    highlight: 'eu sou',
    intro: (
      <>
        Sou <strong className="text-white font-normal">João Pedro Soares</strong>, desenvolvedor full stack{' '}
        <span className="text-orange-bright">pleno</span>, brasileiro, nascido em Natal (RN), formado em João Pessoa (PB)
        e hoje baseado em <span className="text-white">Granada, Espanha</span>.
      </>
    ),
    bio: 'Construo sistemas de ponta a ponta: arquitetura, back-end, automação e integração, com foco em eficiência, automação de processos e transformação digital. Minha expertise abrange Java, Spring Boot, Oracle APEX, UiPath, PHP e tecnologias modernas de front-end. Já entreguei soluções de alto impacto para o setor público e financeiro, sempre com código limpo, escalabilidade e segurança da informação (LGPD). Apaixonado por aprender rápido e construir sistemas confiáveis que geram valor real.',
    educationTitle: 'Formação',
    education: [
      {
        tag: 'Bacharelado · Concluído',
        title: 'Ciência da Computação',
        place: 'Centro Universitário de João Pessoa (Unipê), PB',
        detail: 'Fev 2022 - Dez 2025 · Nota 8,4',
        desc: 'Foco em desenvolvimento de software, análise de sistemas, bancos de dados, algoritmos, redes e telecomunicações. Experiência prática em engenharia full stack com Java, Spring Boot, React, JavaScript, APIs REST e bancos relacionais, além de arquitetura de software, cibersegurança e inteligência artificial.',
      },
      {
        tag: 'MBA · Em andamento',
        title: 'Master in Business Administration',
        place: 'Universidad de Granada, Espanha',
        detail: 'Set 2026 - Set 2027',
        desc: 'Mestrado na interseção entre tecnologia e negócios, com ênfase em gestão de processos de negócio (BPM), transformação digital, sistemas corporativos, otimização de processos e uso da tecnologia para resolver desafios organizacionais complexos.',
      },
    ],
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'C1 escrita · B2 conversação' },
      { name: 'Espanhol', level: 'B2 compreensão · B1 fala e escrita' },
    ],
  },
  experience: {
    label: 'Experiência',
    title: 'A',
    highlight: 'jornada',
    stackAria: 'Tecnologias utilizadas',
    items: {
      inovatec: {
        role: 'Fullstack Software Engineer · Contrato',
        period: 'Out 2025 - Ago 2026',
        location: 'João Pessoa, PB · Remoto',
        impact: { value: '70%', label: 'menos tempo de processamento nas fiscalizações com o E-PROCON' },
        bullets: [
          'Desenvolveu, junto à equipe, o sistema SiCAPS para o PROCON-PB, digitalizando a coleta, organização e análise de preços: cadastro de pesquisadores e estabelecimentos, coleta digital em campo, atribuição de equipes e monitoramento por geolocalização, com mais eficiência, precisão dos dados e relatórios confiáveis em tempo real.',
          'Contribuiu para o Sistema de Fiscalização E-PROCON (PROCON-PB), modernizando, automatizando e digitalizando toda a fiscalização em campo e eliminando o papel e a caneta em todas as etapas: emissão digital de multas e autos em tempo real, painéis gerenciais e relatórios automáticos, acesso seguro em conformidade com a LGPD e comunicação ágil com fornecedores.',
          'Auxiliou na implementação de um sistema de geração de PDFs para a comunidade e a Prefeitura de João Pessoa usando BIRT, Jasper e Pentaho com Spring Boot e Java, desenvolvido em dois meses, com PDFs em múltiplos formatos e compatibilidade com diferentes órgãos.',
        ],
      },
      ousepassar: {
        role: 'Engenheiro de Software · Tempo integral',
        period: 'Jan 2026 - Jul 2026',
        location: 'João Pessoa, PB · Híbrido',
        impact: { value: '3', label: 'plataformas (iOS, Android e Web) entregues como desenvolvedor principal' },
        bullets: [
          'Liderou o desenvolvimento ponta a ponta do app Código da Vida como desenvolvedor principal, da modelagem de dados e arquitetura de back-end à publicação no iOS e Android, com balanceamento de carga, mecanismos de segurança para alta disponibilidade e geração automatizada de conteúdo multimídia via integração nativa com modelos de IA.',
          'Otimizou os fluxos de monetização e checkout do Código da Vida e da Ouse Passar, integrando pagamentos e assinaturas (Hotmart e RevenueCat) com sincronização em tempo real dos planos entre a web e as lojas de apps, mais consistência nos pagamentos e menos problemas de conciliação.',
          'Desenvolveu e refinou agentes de IA e fluxos automatizados (OpenAI, Gemini e n8n) para a Ouse Passar, automatizando processos complexos de back-end e regras de negócio e contribuindo para uma arquitetura mais robusta e escalável.',
          'Conduziu migrações de banco e a evolução de sistemas legados, configurou a infraestrutura (Nginx, VPS e balanceamento de carga) e otimizou consultas SQL, eliminando gargalos de performance e mantendo a integridade dos dados em transições críticas de hospedagem.',
        ],
      },
      'sicredi-dev': {
        role: 'Estagiário em Desenvolvimento de Software',
        period: 'Mai 2024 - Set 2025',
        location: 'João Pessoa, PB · Presencial',
        impact: { value: '~10%', label: 'de capacidade liberada com robôs de automação em UiPath' },
        bullets: [
          'Automatizou a remoção de contas inativas da plataforma Sicredi com um robô completo em UiPath que substituiu todo o fluxo manual: mapeamento do processo, arquitetura da automação e validações de precisão, liberando cerca de 10% da capacidade para novos usuários ativos.',
          'Atualizou o gerador de PDFs do sistema legado, trocando uma biblioteca PHP obsoleta por tecnologias modernas implantadas direto em produção: cerca de 5% menos tempo de geração e ganho significativo de qualidade visual e experiência do usuário.',
          'Monitorou e gerenciou múltiplos robôs em nuvem, identificando falhas em tempo real e agindo preventivamente para evitar downtime, mantendo as automações estáveis e em operação contínua.',
          'Propôs e implementou um sistema de gestão de inventário para entrada e saída de equipamentos, otimizando fluxos e evitando perda ou extravio de ativos.',
        ],
      },
      'sicredi-support': {
        role: 'Técnico de Suporte em TI',
        period: 'Out 2023 - Mai 2024',
        location: 'João Pessoa, PB · Presencial',
        bullets: [
          'Prestou suporte técnico a colaboradores e associados, resolvendo problemas em sistemas internos e garantindo alta disponibilidade de serviços críticos para a operação diária.',
          'Organizou e priorizou demandas internas de TI, fortalecendo gestão de tempo e ownership com cumprimento consistente de SLA.',
          'Aprofundou a atuação em ambientes Windows e Linux, aumentando a velocidade de resposta e reduzindo o tempo de resolução de problemas recorrentes.',
          'Configurou e gerenciou a infraestrutura de rede (switches, roteadores, EdgeRouter e DigiEye), melhorando performance, estabilidade e confiabilidade.',
          'Monitorou a rede corporativa de forma proativa, aplicando medidas de segurança para garantir conectividade estável, integridade dos sistemas e menos indisponibilidade.',
        ],
      },
      devdynamos: {
        role: 'Software Developer · Freelance',
        period: 'Mar 2023 - Out 2023',
        location: 'São Paulo, SP · Remoto',
        bullets: [
          'Modelou o diagrama ER da plataforma DevConnect, que conecta desenvolvedores e recrutadores, estruturando o banco para suportar as funcionalidades principais e a escalabilidade.',
          'Criou documentação técnica clara e bem estruturada, garantindo alinhamento da equipe ao longo de todo o ciclo de desenvolvimento.',
          'Produziu wireframes e diagramas ER no Figma, permitindo validar requisitos cedo e acelerar decisões antes da implementação.',
          'Aplicou metodologias ágeis com Jira e Confluence, melhorando a organização do projeto e a previsibilidade das entregas.',
          'Seguiu boas práticas de engenharia de software, resultando em código limpo, legível, escalável e de fácil manutenção.',
        ],
      },
    },
  },
  tech: {
    label: 'Tecnologias',
    title: 'O',
    highlight: 'arsenal',
    groups: {
      backend: 'Back-end & Linguagens',
      frontend: 'Front-end & Mobile',
      data: 'Dados, Cloud & DevOps',
      ai: 'IA & Automação',
      enterprise: 'Enterprise & Relatórios',
      tools: 'Ferramentas & Práticas',
    },
  },
  projects: {
    label: 'Projetos',
    title: 'Minha',
    highlight: 'constelação',
    intro: 'Cada estrela é um produto em produção. Selecione uma para explorar.',
    mapAria: 'Constelação de projetos',
    prev: 'Anterior',
    next: 'Próximo',
    live: 'Ver ao vivo',
    code: 'Código',
    codeSr: 'no GitHub',
    stackAria: 'Stack',
    academicTitle: 'Também no GitHub',
    academicSr: '(abre o GitHub em nova aba)',
    items: {
      codigodavida: {
        type: 'App · iOS / Android / Web',
        description:
          'Aplicativo mobile desenvolvido do zero, da modelagem de dados à publicação nas lojas. Arquitetura de Load Balance e protocolos de segurança para alta disponibilidade, com geração automatizada de conteúdo multimídia (áudio, texto e imagem) via integração nativa com modelos de IA.',
      },
      ousepassar: {
        type: 'Plataforma Educacional',
        description:
          'Plataforma de preparação para concursos. Desenvolvi agentes inteligentes de IA para modernizar a interação com o usuário, otimizei o checkout e as assinaturas (Hotmart e RevenueCat) com sincronização em tempo real, e conduzi migrações de banco de sistemas legados.',
      },
      shark: {
        type: 'E-commerce + Lounge',
        description:
          'E-commerce e lounge para a tabacaria Shark Smokehouse: catálogo, carrinho, checkout com baixa automática de estoque, programa de fidelidade, agendamento de lounge (com trava de conflito de horário) e um painel administrativo completo com produtos, pedidos, PDV, estoque, eventos e CMS.',
      },
    },
    allRepos: 'Todos os repositórios',
    academic: {
      apex: 'Print server em Java/BIRT para gerar relatórios (PDF, HTML, Excel) integrável ao Oracle APEX, com Maven e Docker.',
      all: 'Todos os repositórios públicos, incluindo o código do Shark Smokehouse.',
    },
  },
  recommendations: {
    label: 'Recomendações',
    title: 'O que',
    highlight: 'dizem',
    intro: 'O que colegas de equipe e de faculdade dizem sobre trabalhar comigo.',
    translated: null,
    items: {
      monalisa: {
        note: 'Trabalhou com João Pedro na mesma equipe',
        text: 'João Pedro é um profissional extremamente prestativo, sempre disponível para apoiar e compartilhar conhecimento, com forte vontade de ensinar e colaborar. É alguém em quem se pode confiar de verdade: nunca deixa os colegas na mão e está presente quando o suporte é necessário, contribuindo para um ambiente de trabalho saudável. Sem dúvida, agrega valor a qualquer equipe e o recomendo com total confiança.',
      },
      miqueias: {
        note: 'Trabalhou com João Pedro na mesma equipe',
        text: 'Tenho prazer em recomendar o João Pedro. Vi de perto o quão habilidoso, dedicado e confiável ele é, com forte expertise em TI, de infraestrutura e suporte a desenvolvimento de software, automação e RPA. Além de tecnicamente talentoso, é um ótimo colega de equipe, sempre disposto a ajudar e a tornar processos mais eficientes. Entrega resultados mantendo a colaboração no centro.',
      },
      luiz: {
        note: 'Colega de faculdade e TCC',
        text: 'Trabalhei com o João Pedro na faculdade em vários projetos, incluindo o TCC. Ele se destacou pela dedicação, proatividade e contribuição com ideias inovadoras, sempre colocando a mão na massa. Sua ética de trabalho e disposição para ajudar foram fundamentais para o sucesso dos projetos. Foi um prazer trabalhar com ele.',
      },
    },
  },
  connect: {
    label: 'Contato',
    title: ['Vamos', 'construir', 'juntos'],
    intro: 'Aberto a oportunidades como desenvolvedor full stack e a projetos de alto impacto. Bora criar algo extraordinário.',
    email: 'E-mail',
    copy: 'Copiar e-mail',
    copied: 'Copiado!',
    call: 'Ligar para',
    sendEmail: 'Enviar e-mail',
    footerRole: 'Desenvolvedor Full Stack · Granada, Espanha',
    cv: 'Baixar CV',
    built: 'Projetado & desenvolvido com',
    precision: 'precisão',
    backToTop: 'Voltar ao topo',
  },
}

export default pt
