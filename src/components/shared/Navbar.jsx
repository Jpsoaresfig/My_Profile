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

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2.8 }
    )
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-20 py-6"
      style={{ opacity: 0 }}
    >
      <a
        href="#"
        onClick={scrollTop}
        className="font-gothic text-white text-xl tracking-widest hover:text-orange-glow transition-colors duration-300 relative z-50"
      >
        JP
      </a>

      <ul className="hidden lg:flex items-center gap-6">
        {LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-mono text-xs text-white/40 hover:text-white tracking-widest uppercase transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-orange-glow group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:jpbusinesss@hotmail.com"
        className="hidden lg:inline-flex font-mono text-xs text-orange-glow border border-orange-glow/40 px-4 py-2 rounded hover:bg-orange-glow/10 transition-all duration-300 tracking-widest uppercase"
      >
        Hire Me
      </a>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
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

      {/* Mobile menu overlay */}
      <div
        className="lg:hidden fixed inset-0 flex flex-col items-center justify-center gap-8 transition-all duration-400"
        style={{
          background: 'rgba(3,3,3,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          zIndex: 40,
        }}
      >
        {LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="font-gothic text-white/80 hover:text-orange-glow transition-colors duration-300"
            style={{ fontSize: '2.5rem', letterSpacing: '0.05em' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:jpbusinesss@hotmail.com"
          onClick={() => setOpen(false)}
          className="mt-4 font-mono text-xs text-orange-glow border border-orange-glow/40 px-6 py-3 rounded hover:bg-orange-glow/10 transition-all duration-300 tracking-widest uppercase"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
