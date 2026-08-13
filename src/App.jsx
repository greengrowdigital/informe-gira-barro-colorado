import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteBar />
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/recorrido" element={<Recorrido />} />
        <Route path="/biodiversidad" element={<Biodiversidad />} />
        <Route path="/aprendizajes" element={<Aprendizajes />} />
        <Route path="/anexos" element={<Anexos />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
