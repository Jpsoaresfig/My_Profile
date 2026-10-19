# -*- coding: utf-8 -*-
"""Roteiro do vídeo principal "FROM PROBLEMS TO SOFTWARE | JOÃO PEDRO FIGUEIREDO".

Cada segmento = uma frase de narração. Campos:
  id     identificador usado pelas cenas para sincronizar animações
  scene  cena (1..9)
  es     texto da narração / legenda em espanhol
  en     legenda em inglês
  tts    (opcional) grafia ajustada para a pronúncia da voz sintética
  pause  silêncio (s) depois da frase
"""

VOICE = "es-ES-AlvaroNeural"
RATE = "-4%"

SEGMENTS = [
    # ---------------- CENA 1 — ABERTURA
    dict(id="open1", scene=1, pause=0.9,
         es="Todo sistema empieza con un problema.",
         en="Every system starts with a problem."),
    dict(id="open2", scene=1, pause=4.8,
         es="La diferencia está en cómo lo entendemos… y en lo que somos capaces de construir a partir de él.",
         en="The difference lies in how we understand it… and in what we can build from it."),

    # ---------------- CENA 2 — QUIÉN SOY
    dict(id="who1", scene=2, pause=0.5,
         es="Soy João Pedro Soares de Figueiredo, ingeniero de software full stack.",
         en="I'm João Pedro Soares de Figueiredo, a full stack software engineer.",
         tts="Soy Yoáo Pedro Soares de Figueiredo, ingeniero de software full stack."),
    dict(id="who2", scene=2, pause=0.5,
         es="Soy brasileño, graduado en Ciencias de la Computación por el Centro Universitario UNIPÊ, y llevo más de cuatro años trabajando en desarrollo de software, automatización y soporte de TI.",
         en="I'm Brazilian, with a degree in Computer Science from Centro Universitário UNIPÊ, and more than four years of experience in software development, automation and IT support.",
         tts="Soy brasileño, graduado en Ciencias de la Computación por el Centro Universitario Unipé, y llevo más de cuatro años trabajando en desarrollo de software, automatización y soporte de TI."),
    dict(id="who3", scene=2, pause=0.4,
         es="Hoy vivo en Granada, donde curso el Máster Universitario en Gestión y Tecnologías de Procesos de Negocio de la Universidad de Granada.",
         en="Today I live in Granada, where I'm studying for a Master's degree in Business Process Management and Technologies at the University of Granada."),
    dict(id="who4", scene=2, pause=1.0,
         es="Es la combinación que me interesa: ingeniería de software y procesos de negocio, trabajando juntos.",
         en="That's the combination I care about: software engineering and business processes, working together."),

    # ---------------- CENA 3 — CÓMO TRABAJO
    dict(id="how1", scene=3, pause=0.4,
         es="Mi forma de trabajar parte de una idea sencilla: entender el problema antes de escribir código.",
         en="The way I work starts from a simple idea: understand the problem before writing code."),
    dict(id="how2", scene=3, pause=0.4,
         es="Busco la solución adecuada, modelo los datos y los componentes, implemento, integro los servicios, pruebo y optimizo.",
         en="I look for the right solution, model the data and components, implement, integrate the services, test and optimize."),
    dict(id="how3", scene=3, pause=1.2,
         es="Y al final me hago una pregunta más: ¿qué cambia en la operación cuando esto funciona?",
         en="And at the end I ask one more question: what changes in the operation once this works?"),

    # ---------------- CENA 4 — INGENIERÍA FULL STACK
    dict(id="fs1", scene=4, pause=0.3,
         es="He trabajado en distintas capas de un producto.",
         en="I've worked across different layers of a product."),
    dict(id="fs2", scene=4, pause=0.3,
         es="En el backend, con Java y Spring Boot, Node.js, Python y PHP.",
         en="On the back end, with Java and Spring Boot, Node.js, Python and PHP."),
    dict(id="fs3", scene=4, pause=0.3,
         es="En el frontend, con React, TypeScript y Next.js.",
         en="On the front end, with React, TypeScript and Next.js."),
    dict(id="fs4", scene=4, pause=0.3,
         es="En los datos, con SQL, PostgreSQL y MySQL.",
         en="On the data side, with SQL, PostgreSQL and MySQL."),
    dict(id="fs5", scene=4, pause=0.7,
         es="Y en aplicaciones móviles y multiplataforma con Capacitor, conectadas a APIs REST, pagos y servicios externos.",
         en="And in mobile and cross-platform apps with Capacitor, connected to REST APIs, payments and external services."),
    dict(id="fs6", scene=4, pause=0.4,
         es="En Ouse Passar fui el desarrollador principal de Código da Vida, una aplicación para iOS, Android y web: del modelado de datos al backend y la publicación en las tiendas.",
         en="At Ouse Passar I was the main developer of Código da Vida, an app for iOS, Android and the web: from data modeling to the back end and the app store releases.",
         tts="En Ouse Pasar fui el desarrollador principal de Código da Vida, una aplicación para iOS, Android y web: del modelado de datos al backend y la publicación en las tiendas."),
    dict(id="fs7", scene=4, pause=1.0,
         es="Y trabajé en la plataforma de Ouse Passar: pagos y suscripciones con Hotmart y RevenueCat, infraestructura en VPS con Nginx, balanceo de carga y análisis de rendimiento en SQL.",
         en="I also worked on the Ouse Passar platform: payments and subscriptions with Hotmart and RevenueCat, VPS infrastructure with Nginx, load balancing and SQL performance analysis.",
         tts="Y trabajé en la plataforma de Ouse Pasar: pagos y suscripciones con Hotmart y RevenueCat, infraestructura en VPS con Nginx, balanceo de carga y análisis de rendimiento en SQL."),

    # ---------------- CENA 5 — IMPACTO REAL
    dict(id="imp0", scene=5, pause=0.8,
         es="Pero la tecnología tiene valor cuando mejora algo concreto.",
         en="But technology matters when it improves something concrete."),
    dict(id="imp1", scene=5, pause=0.4,
         es="En Inovatec-JP contribuí al desarrollo de E-PROCON, el sistema de fiscalización del PROCON de Paraíba, con Java y Spring Boot: inspecciones de campo digitales, sin papel ni bolígrafo, e informes automáticos.",
         en="At Inovatec-JP I contributed to E-PROCON, the inspection system of PROCON in Paraíba, built with Java and Spring Boot: digital field inspections, no pen and paper, and automated reports.",
         tts="En Inovatec J P contribuí al desarrollo de E-Procon, el sistema de fiscalización del Procon de Paraíba, con Java y Spring Boot: inspecciones de campo digitales, sin papel ni bolígrafo, e informes automáticos."),
    dict(id="imp2", scene=5, pause=1.6,
         es="El resultado informado en el proyecto: alrededor de un setenta por ciento menos de tiempo de procesamiento.",
         en="The result reported by the project: around seventy percent less processing time."),
    dict(id="imp3", scene=5, pause=0.6,
         es="Un trabajo de equipo, con atención a la interoperabilidad entre sistemas públicos y a la protección de datos según la LGPD.",
         en="A team effort, with attention to interoperability between public systems and to data protection under Brazil's LGPD.",
         tts="Un trabajo de equipo, con atención a la interoperabilidad entre sistemas públicos y a la protección de datos según la ele ge pe de."),
    dict(id="imp4", scene=5, pause=0.8,
         es="En SiCAPS, también para el PROCON, colaboré en la recogida digital de precios y el seguimiento por geolocalización en tiempo real.",
         en="On SiCAPS, also for PROCON, I helped build digital price collection and real-time geolocation tracking.",
         tts="En Sicaps, también para el Procon, colaboré en la recogida digital de precios y el seguimiento por geolocalización en tiempo real."),
    dict(id="imp5", scene=5, pause=1.2,
         es="En Sicredi, como becario de desarrollo, automaticé con UiPath y Python la gestión de cuentas inactivas, liberando cerca de un diez por ciento de capacidad operativa.",
         en="At Sicredi, as a development intern, I automated inactive-account management with UiPath and Python, freeing up about ten percent of operational capacity.",
         tts="En Sicredi, como becario de desarrollo, automaticé con UiPath y Python la gestión de cuentas inactivas, liberando cerca de un diez por ciento de capacidad operativa."),
    dict(id="imp6", scene=5, pause=1.2,
         es="Y modernicé un generador de PDF heredado en PHP: alrededor de un cinco por ciento menos de tiempo de procesamiento.",
         en="And I modernized a legacy PHP PDF generator: around five percent less processing time."),
    dict(id="imp7", scene=5, pause=1.2,
         es="Mejorar lo que ya existe, sin reescribirlo todo: encontrar el cuello de botella y actuar sobre él.",
         en="Improving what already exists, without rewriting everything: find the bottleneck and act on it."),

    # ---------------- CENA 6 — IA Y AUTOMATIZACIÓN
    dict(id="ai1", scene=6, pause=0.5,
         es="Para mí, la inteligencia artificial no es magia: es un componente más del sistema.",
         en="To me, artificial intelligence isn't magic: it's one more component of the system."),
    dict(id="ai2", scene=6, pause=0.5,
         es="En Ouse Passar desarrollé agentes con OpenAI y Gemini y flujos automatizados con n8n, conectados a datos, backend y servicios externos.",
         en="At Ouse Passar I built agents with OpenAI and Gemini and automated workflows with n8n, connected to data, the back end and external services.",
         tts="En Ouse Pasar desarrollé agentes con OpenAI y Gemini y flujos automatizados con ene ocho ene, conectados a datos, backend y servicios externos."),
    dict(id="ai4", scene=6, pause=0.6,
         es="Además, he creado agentes de IA que automatizan flujos completos, asistentes basados en modelos de lenguaje y generación de imágenes con Gemini, conectados mediante n8n y APIs a datos y productos reales.",
         en="Beyond that, I've built AI agents that automate complete workflows, assistants powered by large language models, and image generation with Gemini, connected through n8n and APIs to real data and products.",
         tts="Además, he creado agentes de IA que automatizan flujos completos, asistentes basados en modelos de lenguaje y generación de imágenes con Gemini, conectados mediante ene ocho ene y APIs a datos y productos reales."),
    dict(id="ai3", scene=6, pause=1.2,
         es="Y en Sicredi, la automatización tenía un objetivo muy concreto: quitar trabajo repetitivo y liberar tiempo para otras tareas.",
         en="And at Sicredi, automation had a very concrete goal: remove repetitive work and free up time for other tasks."),

    # ---------------- CENA 7 — PROYECTOS Y CURIOSIDAD TÉCNICA
    dict(id="pj1", scene=7, pause=0.3,
         es="También me gusta comparar alternativas con datos.",
         en="I also like comparing alternatives with data."),
    dict(id="pj2", scene=7, pause=0.4,
         es="En mi trabajo de fin de grado, junto a mis compañeros, comparamos Spring Boot y Quarkus para APIs en Java.",
         en="In my final degree project, together with my classmates, we compared Spring Boot and Quarkus for Java APIs."),
    dict(id="pj3", scene=7, pause=1.2,
         es="Desplegamos APIs equivalentes en Kubernetes y las sometimos a pruebas de carga con JMeter. En reposo, Spring Boot usaba unos 271 MiB de memoria; Quarkus, unos 21.",
         en="We deployed equivalent APIs on Kubernetes and load-tested them with JMeter. At idle, Spring Boot used about 271 MiB of memory; Quarkus, about 21.",
         tts="Desplegamos APIs equivalentes en Kubernetes y las sometimos a pruebas de carga con JMeter. En reposo, Spring Boot usaba unos doscientos setenta y un mebibytes de memoria; Quarkus, unos veintiuno."),
    dict(id="pj4", scene=7, pause=0.8,
         es="Pero Spring Boot tuvo menor latencia y mayor throughput, mientras que Quarkus soportó la carga con menos réplicas. La elección correcta depende del contexto y de lo que se mide.",
         en="But Spring Boot delivered lower latency and higher throughput, while Quarkus handled the load with fewer replicas. The right choice depends on the context and on what you measure."),
    dict(id="pj5", scene=7, pause=0.5,
         es="Y diseñé y desarrollé Shark Smokehouse: una plataforma de comercio electrónico y gestión para una tienda y lounge en João Pessoa, ya en producción con 61 usuarios registrados.",
         en="And I designed and built Shark Smokehouse: an e-commerce and management platform for a shop and lounge in João Pessoa, already in production with 61 registered users.",
         tts="Y diseñé y desarrollé Shark Smokehouse: una plataforma de comercio electrónico y gestión para una tienda y lounge en Yoáo Pessoa, ya en producción con sesenta y un usuarios registrados."),
    dict(id="pj6", scene=7, pause=1.2,
         es="Next.js, React, TypeScript, Firebase y Mercado Pago, con checkout transaccional en el servidor, pagos PIX confirmados por webhooks firmados, programa de fidelidad, punto de venta, automatizaciones de marketing y pruebas automatizadas con Vitest.",
         en="Next.js, React, TypeScript, Firebase and Mercado Pago, with a transactional checkout on the server, PIX payments confirmed by signed webhooks, a loyalty program, point of sale, marketing automations and automated tests with Vitest."),

    # ---------------- CENA 8 — TRAYECTORIA Y VISIÓN
    dict(id="tr1", scene=8, pause=0.3,
         es="Mi trayectoria combina capas distintas.",
         en="My path combines different layers."),
    dict(id="tr2", scene=8, pause=0.3,
         es="En Dev Dynamos trabajé en modelado de datos, prototipos en Figma y documentación.",
         en="At Dev Dynamos I worked on data modeling, Figma prototypes and documentation."),
    dict(id="tr3", scene=8, pause=0.3,
         es="En Sicredi pasé por el soporte técnico: redes, servidores Windows y Linux.",
         en="At Sicredi I worked in technical support: networks, Windows and Linux servers."),
    dict(id="tr4", scene=8, pause=0.6,
         es="Y de ahí al desarrollo, la automatización y los productos completos. Por eso sé que una aplicación siempre vive dentro de un entorno técnico real.",
         en="And from there to development, automation and complete products. That's why I know an application always lives inside a real technical environment."),
    dict(id="tr5", scene=8, pause=0.5,
         es="Hoy, desde Granada, sumo a esa experiencia una mirada de procesos de negocio. Hablo portugués, inglés y español.",
         en="Today, from Granada, I'm adding a business-process perspective to that experience. I speak Portuguese, English and Spanish."),
    dict(id="tr6", scene=8, pause=1.4,
         es="Me gusta entender cómo funcionan las cosas, convertir ideas en sistemas reales y aprender lo necesario para resolver problemas en distintas capas.",
         en="I like understanding how things work, turning ideas into real systems and learning whatever it takes to solve problems across different layers."),

    # ---------------- CENA 9 — CIERRE
    dict(id="end1", scene=9, pause=9.0,
         es="Si tienes un reto técnico, un producto que construir o un proceso que mejorar, me gustaría hablar contigo.",
         en="If you have a technical challenge, a product to build or a process to improve, I'd like to talk with you."),
]

