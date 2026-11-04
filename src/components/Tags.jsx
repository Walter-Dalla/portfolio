import { useI18n } from '../i18n/context.js'

/** Lista de tags. Item: string, `{ pt, en }` ou `{ label, accent }`. */
export function Tags({ items, className = '' }) {
  const { l } = useI18n()
  if (!items?.length) return null
  return (
    <div className={`tags ${className}`}>
      {items.map((item, i) => {
        const isObj = item && typeof item === 'object' && 'label' in item
        const label = l(isObj ? item.label : item)
        return (
          <span key={`${label}-${i}`} className={`tag${isObj && item.accent ? ' tag--accent' : ''}`}>
            {label}
          </span>
        )
      })}
    </div>
  )
}
