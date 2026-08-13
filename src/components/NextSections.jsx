import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav } from '../content/site.js'
import { Stagger, StaggerItem } from './motion/Reveal.jsx'

/** Cada sección trae su fotografía, que asoma al señalarla. */
const PREVIEW = {
  '/': '/img/grupo-lancha-sm.webp',
  '/recorrido': '/img/escaleras-sendero-sm.webp',
  '/biodiversidad': '/img/barrigon-sm.webp',
  '/aprendizajes': '/img/estudiante-arbol-sm.webp',
  '/anexos': '/img/isla-lago-sm.webp',
}

export default function NextSections() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)

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
          {items.map((item) => {
            const on = active === item.to
            return (
              <StaggerItem as="li" key={item.to}>
                <Link
                  to={item.to}
                  onMouseEnter={() => setActive(item.to)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(item.to)}
                  onBlur={() => setActive(null)}
                  className="group relative flex h-full items-center justify-between gap-4 overflow-hidden border border-line-soft bg-petal-50 px-5 py-5 no-underline transition-colors duration-300 hover:border-bloom-500"
                >
                  <span className="relative z-10">
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

                  <span className="relative z-10 flex shrink-0 items-center gap-4">
                    {!reduced && (
                      <motion.span
                        className="hidden h-20 w-16 overflow-hidden sm:block"
                        initial={false}
                        animate={{
                          opacity: on ? 1 : 0,
                          clipPath: on ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        aria-hidden="true"
                      >
                        <img
                          src={PREVIEW[item.to]}
                          alt=""
                          width="360"
                          height="480"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </motion.span>
                    )}
                    <span className="text-moss-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bloom-600">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </nav>
  )
}