LEAD_IN = 1.2  # silêncio antes da primeira frase

# ------------------------------------------------------------------ versões EN / PT
VOICES = {"es": VOICE, "en": "en-US-AndrewNeural", "pt": "pt-BR-AntonioNeural"}

PT = {
    "open1": "Todo sistema começa com um problema.",
    "open2": "A diferença está em como o entendemos… e no que somos capazes de construir a partir dele.",
    "who1": "Sou João Pedro Soares de Figueiredo, engenheiro de software full stack.",
    "who2": "Sou brasileiro, formado em Ciência da Computação pelo Centro Universitário UNIPÊ, e tenho mais de quatro anos de experiência em desenvolvimento de software, automação e suporte de TI.",
    "who3": "Hoje moro em Granada, onde curso o Mestrado em Gestão e Tecnologias de Processos de Negócio da Universidade de Granada.",
    "who4": "É a combinação que me interessa: engenharia de software e processos de negócio, trabalhando juntos.",
    "how1": "Minha forma de trabalhar parte de uma ideia simples: entender o problema antes de escrever código.",
    "how2": "Busco a solução adequada, modelo os dados e os componentes, implemento, integro os serviços, testo e otimizo.",
    "how3": "E no final faço mais uma pergunta: o que muda na operação quando isso funciona?",
    "fs1": "Já trabalhei em diferentes camadas de um produto.",
    "fs2": "No backend, com Java e Spring Boot, Node.js, Python e PHP.",
    "fs3": "No frontend, com React, TypeScript e Next.js.",
    "fs4": "Nos dados, com SQL, PostgreSQL e MySQL.",
    "fs5": "E em aplicações mobile e multiplataforma com Capacitor, conectadas a APIs REST, pagamentos e serviços externos.",
    "fs6": "Na Ouse Passar, fui o desenvolvedor principal do Código da Vida, um aplicativo para iOS, Android e web: da modelagem de dados ao backend e à publicação nas lojas.",
    "fs7": "E trabalhei na plataforma da Ouse Passar: pagamentos e assinaturas com Hotmart e RevenueCat, infraestrutura em VPS com Nginx, balanceamento de carga e análise de desempenho em SQL.",
    "imp0": "Mas a tecnologia tem valor quando melhora algo concreto.",
    "imp1": "Na Inovatec-JP, contribuí para o desenvolvimento do E-PROCON, o sistema de fiscalização do PROCON da Paraíba, com Java e Spring Boot: fiscalizações de campo digitais, sem papel e caneta, e relatórios automáticos.",
    "imp2": "O resultado informado no projeto: cerca de setenta por cento menos tempo de processamento.",
    "imp3": "Um trabalho de equipe, com atenção à interoperabilidade entre sistemas públicos e à proteção de dados conforme a LGPD.",
    "imp4": "No SiCAPS, também para o PROCON, colaborei na coleta digital de preços e no acompanhamento por geolocalização em tempo real.",
    "imp5": "No Sicredi, como estagiário de desenvolvimento, automatizei com UiPath e Python a gestão de contas inativas, liberando cerca de dez por cento de capacidade operacional.",
    "imp6": "E modernizei um gerador de PDF legado em PHP: cerca de cinco por cento menos tempo de processamento.",
    "imp7": "Melhorar o que já existe, sem reescrever tudo: encontrar o gargalo e agir sobre ele.",
    "ai1": "Para mim, inteligência artificial não é mágica: é mais um componente do sistema.",
    "ai2": "Na Ouse Passar, desenvolvi agentes com OpenAI e Gemini e fluxos automatizados com n8n, conectados a dados, backend e serviços externos.",
    "ai4": "Além disso, criei agentes de IA que automatizam fluxos completos, assistentes baseados em modelos de linguagem e geração de imagens com Gemini, conectados por n8n e APIs a dados e produtos reais.",
    "ai3": "E no Sicredi, a automação tinha um objetivo muito concreto: tirar trabalho repetitivo e liberar tempo para outras tarefas.",
    "pj1": "Também gosto de comparar alternativas com dados.",
    "pj2": "No meu trabalho de conclusão de curso, junto com meus colegas, comparamos Spring Boot e Quarkus para APIs em Java.",
    "pj3": "Implantamos APIs equivalentes no Kubernetes e fizemos testes de carga com JMeter. Em repouso, o Spring Boot usava cerca de 271 MiB de memória; o Quarkus, cerca de 21.",
    "pj4": "Mas o Spring Boot teve menor latência e maior throughput, enquanto o Quarkus sustentou a carga com menos réplicas. A escolha certa depende do contexto e do que se mede.",
    "pj5": "E projetei e desenvolvi o Shark Smokehouse: uma plataforma de e-commerce e gestão para uma loja e lounge em João Pessoa, já em produção com 61 usuários cadastrados.",
    "pj6": "Next.js, React, TypeScript, Firebase e Mercado Pago, com checkout transacional no servidor, pagamentos PIX confirmados por webhooks assinados, programa de fidelidade, PDV, automações de marketing e testes automatizados com Vitest.",
    "tr1": "Minha trajetória combina camadas diferentes.",
    "tr2": "Na Dev Dynamos, trabalhei com modelagem de dados, protótipos no Figma e documentação.",
    "tr3": "No Sicredi, passei pelo suporte técnico: redes, servidores Windows e Linux.",
    "tr4": "E daí para o desenvolvimento, a automação e produtos completos. Por isso sei que uma aplicação sempre vive dentro de um ambiente técnico real.",
    "tr5": "Hoje, de Granada, somo a essa experiência um olhar de processos de negócio. Falo português, inglês e espanhol.",
    "tr6": "Gosto de entender como as coisas funcionam, transformar ideias em sistemas reais e aprender o necessário para resolver problemas em diferentes camadas.",
    "end1": "Se você tem um desafio técnico, um produto para construir ou um processo para melhorar, eu gostaria de conversar com você.",
}

