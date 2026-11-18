import { useState } from 'react'
import { defaultNodeId, diagramLayers } from '../content/diagrams.js'
import { useI18n } from '../i18n/context.js'
import { ArchDiagram } from './ArchDiagram.jsx'
import { Tags } from './Tags.jsx'
import './arch-explorer.css'

const twoDigits = (n) => String(n).padStart(2, '0')

/**
 * Explorador de um diagrama de arquitetura: o diagrama com nós clicáveis e o painel do nó escolhido (camada,
 * papel, tecnologias e ligações). As setas do painel percorrem os nós na ordem de `diagram.nodes`.
 * `side`: em tela larga o painel fica ao lado do diagrama (bloco "Arquitetura" e capa do projeto); sem ele,
 * sempre abaixo.
 */
export function ArchExplorer({ diagram, side = false }) {
  const { t, l } = useI18n()
  const [selectedId, setSelectedId] = useState(() => defaultNodeId(diagram))
  const { nodes, edges } = diagram
  const index = Math.max(
    0,
    nodes.findIndex((n) => n.id === selectedId),
  )
  const node = nodes[index]
  const neighbors = nodes.filter((n) =>
    edges.some((e) => (e.from === node.id && e.to === n.id) || (e.to === node.id && e.from === n.id)),
  )
  const step = (delta) => setSelectedId(nodes[(index + delta + nodes.length) % nodes.length].id)

  return (
    <div className={`arch-explorer${side ? ' arch-explorer--side' : ''}`}>
      <figure className="arch-explorer__diagram">
        <div className="arch-explorer__canvas">
          <ArchDiagram diagram={diagram} selected={node.id} onSelect={setSelectedId} />
        </div>
        <figcaption className="arch-explorer__foot mono">
          <span className="arch-explorer__caption">{l(diagram.title)}</span>
          <span className="arch-explorer__hint">{t('archHint')}</span>
        </figcaption>
      </figure>

      <section className="arch-panel" aria-label={t('archPanelLabel')} aria-live="polite">
        <div className="arch-panel__head mono">
          <span className="arch-panel__layer">{l(diagramLayers[node.layer])}</span>
          <span className="arch-panel__count">
            {twoDigits(index + 1)} / {twoDigits(nodes.length)}
          </span>
        </div>
        <div className="arch-panel__name">
          <p className="arch-panel__title">{l(node.label)}</p>
          {node.sub && <p className="arch-panel__sub mono">{l(node.sub)}</p>}
        </div>
        {node.detail && <p className="arch-panel__text">{l(node.detail)}</p>}
        <Tags items={node.tech} />
        {neighbors.length > 0 && (
          <div className="arch-panel__links">
            <span className="arch-panel__links-label mono">{t('archConnects')}</span>
            <div className="arch-panel__links-list">
              {neighbors.map((n) => (
                <button key={n.id} type="button" className="arch-panel__link" onClick={() => setSelectedId(n.id)}>
                  {l(n.label)}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="arch-panel__nav">
          <button type="button" className="arch-panel__step" aria-label={t('archPrev')} onClick={() => step(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="arch-panel__step" aria-label={t('archNext')} onClick={() => step(1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  )
}
