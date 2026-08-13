import { useLanguage } from '../i18n/LanguageContext.jsx'
import { bioIntro, curricular, fauna, flora } from '../content/biodiversidad.js'
import PageHead from '../components/PageHead.jsx'
import NextSections from '../components/NextSections.jsx'
import { FocusIn, Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { Plate } from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

/** Ficha de espécimen: el nombre manda, el resto es aparato de registro. */
function SpecimenCard({ item, index, kind }) {
  const { lang, t } = useLanguage()
  const accent = kind === 'flora' ? 'var(--color-leaf-700)' : 'var(--color-bloom-700)'

  return (
    <StaggerItem
      as="li"
      className="flex flex-col border border-line-soft border-t-[3px] bg-petal-50 p-5 sm:p-6"
      style={{ borderTopColor: accent }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="tabular text-[0.8rem] font-semibold" style={{ color: accent }}>
          {kind === 'flora' ? 'F' : 'A'}
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="specimen-label text-[0.56rem]">{t(item.trail)}</span>
      </div>

      <h3
        className="mt-3 mb-0 text-moss-900"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 1.1rem + 0.8vw, 1.75rem)', lineHeight: 1.14 }}
      >
        {t(item.name)}
      </h3>

      {item.alias && <p className="mt-1 mb-0 text-[0.85rem] italic text-moss-500">{t(item.alias)}</p>}

      <p className="mt-3 mb-0 text-[0.95rem] leading-[1.75] text-moss-700">{t(item.fact)}</p>

      {item.reasons && (
        <div className="mt-5">
          <p className="specimen-label m-0 mb-2 text-[0.56rem]">{t(item.reasonsLabel)}</p>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {item.reasons.map((reason) => (
              <li
                key={reason.es}
                className="rounded-full bg-petal-200 px-3 py-1 text-[0.8rem] text-moss-700"
              >
                {t(reason)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.photo && (
        <FocusIn className="mt-5 overflow-hidden bg-petal-200" delay={0.05}>
          <img
            src={`${item.photo}-sm.webp`}
            alt={t(item.alt)}
            width="825"
            height="1100"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </FocusIn>
      )}

      <span className="sr-only">
        {lang === 'es' ? 'Observado en el sendero' : 'Observed on trail'} {t(item.trail)}
      </span>
    </StaggerItem>
  )
}

function Group({ group, kind }) {
  const { t } = useLanguage()

  return (
    <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-labelledby={`grupo-${kind}`}>
      <Reveal>
        <div className="flex items-baseline gap-4 border-b-2 border-moss-900 pb-4">
          <h2
            id={`grupo-${kind}`}
            className="m-0 text-moss-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.85rem, 1.3rem + 2.2vw, 3rem)',
              lineHeight: 1,
            }}
          >
            {t(group.label)}
          </h2>
          <span className="tabular text-[0.95rem] font-semibold text-moss-500">
            {String(group.count).padStart(2, '0')}
          </span>
        </div>
      </Reveal>

      <Stagger
        as="ul"
        className="mt-8 m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(17rem,1fr))] items-start gap-4 p-0"
        step={0.06}
      >
        {group.items.map((item, i) => (
          <SpecimenCard key={item.id} item={item} index={i} kind={kind} />
        ))}
      </Stagger>
    </section>
  )
}

export default function Biodiversidad() {
  const { lang, t } = useLanguage()
  usePageTitle(lang === 'es' ? 'Flora y fauna — Informe Barro Colorado' : 'Flora and fauna — Barro Colorado Report')

  return (
    <>
      <PageHead kicker={bioIntro.kicker} heading={bioIntro.heading} lede={bioIntro.lede} tone="deep" />

      <main id="contenido">
        <div className="sheet pt-8">
          <Reveal>
            <p className="column m-0 bg-petal-200 px-4 py-3.5 text-[0.92rem] leading-[1.75] text-moss-700">
              {t(bioIntro.note)}
            </p>
          </Reveal>
        </div>

        <Group group={flora} kind="flora" />

        <div className="border-y border-line-soft bg-petal-200">
          <Group group={fauna} kind="fauna" />
        </div>

        {/* Lo que confirmamos en campo */}
        <section className="sheet py-[clamp(3rem,8vh,5rem)]" aria-labelledby="curricular">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2
                id="curricular"
                className="m-0 max-w-[15ch] text-moss-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 2.8rem)',
                  lineHeight: 1.08,
                }}
              >
                {t(curricular.heading)}
              </h2>
              <p className="column mt-5 mb-0 text-moss-700">{t(curricular.body)}</p>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {curricular.photos.map((photo, i) => (
                <FocusIn key={photo.src} delay={i * 0.08}>
                  <Plate
                    src={photo.src}
                    alt={t(photo.alt)}
                    caption={t(photo.caption)}
                    sizes="(max-width: 640px) 90vw, 26vw"
                    imgClassName="aspect-[4/5] w-full object-cover"
                  />
                </FocusIn>
              ))}
            </div>
          </div>
        </section>

        <NextSections />
      </main>
    </>
  )
}
