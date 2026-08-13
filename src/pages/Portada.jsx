import { useLanguage } from '../i18n/LanguageContext.jsx'
import { equipo, justificacion, objetivos, proposito } from '../content/inicio.js'
import { guide, students, teachers } from '../content/site.js'
import Hero from '../components/Hero.jsx'
import NextSections from '../components/NextSections.jsx'
import { FocusIn, Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { Plate } from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Portada() {
  const { lang, t } = useLanguage()
  usePageTitle(
    lang === 'es'
      ? 'Informe de la gira a Barro Colorado — IC International School'
      : 'Barro Colorado Field Trip Report — IC International School',
  )

  return (
    <>
      <Hero />

      <main id="contenido">
        {/* Propósito */}
        <section className="sheet py-[clamp(3.5rem,9vh,6rem)]" aria-labelledby="proposito">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <h2
                  id="proposito"
                  className="m-0 max-w-[14ch] text-moss-900"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3.1rem)',
                    lineHeight: 1.08,
                  }}
                >
                  {t(proposito.heading)}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="column mt-6 mb-0 text-moss-700">{t(proposito.body)}</p>
              </Reveal>
            </div>

            <FocusIn delay={0.06}>
              <Plate
                src={proposito.photo.src}
                alt={t(proposito.photo.alt)}
                caption={t(proposito.photo.caption)}
                sizes="(max-width: 1024px) 92vw, 44vw"
                imgClassName="aspect-[4/3] w-full object-cover"
              />
            </FocusIn>
          </div>
        </section>

        {/* Justificación pedagógica */}
        <section className="border-y border-line-soft bg-petal-200 py-[clamp(3.5rem,9vh,6rem)]" aria-labelledby="justificacion">
          <div className="sheet">
            <Reveal>
              <h2
                id="justificacion"
                className="m-0 max-w-[16ch] text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3.1rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(justificacion.heading)}
              </h2>
              <p className="lede column mt-5 mb-0">{t(justificacion.lede)}</p>
            </Reveal>

            <Stagger as="ol" className="mt-12 m-0 grid list-none gap-x-10 gap-y-0 p-0 md:grid-cols-3" step={0.07}>
              {justificacion.points.map((point, i) => (
                <StaggerItem as="li" key={point.title.es} className="border-t-2 border-bloom-500 pt-5">
                  <span className="specimen-label tabular block text-bloom-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="mt-3 mb-0 text-moss-900"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', lineHeight: 1.15 }}
                  >
                    {t(point.title)}
                  </h3>
                  <p className="mt-3 mb-0 text-[0.96rem] leading-[1.75] text-moss-700">{t(point.body)}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Objetivos */}
        <section className="sheet py-[clamp(3.5rem,9vh,6rem)]" aria-labelledby="objetivos">
          <Reveal>
            <h2
              id="objetivos"
              className="m-0 text-moss-900"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3.1rem)',
                lineHeight: 1.08,
              }}
            >
              {t(objetivos.heading)}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[objetivos.general, objetivos.specific].map((block, bi) => (
              <div key={block.label.es}>
                <Reveal delay={bi * 0.06}>
                  <p className="specimen-label m-0 border-b border-line-strong pb-3">{t(block.label)}</p>
                </Reveal>
                <Stagger as="ul" className="m-0 list-none p-0" step={0.06}>
                  {block.items.map((item, i) => (
                    <StaggerItem as="li" key={i} className="flex gap-4 border-b border-line-soft py-5">
                      <span className="tabular shrink-0 text-[0.8rem] font-semibold text-bloom-700">
                        {bi === 0 ? 'G' : 'E'}
                        {i + 1}
                      </span>
                      <span className="text-[0.99rem] leading-[1.75] text-moss-700">{t(item)}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </section>

        {/* Quiénes fuimos */}
        <section className="border-t border-line-soft bg-petal-300 py-[clamp(3.5rem,9vh,6rem)]" aria-labelledby="equipo">
          <div className="sheet">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal>
                <h2
                  id="equipo"
                  className="m-0 text-moss-900"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3.1rem)',
                    lineHeight: 1.08,
                  }}
                >
                  {t(equipo.heading)}
                </h2>
                <p className="column mt-5 mb-0 text-moss-700">{t(equipo.body)}</p>
              </Reveal>

              <div>
                <Reveal>
                  <p className="specimen-label m-0 mb-4">{t(equipo.labels.students)}</p>
                </Reveal>
                <Stagger as="ul" className="m-0 grid list-none gap-x-8 gap-y-0 p-0 sm:grid-cols-2" step={0.05}>
                  {students.map((name, i) => (
                    <StaggerItem as="li" key={name} className="flex items-baseline gap-4 border-b border-line-soft py-3.5">
                      <span className="tabular shrink-0 text-[0.76rem] font-semibold text-bloom-700">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-moss-900"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', lineHeight: 1.3 }}
                      >
                        {name}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Reveal>
                    <p className="specimen-label m-0 mb-2">{t(equipo.labels.teachers)}</p>
                    <ul className="m-0 list-none space-y-1 p-0">
                      {teachers.map((name) => (
                        <li key={name} className="text-[1.02rem] text-moss-700">
                          {name}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <p className="specimen-label m-0 mb-2">{t(equipo.labels.guide)}</p>
                    <p className="m-0 text-[1.02rem] text-moss-700">{guide}</p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NextSections />
      </main>
    </>
  )
}
