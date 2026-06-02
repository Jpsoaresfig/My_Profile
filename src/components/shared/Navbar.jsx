import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { scrollToTarget } from '../../lib/smoothScroll'

const LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Tecnologias', href: '#tech' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Recomendações', href: '#recommendations' },
  { label: 'Contato', href: '#connect' },
]

export default function Navbar() {
  const ref = useRef()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2.8 }
    )
  }, [])

  // Glass background appears once the hero is scrolled past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy — highlight the section currently in view.
  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1))
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  const scrollTop = (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(0)
  }

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: 0 }}
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(6,6,6,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
          boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between px-6 md:px-12 transition-all duration-500"
          style={{ paddingTop: scrolled ? '0.85rem' : '1.4rem', paddingBottom: scrolled ? '0.85rem' : '1.4rem' }}
        >
          {/* Monogram logo */}
          <a
            href="#"
            onClick={scrollTop}
            aria-label="Voltar ao topo"
            className="group relative z-50 flex items-center gap-3"
          >
            <span
              className="font-gothic text-lg leading-none flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300"
              style={{
                color: '#FF8C3A',
                borderColor: 'rgba(255,107,0,0.4)',
                background: 'rgba(255,107,0,0.06)',
                letterSpacing: '0.06em',
              }}
            >
              JP
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-gothic text-white text-sm tracking-[0.18em] group-hover:text-orange-glow transition-colors duration-300">
                JOÃO PEDRO
              </span>
              <span className="font-mono text-[9px] text-white/35 tracking-[0.25em] uppercase">
                Full Stack Engineer
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {LINKS.map(link => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 relative group py-1"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-orange-glow transition-all duration-300 group-hover:w-full"
                      style={{ width: isActive ? '100%' : '0%' }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <a
            href="#connect"
            onClick={(e) => scrollTo(e, '#connect')}
            className="hidden lg:inline-flex items-center gap-2 font-mono text-[11px] text-orange-glow border border-orange-glow/40 px-5 py-2.5 rounded-lg tracking-[0.18em] uppercase transition-all duration-300 hover:bg-orange-glow hover:text-black hover:border-orange-glow"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-glow animate-pulse" />
            Vamos conversar
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="lg:hidden relative z-50 flex flex-col items-end gap-1.5 w-7"
          >
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{ width: '100%', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{ width: open ? '100%' : '65%', opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{ width: '100%', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className="lg:hidden fixed inset-0 flex flex-col items-center justify-center gap-7 transition-all duration-400"
        style={{
          background: 'rgba(3,3,3,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          zIndex: 40,
        }}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="font-gothic text-white/80 hover:text-orange-glow transition-colors duration-300 flex items-center gap-4"
            style={{ fontSize: '2.4rem', letterSpacing: '0.05em' }}
          >
            <span className="font-mono text-xs text-orange-glow/50">0{i + 1}</span>
            {link.label}
          </a>
        ))}
        <a
          href="#connect"
          onClick={(e) => scrollTo(e, '#connect')}
          className="mt-6 font-mono text-xs text-black bg-orange-glow px-7 py-3.5 rounded-lg hover:bg-orange-bright transition-all duration-300 tracking-[0.18em] uppercase"
        >
          Vamos conversar
        </a>
      </div>
    </nav>
  )
}
