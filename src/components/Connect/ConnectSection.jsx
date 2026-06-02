import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagneticButton } from '../../hooks/useMagneticButton'

gsap.registerPlugin(ScrollTrigger)

function GlitchText({ children, className, style }) {
  return (
    <span
      className={`glitch-text ${className || ''}`}
      data-text={typeof children === 'string' ? children : ''}
      style={style}
    >
      {children}
    </span>
  )
}

function SocialLink({ href, label, icon, delay }) {
  const magRef = useMagneticButton(0.35)
  const ref = useRef()

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [delay])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <a
        ref={magRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mag-btn inline-flex items-center gap-3"
      >
        <span className="text-orange-glow">{icon}</span>
        <span>{label}</span>
      </a>
    </div>
  )
}

export default function ConnectSection({ constellationVisRef, cameraStateRef }) {
  const sectionRef = useRef()
  const headingRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Trigger constellation + camera zoom out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (constellationVisRef) {
            gsap.to(constellationVisRef, { current: 1, duration: 2, ease: 'power2.out' })
          }
          if (cameraStateRef) {
            gsap.to(cameraStateRef.current.position, {
              x: 0, y: 0, z: 20,
              duration: 3,
              ease: 'power2.inOut',
            })
            gsap.to(cameraStateRef.current.target, {
              x: 0, y: 0, z: 0,
              duration: 3,
              ease: 'power2.inOut',
            })
          }
        },
        onLeaveBack: () => {
          if (constellationVisRef) {
            gsap.to(constellationVisRef, { current: 0, duration: 1, ease: 'power2.out' })
          }
        },
      })

      // Email hover glitch
      const email = emailRef.current
      if (email) {
        email.addEventListener('mouseenter', () => {
          gsap.to(email, { x: () => (Math.random() - 0.5) * 4, y: () => (Math.random() - 0.5) * 2, duration: 0.05, repeat: 6, yoyo: true })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-20 section-wrap flex flex-col items-center justify-center text-center"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,0,0.04), transparent 70%)' }}
      />

      {/* Label */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-12 h-px bg-orange-glow" />
        <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Contato</span>
        <div className="w-12 h-px bg-orange-glow" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2
          ref={headingRef}
          className="font-gothic text-white mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            opacity: 0,
          }}
        >
          VAMOS<br />
          <GlitchText className="text-glow">CONSTRUIR</GlitchText>
          <br />JUNTOS
        </h2>

        <p className="text-white/40 text-base leading-relaxed font-light max-w-lg mx-auto mb-12">
          Aberto a oportunidades como desenvolvedor full stack e projetos de alto impacto.
          Bora criar algo extraordinário.
        </p>

        {/* Email + phone */}
        <div className="mb-12 flex flex-col items-center gap-6">
          <div>
            <p className="font-mono text-xs text-white/30 tracking-widest mb-2 uppercase">E-mail</p>
            <a
              ref={emailRef}
              href="mailto:jpbusinesss@hotmail.com"
              className="font-gothic text-white hover:text-orange-glow transition-colors duration-300"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', letterSpacing: '0.02em' }}
            >
              jpbusinesss@hotmail.com
            </a>
          </div>
          <div>
            <p className="font-mono text-xs text-white/30 tracking-widest mb-2 uppercase">Telefone</p>
            <a
              href="tel:+5583993826429"
              className="font-gothic text-white hover:text-orange-glow transition-colors duration-300"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)', letterSpacing: '0.02em' }}
            >
              +55 (83) 99382-6429
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4">
          <SocialLink
            href="https://linkedin.com/in/joaopedrosoaresfigueiredo"
            label="LinkedIn"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            delay={0}
          />
          <SocialLink
            href="https://github.com/Jpsoaresfig"
            label="GitHub"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            }
            delay={0.1}
          />
          <SocialLink
            href="mailto:jpbusinesss@hotmail.com"
            label="Enviar E-mail"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
            delay={0.2}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-white/5 w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div>
          <span className="font-gothic text-white/20 text-2xl">JOÃO PEDRO SOARES</span>
          <p className="font-mono text-xs text-white/20 mt-1">Desenvolvedor Full Stack Pleno · Paraíba, Brasil</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-xs text-white/15">
            Designed &amp; built with{' '}
            <span className="text-orange-glow">precision</span>
          </p>
          <p className="font-mono text-xs text-white/15">© {new Date().getFullYear()} João Pedro Soares</p>
        </div>
      </div>
    </section>
  )
}
