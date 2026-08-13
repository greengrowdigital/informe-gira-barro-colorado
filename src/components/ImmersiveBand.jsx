import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Photo from './Photo.jsx'

/**
 * El único momento del informe donde el bosque ocupa toda la pantalla y la
 * tinta se invierte: superficie verde profunda, texto claro. Aparece dos
 * veces en todo el sitio, para que siga siendo un respiro y no un patrón.
 */
export default function ImmersiveBand({ src, alt, quote, attribution, objectPosition = '50% 50%', height = 'tall' }) {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06])

  const tall = height === 'tall'
  const minH = tall ? 'min-h-[clamp(26rem,72svh,40rem)]' : 'min-h-[clamp(20rem,52svh,30rem)]'
  // Las citas largas piden una medida más ancha y un cuerpo algo menor
  const quoteSize = tall ? 'clamp(1.8rem, 1.1rem + 3.2vw, 3.6rem)' : 'clamp(1.45rem, 0.95rem + 2.2vw, 2.6rem)'
  const measure = tall ? 'max-w-[19ch]' : 'max-w-[26ch]'

  return (
    <section ref={ref} className={`relative isolate flex ${minH} items-center overflow-hidden`}>
      <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y, scale }}>
        <Photo
          src={src}
          alt={t(alt)}
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition={objectPosition}
        />
      </motion.div>

      {/* Velo verde: invierte la tinta del sitio y asegura la lectura */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(105deg, color-mix(in oklab, var(--color-moss-900) 88%, transparent) 0%, color-mix(in oklab, var(--color-moss-900) 74%, transparent) 48%, color-mix(in oklab, var(--color-moss-900) 52%, transparent) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="sheet relative py-[clamp(3rem,9vh,6rem)]">
        <motion.blockquote
          className={`m-0 ${measure} text-petal-100`}
          initial={reduced ? false : { opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: quoteSize,
            lineHeight: 1.14,
            letterSpacing: '-0.012em',
          }}
        >
          {t(quote)}
        </motion.blockquote>

        {attribution && (
          <motion.p
            className="mt-6 mb-0 text-[0.78rem] font-semibold tracking-[0.16em] text-petal-300 uppercase"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t(attribution)}
          </motion.p>
        )}
      </div>
    </section>
  )
}
