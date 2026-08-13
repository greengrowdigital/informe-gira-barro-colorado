import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * El contenido arranca visible y sólo se oculta si al montar está claramente
 * bajo el pliegue. Una captura, una impresión o un navegador sin
 * IntersectionObserver nunca dejan una sección en blanco.
 */
function useRevealState() {
  const ref = useRef(null)
  const [state, setState] = useState('idle')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReduced()) return undefined

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setState('shown')
      return undefined
    }

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.12 },
    )
    observer.observe(el)

    const failsafe = window.setTimeout(() => {
      setState('shown')
      observer.disconnect()
    }, 1500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return [ref, state]
}

/** Entrada de texto: sube poco y aclara, como una página que se asienta. */
export function Reveal({ children, delay = 0, y = 16, className, as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  const style =
    state === 'idle'
      ? undefined
      : {
          opacity: state === 'hidden' ? 0 : 1,
          transform: state === 'hidden' ? `translate3d(0, ${y}px, 0)` : 'translate3d(0,0,0)',
          transition: `opacity 620ms ${EASE} ${delay}s, transform 620ms ${EASE} ${delay}s`,
        }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

/**
 * Enfoque: la fotografía llega desenfocada y se aclara, como ajustar
 * unos binoculares en el sendero.
 */
export function FocusIn({ children, delay = 0, className, as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  const style =
    state === 'idle'
      ? undefined
      : {
          opacity: state === 'hidden' ? 0 : 1,
          filter: state === 'hidden' ? 'blur(10px)' : 'blur(0px)',
          transform: state === 'hidden' ? 'scale(1.03)' : 'scale(1)',
          transition: `opacity 700ms ${EASE} ${delay}s, filter 900ms ${EASE} ${delay}s, transform 900ms ${EASE} ${delay}s`,
        }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

/** Lista escalonada: ~50 ms por elemento. */
export function Stagger({ children, className, step = 0.05, as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  return (
    <Tag ref={ref} className={className}>
      {Children.map(children, (child, i) =>
        isValidElement(child) ? cloneElement(child, { __state: state, __delay: i * step }) : child,
      )}
    </Tag>
  )
}

export function StaggerItem({ children, className, as: Tag = 'div', y = 14, __state = 'idle', __delay = 0 }) {
  const style =
    __state === 'idle'
      ? undefined
      : {
          opacity: __state === 'hidden' ? 0 : 1,
          transform: __state === 'hidden' ? `translate3d(0, ${y}px, 0)` : 'translate3d(0,0,0)',
          transition: `opacity 540ms ${EASE} ${__delay}s, transform 540ms ${EASE} ${__delay}s`,
        }

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}
