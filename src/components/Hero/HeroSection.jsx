import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection({ particleProgressRef, cameraStateRef, onTunnelEnter }) {
  const sectionRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const scrollHintRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    if (!title || !subtitle) return

    const ctx = gsap.context(() => {
      // Initial reveal timeline — animate whole elements (robust, never leaves text hidden)
      const tl = gsap.timeline({ delay: 0.4 })

      tl.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
      .fromTo(title, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
      }, '-=0.7')
      .fromTo(subtitle, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .from(scrollHintRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2')

      // ScrollTrigger: on first scroll tick, start tunnel transition
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=600',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          // Drive particle morph from sphere → tunnel
          particleProgressRef.current = p

          // Camera starts pulling forward through tunnel
          if (cameraStateRef) {
            cameraStateRef.current.position.z = gsap.utils.interpolate(7, 2, p)
            cameraStateRef.current.position.y = gsap.utils.interpolate(0, -0.5, p)
          }

          // Fade out hero content
          if (sectionRef.current) {
            const children = sectionRef.current.querySelectorAll('.hero-fade')
            gsap.set(children, { opacity: 1 - p * 2 })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ zIndex: 10 }}
    >
      {/* Orange accent line */}
      <div
        ref={lineRef}
        className="hero-fade absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF6B00 40%, #FF8C00 60%, transparent)', transformOrigin: 'center' }}
      />

      {/* Corner tag */}
      <div className="hero-fade absolute top-24 md:top-28 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs text-white/30 tracking-[0.4em] whitespace-nowrap">
        PORTFÓLIO — 2026
      </div>

      {/* Main title */}
      <div className="hero-fade relative flex flex-col items-center max-w-[92vw]">
        <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-orange-glow mb-10 uppercase -mt-8 md:-mt-12">
          Fullstack Software Engineer
        </p>

        <h1
          ref={titleRef}
          className="font-gothic leading-none"
          style={{
            fontSize: 'clamp(1.6rem, 4.2vw, 3rem)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          JOÃO PEDRO
        </h1>

        {/* Subtitle below title */}
        <div className="mt-7 max-w-full">
          <h2
            ref={subtitleRef}
            className="font-gothic text-white/40 break-words"
            style={{ fontSize: 'clamp(0.8rem, 2.4vw, 1.5rem)', letterSpacing: '0.12em' }}
          >
            JAVA · SPRING · REACT · NODE
          </h2>
        </div>

        {/* Description */}
        <div className="hero-fade mt-12 max-w-md mx-auto">
          <p className="text-white/55 text-xs md:text-sm leading-relaxed font-light">
            Desenvolvedor Full Stack com 3 anos de experiência. Construo e integro
            APIs REST, bancos SQL e aplicações web/mobile com foco em qualidade de
            código, segurança (LGPD) e automação.
          </p>
        </div>

        {/* Stats row */}
        <div className="hero-fade mt-12 flex items-center justify-center gap-6 sm:gap-10 md:gap-16">
          {[['3+', 'Anos de Experiência'], ['4', 'Projetos em Destaque'], ['JP', 'João Pessoa — PB']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <span className="font-gothic text-orange-glow" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>{n}</span>
              <span className="font-mono text-[10px] md:text-xs text-white/35 tracking-wider mt-1">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">Role para explorar</span>
        <div className="w-px h-12 bg-gradient-to-b from-orange-glow to-transparent animate-pulse" />
      </div>
    </section>
  )
}
