const es = {
  code: 'es',
  htmlLang: 'es',
  short: 'ES',
  name: 'Español',
  meta: {
    title: 'João Pedro Soares | Ingeniero de Software Full Stack',
    description:
      'Portafolio de João Pedro Soares, ingeniero de software full stack en Granada, España. Java, Spring Boot, React, React Native y Node: APIs, automatización y productos web y móviles en producción.',
  },
  terms: { Redes: 'Redes', 'Suporte Técnico': 'Soporte Técnico' },
  common: {
    newTab: '(se abre en una pestaña nueva)',
    language: 'Idioma',
  },
  nav: {
    aria: 'Principal',
    home: 'João Pedro, volver al inicio',
    tagline: 'Full Stack Engineer',
    skip: 'Saltar al contenido',
    cta: 'Hablemos',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    links: {
      film: 'Vídeo',
      about: 'Sobre mí',
      experience: 'Experiencia',
      tech: 'Tecnologías',
      projects: 'Proyectos',
      recommendations: 'Recomendaciones',
      connect: 'Contacto',
    },
  },
  hero: {
    status: 'Disponible para nuevas oportunidades',
    role: 'Ingeniero de Software Full Stack',
    stackAria: 'Tecnologías principales',
    lead: 'Ingeniero full stack con más de 3 años construyendo sistemas web, móviles y back-end con Java (Spring Boot), TypeScript (React, Node.js), Python y SQL. Arquitectura REST, integración con IA, automatización de procesos y optimización de bases de datos en los sectores financiero, público y educativo.',
    cv: 'Descargar CV',
    cvNote: 'PDF en inglés',
    ctaProjects: 'Ver proyectos',
    stats: ['Años de experiencia', 'Empresas', 'Productos en línea'],
    scroll: 'Desplázate para explorar',
  },
  film: {
    label: 'Vídeo',
    title: 'Del problema',
    highlight: 'al software',
    intro: 'Cinco minutos sobre cómo trabajo: ingeniería full stack, IA aplicada y automatización integradas en sistemas reales, y los resultados de los proyectos en los que participé. Elige un capítulo para ir directo a lo que te interesa.',
    meta: 'Narración en inglés · subtítulos en español',
    play: 'Ver el vídeo',
    chaptersLabel: 'Capítulos del vídeo',
    chapters: ['Introducción', 'Sobre mí', 'Cómo trabajo', 'Ingeniería full stack', 'Impacto real', 'IA y automatización', 'Proyectos', 'Trayectoria', 'Contacto'],
  },
  about: {
    label: 'Sobre mí',
    title: 'Quién',
    highlight: 'soy',
    intro: (
      <>
        Soy <strong className="text-white font-normal">João Pedro Soares</strong>, ingeniero de software full stack
        brasileño con <span className="text-orange-bright">más de 3 años de experiencia</span>, nacido en Natal, formado en
        João Pessoa y actualmente residente en <span className="text-white">Granada, España</span>.
      </>
    ),
    bio: 'Construyo sistemas de punta a punta: arquitectura, back-end, automatización e integración, con foco en eficiencia, automatización de procesos y transformación digital. Mi experiencia abarca Java, Spring Boot, Oracle APEX, UiPath, PHP y tecnologías modernas de front-end. He entregado soluciones de alto impacto para el sector público y financiero, siempre con código limpio, escalabilidad y seguridad de la información (LGPD, la ley brasileña de protección de datos). Me apasiona aprender rápido y construir sistemas confiables que generan valor real.',
    educationTitle: 'Formación',
    education: [
      {
        tag: 'Grado · Finalizado',
        title: 'Ciencias de la Computación',
        place: 'Centro Universitário de João Pessoa (Unipê), Brasil',
        detail: 'Feb 2022 - Dic 2025 · Nota 8,4/10',
        desc: 'Enfoque en desarrollo de software, análisis de sistemas, bases de datos, algoritmos, redes y telecomunicaciones. Experiencia práctica en ingeniería full stack con Java, Spring Boot, React, JavaScript, APIs REST y bases de datos relacionales, además de arquitectura de software, ciberseguridad e inteligencia artificial.',
      },
      {
        tag: 'Máster · En curso',
        title: 'Máster Universitario en Gestión y Tecnologías de Procesos de Negocio',
        place: 'Universidad de Granada, España',
        detail: 'Sep 2026 - Sep 2027',
        desc: 'Máster en la intersección entre tecnología y negocio, con énfasis en gestión de procesos de negocio (BPM), transformación digital, sistemas empresariales, optimización de procesos y uso de la tecnología para resolver desafíos organizacionales complejos.',
      },
    ],
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Portugués', level: 'Nativo' },
      { name: 'Inglés', level: 'C1 escrito · B2 oral' },
      { name: 'Español', level: 'B2 comprensión · B1 oral y escrito' },
    ],
  },
  experience: {
    label: 'Experiencia',
    title: 'La',
    highlight: 'trayectoria',
    stackAria: 'Tecnologías utilizadas',
    items: {
      inovatec: {
        role: 'Ingeniero de Software Full Stack · Contrato',
        period: 'Oct 2025 - Ago 2026',
        location: 'João Pessoa, Brasil · Remoto',
        impact: { value: '~70%', label: 'menos tiempo de procesamiento en las inspecciones con E-PROCON' },
        bullets: [
          'Desarrolló, junto al equipo, el sistema SiCAPS para el PROCON-PB (órgano de defensa del consumidor), digitalizando la recolección, organización y análisis de precios: registro de investigadores y establecimientos, recolección digital en campo, asignación de equipos y monitoreo por geolocalización, con más eficiencia, precisión de datos e informes confiables en tiempo real.',
          'Contribuyó al Sistema de Fiscalización E-PROCON (PROCON-PB), modernizando, automatizando y digitalizando toda la fiscalización en campo y eliminando el papel y el bolígrafo en todas las etapas: emisión digital de multas y actas en tiempo real, paneles de gestión e informes automáticos, acceso seguro conforme a la LGPD y comunicación ágil con proveedores.',
          'Colaboró en la implementación de un sistema de generación de PDFs para la comunidad y la Alcaldía de João Pessoa con BIRT, Jasper y Pentaho sobre Spring Boot y Java, desarrollado en dos meses, con PDFs en múltiples formatos y compatible con distintos organismos.',
        ],
      },
      ousepassar: {
        role: 'Ingeniero de Software · Jornada completa',
        period: 'Ene 2026 - Jul 2026',
        location: 'João Pessoa, Brasil · Híbrido',
        impact: { value: '3', label: 'plataformas (iOS, Android y Web) entregadas como desarrollador principal' },
        bullets: [
          'Lideró el desarrollo de punta a punta de la app Código da Vida como desarrollador principal, desde el modelado de datos y la arquitectura de back-end hasta la publicación en iOS y Android, con balanceo de carga, mecanismos de seguridad para alta disponibilidad y generación automatizada de contenido multimedia mediante integración nativa con modelos de IA.',
          'Optimizó los flujos de monetización y checkout de Código da Vida y Ouse Passar, integrando pagos y suscripciones (Hotmart y RevenueCat) con sincronización en tiempo real de los planes entre la web y las tiendas de apps, más consistencia en los pagos y menos problemas de conciliación.',
          'Desarrolló y perfeccionó agentes de IA y flujos automatizados (OpenAI, Gemini y n8n) para Ouse Passar, automatizando procesos complejos de back-end y reglas de negocio y contribuyendo a una arquitectura más robusta y escalable.',
          'Gestionó migraciones de bases de datos y la evolución de sistemas heredados, configuró la infraestructura (Nginx, VPS y balanceo de carga) y optimizó consultas SQL, eliminando cuellos de botella y manteniendo la integridad de los datos durante transiciones críticas de hosting.',
        ],
      },
      'sicredi-dev': {
        role: 'Desarrollador de Software en Prácticas',
        period: 'May 2024 - Sep 2025',
        location: 'João Pessoa, Brasil · Presencial',
        impact: { value: '~10%', label: 'de capacidad liberada con robots de automatización en UiPath' },
        bullets: [
          'Automatizó la eliminación de cuentas inactivas de la plataforma Sicredi con un robot completo en UiPath que reemplazó todo el flujo manual: mapeo del proceso, arquitectura de la automatización y validaciones de precisión, liberando cerca del 10% de la capacidad para nuevos usuarios activos.',
          'Actualizó el generador de PDFs del sistema heredado, reemplazando una biblioteca PHP obsoleta por tecnologías modernas desplegadas directamente en producción: cerca de un 5% menos de tiempo de generación y una mejora significativa en calidad visual y experiencia de usuario.',
          'Monitoreó y gestionó múltiples robots en la nube, detectando fallos en tiempo real y actuando de forma preventiva para evitar caídas, manteniendo las automatizaciones estables y en operación continua.',
          'Propuso e implementó un sistema de gestión de inventario para la entrada y salida de equipos, optimizando flujos y evitando la pérdida o extravío de activos.',
        ],
      },
      'sicredi-support': {
        role: 'Técnico de Soporte TI',
        period: 'Oct 2023 - May 2024',
        location: 'João Pessoa, Brasil · Presencial',
        bullets: [
          'Brindó soporte técnico a colaboradores y asociados, resolviendo problemas en sistemas internos y garantizando alta disponibilidad de servicios críticos para la operación diaria.',
          'Organizó y priorizó demandas internas de TI, fortaleciendo la gestión del tiempo y el sentido de responsabilidad con cumplimiento constante de SLA.',
          'Profundizó su experiencia en entornos Windows y Linux, aumentando la velocidad de respuesta y reduciendo el tiempo de resolución de problemas recurrentes.',
          'Configuró y gestionó la infraestructura de red (switches, routers, EdgeRouter y DigiEye), mejorando rendimiento, estabilidad y confiabilidad.',
          'Monitoreó la red corporativa de forma proactiva, aplicando medidas de seguridad para garantizar conectividad estable, integridad de los sistemas y menos interrupciones.',
        ],
      },
      devdynamos: {
        role: 'Desarrollador de Software · Freelance',
        period: 'Mar 2023 - Oct 2023',
        location: 'São Paulo, Brasil · Remoto',
        bullets: [
          'Modeló el diagrama ER de DevConnect, una plataforma que conecta desarrolladores y reclutadores, estructurando la base de datos para soportar sus funcionalidades principales y su escalabilidad.',
          'Redactó documentación técnica clara y bien estructurada, manteniendo al equipo alineado durante todo el ciclo de desarrollo.',
          'Produjo wireframes y diagramas ER en Figma, permitiendo validar requisitos temprano y acelerar decisiones antes de la implementación.',
          'Aplicó metodologías ágiles con Jira y Confluence, mejorando la organización del proyecto y la previsibilidad de las entregas.',
          'Siguió buenas prácticas de ingeniería de software, logrando un código limpio, legible, escalable y fácil de mantener.',
        ],
      },
    },
  },
  tech: {
    label: 'Tecnologías',
    title: 'El',
    highlight: 'arsenal',
    groups: {
      backend: 'Back-end & Lenguajes',
      frontend: 'Front-end & Móvil',
      data: 'Datos, Cloud & DevOps',
      ai: 'IA & Automatización',
      enterprise: 'Enterprise & Informes',
      tools: 'Herramientas & Prácticas',
    },
  },
  projects: {
    label: 'Proyectos',
    title: 'Mi',
    highlight: 'constelación',
    intro: 'Cada estrella es un producto en producción. Selecciona una para explorar.',
    mapAria: 'Constelación de proyectos',
    prev: 'Anterior',
    next: 'Siguiente',
    live: 'Ver en vivo',
    code: 'Código',
    codeSr: 'en GitHub',
    stackAria: 'Stack',
    academicTitle: 'También en GitHub',
    academicSr: '(abre GitHub en una pestaña nueva)',
    items: {
      codigodavida: {
        type: 'App · iOS / Android / Web',
        description:
          'Aplicación móvil desarrollada desde cero, desde el modelado de datos hasta la publicación en las tiendas. Arquitectura con balanceo de carga y protocolos de seguridad para alta disponibilidad, con generación automatizada de contenido multimedia (audio, texto e imagen) mediante integración nativa con modelos de IA.',
      },
      ousepassar: {
        type: 'Plataforma Educativa',
        description:
          'Plataforma de preparación para oposiciones en Brasil. Desarrollé agentes inteligentes de IA para modernizar la interacción con el usuario, optimicé el checkout y las suscripciones (Hotmart y RevenueCat) con sincronización en tiempo real, y lideré migraciones de bases de datos de sistemas heredados.',
      },
      shark: {
        type: 'E-commerce + Lounge',
        description:
          'E-commerce y lounge de la tabaquería Shark Smokehouse, en producción, que diseñé y desarrollé. El checkout se recalcula y se graba en el servidor en una única transacción (precios, stock, cupón y pedido), con pagos PIX de Mercado Pago confirmados por webhooks firmados. Incluye programa de fidelidad con niveles y canjes, TPV de mostrador, automatizaciones de marketing, central de operaciones y 28 archivos de pruebas con Vitest.',
        highlight: { value: '61', label: 'usuarios registrados · en producción' },
      },
    },
    allRepos: 'Todos los repositorios',
    academic: {
      tcc: 'TFG (calificación máxima, en equipo): APIs CRUD equivalentes en Spring Boot y Quarkus sobre Kubernetes (GKE), probadas con JMeter. Spring Boot tuvo menor latencia y mayor throughput; Quarkus usó ~21 MiB frente a ~271 MiB en reposo y escaló con 3 pods frente a 10.',
      apex: 'Print server en Java/BIRT que genera informes (PDF, HTML, Excel) integrable con Oracle APEX, con Maven y Docker.',
      all: 'Todos los repositorios públicos, incluido el código de Shark Smokehouse.',
    },
  },
  recommendations: {
    label: 'Recomendaciones',
    title: 'Lo que',
    highlight: 'dicen',
    intro: 'Lo que dicen compañeros de equipo y de universidad sobre trabajar conmigo.',
    translated: 'Traducido del portugués',
    items: {
      monalisa: {
        note: 'Trabajó con João Pedro en el mismo equipo',
        text: 'João Pedro es un profesional extremadamente servicial, siempre dispuesto a apoyar y compartir conocimiento, con muchas ganas de enseñar y colaborar. Es alguien en quien se puede confiar de verdad: nunca deja a sus compañeros solos y está presente cuando se necesita apoyo, contribuyendo a un ambiente de trabajo sano. Sin duda aporta valor a cualquier equipo y lo recomiendo con total confianza.',
      },
      miqueias: {
        note: 'Trabajó con João Pedro en el mismo equipo',
        text: 'Me complace recomendar a João Pedro. Vi de cerca lo hábil, dedicado y confiable que es, con una sólida experiencia en TI que va desde infraestructura y soporte hasta desarrollo de software, automatización y RPA. Además de su talento técnico, es un gran compañero, siempre dispuesto a ayudar y a hacer los procesos más eficientes. Entrega resultados manteniendo la colaboración en el centro.',
      },
      luiz: {
        note: 'Compañero de universidad y de trabajo de fin de grado',
        text: 'Trabajé con João Pedro en la universidad en varios proyectos, incluido el trabajo de fin de grado. Se destacó por su dedicación, proactividad e ideas innovadoras, siempre poniendo manos a la obra. Su ética de trabajo y su disposición para ayudar fueron fundamentales para el éxito de los proyectos. Fue un placer trabajar con él.',
      },
    },
  },
  connect: {
    label: 'Contacto',
    title: ['Vamos a', 'construir', 'juntos'],
    intro: 'Abierto a oportunidades como desarrollador full stack y a proyectos de alto impacto. Creemos algo extraordinario.',
    email: 'Correo',
    copy: 'Copiar correo',
    copied: '¡Copiado!',
    sendEmail: 'Enviar correo',
    footerRole: 'Desarrollador Full Stack · Granada, España',
    cv: 'Descargar CV',
    built: 'Diseñado y desarrollado con',
    precision: 'precisión',
    backToTop: 'Volver arriba',
  },
}

export default es
