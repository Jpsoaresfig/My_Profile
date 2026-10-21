import { useState } from 'react'
import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { OPEN_SOURCE, PROJECTS } from '../../data/profile'
import { track } from '../../lib/analytics'
import { useI18n } from '../../i18n/context'
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon } from '../shared/Icons'

function StarMap({ selected, onSelect, label }) {
  return (
    <div className="star-map" role="group" aria-label={label}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          points={PROJECTS.map((p) => `${p.star.x},${p.star.y}`).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {PROJECTS.map((p, i) => {
        const isActive = selected === i
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={isActive}
            aria-controls="project-detail"
            className={`star ${isActive ? 'is-active' : ''}`}
            style={{ left: `${p.star.x}%`, top: `${p.star.y}%`, '--c': p.color }}
          >
            <span className="star__halo" aria-hidden="true" />
            <span className="star__core" aria-hidden="true" />
            <span className="star__label">{p.title}</span>
          </button>
        )
      })}
    </div>
  )
}

function ProjectDetail({ project, index, onStep }) {
  const { t } = useI18n()
  const p = t.projects
  const copy = p.items[project.id]
  const term = (s) => t.terms[s] ?? s
  return (
    <article
      id="project-detail"
      aria-live="polite"
      className="card project-detail p-7 sm:p-10 md:p-12 flex flex-col"
      style={{ '--c': project.color }}
    >
      {/* key forces the swap animation to replay on every change */}
      <div key={project.id} className="swap-in flex flex-col flex-1">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: project.color }}>
            {copy.type}
          </span>
          <span className="font-mono text-xs text-white/50 tabular-nums whitespace-nowrap">
            {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-gothic text-white mb-5 leading-none" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>
          {project.title}
        </h3>
        {copy.highlight && (
          <p className="impact">
            <span className="impact__value">{copy.highlight.value}</span>
            <span className="impact__label">{copy.highlight.label}</span>
          </p>
        )}
        {project.shot && (
          <img
            src={project.shot}
            alt={`${p.shotAlt} ${project.title}`}
            width="1200"
            height="659"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-lg border border-white/10 mb-7"
          />
        )}
        <dl className="flex-1 space-y-5" aria-label={p.caseAria}>
          {['problem', 'challenge', 'solution', 'result'].map((k) => (
            <div key={k}>
              <dt className="font-mono text-[11px] tracking-widest uppercase" style={{ color: project.color }}>
                {p[k]}
              </dt>
              <dd className="mt-1.5 text-white/70 text-[15px] leading-relaxed font-light text-pretty">{copy[k]}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label={p.stackAria}>
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {term(s)}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-project"
              onClick={() => track('project_live', { id: project.id })}
            >
              {p.live}
              <ArrowUpRight />
              <span className="sr-only">{t.common.newTab}</span>
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GitHubIcon />
              {p.code}
              <span className="sr-only">
                {p.codeSr} {t.common.newTab}
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <button type="button" onClick={() => onStep(-1)} className="step-btn">
          <ArrowLeft />
          {p.prev}
        </button>
        <button type="button" onClick={() => onStep(1)} className="step-btn">
          {p.next}
          <ArrowRight />
        </button>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const { t } = useI18n()
  const p = t.projects
  const [selected, setSelected] = useState(0)
  const step = (dir) => setSelected((s) => (s + dir + PROJECTS.length) % PROJECTS.length)

  return (
    <section aria-labelledby="projects-title" className="section">
      <SectionHeader id="projects-title" index="04" label={p.label} title={p.title} highlight={p.highlight}>
        {p.intro}
      </SectionHeader>

      <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center w-full max-w-6xl mx-auto">
        <StarMap selected={selected} onSelect={setSelected} label={p.mapAria} />
        <ProjectDetail project={PROJECTS[selected]} index={selected} onStep={step} />
      </Reveal>

      <div className="mt-24 md:mt-28 w-full max-w-5xl mx-auto">
        <Reveal className="divider-label mb-8">
          <h3>{p.academicTitle}</h3>
        </Reveal>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {OPEN_SOURCE.map((a, i) => (
            <Reveal as="li" key={a.id} delay={(i % 2) * 80} className={a.wide ? 'sm:col-span-2' : undefined}>
              <a href={a.link} target="_blank" rel="noopener noreferrer" className="card card-link p-7 h-full flex flex-col">
                <span className="flex items-start justify-between gap-4 mb-3">
                  <span className="font-gothic text-white text-xl tracking-wide card-link__title">{a.title ?? p.allRepos}</span>
                  <ArrowUpRight className="text-white/50 shrink-0 mt-1 card-link__icon" />
                </span>
                <span className="text-white/65 text-sm font-light leading-relaxed flex-1">{p.academic[a.id]}</span>
                {a.stack.length > 0 && (
                  <span className="mt-5 flex flex-wrap gap-2">
                    {a.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </span>
                )}
                <span className="sr-only">{p.academicSr}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
