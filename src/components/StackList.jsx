import { useI18n } from '../i18n/context.js'
import { Tags } from './Tags.jsx'
import './arch-explorer.css'

/** Tecnologias por camada de um projeto (`stack`): [{ layer, items }], uma linha por camada. */
export function StackList({ items }) {
  const { l } = useI18n()
  if (!items?.length) return null
  return (
    <dl className="stack-list">
      {items.map((row) => (
        <div key={l(row.layer)} className="stack-list__row">
          <dt className="mono">{l(row.layer)}</dt>
          <dd>
            <Tags items={row.items} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
