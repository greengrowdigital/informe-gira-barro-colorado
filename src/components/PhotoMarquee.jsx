import { useLanguage } from '../i18n/LanguageContext.jsx'
import Photo from './Photo.jsx'

/**
 * Tira de fotografías que avanza sola, como pasar el carrete del día.
 * Se detiene al pasar el cursor y queda quieta con `prefers-reduced-motion`.
 */
export default function PhotoMarquee({ images, label }) {
  const { t } = useLanguage()
  const loop = [...images, ...images]

  return (
    <section
      className="overflow-hidden border-y border-line-soft bg-petal-200 py-[clamp(2.5rem,6vh,4rem)]"
      aria-label={t(label)}
    >
      <p className="sheet specimen-label m-0 mb-6">{t(label)}</p>

      <div className="marquee group relative">
        <ul className="marquee-track m-0 flex list-none gap-3 p-0 lg:gap-4">
          {loop.map((name, i) => (
            <li key={`${name}-${i}`} className="shrink-0" aria-hidden={i >= images.length ? 'true' : undefined}>
              <span className="block w-[clamp(9rem,26vw,15rem)] overflow-hidden bg-petal-300 ring-1 ring-line-soft">
                <Photo
                  src={`/img/${name}`}
                  variant="sm"
                  alt=""
                  sizes="15rem"
                  className="aspect-[3/4] w-full object-cover"
                />
              </span>
            </li>
          ))}
        </ul>

        {/* Difuminado en los bordes: la tira entra y sale del papel */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-28"
          style={{ background: 'linear-gradient(to right, var(--color-petal-200), transparent)' }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-28"
          style={{ background: 'linear-gradient(to left, var(--color-petal-200), transparent)' }}
          aria-hidden="true"
        />
      </div>

      <style>{`
        .marquee-track { animation: marquee-scroll 46s linear infinite; width: max-content; }
        .marquee:hover .marquee-track,
        .marquee:focus-within .marquee-track { animation-play-state: paused; }
        @keyframes marquee-scroll {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  )
}
