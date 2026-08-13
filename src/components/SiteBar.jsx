import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav, site } from '../content/site.js'

export default function SiteBar() {
  const { lang, toggle, t } = useLanguage()
  const location = useLocation()
  const reduced = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a[href]')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-bloom-600 focus:px-5 focus:py-2.5 focus:font-semibold focus:text-petal-50 focus:no-underline"
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      {/* Barra siempre sólida: esto es un documento, no una portada de foto. */}
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-line-soft bg-petal-50">
        <div className="sheet flex h-[var(--bar-h)] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src="/img/logo-ic.webp"
              alt={site.school}
              width="355"
              height="251"
              className="h-8 w-auto shrink-0 sm:h-9"
            />
            <span className="hidden leading-tight md:block">
              <span className="specimen-label block text-[0.6rem]">{site.school}</span>
              <span
                className="block text-[0.98rem] text-moss-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(site.title)}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={lang === 'es' ? 'Principal' : 'Main'}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-full px-4 py-2 text-[0.9rem] font-medium no-underline transition-colors duration-200',
                    isActive
                      ? 'bg-bloom-600 text-petal-50'
                      : 'text-moss-700 hover:bg-petal-200 hover:text-moss-900',
                  ].join(' ')
                }
              >
                {t(item.label)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex h-11 min-w-11 items-center justify-center rounded-full border border-line-strong px-3 text-[0.76rem] font-semibold tracking-[0.08em] text-moss-700 transition-colors duration-200 hover:border-bloom-500 hover:text-bloom-700"
              style={{ touchAction: 'manipulation' }}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              <span className="sm:hidden">{lang === 'es' ? 'EN' : 'ES'}</span>
              <span className="hidden sm:inline">
                <span className={lang === 'es' ? 'text-moss-900' : 'text-moss-500'}>ES</span>
                <span className="mx-1 text-moss-500" aria-hidden="true">
                  ·
                </span>
                <span className={lang === 'en' ? 'text-moss-900' : 'text-moss-500'}>EN</span>
              </span>
            </button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-moss-700 transition-colors duration-200 hover:border-bloom-500 hover:text-bloom-700 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-informe"
              aria-label={
                menuOpen
                  ? lang === 'es'
                    ? 'Cerrar menú'
                    : 'Close menu'
                  : lang === 'es'
                    ? 'Abrir menú'
                    : 'Open menu'
              }
              style={{ touchAction: 'manipulation' }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3.5 8h17" strokeLinecap="round" />
                    <path d="M3.5 16h17" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-informe"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-petal-100 pt-[var(--bar-h)] lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sheet flex min-h-full flex-col justify-between pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <nav aria-label={lang === 'es' ? 'Principal' : 'Main'}>
                <ul className="m-0 list-none space-y-0 p-0">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          [
                            'flex items-baseline justify-between gap-4 border-b border-line-soft py-5 no-underline transition-colors duration-200',
                            isActive ? 'text-bloom-700' : 'text-moss-900 hover:text-bloom-600',
                          ].join(' ')
                        }
                      >
                        <span className="text-[1.5rem]" style={{ fontFamily: 'var(--font-display)' }}>
                          {t(item.label)}
                        </span>
                        <span className="specimen-label shrink-0 text-[0.58rem]">{t(item.blurb)}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <p className="specimen-label mt-10 mb-0 text-[0.6rem]">
                {site.school} · {t(site.date)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
