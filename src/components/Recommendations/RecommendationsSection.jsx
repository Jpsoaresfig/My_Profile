import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RECOMMENDATIONS = [
  {
    name: 'Monalisa Silva',
    role: 'Systems Developer · Oracle APEX · PL/SQL',
    note: 'Trabalhou com João Pedro na mesma equipe',
    text: 'João Pedro é um profissional extremamente prestativo, sempre disponível para apoiar e compartilhar conhecimento, com forte vontade de ensinar e colaborar. É alguém em quem se pode confiar de verdade: nunca deixa os colegas na mão e está presente quando o suporte é necessário, contribuindo para um ambiente de trabalho saudável. Sem dúvida, agrega valor a qualquer equipe e o recomendo com total confiança.',
  },
  {
    name: 'Miquéias Soares',
    role: 'Desenvolvedor · PHP · Laravel · JS · TypeScript · Vue.js',
    note: 'Trabalhou com João Pedro na mesma equipe',
    text: 'Tenho prazer em recomendar o João Pedro. Vi de perto o quão habilidoso, dedicado e confiável ele é, com forte expertise em TI — de infraestrutura e suporte a desenvolvimento de software, automação e RPA. Além de tecnicamente talentoso, é um ótimo colega de equipe, sempre disposto a ajudar e a tornar processos mais eficientes. Entrega resultados mantendo a colaboração no centro.',
  },
  {
    name: 'Luiz Filipe',
    role: 'Desenvolvedor Backend · Java · Spring Boot · SQL',
    note: 'Colega de faculdade e TCC',
    text: 'Trabalhei com o João Pedro na faculdade em vários projetos, incluindo o TCC. Ele se destacou pela dedicação, proatividade e contribuição com ideias inovadoras, sempre colocando a mão na massa. Sua ética de trabalho e disposição para ajudar foram fundamentais para o sucesso dos projetos. Foi um prazer trabalhar com ele.',
  },
]

function Card({ rec, index }) {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  }, [index])

  return (
    <div ref={ref} className="glass rounded-xl p-8 md:p-10 flex flex-col text-left h-full" style={{ opacity: 0 }}>
      <span className="font-gothic text-orange-glow/40 leading-none" style={{ fontSize: '3.5rem' }}>“</span>
      <p className="text-white/60 text-sm leading-relaxed font-light -mt-3 flex-1">{rec.text}</p>
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="font-gothic text-white text-xl">{rec.name}</p>
        <p className="font-mono text-[11px] text-orange-glow/80 tracking-wide mt-1">{rec.role}</p>
        <p className="font-mono text-[11px] text-white/30 mt-1">{rec.note}</p>
      </div>
    </div>
  )
}

export default function RecommendationsSection({ cameraStateRef }) {
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
        onEnter: () => {
          if (cameraStateRef) {
            gsap.to(cameraStateRef.current.position, { x: -2, y: -1, z: 9, duration: 2, ease: 'power2.inOut' })
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-20 section-wrap flex flex-col items-center justify-center text-center"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-12 h-px bg-orange-glow" />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Recomendações</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <h2
        ref={headingRef}
        className="font-gothic text-white mb-20"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', opacity: 0 }}
      >
        O QUE <span className="text-glow">DIZEM</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full mx-auto">
        {RECOMMENDATIONS.map((rec, i) => (
          <Card key={rec.name} rec={rec} index={i} />
        ))}
      </div>
    </section>
  )
}
