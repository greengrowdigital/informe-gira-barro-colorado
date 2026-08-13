import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* Trazado del recorrido: seis paradas repartidas a lo ancho. Las etiquetas
   alternan arriba y abajo para que nunca se pisen entre sí. */
const PATH =
  'M50 118 C 120 48, 200 48, 240 112 S 350 186, 430 116 S 545 46, 620 110 S 730 184, 810 114 S 930 50, 975 106'
const NODES = [
  { x: 50, y: 118, above: true },
  { x: 240, y: 112, above: false },
  { x: 430, y: 116, above: true },
  { x: 620, y: 110, above: false },
  { x: 810, y: 114, above: true },
  { x: 975, y: 106, above: false },
]

export default function TrailRoute({ trails, active, onActive }) {
  const { lang, t } = useLanguage()
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const drawn = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      {/* En pantallas anchas el recorrido se lee como una ruta */}
      <svg
        viewBox="0 0 1025 200"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label={
          lang === 'es'
            ? 'Trazado del recorrido con las seis paradas: Donato Carrillo, James Zetek, David Fairchild, Fausto, William Wheeler y Thomas Barbour.'
            : 'Route diagram with the six stops: Donato Carrillo, James Zetek, David Fairchild, Fausto, William Wheeler and Thomas Barbour.'
        }
      >
        {/* Ruta completa siempre visible: si el trazo animado no corre, esto queda */}
        <path d={PATH} fill="none" stroke="var(--color-line-strong)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />

        {!reduced && (
          <motion.path
            d={PATH}
            fill="none"
            stroke="var(--color-bloom-500)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: drawn }}
          />
        )}

        {NODES.map((node, i) => {
          const on = active === i
          return (
            <g key={i} className="cursor-pointer" onMouseEnter={() => onActive(i)} onMouseLeave={() => onActive(null)}>
              <circle cx={node.x} cy={node.y} r="17" fill="transparent" />
              <circle
                cx={node.x}
                cy={node.y}
                r={on ? 10 : 7.5}
                fill={on ? 'var(--color-bloom-600)' : 'var(--color-petal-50)'}
                stroke={on ? 'var(--color-bloom-600)' : 'var(--color-moss-500)'}
                strokeWidth="2.5"
                style={{ transition: 'r 240ms cubic-bezier(0.22,1,0.36,1), fill 240ms, stroke 240ms' }}
              />
              <text
                x={node.x}
                y={node.above ? node.y - 26 : node.y + 38}
                textAnchor={i === 0 ? 'start' : i === NODES.length - 1 ? 'end' : 'middle'}
                fill={on ? 'var(--color-bloom-700)' : 'var(--color-moss-700)'}
                style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: on ? 700 : 500 }}
              >
                {trails[i].name}
              </text>
              <text
                x={node.x}
                y={node.above ? node.y - 44 : node.y + 22}
                textAnchor={i === 0 ? 'start' : i === NODES.length - 1 ? 'end' : 'middle'}
                fill="var(--color-moss-500)"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </text>
            </g>
          )
        })}
      </svg>

      {/* En móvil, la misma secuencia como lista compacta */}
      <ol className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-0 p-0 md:hidden">
        {trails.map((trail, i) => (
          <li key={trail.name} className="flex items-baseline gap-3 border-b border-line-soft py-3">
            <span className="tabular shrink-0 text-[0.75rem] font-semibold text-bloom-700">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[0.92rem] leading-snug text-moss-900">{trail.name}</span>
          </li>
        ))}
      </ol>

      <p className="specimen-label mt-6 mb-0 text-center text-[0.6rem] md:mt-3">
        {lang === 'es'
          ? 'Seis senderos · 3 h 12 min · 18 de julio de 2026'
          : 'Six trails · 3 h 12 min · 18 July 2026'}
      </p>
    </div>
  )
}
