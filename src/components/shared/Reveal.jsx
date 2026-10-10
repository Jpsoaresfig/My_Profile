import { useEffect, useRef, useState } from 'react'

// One shared observer for every reveal on the page; each element animates in once.
let observer = null
const callbacks = new WeakMap()
function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Also reveal anything already scrolled past (e.g. after a jump via the nav).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          observer.unobserve(entry.target)
          callbacks.get(entry.target)?.()
          callbacks.delete(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
  )
  return observer
}

// Visibility lives in React state so re-renders (e.g. switching language) never reset it.
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    if (!io) {
      setShown(true)
      return
    }
    callbacks.set(el, () => setShown(true))
    io.observe(el)
    return () => {
      callbacks.delete(el)
      io.unobserve(el)
    }
  }, [])
  return [ref, shown]
}

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
