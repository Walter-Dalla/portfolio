import { useI18n } from '../i18n/context.js'
import './decisions.css'

// Cartões de decisões de arquitetura do projeto (`decisions`): a decisão, o porquê e, quando
// preenchidos, a alternativa descartada e o trade-off.
export function Decisions({ items }) {
  const { t, l } = useI18n()

  return (
    <ul className="decisions">
      {items.map((item, i) => (
        <li key={l(item.decision)} className="decision">
          <span className="decision__num mono" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="decision__title">{l(item.decision)}</h3>
          <p>{l(item.why)}</p>
          {item.alternative && (
            <p className="decision__extra">
              <span className="mono">{t('decisionAlternative')}</span> {l(item.alternative)}
            </p>
          )}
          {item.tradeoff && (
            <p className="decision__extra">
              <span className="mono">{t('decisionTradeoff')}</span> {l(item.tradeoff)}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
