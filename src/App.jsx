import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SiteBar from './components/SiteBar.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Portada from './pages/Portada.jsx'
import Recorrido from './pages/Recorrido.jsx'
import Biodiversidad from './pages/Biodiversidad.jsx'
import Aprendizajes from './pages/Aprendizajes.jsx'
import Anexos from './pages/Anexos.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

/** Cada sección del informe empieza arriba; los anclajes conservan su destino. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <>
      <ScrollToTop />
      <SiteBar />

      {/* Pasar de sección se siente como voltear una hoja del informe */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{
            duration: 0.34,
            ease: [0.22, 1, 0.36, 1],
            exit: { duration: 0.18 },
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<Portada />} />
            <Route path="/recorrido" element={<Recorrido />} />
            <Route path="/biodiversidad" element={<Biodiversidad />} />
            <Route path="/aprendizajes" element={<Aprendizajes />} />
            <Route path="/anexos" element={<Anexos />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <SiteFooter />
    </>
  )
}
