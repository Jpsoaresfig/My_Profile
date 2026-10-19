# -*- coding: utf-8 -*-
"""Gera o CV em EN, ES e PT (A4, uma página) em public/cv/, com o mesmo conteúdo nos três idiomas.

Uso: python cv/gerar_cv.py            (requer reportlab; usa as fontes Arial do Windows)
     python cv/gerar_cv.py --telefone (inclui o telefone no cabeçalho)
"""
import os, sys
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "cv")
FONTS = "C:/Windows/Fonts"
pdfmetrics.registerFont(TTFont("Arial", f"{FONTS}/arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", f"{FONTS}/arialbd.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")

NAVY, BLUE, GREY, RULE = HexColor("#1F3A5F"), HexColor("#2F6DB5"), HexColor("#4A4A4A"), HexColor("#9A9A9A")
PHONE = "+55 (83) 99382-6429"
SITE = "jpsoaresfig.dev"

S = dict(
    name=ParagraphStyle("name", fontName="Arial-Bold", fontSize=17, leading=21, alignment=TA_CENTER, textColor=NAVY),
    role=ParagraphStyle("role", fontName="Arial-Bold", fontSize=10.5, leading=14, alignment=TA_CENTER, textColor=BLUE),
    contact=ParagraphStyle("contact", fontName="Arial", fontSize=8.6, leading=11.5, alignment=TA_CENTER, textColor=GREY),
    h=ParagraphStyle("h", fontName="Arial-Bold", fontSize=10.3, leading=12.5, alignment=TA_CENTER, textColor=NAVY, spaceBefore=3),
    body=ParagraphStyle("body", fontName="Arial", fontSize=8.7, leading=11.1),
    job=ParagraphStyle("job", fontName="Arial", fontSize=8.7, leading=11.1, textColor=HexColor("#3A4A5C"), spaceBefore=3.5, spaceAfter=0.8, keepWithNext=1),
    bullet=ParagraphStyle("bullet", fontName="Arial", fontSize=8.7, leading=10.9, leftIndent=11, bulletIndent=1, spaceAfter=0.9),
)

LINKS = {
    "linkedin": "https://www.linkedin.com/in/joaopedrosoaresfigueiredo",
    "github": "https://github.com/Jpsoaresfig",
    "site": f"https://{SITE}",
}

# ------------------------------------------------------------------ conteúdo (mesmos fatos nos três idiomas)
CV = {
    "en": dict(
        role="FULL STACK SOFTWARE ENGINEER",
        city="Granada, Spain",
        site="Portfolio and 5-minute film",
        langs="<b>Nationality:</b> Brazilian | <b>Work permit:</b> Spain | <b>Languages:</b> Portuguese (Native), English (C1 written / B2 spoken), "
              "Spanish (B2 comprehension / B1 spoken &amp; written)",
        h=["PROFESSIONAL SUMMARY", "EDUCATION", "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE", "SELECTED PROJECTS"],
        summary="Full Stack Software Engineer with 4+ years of experience building web, mobile and backend systems with Java "
                "(Spring Boot), TypeScript (React, Node.js), Python and SQL. Experience in REST architectures, applied AI "
                "integration, process automation, database optimization and cloud infrastructure across the financial, public "
                "and edtech sectors.",
        education=["<b>Master's in Business Process Management &amp; Technologies</b> — University of Granada (2026 – 2027)",
                   "<b>B.Sc. in Computer Science</b> — Centro Universitário UNIPÊ (2025)"],
        skills=[("Backend &amp; Languages", "Java (Spring Boot), Node.js, Python, PHP, C#, SQL (PostgreSQL, MySQL, Oracle), REST APIs."),
                ("Frontend &amp; Mobile", "React, Next.js, TypeScript, React Native, Capacitor, HTML5/CSS3."),
                ("Cloud, DevOps &amp; AI", "Docker, AWS, GCP, Vercel, Supabase, Firebase, Nginx, OpenAI, Gemini, n8n, CI/CD."),
                ("Methodologies &amp; Tools", "Git, Scrum, Jira, Confluence."),
                ("Enterprise &amp; Low-Code", "Oracle APEX, BIRT, JasperReports, UiPath.")],
        jobs=[
            ("Full Stack Developer (Contract)", "Ouse Passar", "Jan 2026 – Jul 2026", [
                'End-to-end development (iOS/Android/Web) of "Código da Vida" as lead developer, using React, TypeScript, Capacitor and Supabase/PostgreSQL.',
                "AI agents and automated workflows (OpenAI, Gemini, n8n) for context-driven multimedia processing.",
                "Payment gateways and recurring subscriptions with Hotmart and RevenueCat.",
                "Infrastructure configuration (Nginx, VPS, load balancing) and SQL performance tuning on legacy databases."]),
            ("Full Stack Developer (Contract)", "Inovatec-JP", "Oct 2025 – Aug 2026", [
                "<b>SiCAPS (PROCON-PB):</b> co-developed a field price-collection system with real-time geolocation tracking.",
                "<b>E-PROCON (PROCON-PB):</b> as part of the team, digitized paper-based inspection workflows, cutting processing time by ~70%, with LGPD-compliant dashboards.",
                "Integrated enterprise reporting engines and public interoperability services using Java (Spring Boot), BIRT and Jasper."]),
            ("Software Developer Intern", "Sicredi Evolução", "May 2024 – Sep 2025", [
                "Built automation bots (UiPath/Python) for inactive account management, freeing up ~10% of operational capacity.",
                "Optimized a legacy PHP PDF generation engine, reducing processing time by ~5%.",
                "Developed a web-based IT inventory system for hardware tracking and asset traceability."]),
            ("IT Support Technician", "Sicredi Evolução", "Oct 2023 – May 2024", [
                "Maintained network infrastructure, Windows/Linux servers, routers (EdgeRouter), switches and DigiEye CCTV systems."]),
            ("Software Developer", "Dev Dynamos", "Mar 2023 – Oct 2023", [
                "Designed SQL entity-relationship models for DevConnect, created Figma wireframes and documented technical specs in Jira/Confluence."]),
        ],
        projects=[
            "<b>Shark Smokehouse</b> — designed and built an e-commerce and management platform, in production with 61 registered users. "
            "Next.js, React, TypeScript, Firebase and Mercado Pago: server-side transactional checkout, PIX payments confirmed via webhook "
            "and checked against the Mercado Pago API, loyalty program, point of sale, marketing automations and 30 Vitest test files.",
            "<b>Final degree project: Spring Boot vs Quarkus</b> (team, highest grade) — equivalent CRUD APIs on Kubernetes (GKE), "
            "load-tested with JMeter. Spring Boot delivered lower latency and higher throughput; Quarkus used ~21 MiB vs ~271 MiB at idle "
            "and scaled with 3 pods vs 10.",
        ],
    ),
    "es": dict(
        role="INGENIERO DE SOFTWARE FULL STACK",
        city="Granada, España",
        site="Portafolio y vídeo de 5 minutos",
        langs="<b>Nacionalidad:</b> brasileña | <b>Permiso de trabajo:</b> España | <b>Idiomas:</b> portugués (nativo), inglés (C1 escrito / B2 oral), "
              "español (B2 comprensión / B1 oral y escrito)",
        h=["PERFIL PROFESIONAL", "FORMACIÓN", "COMPETENCIAS TÉCNICAS", "EXPERIENCIA PROFESIONAL", "PROYECTOS DESTACADOS"],
        summary="Ingeniero de software full stack con más de 4 años de experiencia desarrollando sistemas web, móviles y backend con "
                "Java (Spring Boot), TypeScript (React, Node.js), Python y SQL. Experiencia en arquitecturas REST, integración de IA "
                "aplicada, automatización de procesos, optimización de bases de datos e infraestructura cloud en los sectores "
                "financiero, público y educativo.",
        education=["<b>Máster Universitario en Gestión y Tecnologías de Procesos de Negocio</b> — Universidad de Granada (2026 – 2027)",
                   "<b>Grado en Ciencias de la Computación</b> — Centro Universitário UNIPÊ (2025)"],
        skills=[("Backend y lenguajes", "Java (Spring Boot), Node.js, Python, PHP, C#, SQL (PostgreSQL, MySQL, Oracle), APIs REST."),
                ("Frontend y móvil", "React, Next.js, TypeScript, React Native, Capacitor, HTML5/CSS3."),
                ("Cloud, DevOps e IA", "Docker, AWS, GCP, Vercel, Supabase, Firebase, Nginx, OpenAI, Gemini, n8n, CI/CD."),
                ("Metodologías y herramientas", "Git, Scrum, Jira, Confluence."),
                ("Enterprise y low-code", "Oracle APEX, BIRT, JasperReports, UiPath.")],
        jobs=[
            ("Desarrollador Full Stack (contrato)", "Ouse Passar", "ene 2026 – jul 2026", [
                'Desarrollo de punta a punta (iOS/Android/Web) de "Código da Vida" como desarrollador principal, con React, TypeScript, Capacitor y Supabase/PostgreSQL.',
                "Agentes de IA y flujos automatizados (OpenAI, Gemini, n8n) para el procesamiento de contenido multimedia según el contexto.",
                "Pasarelas de pago y suscripciones recurrentes con Hotmart y RevenueCat.",
                "Configuración de infraestructura (Nginx, VPS, balanceo de carga) y optimización de consultas SQL en bases de datos heredadas."]),
            ("Desarrollador Full Stack (contrato)", "Inovatec-JP", "oct 2025 – ago 2026", [
                "<b>SiCAPS (PROCON-PB):</b> codesarrollo de un sistema de recogida de precios en campo con seguimiento por geolocalización en tiempo real.",
                "<b>E-PROCON (PROCON-PB):</b> en equipo, digitalización de los procesos de inspección en papel, con una reducción de ~70 % en el tiempo de procesamiento y paneles conformes a la LGPD.",
                "Integración de motores de informes y servicios de interoperabilidad pública con Java (Spring Boot), BIRT y Jasper."]),
            ("Becario de Desarrollo de Software", "Sicredi Evolução", "may 2024 – sep 2025", [
                "Robots de automatización (UiPath/Python) para la gestión de cuentas inactivas, liberando ~10 % de capacidad operativa.",
                "Optimización de un generador de PDF heredado en PHP, con ~5 % menos de tiempo de procesamiento.",
                "Desarrollo de un sistema web de inventario de TI para el seguimiento de equipos y la trazabilidad de activos."]),
            ("Técnico de Soporte de TI", "Sicredi Evolução", "oct 2023 – may 2024", [
                "Mantenimiento de la infraestructura de red, servidores Windows/Linux, routers (EdgeRouter), switches y sistemas de videovigilancia DigiEye."]),
            ("Desarrollador de Software", "Dev Dynamos", "mar 2023 – oct 2023", [
                "Modelado entidad-relación en SQL para DevConnect, wireframes en Figma y documentación técnica en Jira/Confluence."]),
        ],
        projects=[
            "<b>Shark Smokehouse</b> — diseño y desarrollo de una plataforma de comercio electrónico y gestión, en producción con 61 usuarios "
            "registrados. Next.js, React, TypeScript, Firebase y Mercado Pago: checkout transaccional en el servidor, pagos PIX confirmados por webhook "
            "y verificados en la API de Mercado Pago, programa de fidelidad, TPV, automatizaciones de marketing y 30 archivos de pruebas con Vitest.",
            "<b>TFG: Spring Boot vs Quarkus</b> (en equipo, calificación máxima) — APIs CRUD equivalentes sobre Kubernetes (GKE), probadas "
            "con JMeter. Spring Boot tuvo menor latencia y mayor throughput; Quarkus usó ~21 MiB frente a ~271 MiB en reposo y escaló con "
            "3 pods frente a 10.",
        ],
    ),
    "pt": dict(
        role="ENGENHEIRO DE SOFTWARE FULL STACK",
        city="Granada, Espanha",
        site="Portfólio e vídeo de 5 minutos",
        langs="<b>Nacionalidade:</b> brasileira | <b>Autorização de trabalho:</b> Espanha | <b>Idiomas:</b> português (nativo), inglês (C1 escrita / B2 conversação), "
              "espanhol (B2 compreensão / B1 conversação e escrita)",
        h=["RESUMO PROFISSIONAL", "FORMAÇÃO", "COMPETÊNCIAS TÉCNICAS", "EXPERIÊNCIA PROFISSIONAL", "PROJETOS EM DESTAQUE"],
        summary="Engenheiro de software full stack com mais de 4 anos de experiência desenvolvendo sistemas web, mobile e backend com "
                "Java (Spring Boot), TypeScript (React, Node.js), Python e SQL. Experiência em arquiteturas REST, integração de IA "
                "aplicada, automação de processos, otimização de bancos de dados e infraestrutura em nuvem nos setores financeiro, "
                "público e educacional.",
        education=["<b>Mestrado em Gestão e Tecnologias de Processos de Negócio</b> — Universidad de Granada (2026 – 2027)",
                   "<b>Bacharelado em Ciência da Computação</b> — Centro Universitário UNIPÊ (2025)"],
        skills=[("Backend e linguagens", "Java (Spring Boot), Node.js, Python, PHP, C#, SQL (PostgreSQL, MySQL, Oracle), APIs REST."),
                ("Frontend e mobile", "React, Next.js, TypeScript, React Native, Capacitor, HTML5/CSS3."),
                ("Cloud, DevOps e IA", "Docker, AWS, GCP, Vercel, Supabase, Firebase, Nginx, OpenAI, Gemini, n8n, CI/CD."),
                ("Metodologias e ferramentas", "Git, Scrum, Jira, Confluence."),
                ("Enterprise e low-code", "Oracle APEX, BIRT, JasperReports, UiPath.")],
        jobs=[
            ("Desenvolvedor Full Stack (contrato)", "Ouse Passar", "jan 2026 – jul 2026", [
                'Desenvolvimento ponta a ponta (iOS/Android/Web) do "Código da Vida" como desenvolvedor principal, com React, TypeScript, Capacitor e Supabase/PostgreSQL.',
                "Agentes de IA e fluxos automatizados (OpenAI, Gemini, n8n) para processamento de conteúdo multimídia orientado por contexto.",
                "Gateways de pagamento e assinaturas recorrentes com Hotmart e RevenueCat.",
                "Configuração de infraestrutura (Nginx, VPS, balanceamento de carga) e otimização de consultas SQL em bancos legados."]),
            ("Desenvolvedor Full Stack (contrato)", "Inovatec-JP", "out 2025 – ago 2026", [
                "<b>SiCAPS (PROCON-PB):</b> codesenvolvimento de um sistema de coleta de preços em campo com rastreamento por geolocalização em tempo real.",
                "<b>E-PROCON (PROCON-PB):</b> em equipe, digitalização dos processos de fiscalização em papel, com redução de ~70% no tempo de processamento e painéis em conformidade com a LGPD.",
                "Integração de motores de relatórios e serviços de interoperabilidade pública com Java (Spring Boot), BIRT e Jasper."]),
            ("Estagiário em Desenvolvimento de Software", "Sicredi Evolução", "mai 2024 – set 2025", [
                "Robôs de automação (UiPath/Python) para a gestão de contas inativas, liberando ~10% da capacidade operacional.",
                "Otimização de um gerador de PDF legado em PHP, com ~5% menos tempo de processamento.",
                "Desenvolvimento de um sistema web de inventário de TI para rastreamento de equipamentos e de ativos."]),
            ("Técnico de Suporte em TI", "Sicredi Evolução", "out 2023 – mai 2024", [
                "Manutenção da infraestrutura de rede, servidores Windows/Linux, roteadores (EdgeRouter), switches e sistemas de CFTV DigiEye."]),
            ("Desenvolvedor de Software", "Dev Dynamos", "mar 2023 – out 2023", [
                "Modelagem entidade-relacionamento em SQL para o DevConnect, wireframes no Figma e documentação técnica no Jira/Confluence."]),
        ],
        projects=[
            "<b>Shark Smokehouse</b> — projetei e desenvolvi uma plataforma de e-commerce e gestão, em produção com 61 usuários cadastrados. "
            "Next.js, React, TypeScript, Firebase e Mercado Pago: checkout transacional no servidor, pagamentos PIX confirmados por webhook "
            "e conferidos na API do Mercado Pago, programa de fidelidade, PDV, automações de marketing e 30 arquivos de testes com Vitest.",
            "<b>TCC: Spring Boot vs Quarkus</b> (em equipe, nota máxima) — APIs CRUD equivalentes no Kubernetes (GKE), testadas com "
            "JMeter. O Spring Boot teve menor latência e maior throughput; o Quarkus usou ~21 MiB contra ~271 MiB em repouso e escalou "
            "com 3 pods contra 10.",
        ],
    ),
}


def rule():
    return HRFlowable(width="100%", thickness=0.6, color=RULE, spaceBefore=2, spaceAfter=4)


def build(lang, phone):
    c = CV[lang]
    link = lambda key, label: f'<a href="{LINKS[key]}" color="#4A4A4A">{label}</a>'
    contact = [c["city"]] + ([PHONE] if phone else []) + [
        '<a href="mailto:jpbusinesss@hotmail.com" color="#4A4A4A">jpbusinesss@hotmail.com</a>',
        link("linkedin", "linkedin.com/in/joaopedrosoaresfigueiredo"),
        link("github", "github.com/Jpsoaresfig"),
    ]
    story = [
        Paragraph("JOÃO PEDRO SOARES DE FIGUEIREDO", S["name"]),
        Paragraph(c["role"], S["role"]),
        Paragraph(" | ".join(contact), S["contact"]),
        Paragraph(f'{c["site"]}: <a href="{LINKS["site"]}" color="#2F6DB5"><b>{SITE}</b></a>', S["contact"]),
        Paragraph(c["langs"], S["contact"]),
        Spacer(1, 3),
    ]

    def section(i, flow):
        # o título da seção nunca fica sozinho no fim da página
        story.append(KeepTogether([rule(), Paragraph(c["h"][i], S["h"]), rule(), flow[0]]))
        story.extend(flow[1:])

    bullet = lambda txt: Paragraph(txt, S["bullet"], bulletText="•")
    section(0, [Paragraph(c["summary"], S["body"])])
    section(1, [bullet(x) for x in c["education"]])
    section(2, [bullet(f"<b>{k}:</b> {v}") for k, v in c["skills"]])
    jobs = []
    for role, company, dates, items in c["jobs"]:
        jobs += [Paragraph(f"<b>{role} | {company}</b>  {dates}", S["job"]), *[bullet(x) for x in items]]
    section(3, jobs)
    section(4, [bullet(x) for x in c["projects"]])

    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"Joao_Pedro_Soares_CV_{lang.upper()}.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm, topMargin=11 * mm, bottomMargin=9 * mm,
                            title=f"João Pedro Soares de Figueiredo — CV ({lang.upper()})", author="João Pedro Soares de Figueiredo")
    # espaço não separável antes do "%" (no ES "~70 %" quebrava a linha no meio)
    for f in story:
        if isinstance(f, Paragraph):
            pass
    doc.build(story)
    return path


if __name__ == "__main__":
    for lang in CV:
        print(build(lang, "--telefone" in sys.argv))
