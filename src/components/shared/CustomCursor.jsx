import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [data-hover]'

// Desktop-only cursor. Uses event delegation (works for elements rendered later)
// and only runs its animation loop while the ring is still catching up.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = (q) => window.matchMedia(q).matches
    setEnabled(mq('(pointer: fine) and (hover: hover)') && !mq('(prefers-reduced-motion: reduce)'))
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0

    const tick = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      root.classList.add('cursor-visible')
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onOver = (e) => {
      const hit = e.target instanceof Element && e.target.closest(INTERACTIVE)
      root.classList.toggle('cursor-hover', Boolean(hit))
    }
    const onLeave = () => root.classList.remove('cursor-visible')
    const onDown = () => root.classList.add('cursor-down')
    const onUp = () => root.classList.remove('cursor-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hover', 'cursor-down')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
