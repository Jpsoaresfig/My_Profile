import Reveal from './Reveal'

export default function SectionHeader({ id, index, label, title, highlight, children }) {
  return (
    <header className="section-header">
      <Reveal className="section-label">
        <span className="section-label__index">{index}</span>
        <span className="section-label__line" />
        <span>{label}</span>
      </Reveal>
      <Reveal as="h2" id={id} delay={80} className="section-title">
        {title} <span className="text-glow">{highlight}</span>
      </Reveal>
      {children && (
        <Reveal as="p" delay={160} className="section-intro">
          {children}
        </Reveal>
      )}
    </header>
  )
}
