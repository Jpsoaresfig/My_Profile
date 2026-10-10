import { useCallback, useEffect, useMemo, useState } from 'react'
import { I18nContext, LOCALES, detectLanguage, persistLanguage } from './context'
import { track } from '../lib/analytics'

export default function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage)
  const t = LOCALES[lang]

  const setLang = useCallback((code) => {
    if (!LOCALES[code]) return
    setLangState(code)
    persistLanguage(code)
    track('language_change', { to: code })
  }, [])

  // Keep <html lang>, the tab title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [t])

  const value = useMemo(() => ({ t, lang, setLang }), [t, lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
