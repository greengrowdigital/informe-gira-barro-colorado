import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NoEncontrada() {
  const { lang } = useLanguage()
  usePageTitle(lang === 'es' ? 'Página no encontrada — Informe Barro Colorado' : 'Page not found — Barro Colorado Report')

  return (
    <main id="contenido" className="sheet flex min-h-[70svh] flex-col justify-center pt-[var(--bar-h)] pb-20">
      <p className="specimen-label m-0 text-bloom-700">404</p>
      <h1
        className="mt-4 mb-0 max-w-[16ch] text-moss-900"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 1.3rem + 2.8vw, 3.2rem)',
          lineHeight: 1.08,
        }}
      >
        {lang === 'es' ? 'Ese sendero no está en el mapa' : 'That trail is not on the map'}
      </h1>
      <p className="column mt-5 mb-0 text-moss-700">
        {lang === 'es'
          ? 'La página que buscas no forma parte de este informe. Vuelve a la portada para retomar el recorrido.'
          : 'The page you are looking for is not part of this report. Head back to the cover to pick up the route.'}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-[2.9rem] w-fit items-center gap-2 rounded-full bg-bloom-600 px-6 font-semibold text-petal-50 no-underline transition-[background-color,transform] duration-200 hover:bg-bloom-700 active:scale-[0.98]"
        style={{ touchAction: 'manipulation' }}
      >
        {lang === 'es' ? 'Volver a la portada' : 'Back to the cover'}
      </Link>
    </main>
  )
}
