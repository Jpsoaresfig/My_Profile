import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { EXPERIENCES } from '../../data/profile'
import { useI18n } from '../../i18n/context'

function ExperienceCard({ exp, copy, stackAria, term, last }) {
  return (
    <Reveal as="li" className="timeline__item">
      <span className="timeline__node" aria-hidden="true" />
      {!last && <span className="timeline__line" aria-hidden="true" />}

      <article className="card p-6 sm:p-8 md:p-10">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="font-gothic text-white text-[1.75rem] md:text-[2.1rem] leading-none tracking-wide">
              {exp.company}
            </h3>
            <p className="eyebrow mt-2">{copy.role}</p>
          </div>
          <div className="sm:text-right shrink-0">
            <p className="font-mono text-xs text-white/75 tracking-wider whitespace-nowrap">{copy.period}</p>
            <p className="font-mono text-[11px] text-white/55 mt-1">{copy.location}</p>
          </div>
        </header>

        {copy.impact && (
          <p className="impact">
            <span className="impact__value">{copy.impact.value}</span>
            <span className="impact__label">{copy.impact.label}</span>
          </p>
        )}

        <ul className="space-y-3.5">
          {copy.bullets.map((b) => (
            <li key={b} className="bullet">
              {b}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label={stackAria}>
          {exp.stack.map((s) => (
            <li key={s} className="chip">
              {term(s)}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export default function ExperienceSection() {
  const { t } = useI18n()
  const e = t.experience
  const term = (s) => t.terms[s] ?? s

  return (
    <section aria-labelledby="experience-title" className="section">
      <SectionHeader id="experience-title" index="02" label={e.label} title={e.title} highlight={e.highlight} />

      <ol className="timeline max-w-4xl w-full mx-auto">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            copy={e.items[exp.id]}
            stackAria={e.stackAria}
            term={term}
            last={i === EXPERIENCES.length - 1}
          />
        ))}
      </ol>
    </section>
  )
}
