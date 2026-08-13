import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav } from '../content/site.js'
import { Stagger, StaggerItem } from './motion/Reveal.jsx'

/**
 * Índice al pie de cada página: fichas anchas con la letra grande, no una
 * rejilla de tarjetas iguales con icono.
 */
export default function NextSections() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const items = nav.filter((item) => item.to !== location.pathname)

  return (
    <nav
      className="border-t border-line-soft bg-petal-200 py-[clamp(3rem,7vh,5rem)]"
      aria-label={lang === 'es' ? 'Otras secciones del informe' : 'Other sections of the report'}
    >
      <div className="sheet">
        <p className="specimen-label m-0 mb-6">
          {lang === 'es' ? 'Seguir en el informe' : 'Continue in the report'}
        </p>

        <Stagger as="ul" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2" step={0.05}>
          {items.map((item) => (
            <StaggerItem as="li" key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full items-baseline justify-between gap-4 border border-line-soft bg-petal-50 px-5 py-5 no-underline transition-colors duration-300 hover:border-bloom-500 hover:bg-petal-100"
              >
                <span>
                  <span
                    className="block text-moss-900 transition-colors duration-300 group-hover:text-bloom-700"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.7rem)',
                      lineHeight: 1.15,
                    }}
                  >
                    {t(item.label)}
                  </span>
                  <span className="mt-1 block text-[0.88rem] text-moss-500">{t(item.blurb)}</span>
                </span>
                <span className="shrink-0 self-center text-moss-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bloom-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </nav>
  )
}
