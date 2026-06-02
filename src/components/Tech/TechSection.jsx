import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GROUPS = [
  {
    title: 'Front-end & Web',
    color: '#61dafb',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'React Native'],
  },
  {
    title: 'Back-end & Linguagens',
    color: '#6db33f',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Python', 'PHP', '.NET (VB.NET)', 'C#', 'C', 'VBA'],
  },
  {
    title: 'Dados & Cloud',
    color: '#f89820',
    skills: ['SQL', 'MySQL', 'Oracle APEX', 'API REST', 'AWS', 'Google Cloud'],
  },
  {
    title: 'Automação & Relatórios',
    color: '#119eff',
    skills: ['UiPath', 'RPA', 'Orchestrator', 'BIRT', 'JasperReports', 'Pentaho', 'Power BI'],
  },
  {
    title: 'Ferramentas & Metodologias',
    color: '#3178c6',
    skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'CI/CD', 'JUnit', 'Scrum', 'Kanban', 'Jira', 'Confluence'],
  },
  {
    title: 'Práticas & Soft Skills',
    color: '#FF6B00',
    skills: ['Clean Code', 'LGPD', 'Segurança da Informação', 'Trabalho em equipe', 'Comunicação técnica'],
  },
]

function GroupCard({ group, index }) {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: index * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  }, [index])

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-8 md:p-10 relative overflow-hidden"
      style={{ opacity: 0, borderTop: `2px solid ${group.color}55` }}
    >
      <div className="flex items-center gap-3 mb-7">
        <span className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
        <h3 className="font-gothic text-white" style={{ fontSize: '1.4rem', letterSpacing: '0.04em' }}>
          {group.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {group.skills.map(s => (
          <span
            key={s}
            className="font-mono text-xs px-3.5 py-2 rounded-full text-white/55 border border-white/10 transition-all duration-300 hover:text-white"
            style={{ '--c': group.color }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${group.color}80`; e.currentTarget.style.color = group.color }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechSection({ orbitalVisRef, cameraStateRef }) {
  const sectionRef = useRef()
  const headingRef = useRef()

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
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (cameraStateRef) {
            gsap.to(cameraStateRef.current.position, { x: 0, y: 1, z: 8, duration: 2, ease: 'power2.inOut' })
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
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Tecnologias</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <h2
        ref={headingRef}
        className="font-gothic text-white mb-20"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', opacity: 0 }}
      >
        O <span className="text-glow">ARSENAL</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl w-full mx-auto text-left">
        {GROUPS.map((group, i) => (
          <GroupCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
