import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    company: 'Ouse Passar',
    role: 'Engenheiro de Software Full Stack',
    period: 'Fev 2026 — Atual',
    location: 'João Pessoa, PB',
    bullets: [
      'Desenvolveu integralmente a plataforma mobile "Código da Vida" (iOS/Android), da modelagem de dados à publicação — com arquitetura de Load Balance, protocolos de segurança e geração automatizada de conteúdo multimídia (áudio, texto, imagem) via integração nativa com IA.',
      'Otimizou a monetização e o checkout de "Código da Vida" e "Ouse Passar" integrando pagamentos e assinaturas (Hotmart e RevenueCat), com sincronização de planos em tempo real e menos falhas de conciliação financeira.',
      'Desenvolveu agentes inteligentes de IA para a "Ouse Passar", modernizando a interação com o usuário e automatizando processos lógicos no back-end.',
      'Conduziu a migração técnica e a evolução de bancos de sistemas legados, eliminando gargalos de performance e garantindo a integridade dos dados.',
    ],
    stack: ['React Native', 'Spring Boot', 'IA', 'RevenueCat', 'Hotmart'],
  },
  {
    company: 'INOVATEC-JP',
    role: 'Fullstack Software Engineer · Contrato',
    period: 'Out 2025 — Jan 2026',
    location: 'João Pessoa, PB · Híbrido',
    bullets: [
      'Desenvolveu, junto à equipe, o sistema SiCAPS para o PROCON-PB — digitalizando a coleta, organização e análise de preços, com cadastro de pesquisadores e estabelecimentos, coleta em campo, atribuição de equipes e monitoramento por geolocalização, gerando relatórios confiáveis em tempo real para todo o estado da Paraíba.',
      'Contribuiu para o Sistema de Fiscalização E-PROCON (PROCON-PB), digitalizando a fiscalização em campo: emissão de multas e autos em tempo real, painéis gerenciais e relatórios automáticos, acesso seguro em conformidade com a LGPD e comunicação ágil com fornecedores.',
      'Implementou uma plataforma de geração de PDFs em múltiplos formatos para a Prefeitura de João Pessoa usando BIRT, JasperReports e Pentaho com Spring Boot/Java — entregue em ~2 meses, com compatibilidade entre diferentes órgãos.',
    ],
    stack: ['Java', 'Spring Boot', 'Docker', 'Oracle APEX', 'BIRT', 'Jasper'],
  },
  {
    company: 'Sicredi',
    role: 'Desenvolvedor de Software (Estágio)',
    period: 'Mai 2024 — Set 2025',
    location: 'João Pessoa, PB',
    bullets: [
      'Automatizou a remoção de contas inativas com um robô completo em UiPath, substituindo o fluxo manual — mapeamento do processo, arquitetura da automação e validações que liberaram ~10% da capacidade para novos usuários ativos.',
      'Modernizou o gerador de PDFs do sistema legado, substituindo biblioteca PHP obsoleta por tecnologias modernas em produção — ~5% mais rápido e com qualidade visual significativamente melhor.',
      'Monitorou e manteve múltiplos robôs RPA em nuvem (Orchestrator), identificando falhas em tempo real e prevenindo downtime para manter a automação contínua.',
      'Propôs e implementou um sistema de gestão de inventário (entrada/saída de equipamentos), otimizando fluxos e a organização de ativos.',
    ],
    stack: ['JavaScript', 'PHP', 'Python', 'MySQL', 'UiPath', 'Orchestrator'],
  },
  {
    company: 'Sicredi',
    role: 'Técnico de Suporte em TI',
    period: 'Out 2023 — Mai 2024',
    location: 'João Pessoa, PB',
    bullets: [
      'Prestou suporte técnico a colaboradores e associados, garantindo alta disponibilidade e confiabilidade de serviços críticos.',
      'Geriu demandas internas com priorização e cumprimento de SLA, fortalecendo gestão de tempo e ownership.',
      'Atuou em ambientes Windows e Linux e na infraestrutura de rede (switches, roteadores, EdgeRouter, DigiEye), melhorando performance, estabilidade e segurança da rede corporativa.',
    ],
    stack: ['Windows', 'Linux', 'Redes', 'Suporte Técnico'],
  },
  {
    company: 'Dev Dynamos',
    role: 'Software Developer · Freelance',
    period: 'Mar 2023 — Out 2023',
    location: 'Remoto',
    bullets: [
      'Modelou o diagrama ER da plataforma DevConnect (que conecta desenvolvedores e recrutadores), estruturando o banco para suportar as funcionalidades e a escalabilidade.',
      'Produziu documentação técnica, wireframes e diagramas ER no Figma, acelerando a validação de requisitos e a tomada de decisão.',
      'Aplicou metodologias ágeis (Jira, Confluence) e boas práticas de engenharia, resultando em código limpo, escalável e de fácil manutenção.',
    ],
    stack: ['Java', 'JavaScript', 'PHP', 'MySQL', 'Vue', 'React', 'Docker'],
  },
]

function ExperienceCard({ exp }) {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  }, [])

  return (
    <div ref={ref} className="relative pl-8 md:pl-10" style={{ opacity: 0 }}>
      {/* Timeline node + line */}
      <span className="absolute left-0 top-2 w-3 h-3 rounded-full bg-orange-glow" style={{ boxShadow: '0 0 12px rgba(255,107,0,0.7)' }} />
      <span className="absolute left-[5px] top-6 bottom-0 w-px bg-white/10" />

      <div className="glass rounded-xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
          <div>
            <h3 className="font-gothic text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.02em' }}>
              {exp.company}
            </h3>
            <p className="font-mono text-xs text-orange-glow tracking-widest uppercase mt-1">{exp.role}</p>
          </div>
          <div className="md:text-right shrink-0">
            <span className="block font-mono text-xs text-white/45 tracking-wider whitespace-nowrap">{exp.period}</span>
            {exp.location && <span className="block font-mono text-[11px] text-white/30 mt-0.5">{exp.location}</span>}
          </div>
        </div>

        <ul className="space-y-4">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-white/55 text-sm leading-relaxed font-light">
              <span className="text-orange-glow/70 mt-1 shrink-0">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {exp.stack && exp.stack.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2.5">
            {exp.stack.map(s => (
              <span key={s} className="font-mono text-[11px] px-3 py-1.5 rounded border text-white/40 border-white/10">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExperienceSection({ cameraStateRef }) {
  const sectionRef = useRef()
  const headingRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (cameraStateRef) {
            gsap.to(cameraStateRef.current.position, { x: 2, y: -1, z: 6, duration: 2, ease: 'power2.out' })
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-20 section-wrap flex flex-col items-center text-center"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-12 h-px bg-orange-glow" />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Experiência</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <h2
        ref={headingRef}
        className="font-gothic text-white mb-20"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', opacity: 0 }}
      >
        A <span className="text-glow">JORNADA</span>
      </h2>

      <div className="flex flex-col gap-16 max-w-4xl w-full mx-auto text-left">
        {EXPERIENCES.map(exp => (
          <ExperienceCard key={exp.company} exp={exp} />
        ))}
      </div>
    </section>
  )
}
