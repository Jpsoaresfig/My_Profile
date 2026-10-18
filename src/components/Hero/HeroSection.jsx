import { useEffect, useRef } from 'react'
import { scrollToTarget } from '../../lib/smoothScroll'
import { CONTACT, HERO_STACK, HERO_STATS } from '../../data/profile'
import { useI18n } from '../../i18n/context'
import { ArrowDown, ArrowRight, GitHubIcon, LinkedInIcon } from '../shared/Icons'
import CvLink from '../shared/CvLink'

export default function HeroSection() {
  const { t } = useI18n()
  const contentRef = useRef(null)

  // Fade/lift the hero content as it scrolls away (transform + opacity only).
  useEffect(() => {
    const el = contentRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.75), 0), 1)
      el.style.opacity = String(1 - p)
      el.style.transform = `translate3d(0, ${p * -40}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <section aria-labelledby="hero-title" className="hero">
      <div ref={contentRef} className="hero__content">
        <p className="intro status-badge" style={{ '--d': '0ms' }}>
          <span className="status-badge__dot" aria-hidden="true" />
          {t.hero.status}
        </p>

        <p className="intro hero__eyebrow" style={{ '--d': '80ms' }}>
          {t.hero.role}
        </p>

        <h1 id="hero-title" className="intro hero__title" style={{ '--d': '160ms' }}>
          <span className="block">João Pedro</span>
          <span className="block hero__title-outline">Soares</span>
        </h1>

        <ul className="intro hero__stack" style={{ '--d': '260ms' }} aria-label={t.hero.stackAria}>
          {HERO_STACK.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <p className="intro hero__lead" style={{ '--d': '340ms' }}>
          {t.hero.lead}
        </p>

        <div className="intro hero__actions" style={{ '--d': '420ms' }}>
          <a href="#projects" onClick={(e) => go(e, '#projects')} className="btn btn-primary">
            {t.hero.ctaProjects}
            <ArrowRight />
          </a>
          <CvLink where="hero" />
          <span className="hero__socials">
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`LinkedIn ${t.common.newTab}`}>
              <LinkedInIcon />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`GitHub ${t.common.newTab}`}>
              <GitHubIcon />
            </a>
          </span>
        </div>

        <dl className="intro hero__stats" style={{ '--d': '500ms' }}>
          {HERO_STATS.map((value, i) => (
            <div key={i} className="hero__stat">
              <dt className="hero__stat-label">{t.hero.stats[i]}</dt>
              <dd className="hero__stat-value">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#film" onClick={(e) => go(e, '#film')} className="intro scroll-hint" style={{ '--d': '700ms' }}>
        <span>{t.hero.scroll}</span>
        <ArrowDown />
      </a>
    </section>
  )
}
