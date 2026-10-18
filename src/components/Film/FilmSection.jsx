import { useEffect, useRef, useState } from 'react'
import Reveal from '../shared/Reveal'
import SectionHeader from '../shared/SectionHeader'
import { FILM } from '../../data/profile'
import FILM_CHAPTERS from '../../data/film-chapters.json'
import { useI18n } from '../../i18n/context'
import { track } from '../../lib/analytics'

const { chapters: CHAPTERS, duration: DURATION } = FILM_CHAPTERS

const clock = (s) => {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s - m * 60)).padStart(2, '0')}`
}

// The YouTube IFrame API is loaded once, only when someone presses play.
let apiPromise = null
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT)
      }
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      s.async = true
      document.head.appendChild(s)
    })
  }
  return apiPromise
}

export default function FilmSection() {
  const { t, lang } = useI18n()
  const f = t.film
  const videoId = FILM.youtube[lang] ?? FILM.youtube.en
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(-1)

  // Each site language has its own upload (subtitles are burned in): swap it, keeping the position.
  useEffect(() => {
    const p = playerRef.current
    if (!p?.getVideoData || p.getVideoData().video_id === videoId) return
    const at = p.getCurrentTime()
    const playing = p.getPlayerState() === window.YT.PlayerState.PLAYING
    p[playing ? 'loadVideoById' : 'cueVideoById']({ videoId, startSeconds: at })
  }, [videoId])

  // Highlight the chapter that contains the playback position (the API has no timeupdate event).
  useEffect(() => {
    if (!started) return
    const id = window.setInterval(() => {
      const now = playerRef.current?.getCurrentTime?.()
      if (now == null) return
      let i = CHAPTERS.length - 1
      while (i > 0 && now < CHAPTERS[i].start) i--
      setActive(i)
    }, 500)
    return () => window.clearInterval(id)
  }, [started])

  useEffect(() => () => playerRef.current?.destroy?.(), [])

  const start = async (at = 0) => {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(at, true)
      playerRef.current.playVideo()
      return
    }
    setStarted(true)
    track('film_play', { lang })
    const YT = await loadYouTubeApi()
    if (playerRef.current) return
    // The API swaps the node it gets for an iframe, so hand it a child React does not manage.
    const el = document.createElement('div')
    hostRef.current.appendChild(el)
    playerRef.current = new YT.Player(el, {
      host: 'https://www.youtube-nocookie.com',
      videoId,
      playerVars: { autoplay: 1, start: Math.floor(at), rel: 0, playsinline: 1, modestbranding: 1 },
      events: { onReady: (e) => e.target.playVideo() },
    })
  }

  const jump = (i) => {
    setActive(i)
    start(CHAPTERS[i].start)
    track('film_chapter', { lang, chapter: CHAPTERS[i].scene })
  }

  return (
    <section aria-labelledby="film-title" className="section">
      <SectionHeader id="film-title" index="00" label={f.label} title={f.title} highlight={f.highlight}>
        {f.intro}
      </SectionHeader>

      <Reveal className="w-full max-w-5xl mx-auto">
        <div className="card film">
          <div ref={hostRef} className="film__video" />
          {!started && (
            <button type="button" onClick={() => start(0)} className="film__facade" aria-label={f.play} data-hover>
              <img src={FILM.poster} alt="" className="film__video" loading="lazy" decoding="async" />
              <span className="film__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </button>
          )}
        </div>
        <p className="film__meta">
          {f.meta} · {clock(DURATION)} ·{' '}
          <a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer" className="film__yt">
            YouTube
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
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
