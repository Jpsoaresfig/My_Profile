import { LOCALES, LOCALE_CODES, useI18n } from '../../i18n/context'

export default function LanguageSwitcher({ className = '' }) {
  const { t, lang, setLang } = useI18n()
  return (
    <div role="group" aria-label={t.common.language} className={`lang-switch ${className}`}>
      {LOCALE_CODES.map((code) => (
        <button
          key={code}
          type="button"
          lang={LOCALES[code].htmlLang}
          aria-pressed={lang === code}
          aria-label={LOCALES[code].name}
          onClick={() => setLang(code)}
          className={lang === code ? 'is-active' : ''}
        >
          {LOCALES[code].short}
        </button>
      ))}
    </div>
  )
}
