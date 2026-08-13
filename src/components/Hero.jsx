import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { facts, site } from '../content/site.js'
import Photo from './Photo.jsx'
import CountUp from './CountUp.jsx'

const EASE = [0.22, 1, 0.36, 1]

/* Dos columnas que se cruzan al hacer scroll: el bosque pasando por la ventana. */
const COLUMN_A = ['plantula-hojas-nuevas', 'arbol-raices', 'nido-termitas']
const COLUMN_B = ['barrigon', 'hoja-mano', 'raices-zancudas']

const LEAVES = [
  { left: 6, delay: 0, dur: 17, drift: 60, spin: 210, size: 26, tone: 'var(--color-leaf-400)' },
  { left: 21, delay: 5.5, dur: 22, drift: -40, spin: -180, size: 18, tone: 'var(--color-bloom-300)' },
  { left: 38, delay: 2.2, dur: 19, drift: 80, spin: 300, size: 22, tone: 'var(--color-leaf-400)' },
  { left: 55, delay: 8.4, dur: 25, drift: -60, spin: 160, size: 15, tone: 'var(--color-bloom-300)' },
  { left: 71, delay: 3.8, dur: 20, drift: 50, spin: -240, size: 24, tone: 'var(--color-leaf-400)' },
  { left: 88, delay: 11, dur: 24, drift: -70, spin: 200, size: 19, tone: 'var(--color-bloom-300)' },
]

function Leaf({ size, tone }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M20 4c1 8-2 14-7 17-4 2-8 1-10-1 5-2 8-5 10-9 2-4 4-6 7-7z"
        fill={tone}
        opacity="0.55"
      />
      <path d="M19.4 4.6C13 9 8 15 5 20" stroke="var(--color-petal-100)" strokeWidth="1" />
    </svg>
  )
}

export default function Hero() {
  const { lang, t } = useLanguage()
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const columnA = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const columnB = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const lines = t(site.titleLines) || site.titleLines.es

  return (
    <section
      ref={sectionRef}
      className="paper relative isolate overflow-hidden bg-petal-100 pt-[var(--bar-h)]"
      aria-labelledby="portada"
    >
      {/* Hojas que bajan girando */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          {LEAVES.map((leaf) => (
            <span
              key={leaf.left}
              className="absolute top-0 block"
              style={{
                left: `${leaf.left}%`,
                '--drift': `${leaf.drift}px`,
                '--spin': `${leaf.spin}deg`,
                animation: `leaf-fall ${leaf.dur}s linear ${leaf.delay}s infinite`,
              }}
            >
              <Leaf size={leaf.size} tone={leaf.tone} />
            </span>
          ))}
        </div>
      )}

      <div className="sheet relative z-[2] grid items-center gap-9 py-[clamp(2rem,5vh,3.5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div>
          <motion.p
            className="specimen-label m-0 flex flex-wrap items-center gap-x-3 gap-y-1"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-bloom-700">{site.school}</span>
            <span className="text-moss-500" aria-hidden="true">
              ·
            </span>
            <span>{t(site.date)}</span>
          </motion.p>

          <h1
            id="portada"
            className="mt-5 mb-0 text-moss-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 1.25rem + 3.1vw, 3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
            }}
          >
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={reduced ? false : { opacity: 0, filter: 'blur(12px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.95, ease: EASE, delay: 0.18 + i * 0.12 }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="lede column mt-6 mb-0"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
          >
            {t(site.subtitle)}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.74 }}
          >
            <Link
              to="/recorrido"
              className="inline-flex min-h-[2.9rem] items-center gap-2 rounded-full bg-bloom-600 px-6 font-semibold text-petal-50 no-underline transition-[background-color,transform] duration-200 hover:bg-bloom-700 active:scale-[0.98]"
              style={{ touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Empezar el recorrido' : 'Start the route'}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              to="/biodiversidad"
              className="inline-flex min-h-[2.9rem] items-center rounded-full border border-line-strong px-6 font-medium text-moss-700 no-underline transition-colors duration-200 hover:border-moss-500 hover:text-moss-900"
              style={{ touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Ver flora y fauna' : 'See flora and fauna'}
            </Link>
          </motion.div>
        </div>

        {/* Ventana al bosque: dos columnas que se cruzan */}
        <motion.div
          className="grid h-[clamp(17rem,40vh,24rem)] grid-cols-2 gap-3 overflow-hidden lg:h-[clamp(21rem,52vh,29rem)] lg:gap-4"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {[
            { images: COLUMN_A, y: columnA, offset: '-6%' },
            { images: COLUMN_B, y: columnB, offset: '2%' },
          ].map((column, ci) => (
            <motion.div
              key={ci}
              className="flex flex-col gap-3 lg:gap-4"
              style={reduced ? undefined : { y: column.y, marginTop: column.offset }}
            >
              {column.images.map((name, i) => (
                <motion.div
                  key={name}
                  className="overflow-hidden bg-petal-200 ring-1 ring-line-soft"
                  initial={reduced ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.34 + (ci * 3 + i) * 0.07 }}
                >
                  <Photo
                    src={`/img/${name}`}
                    alt=""
                    variant={i === 0 && ci === 0 ? 'full' : 'sm'}
                    priority={i === 0 && ci === 0}
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Cifras del informe */}
      <motion.div
        className="relative z-[2] border-t border-line-soft bg-petal-200"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <dl className="sheet grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label.es}>
              <dt className="specimen-label m-0 text-[0.58rem]">{t(fact.label)}</dt>
              <dd className="m-0 mt-1.5 ml-0 flex items-baseline gap-1.5">
                <CountUp
                  value={fact.value}
                  className="tabular text-moss-900"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 1.2rem + 1.5vw, 2.35rem)',
                    lineHeight: 1,
                  }}
                />
                <span className="text-[0.85rem] text-moss-500">{t(fact.unit)}</span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
