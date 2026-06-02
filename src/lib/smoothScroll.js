import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafFn = null

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Initialise Lenis and wire it into the GSAP ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion) return lenis

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  lenis.on('scroll', ScrollTrigger.update)

  rafFn = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(rafFn)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  if (rafFn) gsap.ticker.remove(rafFn)
  if (lenis) lenis.destroy()
  lenis = null
  rafFn = null
}

/** Smoothly scroll to an element/selector/offset, falling back to native behaviour. */
export function scrollToTarget(target, opts = {}) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, ...opts })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: 'smooth' })
}
