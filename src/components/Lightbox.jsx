import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context.js'
import { assetUrl } from '../assetUrl.js'
import './lightbox.css'

/**
 * Visualizador de imagens em tela cheia. `images`: [{ src, alt }], `index` aberto, `onClose`.
 * Esc fecha, ← → navegam, clique fora da imagem fecha. Devolve o foco ao botão que abriu.
 */
export function Lightbox({ images, index, onClose }) {
  const { t, l } = useI18n()
  const [current, setCurrent] = useState(index)
  const closeRef = useRef(null)
  const openerRef = useRef(null)
  const count = images.length

  const go = useCallback((delta) => setCurrent((c) => (c + delta + count) % count), [count])

  useEffect(() => {
    openerRef.current = document.activeElement
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      openerRef.current?.focus?.()
    }
  }, [go, onClose])

  const image = images[current]
  const caption = l(image.alt)

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t('lightboxLabel')}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label={t('lightboxClose')}>
        ×
      </button>
      {count > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label={t('lightboxPrev')}>
            ←
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label={t('lightboxNext')}>
            →
          </button>
        </>
      )}
      <figure className="lightbox__figure">
        <img src={assetUrl(image.src)} alt={caption ?? ''} />
        <figcaption className="mono">
          {caption}
          {count > 1 && (
            <span className="lightbox__count">
              {current + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  )
}

/** Botão que envolve uma mídia e abre o visualizador. */
export function Zoom({ onClick, className = '', children }) {
  const { t } = useI18n()
  return (
    <button type="button" className={`zoom ${className}`} onClick={onClick} aria-label={t('zoomImage')}>
      {children}
    </button>
  )
}
