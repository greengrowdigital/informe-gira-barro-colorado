import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { cierre, logistica, recorridoIntro, senderos } from '../content/recorrido.js'
import PageHead from '../components/PageHead.jsx'
import NextSections from '../components/NextSections.jsx'
import TrailRoute from '../components/recorrido/TrailRoute.jsx'
import { FocusIn, Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import Photo, { Plate } from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Recorrido() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(null)
  usePageTitle(lang === 'es' ? 'El recorrido — Informe Barro Colorado' : 'The route — Barro Colorado Report')

  return (
    <>
      <PageHead kicker={recorridoIntro.kicker} heading={recorridoIntro.heading} lede={recorridoIntro.lede} />

      <main id="contenido">
        {/* Trazado de la ruta */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-label={lang === 'es' ? 'Trazado del recorrido' : 'Route diagram'}>
          <TrailRoute trails={senderos} active={active} onActive={setActive} />
        </section>

        {/* Sendero por sendero */}
        <section className="border-t border-line-soft bg-petal-200 py-[clamp(3rem,8vh,5rem)]" aria-labelledby="senderos">
          <div className="sheet">
            <Reveal>
              <h2 id="senderos" className="sr-only">
                {lang === 'es' ? 'Los senderos, uno por uno' : 'The trails, one by one'}
              </h2>
            </Reveal>

            <ol className="m-0 list-none space-y-[clamp(2rem,5vh,3.5rem)] p-0">
              {senderos.map((trail, i) => {
                const detailed = trail.findings.length > 0
                const on = active === i

                return (
                  <li
                    key={trail.name}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className="scroll-mt-28 border border-line-soft bg-petal-50 transition-[border-color,box-shadow] duration-300"
                    style={
                      on
                        ? { borderColor: 'var(--color-bloom-500)', boxShadow: '0 1px 0 var(--color-bloom-500)' }
                        : undefined
                    }
                  >
                    <div
                      className={`grid gap-6 p-5 sm:p-7 ${
                        detailed ? 'lg:grid-cols-[0.95fr_1.05fr] lg:gap-10' : 'sm:grid-cols-[12rem_1fr] sm:gap-8'
                      }`}
                    >
                      {detailed ? (
                        <FocusIn>
                          <Plate
                            src={trail.photo}
                            alt={t(trail.alt)}
                            sizes="(max-width: 1024px) 90vw, 42vw"
                            imgClassName="aspect-[4/3] w-full object-cover"
                          />
                        </FocusIn>
                      ) : (
                        <FocusIn className="overflow-hidden bg-petal-200 ring-1 ring-line-soft">
                          <Photo
                            src={trail.photo}
                            alt={t(trail.alt)}
                            variant="sm"
                            sizes="(max-width: 640px) 90vw, 12rem"
                            className="aspect-[4/3] w-full object-cover"
                          />
                        </FocusIn>
                      )}

                      <Reveal delay={0.06}>
                        <div className="flex items-baseline gap-3">
                          <span className="tabular text-[0.82rem] font-semibold text-bloom-700">
                            {String(trail.n).padStart(2, '0')}
                          </span>
                          <span className="specimen-label text-[0.58rem]">
                            {lang === 'es' ? 'Sendero' : 'Trail'}
                          </span>
                        </div>

                        <h3
                          className="mt-2 mb-0 text-moss-900"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: detailed ? 'clamp(1.5rem, 1.1rem + 1.6vw, 2.3rem)' : 'var(--text-h3)',
                            lineHeight: 1.12,
                          }}
                        >
                          {trail.name}
                        </h3>

                        {trail.findings.length > 0 && (
                          <ul className="mt-4 mb-0 flex list-none flex-wrap gap-2 p-0">
                            {trail.findings.map((finding) => (
                              <li
                                key={finding.es}
                                className="rounded-full border border-line-strong bg-petal-100 px-3 py-1 text-[0.82rem] text-moss-700"
                              >
                                {t(finding)}
                              </li>
                            ))}
                          </ul>
                        )}

                        <p className="column mt-4 mb-0 text-[0.99rem] leading-[1.75] text-moss-700">
                          {t(trail.body)}
                        </p>

                        {trail.note && (
                          <div className="column mt-5 bg-petal-200 px-4 py-3.5">
                            <p className="specimen-label m-0 mb-1.5 text-[0.56rem]">
                              {lang === 'es' ? 'Nota de campo' : 'Field note'}
                            </p>
                            <p className="m-0 text-[0.93rem] leading-[1.75] text-moss-700">{t(trail.note)}</p>
                          </div>
                        )}
                      </Reveal>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* Cierre del recorrido */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-labelledby="cierre">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <h2
                id="cierre"
                className="m-0 max-w-[14ch] text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.8rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(cierre.heading)}
              </h2>
              <p className="column mt-5 mb-0 text-moss-700">{t(cierre.body)}</p>
            </Reveal>

            <FocusIn delay={0.06}>
              <div className="overflow-hidden bg-petal-200 ring-1 ring-line-soft">
                <Photo
                  src={cierre.photo}
                  alt={t(cierre.alt)}
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </FocusIn>
          </div>
        </section>

        {/* Logística */}
        <section className="border-t border-line-soft bg-petal-300 py-[clamp(3rem,8vh,5rem)]" aria-labelledby="logistica">
          <div className="sheet">
            <Reveal>
              <h2
                id="logistica"
                className="m-0 text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.8rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(logistica.heading)}
              </h2>
            </Reveal>

            <Stagger as="dl" className="mt-9 m-0 grid gap-x-10 gap-y-0 p-0 md:grid-cols-3" step={0.07}>
              {logistica.items.map((item) => (
                <StaggerItem key={item.label.es} className="border-t-2 border-moss-900 pt-4">
                  <dt className="specimen-label m-0">{t(item.label)}</dt>
                  <dd className="mt-3 mb-0 ml-0 text-[0.97rem] leading-[1.75] text-moss-700">{t(item.body)}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <NextSections />
      </main>
    </>
  )
}
