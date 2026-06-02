// Subtle, occasional shooting stars (pure CSS, very light).
const STARS = [
  { top: '8%', left: '14%', dur: '8s', delay: '2s' },
  { top: '20%', left: '58%', dur: '11s', delay: '6.5s' },
  { top: '6%', left: '80%', dur: '9.5s', delay: '10s' },
  { top: '40%', left: '30%', dur: '12s', delay: '15s' },
]

export default function ShootingStars() {
  return (
    <div className="shooting-stars" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="shooting-star"
          style={{ '--top': s.top, '--left': s.left, '--dur': s.dur, '--delay': s.delay }}
        />
      ))}
    </div>
  )
}
