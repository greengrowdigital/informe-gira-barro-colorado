import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Cuenta hasta el valor al entrar en pantalla. Acepta cifras con formato
 * ("3:12", "18") y anima sólo la parte numérica que corresponda.
 */
export default function CountUp({ value, duration = 1400, className, style }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const isClock = typeof value === 'string' && value.includes(':')
  const target = isClock ? Number(value.split(':')[0]) : Number(value)
  const tail = isClock ? `:${value.split(':')[1]}` : ''
  const numeric = Number.isFinite(target)

  const [shown, setShown] = useState(reduced || !numeric ? target : 0)

  useEffect(() => {
    if (!numeric || reduced) {
      setShown(target)
      return undefined
    }
    // Si el observador nunca dispara, la cifra real aparece igual.
    if (!inView) {
      const failsafe = window.setTimeout(() => setShown(target), 2000)
      return () => window.clearTimeout(failsafe)
    }

    let frame = 0
    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4) // ease-out-quart, sin rebote
      setShown(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, reduced, numeric])

  return (
    <span ref={ref} className={className} style={style}>
      {numeric ? shown : value}
      {tail}
    </span>
  )
}
