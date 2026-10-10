import { useEffect, useRef, useState } from 'react'
import { lockScroll, scrollToTarget } from '../../lib/smoothScroll'
import { SECTION_IDS } from '../../data/profile'
import { useI18n } from '../../i18n/context'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useI18n()
  const links = SECTION_IDS.map((id) => ({ href: `#${id}`, label: t.nav.links[id] }))
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  // Solid background once the page has scrolled.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setScrolled(window.scrollY > 40)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Scrollspy: highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    const hero = document.getElementById('hero')
    const heroObserver = hero
      ? new IntersectionObserver(([e]) => e.isIntersecting && setActive(''), { rootMargin: '-45% 0px -50% 0px' })
      : null
    if (hero) heroObserver.observe(hero)
    return () => {
      observer.disconnect()
      heroObserver?.disconnect()
    }
  }, [])

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const toggle = toggleRef.current
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      toggle?.focus({ preventScroll: true })
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // Let the scroll lock release before scrolling.
    requestAnimationFrame(() => scrollToTarget(href === '#top' ? 0 : href))
  }

  return (
    <header className={`site-nav ${scrolled || open ? 'is-scrolled' : ''}`}>
      <nav aria-label={t.nav.aria} className="site-nav__bar">
        <a href="#top" onClick={(e) => go(e, '#top')} aria-label={t.nav.home} className="group flex items-center gap-3 relative z-50">
          <span className="monogram">JP</span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-gothic text-white text-[15px] tracking-[0.18em] group-hover:text-orange-bright transition-colors duration-300">
              JOÃO PEDRO
            </span>
            <span className="font-mono text-[9px] text-white/50 tracking-[0.25em] uppercase">{t.nav.tagline}</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.filter((l) => l.href !== '#connect').map((link) => {
            const isActive = active === link.href
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3 relative z-50">
          <LanguageSwitcher />
          <a href="#connect" onClick={(e) => go(e, '#connect')} className="hidden xl:inline-flex nav-cta">
            <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot" aria-hidden="true" />
            {t.nav.cta}
          </a>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? t.nav.close : t.nav.open}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className={`burger lg:hidden ${open ? 'is-open' : ''}`}
        >
          <span />
          <span />
          <span />
        </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu lg:hidden ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        inert={open ? undefined : ''}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <ul className="flex flex-col items-start gap-5">
          {links.map((link, i) => (
            <li key={link.href} style={{ '--i': i }}>
              <a href={link.href} onClick={(e) => go(e, link.href)} className="mobile-menu__link">
                <span className="font-mono text-xs text-orange-glow/70">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#connect" onClick={(e) => go(e, '#connect')} className="btn btn-primary mt-10">
          {t.nav.cta}
        </a>
      </div>
    </header>
  )
}
