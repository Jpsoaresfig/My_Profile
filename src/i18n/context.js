import { createContext, useContext } from 'react'
import pt from './locales/pt'
import en from './locales/en'
import es from './locales/es'

export const LOCALES = { pt, en, es }
export const LOCALE_CODES = Object.keys(LOCALES)

export const I18nContext = createContext({ t: pt, lang: 'pt', setLang: () => {} })

/** Current locale strings (`t`), its code and a setter. */
export const useI18n = () => useContext(I18nContext)

const STORAGE_KEY = 'lang'

/** ?lang=en in the URL wins (handy for sharing), then the saved choice, then the browser language. */
export function detectLanguage() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl && LOCALES[fromUrl]) return fromUrl
  } catch {
    /* ignore */
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && LOCALES[saved]) return saved
  } catch {
    /* storage blocked (private mode etc.) */
  }
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || 'pt']
  for (const p of prefs) {
    const code = p.slice(0, 2).toLowerCase()
    if (LOCALES[code]) return code
  }
  return 'pt'
}

export function persistLanguage(code) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* ignore */
  }
  try {
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', code)
      window.history.replaceState(null, '', url)
    }
  } catch {
    /* ignore */
  }
}
