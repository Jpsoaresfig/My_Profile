import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Each project is a star in the constellation. x/y are % positions in the map. */
const PROJECTS = [
  {
    id: 'codigodavida',
    title: 'Código da Vida',
    type: 'App Mobile · iOS / Android',
    description:
      'Aplicativo mobile desenvolvido do zero — da modelagem de dados à publicação nas lojas. Arquitetura de Load Balance e protocolos de segurança para alta disponibilidade, com geração automatizada de conteúdo multimídia (áudio, texto e imagem) via integração nativa com modelos de IA.',
    stack: ['React Native', 'Spring Boot', 'IA', 'RevenueCat'],
    demo: 'https://appcodigodavida.com.br/portal',
    color: '#FF6B00',
    star: { x: 22, y: 28 },
  },
  {
    id: 'ousepassar',
    title: 'Ouse Passar',
    type: 'Plataforma Educacional',
    description:
      'Plataforma de preparação para concursos. Desenvolvi agentes inteligentes de IA para modernizar a interação com o usuário, otimizei o checkout e as assinaturas (Hotmart e RevenueCat) com sincronização em tempo real, e conduzi migrações de banco de sistemas legados.',
    stack: ['React', 'Java', 'Spring Boot', 'IA', 'PostgreSQL'],
    demo: 'https://app.ousepassar.com.br/',
    color: '#61dafb',
    star: { x: 48, y: 58 },
  },
  {
    id: 'shark',
    title: 'Shark Smokehouse',
    type: 'E-commerce + Lounge',
    description:
      'E-commerce e lounge para a tabacaria Shark Smokehouse: catálogo, carrinho, checkout com baixa automática de estoque, programa de fidelidade, agendamento de lounge (com trava de conflito de horário) e um painel administrativo completo — produtos, pedidos, PDV, estoque, eventos e CMS.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Zustand', 'Firebase', 'Cloudinary'],
    link: 'https://github.com/Jpsoaresfig/Shark_SmokeHouse',
    demo: 'https://shark-smoke-house.vercel.app',
    color: '#6db33f',
    star: { x: 70, y: 20 },
  },
  {
    id: 'cinkhub',
    title: 'CinkHub',
    type: 'Sistema de Gestão',
    description:
      'Sistema de gestão para o Cink Studios, estúdio de tatuagem em João Pessoa: landing page configurável pelo admin, agendamento online com wizard por etapas, painel com calendário mensal, gestão de artistas e portfólio, loja com estoque e autenticação JWT com roles (admin, artista, cliente).',
    stack: ['Next.js 16', 'TypeScript', 'Firebase Firestore', 'JWT', 'Tailwind 4', 'Vercel'],
    link: 'https://github.com/Jpsoaresfig/CinkHub',
    demo: 'https://cink-hub.vercel.app',
    color: '#3178c6',
    star: { x: 78, y: 76 },
  },
]

const ACADEMIC = [
  {
    title: 'APEX Print Server (BIRT)',
    desc: 'Print server em Java/BIRT para gerar relatórios (PDF, HTML, Excel) integrável ao Oracle APEX, com Maven e Docker.',
    link: 'https://github.com/Jpsoaresfig/apex-print-server-birt',
  },
  { title: 'Photo Gallery', desc: 'Página em React que consome uma API e exibe fotos.', link: 'https://github.com/Jpsoaresfig' },
  { title: 'To Do List', desc: 'Lista de tarefas para praticar HTML, CSS e JavaScript.', link: 'https://github.com/Jpsoaresfig' },
  { title: 'Discord Page', desc: 'Página estilo Discord para praticar HTML e CSS.', link: 'https://github.com/Jpsoaresfig' },
]

function StarMap({ selected, onSelect }) {
  return (
    <div className="relative w-full" style={{ minHeight: '460px' }}>
      {/* Constellation lines connecting the stars in order */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <polyline
          points={PROJECTS.map(p => `${p.star.x}%,${p.star.y}%`).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {PROJECTS.map((p, i) => {
        const isActive = selected === i
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            aria-label={p.title}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
            style={{ left: `${p.star.x}%`, top: `${p.star.y}%` }}
          >
            {/* Halo */}
            <span
              className="absolute rounded-full transition-all duration-500"
              style={{
                width: isActive ? '46px' : '26px',
                height: isActive ? '46px' : '26px',
                background: `radial-gradient(circle, ${p.color}55, transparent 70%)`,
                opacity: isActive ? 1 : 0.5,
              }}
            />
            {/* Star core */}
            <span
              className="relative rounded-full transition-all duration-300"
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                background: p.color,
                boxShadow: `0 0 12px ${p.color}, 0 0 24px ${p.color}80`,
              }}
            />
            <span
              className="relative font-mono text-[10px] md:text-xs tracking-widest whitespace-nowrap transition-colors duration-300"
              style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}
            >
              {p.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ProjectDetail({ project }) {
  return (
    <div
      key={project.id}
      className="glass rounded-xl p-10 md:p-14 h-full flex flex-col"
      style={{ borderLeft: `2px solid ${project.color}` }}
    >
      <span className="font-mono text-xs tracking-widest mb-4 block" style={{ color: project.color }}>
        {project.type}
      </span>
      <h3
        className="font-gothic text-white mb-6"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
      >
        {project.title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed font-light flex-1">{project.description}</p>

      {project.stack.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-2.5">
          {project.stack.map(s => (
            <span key={s} className="font-mono text-xs px-3.5 py-1.5 rounded border text-white/45 border-white/10">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-6">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 font-mono text-xs transition-colors w-fit"
            style={{ color: project.color }}
          >
            <span className="tracking-widest uppercase">Ver ao vivo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-3 font-mono text-xs text-white/60 hover:text-white transition-colors w-fit"
          >
            <span className="tracking-widest uppercase">Ver no GitHub</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover/link:translate-x-1">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default function ProjectsSection({ cameraStateRef }) {
  const sectionRef = useRef()
  const headingRef = useRef()
  const detailRef = useRef()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        onEnter: () => {
          if (cameraStateRef) {
            gsap.to(cameraStateRef.current.position, { x: 3, y: -1, z: 8, duration: 2, ease: 'power2.inOut' })
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Fade the detail panel when the selected star changes
  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(detailRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    }
  }, [selected])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-20 section-wrap flex flex-col items-center text-center"
    >
      {/* Label */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-12 h-px bg-orange-glow" />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Projetos</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <div className="flex flex-col items-center mb-6 gap-4">
        <h2
          ref={headingRef}
          className="font-gothic text-white"
          style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', opacity: 0 }}
        >
          MINHA <span className="text-glow">CONSTELAÇÃO</span>
        </h2>

        <p className="font-mono text-xs text-white/30 tracking-widest">
          Cada estrela é um projeto. Toque para explorar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-6xl mx-auto text-left mt-12">
        <StarMap selected={selected} onSelect={setSelected} />
        <div ref={detailRef}>
          <ProjectDetail project={PROJECTS[selected]} />
        </div>
      </div>

      {/* Academic & practice projects */}
      <div className="mt-24 w-full max-w-5xl mx-auto text-left">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Práticas & Acadêmicos</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ACADEMIC.map(p => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-8 group hover:border-orange-glow/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-glow/70 text-xs">✦</span>
                <h4 className="font-gothic text-white text-xl group-hover:text-orange-glow transition-colors">{p.title}</h4>
              </div>
              <p className="text-white/45 text-sm font-light leading-relaxed">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
