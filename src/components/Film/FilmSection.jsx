import { useEffect, useRef, useState } from 'react'
import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { FILM } from '../../data/profile'
import FILM_CHAPTERS from '../../data/film-chapters.json'
import { LOCALES, useI18n } from '../../i18n/context'
import { track } from '../../lib/analytics'

const { chapters: CHAPTERS, duration: DURATION } = FILM_CHAPTERS

const clock = (s) => {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s - m * 60)).padStart(2, '0')}`
}

export default function FilmSection() {
  const { t, lang } = useI18n()
  const f = t.film
  const videoRef = useRef(null)
  const played = useRef(false)
  const [active, setActive] = useState(-1)

  // Captions follow the site language (the `default` attribute only applies on first load).
  useEffect(() => {
    const tracks = videoRef.current?.textTracks
    if (!tracks) return
    for (const tr of tracks) tr.mode = tr.language === lang ? 'showing' : 'disabled'
  }, [lang])

  const onPlay = () => {
    if (played.current) return
    played.current = true
    track('film_play', { lang })
  }

  // Highlight the chapter that contains the current playback position.
  const onTimeUpdate = (e) => {
    const now = e.currentTarget.currentTime
    let i = CHAPTERS.length - 1
    while (i > 0 && now < CHAPTERS[i].start) i--
    setActive(i)
  }

  const jump = (i) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = CHAPTERS[i].start
    setActive(i)
    v.play().catch(() => {})
    track('film_chapter', { lang, chapter: CHAPTERS[i].scene })
  }

  return (
    <section aria-labelledby="film-title" className="section">
      <SectionHeader id="film-title" index="00" label={f.label} title={f.title} highlight={f.highlight}>
        {f.intro}
      </SectionHeader>

      <Reveal className="w-full max-w-5xl mx-auto">
        <div className="card film">
          <video
            ref={videoRef}
            className="film__video"
            controls
            playsInline
            preload="metadata"
            poster={FILM.poster}
            onPlay={onPlay}
            onTimeUpdate={onTimeUpdate}
            aria-describedby="film-meta"
            data-hover
          >
            <source src={FILM.src} type="video/mp4" />
            {Object.entries(FILM.captions).map(([code, src]) => (
              <track key={code} kind="subtitles" srcLang={code} label={LOCALES[code].name} src={src} default={code === lang} />
            ))}
          </video>
        </div>
        <p id="film-meta" className="film__meta">
          {f.meta} · {clock(DURATION)}
        </p>

        <nav aria-label={f.chaptersLabel} className="film__chapters">
          <ol>
            {CHAPTERS.map((c, i) => (
              <li key={c.scene}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? 'true' : undefined}
                  className={`film__chapter ${active === i ? 'is-active' : ''}`}
                >
                  <span className="film__chapter-time">{clock(c.start)}</span>
                  <span className="film__chapter-title">{f.chapters[c.scene - 1]}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </Reveal>
    </section>
  )
}
