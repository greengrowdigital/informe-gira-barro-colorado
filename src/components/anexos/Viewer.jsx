import { useCallback, useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Photo from '../Photo.jsx'

/**
 * Visor a pantalla completa sobre `<dialog>`: el navegador aporta el
 * atrapado de foco, el cierre con Escape y la capa superior real.
 */
export default function Viewer({ items, index, onClose, onNavigate }) {
  const { lang, t } = useLanguage()
  const dialogRef = useRef(null)
  const open = index !== null
  const item = open ? items[index] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const go = useCallback(
    (delta) => {
      if (index === null) return
      onNavigate((index + delta + items.length) % items.length)
    },
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className="m-0 h-full max-h-none w-full max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-[color-mix(in_oklab,var(--color-moss-900)_88%,transparent)]"
      aria-label={lang === 'es' ? 'Fotografía ampliada' : 'Enlarged photograph'}
    >
      {item && (
        <div className="flex h-full w-full flex-col bg-petal-100 p-[max(0.9rem,env(safe-area-inset-top))_0.9rem_max(0.9rem,env(safe-area-inset-bottom))]">
          <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
            <p className="specimen-label m-0">
              <span className="tabular text-bloom-700">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-moss-500">/</span>
              <span className="tabular">{String(items.length).padStart(2, '0')}</span>
            </p>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-moss-700 transition-colors duration-200 hover:border-bloom-500 hover:text-bloom-700"
              aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
              style={{ touchAction: 'manipulation' }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 grow items-center justify-center">
            <Photo
              src={`/img/${item.src}`}
              alt={t(item.alt)}
              priority
              sizes="92vw"
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 pt-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.85rem] font-medium text-moss-700 transition-colors duration-200 hover:border-bloom-500 hover:text-bloom-700"
              aria-label={lang === 'es' ? 'Fotografía anterior' : 'Previous photograph'}
              style={{ touchAction: 'manipulation' }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {lang === 'es' ? 'Anterior' : 'Previous'}
            </button>

            <p className="m-0 hidden max-w-[44ch] text-center text-[0.88rem] text-moss-700 sm:block">
              {t(item.caption)}
            </p>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.85rem] font-medium text-moss-700 transition-colors duration-200 hover:border-bloom-500 hover:text-bloom-700"
              aria-label={lang === 'es' ? 'Fotografía siguiente' : 'Next photograph'}
              style={{ touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Siguiente' : 'Next'}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
