import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { SKILL_GROUPS } from '../../data/profile'
import { useI18n } from '../../i18n/context'

export default function TechSection() {
  const { t } = useI18n()
  const tech = t.tech

  return (
    <section aria-labelledby="tech-title" className="section">
      <SectionHeader id="tech-title" index="03" label={tech.label} title={tech.title} highlight={tech.highlight} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl w-full mx-auto">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.id} delay={(i % 2) * 80} className="card skill-card p-7 md:p-9" style={{ '--c': group.color }}>
            <h3 className="flex items-center gap-3 mb-6 font-gothic text-white text-[1.4rem] tracking-wider">
              <span className="skill-card__dot" aria-hidden="true" />
              {tech.groups[group.id]}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <li key={s} className="skill-pill">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
