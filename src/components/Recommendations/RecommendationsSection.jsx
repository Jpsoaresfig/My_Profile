import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { RECOMMENDATIONS } from '../../data/profile'
import { useI18n } from '../../i18n/context'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export default function RecommendationsSection() {
  const { t } = useI18n()
  const r = t.recommendations

  return (
    <section aria-labelledby="recommendations-title" className="section">
      <SectionHeader id="recommendations-title" index="05" label={r.label} title={r.title} highlight={r.highlight}>
        {r.intro}
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl w-full mx-auto">
        {RECOMMENDATIONS.map((rec, i) => {
          const copy = r.items[rec.id]
          return (
            <Reveal as="figure" key={rec.id} delay={i * 80} className="card p-7 md:p-9 flex flex-col">
              <span className="font-gothic text-orange-glow/50 leading-none text-6xl h-8" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="text-white/75 text-[15px] leading-relaxed font-light flex-1 text-pretty">
                {copy.text}
              </blockquote>
              {r.translated && <p className="mt-4 font-mono text-[10px] tracking-wider uppercase text-white/45">{r.translated}</p>}
              <figcaption className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4">
                <span className="avatar" aria-hidden="true">
                  {initials(rec.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-gothic text-white text-xl tracking-wide">{rec.name}</span>
                  <span className="block font-mono text-[11px] text-orange-bright/90 mt-0.5">{rec.role}</span>
                  <span className="block font-mono text-[11px] text-white/55 mt-0.5">{copy.note}</span>
                </span>
              </figcaption>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
