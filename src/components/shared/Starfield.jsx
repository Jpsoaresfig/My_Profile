import { useEffect, useRef } from 'react'

// The WebGL starfield is loaded after first paint so it never blocks the content.
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let cleanup = null
    let cancelled = false
    const canvas = canvasRef.current

    const boot = () =>
      import('../../lib/starfield').then(({ createStarfield }) => {
        if (cancelled || !canvas) return
        cleanup = createStarfield(canvas)
        if (cleanup) canvas.classList.add('is-ready')
      })

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1200 })
      : window.setTimeout(boot, 200)

    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cleanup?.()
    }
  }, [])

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
