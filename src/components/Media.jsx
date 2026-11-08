import { useI18n } from '../i18n/context.js'
import { assetUrl } from '../assetUrl.js'

/**
 * Bloco de mídia na proporção do design. Com `src`, mostra a imagem;
 * sem, um bloco decorativo com `label` (nunca o texto de placeholder do design).
 * `priority`: imagem da primeira tela, carregada já e com prioridade alta (as demais são lazy).
 */
export function Media({ src, alt, label, ratio, className = '', style, priority = false }) {
  const { l } = useI18n()
  return (
    <div className={`media ${className}`} style={{ aspectRatio: ratio, ...style }}>
      {src ? (
        <img
          src={assetUrl(src)}
          alt={l(alt) ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      ) : (
        <span className="media__label" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  )
}
