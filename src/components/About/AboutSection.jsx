import { ArrowUpRight } from '../shared/Icons'
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
          // Subgrid: both cards share the same row tracks, so tag, title, place, dates and
          // description line up side by side even when one title wraps to more lines.
          <Reveal
            key={i}
            delay={i * 80}
            className="card p-7 md:p-8 grid grid-cols-[minmax(0,1fr)_auto] grid-rows-subgrid row-span-5 gap-x-4 gap-y-0"
          >
            <span className="eyebrow block mb-4 col-start-1">{ed.tag}</span>
            <h4 className="font-gothic text-white text-2xl leading-tight tracking-wide col-start-1">{ed.title}</h4>
            <div className="flex items-center gap-3 mt-3 col-span-2">
              {ed.logo && (
                <span className="shrink-0 rounded-md bg-white px-2 py-1.5">
                  <img src={ed.logo} alt="" loading="lazy" decoding="async" className="block h-7 w-auto" />
                </span>
              )}
              <p className="text-white/70 text-sm font-light">{ed.place}</p>
            </div>
            <p className="font-mono text-xs text-white/55 mt-2 col-span-2">{ed.detail}</p>
            {ed.photo && (
              <PhotoZoom
                src={ed.photo}
                full={ed.photoFull}
                alt={ed.photoAlt}
                openLabel={a.photoOpen}
                closeLabel={a.photoClose}
                className="col-start-2 row-start-1 row-span-2 self-start w-24 md:w-32 aspect-[4/3]"
                imgClassName="h-full w-full object-cover"
              />
            )}
            {ed.desc && (
              <p className="col-span-2 text-white/60 text-sm font-light leading-relaxed mt-5 pt-5 border-t border-white/10 text-pretty">
                {ed.desc}
              </p>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="divider-label w-full max-w-4xl mx-auto mt-14 mb-8">
        <h3>{a.certificationsTitle}</h3>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto w-full">
        {a.certifications.map((c, i) => (
          <Reveal key={c.photo} delay={i * 80} className="card p-6 flex flex-col">
            <PhotoZoom
              src={c.photo}
              full={c.photoFull}
              alt={c.photoAlt}
              openLabel={a.photoOpen}
              closeLabel={a.photoClose}
              className="h-24 self-start"
            />
            <span className="eyebrow block mt-5 mb-3">{c.issuer}</span>
            <h4 className="font-gothic text-white text-xl leading-tight tracking-wide">{c.title}</h4>
            <p className="font-mono text-xs text-white/55 mt-2">{c.detail}</p>
            {c.verify && (
              <a
                href={c.verify}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-orange-bright/90 hover:text-orange-bright transition-colors self-start"
              >
                {a.certVerify}
                <ArrowUpRight className="w-3 h-3" />
                <span className="sr-only">{a.certVerifySr}</span>
              </a>
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
