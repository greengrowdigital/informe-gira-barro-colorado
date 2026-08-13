import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { footerNote, guide, nav, site, students, teachers } from '../content/site.js'

export default function SiteFooter() {
  const { lang, t } = useLanguage()

  return (
    <footer className="border-t border-line-strong bg-petal-300">
      <div className="sheet grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr_0.8fr] lg:gap-14">
        <div>
          <img src="/img/logo-ic.webp" alt={site.school} width="355" height="251" className="h-11 w-auto" />
          <p
            className="mt-5 mb-0 text-moss-900"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.75rem)', lineHeight: 1.2 }}
          >
            {t(site.title)}
          </p>
          <p className="specimen-label mt-2 mb-0">
            {t(site.date)} · {t(site.place)}
          </p>
          <p className="column mt-5 mb-0 text-[0.9rem] leading-[1.75] text-moss-700">{t(footerNote)}</p>
        </div>

        <div>
          <p className="specimen-label m-0 mb-3">{lang === 'es' ? 'Estudiantes' : 'Students'}</p>
          <ul className="m-0 list-none space-y-1 p-0 text-[0.95rem] text-moss-900">
            {students.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>

          <p className="specimen-label mt-6 mb-3">{lang === 'es' ? 'Profesores' : 'Teachers'}</p>
          <ul className="m-0 list-none space-y-1 p-0 text-[0.95rem] text-moss-700">
            {teachers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>

          <p className="specimen-label mt-6 mb-1">{lang === 'es' ? 'Guía en la isla' : 'Island guide'}</p>
          <p className="m-0 text-[0.95rem] text-moss-700">{guide}</p>
        </div>

        <div>
          <p className="specimen-label m-0 mb-3">{lang === 'es' ? 'Secciones' : 'Sections'}</p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="underline-grow text-[0.95rem] text-moss-700 no-underline transition-colors duration-200 hover:text-bloom-700"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sheet flex flex-wrap items-center justify-between gap-3 border-t border-line-strong py-6">
        <p className="specimen-label m-0 text-[0.6rem]">
          © <span className="tabular">2026</span> {site.school}
        </p>
        <p className="specimen-label m-0 text-[0.6rem]">
          {lang === 'es' ? 'Fotografías del grupo' : 'Photographs by the group'}
        </p>
      </div>
    </footer>
  )
}
