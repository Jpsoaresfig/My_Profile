import { inject, track as vercelTrack } from '@vercel/analytics'

// Cookieless page-view analytics (no consent banner needed). Only reports on Vercel deployments.
export function initAnalytics() {
  // The /_vercel/insights script only exists on Vercel; skip local builds to keep the console clean.
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
  if (!import.meta.env.PROD || local) return
  inject({ mode: 'production', debug: false })
}

// Custom events (CV downloads, language changes...). Recorded on Vercel plans that support them,
// silently ignored otherwise.
export function track(name, props) {
  try {
    vercelTrack(name, props)
  } catch {
    /* never let analytics break the page */
  }
}
