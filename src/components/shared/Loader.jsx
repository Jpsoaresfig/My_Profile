import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const screenRef = useRef()
  const barRef = useRef()
  const textRef = useRef()
  const countRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (screenRef.current) screenRef.current.style.display = 'none'
            onComplete?.()
          },
        })
      },
    })

    let count = { val: 0 }
    tl.to(count, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(count.val)).padStart(3, '0')
        }
      },
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut',
    }, 0)
    .from(textRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
    }, 0)

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={screenRef} className="loader-screen">
      <div className="text-center">
        <div className="font-gothic text-white/20 mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.4em' }}>
          LOADING EXPERIENCE
        </div>
        <div
          ref={countRef}
          className="font-gothic text-white"
          style={{ fontSize: '5rem', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          000
        </div>
      </div>

      <div className="loader-bar">
        <div ref={barRef} className="loader-bar-fill" />
      </div>

      <div ref={textRef} className="font-mono text-xs text-white/20 tracking-widest">
        JOÃO PEDRO — PORTFOLIO
      </div>
    </div>
  )
}
