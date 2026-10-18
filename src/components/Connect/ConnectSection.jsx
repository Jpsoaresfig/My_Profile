import { useEffect, useRef, useState } from 'react'
import Reveal from '../shared/Reveal'
import { CONTACT } from '../../data/profile'
import { scrollToTarget } from '../../lib/smoothScroll'
import { useI18n } from '../../i18n/context'
import { track } from '../../lib/analytics'
import CvLink from '../shared/CvLink'
import { ArrowUp, CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../shared/Icons'

function CopyEmail() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
    } catch {
      // Clipboard API blocked (http / old browser): fall back to a hidden textarea.
      const ta = document.createElement('textarea')
      ta.value = CONTACT.email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    track('email_copy')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={copy} className={`copy-btn ${copied ? 'is-copied' : ''}`}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite">{copied ? t.connect.copied : t.connect.copy}</span>
    </button>
  )
}

export default function ConnectSection() {
  const { t } = useI18n()
  const c = t.connect
  const socials = [
    { href: CONTACT.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
    { href: CONTACT.github, label: 'GitHub', Icon: GitHubIcon, external: true },
    { href: `mailto:${CONTACT.email}`, label: c.sendEmail, Icon: MailIcon },
  ]
  const toTop = (e) => {
    e.preventDefault()
    scrollToTarget(0)
  }

  return (
    <section aria-labelledby="connect-title" className="section section--connect">
      <div className="connect-glow" aria-hidden="true" />

      <header className="section-header">
        <Reveal className="section-label">
          <span className="section-label__index">06</span>
          <span className="section-label__line" />
          <span>{c.label}</span>
        </Reveal>
        <Reveal as="h2" id="connect-title" delay={80} className="section-title section-title--xl">
          {c.title[0]}
          <br />
          <span className="glitch-text text-glow" data-text={c.title[1]}>
            {c.title[1]}
          </span>
          <br />
          {c.title[2]}
        </Reveal>
        <Reveal as="p" delay={160} className="section-intro">
          {c.intro}
        </Reveal>
      </header>

      <Reveal className="max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        <div className="contact-card card w-full p-6 sm:p-10">
          <p className="eyebrow mb-3">{c.email}</p>
          <a href={`mailto:${CONTACT.email}`} className="contact-email">
            {CONTACT.email}
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <CopyEmail />
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <li>
            <CvLink className="btn btn-primary btn-lg" where="contact" />
          </li>
          {socials.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                className="btn btn-ghost btn-lg"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon className="text-orange-bright" />
                {label}
                {external && <span className="sr-only">{t.common.newTab}</span>}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="site-footer">
        <div className="text-center md:text-left">
          <p className="font-gothic text-white/60 text-2xl tracking-wider">João Pedro Soares</p>
          <p className="font-mono text-xs text-white/55 mt-1">{c.footerRole}</p>
        </div>
        <a href="#top" onClick={toTop} className="step-btn">
          {c.backToTop}
          <ArrowUp />
        </a>
        <div className="text-center md:text-right">
          <p className="font-mono text-xs text-white/50">
            {c.built} <span className="text-orange-bright">{c.precision}</span>
          </p>
          <p className="font-mono text-xs text-white/50 mt-1">© {new Date().getFullYear()} João Pedro Soares</p>
        </div>
      </footer>
    </section>
  )
}
