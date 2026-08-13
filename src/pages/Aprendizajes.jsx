import { useLanguage } from '../i18n/LanguageContext.jsx'
import { aprendizajesIntro, bandaAprendizajes, conclusiones, ejes, evaluacion } from '../content/aprendizajes.js'
import PageHead from '../components/PageHead.jsx'
import NextSections from '../components/NextSections.jsx'
import ImmersiveBand from '../components/ImmersiveBand.jsx'
import { FocusIn, Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Aprendizajes() {
  const { lang, t } = useLanguage()
  usePageTitle(lang === 'es' ? 'Aprendizajes — Informe Barro Colorado' : 'What we learned — Barro Colorado Report')

  return (
    <>
      <PageHead kicker={aprendizajesIntro.kicker} heading={aprendizajesIntro.heading} lede={aprendizajesIntro.lede} />

      <main id="contenido">
        {/* Tres ejes */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-label={lang === 'es' ? 'Ejes del aprendizaje' : 'Areas of learning'}>
          <div className="space-y-[clamp(2.5rem,6vh,4rem)]">
            {ejes.map((eje, i) => (
              <article
                key={eje.id}
                className={`grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <FocusIn delay={0.04}>
                  <div className="overflow-hidden bg-petal-200 ring-1 ring-line-soft">
                    <Photo
                      src={eje.photo}
                      alt={t(eje.alt)}
                      sizes="(max-width: 1024px) 92vw, 34vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </FocusIn>

                <Reveal delay={0.08}>
                  <p className="specimen-label m-0 border-b border-line-strong pb-3 text-bloom-700">
                    {t(eje.label)}
                  </p>
                  <p className="column mt-5 mb-0 text-[1.02rem] leading-[1.75] text-moss-700">{t(eje.body)}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </section>

        {/* Evaluación */}
        <section className="border-y border-line-soft bg-petal-200 py-[clamp(3rem,8vh,5rem)]" aria-labelledby="evaluacion">
          <div className="sheet">
            <Reveal>
              <h2
                id="evaluacion"
                className="m-0 text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(evaluacion.heading)}
              </h2>
            </Reveal>

            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {evaluacion.blocks.map((block, i) => (
                <Reveal key={block.id} delay={i * 0.07}>
                  <div className="h-full border border-line-soft bg-petal-50 p-6 sm:p-7">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="block h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            block.tone === 'good' ? 'var(--color-leaf-600)' : 'var(--color-bloom-600)',
                        }}
                        aria-hidden="true"
                      />
                      <p className="specimen-label m-0">{t(block.label)}</p>
                    </div>
                    <p className="mt-4 mb-0 text-[0.99rem] leading-[1.75] text-moss-700">{t(block.body)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Recomendaciones */}
            <div className="mt-9 border border-line-strong bg-petal-50 p-6 sm:p-8">
              <Reveal>
                <h3
                  className="m-0 text-moss-900"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', lineHeight: 1.14 }}
                >
                  {t(evaluacion.recomendaciones.label)}
                </h3>
                <p className="mt-3 mb-0 text-[0.97rem] text-moss-700">{t(evaluacion.recomendaciones.intro)}</p>
              </Reveal>

              <Stagger as="ul" className="mt-5 m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
                {evaluacion.recomendaciones.items.map((item) => (
                  <StaggerItem as="li" key={item.es} className="flex items-center gap-3 bg-petal-200 px-4 py-3">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-leaf-600" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[0.94rem] text-moss-900">{t(item)}</span>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.08}>
                <p className="column mt-6 mb-0 text-[0.95rem] leading-[1.75] text-moss-500">
                  {t(evaluacion.recomendaciones.extra)}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <ImmersiveBand
          src={bandaAprendizajes.src}
          alt={bandaAprendizajes.alt}
          quote={bandaAprendizajes.quote}
          attribution={bandaAprendizajes.attribution}
          objectPosition={bandaAprendizajes.objectPosition}
          height="short"
        />

        {/* Conclusiones */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-labelledby="conclusiones">
          <Reveal>
            <h2
              id="conclusiones"
              className="m-0 text-moss-900"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3rem)',
                lineHeight: 1.08,
              }}
            >
              {t(conclusiones.heading)}
            </h2>
          </Reveal>

          <Stagger as="ol" className="mt-9 m-0 list-none p-0" step={0.07}>
            {conclusiones.items.map((item, i) => (
              <StaggerItem as="li" key={i} className="grid gap-4 border-t border-line-strong py-7 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <span
                  className="tabular text-moss-500"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="column m-0 text-[1.02rem] leading-[1.75] text-moss-700">{t(item)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <NextSections />
      </main>
    </>
  )
}
