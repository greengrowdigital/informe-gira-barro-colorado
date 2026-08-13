import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { anexosIntro, creditos, galeria, webgrafia } from '../content/anexos.js'
import { guide, site, students, teachers } from '../content/site.js'
import PageHead from '../components/PageHead.jsx'
import NextSections from '../components/NextSections.jsx'
import Viewer from '../components/anexos/Viewer.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Anexos() {
  const { lang, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  usePageTitle(lang === 'es' ? 'Anexos — Informe Barro Colorado' : 'Appendix — Barro Colorado Report')

  return (
    <>
      <PageHead kicker={anexosIntro.kicker} heading={anexosIntro.heading} lede={anexosIntro.lede} />

      <main id="contenido">
        {/* Galería en mosaico */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-label={lang === 'es' ? 'Galería de fotografías' : 'Photo gallery'}>
          <ul className="m-0 list-none columns-2 gap-3 p-0 sm:columns-3 lg:columns-4 lg:gap-4">
            {galeria.map((item, i) => (
              <li key={item.src} className="mb-3 break-inside-avoid lg:mb-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group block w-full cursor-zoom-in text-left"
                  style={{ touchAction: 'manipulation' }}
                  aria-label={
                    lang === 'es' ? `Ampliar fotografía: ${t(item.caption)}` : `Enlarge photograph: ${t(item.caption)}`
                  }
                >
                  <span className="block overflow-hidden bg-petal-200 ring-1 ring-line-soft transition-[box-shadow] duration-300 group-hover:ring-bloom-500">
                    <Photo
                      src={`/img/${item.src}`}
                      variant="sm"
                      alt={t(item.alt)}
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                      className="w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-2 block text-[0.83rem] leading-snug text-moss-500 transition-colors duration-200 group-hover:text-moss-900">
                    {t(item.caption)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Webgrafía */}
        <section className="border-y border-line-soft bg-petal-200 py-[clamp(3rem,8vh,5rem)]" aria-labelledby="webgrafia">
          <div className="sheet">
            <Reveal>
              <h2
                id="webgrafia"
                className="m-0 text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.8rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(webgrafia.heading)}
              </h2>
              <p className="column mt-4 mb-0 text-moss-700">{t(webgrafia.lede)}</p>
            </Reveal>

            <Stagger as="ol" className="mt-8 m-0 list-none p-0" step={0.06}>
              {webgrafia.items.map((item, i) => (
                <StaggerItem
                  as="li"
                  key={item.url}
                  className="grid gap-2 border-t border-line-strong py-5 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span className="tabular text-[0.8rem] font-semibold text-bloom-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="m-0 text-[1.02rem] text-moss-900" style={{ fontFamily: 'var(--font-display)' }}>
                      {t(item.title)}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline-grow mt-1 inline-block break-words text-[0.9rem] text-bloom-700 no-underline transition-colors duration-200 hover:text-bloom-600"
                    >
                      {item.url}
                    </a>
                    <p className="specimen-label mt-1.5 mb-0 text-[0.56rem]">{t(item.accessed)}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Créditos */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-labelledby="creditos">
          <Reveal>
            <h2
              id="creditos"
              className="m-0 text-moss-900"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.8rem)',
                lineHeight: 1.08,
              }}
            >
              {t(creditos.heading)}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Reveal>
              <p className="specimen-label m-0 mb-3 border-b border-line-strong pb-3">
                {lang === 'es' ? 'Estudiantes' : 'Students'}
              </p>
              <ul className="m-0 list-none space-y-2 p-0">
                {students.map((name) => (
                  <li key={name} className="text-[1.05rem] text-moss-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="specimen-label m-0 mb-3 border-b border-line-strong pb-3">
                {lang === 'es' ? 'Profesores' : 'Teachers'}
              </p>
              <ul className="m-0 list-none space-y-2 p-0">
                {teachers.map((name) => (
                  <li key={name} className="text-[1.05rem] text-moss-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {name}
                  </li>
                ))}
              </ul>

              <p className="specimen-label mt-7 mb-3 border-b border-line-strong pb-3">
                {lang === 'es' ? 'Guía en la isla' : 'Island guide'}
              </p>
              <p className="m-0 text-[1.05rem] text-moss-900" style={{ fontFamily: 'var(--font-display)' }}>
                {guide}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="specimen-label m-0 mb-3 border-b border-line-strong pb-3">
                {lang === 'es' ? 'Institución' : 'Institution'}
              </p>
              <img src="/img/logo-ic.webp" alt={site.school} width="355" height="251" className="h-12 w-auto" />
              <p className="mt-4 mb-0 text-[0.92rem] leading-[1.75] text-moss-700">{t(creditos.note)}</p>
            </Reveal>
          </div>
        </section>

        <NextSections />
      </main>

      <Viewer items={galeria} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  )
}
