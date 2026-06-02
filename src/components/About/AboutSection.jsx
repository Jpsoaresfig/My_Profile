import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EDUCATION = [
  {
    tag: 'Graduação',
    title: 'Ciência da Computação',
    place: 'Centro Universitário de João Pessoa (UNIPÊ) — PB',
    detail: 'Fev 2022 — Dez 2025',
  },
  {
    tag: 'Mestrado',
    title: 'Business Process Management & Technologies',
    place: 'Universidade de Granada — Espanha',
    detail: 'Em andamento',
  },
]

function Reveal({ children, y = 40, delay = 0, className = '' }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y },
      {
        opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  }, [])
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>
}

export default function AboutSection({ cameraStateRef }) {
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
            gsap.to(cameraStateRef.current.position, { x: 0, y: 0.5, z: 6.5, duration: 2, ease: 'power2.out' })
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-20 section-wrap flex flex-col items-center text-center"
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-12 h-px bg-orange-glow" />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Sobre</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <h2
        ref={headingRef}
        className="font-gothic text-white mb-12"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', opacity: 0 }}
      >
        QUEM <span className="text-glow">EU SOU</span>
      </h2>

      {/* Bio */}
      <div className="max-w-3xl mx-auto space-y-6 mb-24">
        <Reveal>
          <p className="text-white/70 text-lg md:text-2xl leading-relaxed font-light">
            Sou <span className="text-white">João Pedro Soares</span>, desenvolvedor
            full stack <span className="text-orange-glow">pleno</span> nascido em Natal, RN
            e radicado em João Pessoa, PB.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
            Construo sistemas de ponta a ponta — arquitetura, back-end, automação e integração —
            com foco em eficiência, automação de processos e transformação digital. Minha expertise
            abrange Java, Spring Boot, Oracle APEX, UiPath, PHP e tecnologias modernas de front-end.
            Já entregei soluções de alto impacto para o setor público e financeiro, sempre com código
            limpo, escalabilidade e segurança da informação (LGPD). Apaixonado por aprender rápido e
            construir sistemas confiáveis que geram valor real.
          </p>
        </Reveal>
      </div>

      {/* Formação */}
      <Reveal className="w-full max-w-4xl mx-auto flex items-center justify-center gap-4 mb-8">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-xs text-orange-glow tracking-widest uppercase">Formação</span>
        <div className="h-px flex-1 bg-white/10" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-4xl mx-auto w-full">
        {EDUCATION.map((ed, i) => (
          <Reveal key={ed.title} delay={i * 0.08}>
            <div className="glass rounded-xl p-8 h-full">
              <span className="font-mono text-xs text-orange-glow tracking-widest uppercase block mb-4">{ed.tag}</span>
              <h4 className="font-gothic text-white text-2xl leading-tight">{ed.title}</h4>
              <p className="text-white/50 text-sm font-light mt-3">{ed.place}</p>
              <p className="font-mono text-xs text-white/35 mt-2">{ed.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-32">
        <div className="glass rounded-xl px-10 py-7 mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
          <span className="font-mono text-xs text-orange-glow tracking-widest uppercase">Idiomas</span>
          <span className="text-white/70 text-sm">Português — <span className="text-white/40">Nativo</span></span>
          <span className="text-white/70 text-sm">Inglês — <span className="text-white/40">Avançado</span></span>
        </div>
      </Reveal>
    </section>
  )
}
