import { CONTACT } from '../../data/profile'
import { useI18n } from '../../i18n/context'
import { track } from '../../lib/analytics'
import { DownloadIcon } from './Icons'

export default function CvLink({ className = 'btn btn-ghost', where }) {
  const { t, lang } = useI18n()
  return (
    <a
      href={CONTACT.cv[lang] ?? CONTACT.cv.en}
      download={`Joao_Pedro_Soares_CV_${lang.toUpperCase()}.pdf`}
      type="application/pdf"
      className={className}
      onClick={() => track('cv_download', { lang, where })}
    >
      <DownloadIcon />
      {t.hero.cv}
      <span className="sr-only">({t.hero.cvNote})</span>
    </a>
  )
}