TTS_EN = {
    "imp1": "At Inovatec J P I contributed to E-PROCON, the inspection system of PROCON in Paraíba, built with Java and Spring Boot: digital field inspections, no pen and paper, and automated reports.",
    "ai2": "At Ouse Passar I built agents with OpenAI and Gemini and automated workflows with n eight n, connected to data, the back end and external services.",
    "pj5": "And I designed and built Shark Smokehouse: an e-commerce and management platform for a shop and lounge in João Pessoa, already in production with sixty-one registered users.",
    "ai4": "Beyond that, I've built AI agents that automate complete workflows, assistants powered by large language models, and image generation with Gemini, connected through n eight n and APIs to real data and products.",
    "pj3": "We deployed equivalent APIs on Kubernetes and load-tested them with J Meter. At idle, Spring Boot used about two hundred seventy-one mebibytes of memory; Quarkus, about twenty-one.",
}

TTS_PT = {
    "imp1": "Na Inovatec J P, contribuí para o desenvolvimento do E-PROCON, o sistema de fiscalização do PROCON da Paraíba, com Java e Spring Boot: fiscalizações de campo digitais, sem papel e caneta, e relatórios automáticos.",
    "ai2": "Na Ouse Passar, desenvolvi agentes com OpenAI e Gemini e fluxos automatizados com ene oito ene, conectados a dados, backend e serviços externos.",
    "ai4": "Além disso, criei agentes de IA que automatizam fluxos completos, assistentes baseados em modelos de linguagem e geração de imagens com Gemini, conectados por ene oito ene e APIs a dados e produtos reais.",
    "pj3": "Implantamos APIs equivalentes no Kubernetes e fizemos testes de carga com JMeter. Em repouso, o Spring Boot usava cerca de duzentos e setenta e um mebibytes de memória; o Quarkus, cerca de vinte e um.",
}

for _s in SEGMENTS:
    _s["pt"] = PT[_s["id"]]
    _s["tts_es"] = _s.pop("tts", _s["es"])
    _s["tts_en"] = TTS_EN.get(_s["id"], _s["en"])
    _s["tts_pt"] = TTS_PT.get(_s["id"], _s["pt"])

# idioma da legenda queimada em cada versão
BURN_SUBS = {"es": "en", "en": "en", "pt": "pt"}
