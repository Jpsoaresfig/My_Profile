import PhotoZoom from '../shared/PhotoZoom'
import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { SOFT_SKILLS } from '../../data/profile'
import { useI18n } from '../../i18n/context'

export default function AboutSection() {
  const { t } = useI18n()
  const a = t.about

  return (
    <section aria-labelledby="about-title" className="section">
      <SectionHeader id="about-title" index="01" label={a.label} title={a.title} highlight={a.highlight} />

      <div className="max-w-3xl mx-auto text-center space-y-6 mb-20 md:mb-24">
        <Reveal as="p" className="text-white/80 text-lg md:text-2xl leading-relaxed font-light text-balance">
          {a.intro}
        </Reveal>
        <Reveal as="p" delay={80} className="text-white/65 text-[15px] md:text-base leading-relaxed font-light text-pretty">
          {a.bio}
        </Reveal>
      </div>

      <Reveal className="divider-label w-full max-w-4xl mx-auto mb-8">
        <h3>{a.educationTitle}</h3>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto w-full">
        {a.education.map((ed, i) => (
          <Reveal key={i} delay={i * 80} className="card p-7 md:p-8 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <span className="eyebrow block mb-4">{ed.tag}</span>
                <h4 className="font-gothic text-white text-2xl leading-tight tracking-wide">{ed.title}</h4>
                <p className="text-white/70 text-sm font-light mt-3">{ed.place}</p>
                <p className="font-mono text-xs text-white/55 mt-2">{ed.detail}</p>
              </div>
              {ed.photo && (
                <PhotoZoom
                  src={ed.photo}
                  full={ed.photoFull}
                  alt={ed.photoAlt}
                  openLabel={a.photoOpen}
                  closeLabel={a.photoClose}
                  className="h-20 md:h-28"
                />
              )}
            </div>
            {ed.desc && (
              <p className="text-white/60 text-sm font-light leading-relaxed mt-5 pt-5 border-t border-white/10 text-pretty">
                {ed.desc}
              </p>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 w-full max-w-4xl mx-auto">
        <div className="card px-7 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <h3 className="eyebrow">{a.languagesTitle}</h3>
          {a.languages.map((l) => (
            <span key={l.name} className="text-white/80 text-sm">
              {l.name} <span className="text-white/50">· {l.level}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="divider-label w-full max-w-5xl mx-auto mt-20 md:mt-24 mb-4">
        <h3>{a.softSkills.title}</h3>
      </Reveal>
      <Reveal as="p" className="text-white/60 text-sm md:text-base font-light text-center text-pretty max-w-2xl mx-auto mb-8">
        {a.softSkills.intro}
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto w-full">
        {SOFT_SKILLS.map((id, i) => {
          const s = a.softSkills.items[id]
          return (
            <Reveal key={id} delay={(i % 3) * 80} className="card p-4 flex flex-col">
              <PhotoZoom
                src={`/softskills/${id}.jpg`}
                full={`/softskills/${id}-full.jpg`}
                alt={s.photoAlt}
                openLabel={a.photoOpen}
                closeLabel={a.photoClose}
                className="w-full aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
              <div className="px-3 pt-5 pb-3">
                <span className="eyebrow block mb-3">{s.caption}</span>
                <h4 className="font-gothic text-white text-2xl leading-tight tracking-wide">{s.title}</h4>
                <p className="text-white/60 text-sm font-light leading-relaxed mt-3 text-pretty">{s.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
