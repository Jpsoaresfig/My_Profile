import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  // Only mice get a custom cursor — touch/pen devices would leave it stranded.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    setEnabled(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' })
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)

    const onEnter = () => dot.classList.add('hover')
    const onLeave = () => dot.classList.remove('hover')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.querySelectorAll('a, button, .mag-btn, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.querySelectorAll('a, button, .mag-btn, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{ left: 0, top: 0 }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ left: 0, top: 0 }} />
    </>
  )
}
