# Informe de la gira a Barro Colorado

Sitio del informe de la gira académica de **IC International School** a la Isla Barro Colorado, en el Lago Gatún, el **18 de julio de 2026**.

Seis senderos, 3 h 12 min de recorrido y los registros de flora y fauna que hicimos en el camino. Todas las fotografías son del grupo.

**Estudiantes:** Sofía Martez · Andrea Guerra · Catarina Tejada · Hillary Yuen · Tomás Tejada
**Profesores:** Edwin Loaiza · Diego Hill
**Guía en la isla:** Jorge Moisés Herrera

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | Propósito, justificación pedagógica, objetivos y quiénes fuimos |
| `/recorrido` | Trazado de la ruta y los seis senderos, uno por uno |
| `/biodiversidad` | Fichas de las cinco especies de flora y las cuatro de fauna registradas |
| `/aprendizajes` | Observaciones académicas, sociales y organizativas, evaluación y conclusiones |
| `/anexos` | Galería de fotografías, webgrafía y créditos |

El sitio es bilingüe español / inglés, con el idioma guardado en `localStorage`.

## Stack

- Vite + React 19
- Tailwind CSS v4 (configuración en CSS, `src/styles/index.css`)
- React Router DOM
- Framer Motion para el hero, la barra y el visor de fotografías

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila a dist/
npm run preview  # sirve la compilación
```

## Notas de diseño

- El **rosa es la superficie** y el verde del bosque es la tinta: la paleta invierte la relación habitual para que el documento se lea claro y de día, como una lámina de herbario.
- Tipografía: Young Serif para los títulos, Schibsted Grotesk para la lectura. Sin monoespaciada.
- El trazado del recorrido es un SVG que se dibuja con el scroll; la ruta punteada completa queda visible aunque la animación no corra.
- Toda animación tiene alternativa para `prefers-reduced-motion` y ninguna sección depende de una animación para ser visible.
- Fotografías en WebP, con versión completa (1100 px) y miniatura (480 px) por imagen.
