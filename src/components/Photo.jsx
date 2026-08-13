/** Las tres fotos apaisadas del conjunto; el resto son verticales 3:4. */
const LANDSCAPE = new Set(['hojarasca-camuflaje', 'corteza-textura', 'panel-biodiversidad'])

export function photoSize(src) {
  const base = src
    .replace(/^\/img\//, '')
    .replace(/-sm(\.webp)?$/, '')
    .replace(/\.webp$/, '')
  return LANDSCAPE.has(base) ? [1100, 825] : [825, 1100]
}

/** Acepta rutas con o sin extensión: `/img/barrigon` o `/img/barrigon.webp`. */
function resolve(src, variant) {
  const clean = src.replace(/\.webp$/, '')
  return variant === 'sm' ? `${clean}-sm.webp` : `${clean}.webp`
}

export default function Photo({
  src,
  alt,
  className = '',
  priority = false,
  sizes,
  variant = 'full',
  objectPosition,
}) {
  const [w, h] = photoSize(src)

  return (
    <img
      src={resolve(src, variant)}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  )
}

/** Lámina: fotografía con su pie, como en una carpeta de campo. */
export function Plate({ src, alt, caption, className = '', imgClassName = '', priority = false, sizes, variant }) {
  return (
    <figure className={`m-0 ${className}`.trim()}>
      <div className="overflow-hidden bg-petal-200 ring-1 ring-line-soft">
        <Photo src={src} alt={alt} priority={priority} sizes={sizes} variant={variant} className={imgClassName} />
      </div>
      {caption && (
        <figcaption className="mt-2.5 max-w-[46ch] text-[0.85rem] leading-snug text-moss-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
