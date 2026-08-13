import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Reveal } from './motion/Reveal.jsx'

/**
 * Cabecera de sección del informe. Sin foto de fondo: la portada se lleva
 * la imagen, las páginas interiores abren con tipografía y aire.
 */
export default function PageHead({ kicker, heading, lede, tone = 'petal' }) {
  const { t } = useLanguage()
  const bg = tone === 'deep' ? 'bg-petal-300' : 'bg-petal-200'

  return (
    <header className={`paper relative border-b border-line-soft ${bg} pt-[var(--bar-h)]`}>
      <div className="sheet relative pt-[clamp(2.5rem,7vh,4.5rem)] pb-[clamp(2.5rem,7vh,4.5rem)]">
        <Reveal>
          <p className="specimen-label m-0 text-bloom-700">{t(kicker)}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1
            className="mt-4 mb-0 max-w-[17ch] text-moss-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 1.3rem + 3.1vw, 3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
            }}
          >
            {t(heading)}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.12}>
            <p className="lede column mt-6 mb-0">{t(lede)}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
