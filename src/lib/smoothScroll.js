// Lenis smooth scrolling, loaded on demand and only where it helps: mouse/trackpad
// devices that haven't asked for reduced motion. Touch devices keep native
// momentum scrolling, which is faster and feels right on phones.
let lenis = null
let cancelled = false

export async function initSmoothScroll() {
  cancelled = false
  if (lenis || typeof window === 'undefined') return
  const mq = (q) => window.matchMedia(q).matches
  if (mq('(prefers-reduced-motion: reduce)') || !mq('(pointer: fine)')) return

  const { default: Lenis } = await import('lenis')
  if (cancelled || lenis) return
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  })
}

export function destroySmoothScroll() {
  cancelled = true
  lenis?.destroy()
  lenis = null
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Scroll to a selector, element or pixel offset. */
export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 })
    return
  }
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = smooth ? 'smooth' : 'auto'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior, block: 'start' })
}
