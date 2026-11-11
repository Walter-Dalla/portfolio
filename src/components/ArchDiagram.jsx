import { useId } from 'react'
import { useI18n } from '../i18n/context.js'
import './arch-diagram.css'

// A geometria é exportada junto do componente para os testes e os dados usarem a mesma grade.
/** Geometria da grade do diagrama, em px do viewBox. */
// eslint-disable-next-line react-refresh/only-export-components
export const GRID = { nodeW: 148, nodeH: 56, gapX: 36, gapY: 36, pad: 24 }

const STEP_X = GRID.nodeW + GRID.gapX
const STEP_Y = GRID.nodeH + GRID.gapY
// Margem do grupo em volta dos nós dele.
const GROUP_PAD = 12
// Largura aproximada de um caractere da fonte mono a 11px (0,6em).
const MONO_CHAR_11 = 6.6

/** Tamanho do viewBox: colunas e linhas contadas pelo maior `col`/`row`. */
// eslint-disable-next-line react-refresh/only-export-components
export function diagramSize(diagram) {
  const cols = Math.max(...diagram.nodes.map((n) => n.col)) + 1
  const rows = Math.max(...diagram.nodes.map((n) => n.row)) + 1
  return {
    width: 2 * GRID.pad + cols * GRID.nodeW + (cols - 1) * GRID.gapX,
    height: 2 * GRID.pad + rows * GRID.nodeH + (rows - 1) * GRID.gapY,
  }
}

function box(node) {
  const x = GRID.pad + node.col * STEP_X
  const y = GRID.pad + node.row * STEP_Y
  return { x, y, cx: x + GRID.nodeW / 2, cy: y + GRID.nodeH / 2 }
}

// Pontos da linha: reta na mesma linha ou coluna; senão cotovelo (horizontal até o x do alvo, depois vertical).
function edgePoints(source, target) {
  const a = box(source)
  const b = box(target)
  if (source.row === target.row) {
    const right = b.cx > a.cx
    return [
      [right ? a.x + GRID.nodeW : a.x, a.cy],
      [right ? b.x : b.x + GRID.nodeW, b.cy],
    ]
  }
  const down = b.cy > a.cy
  const targetY = down ? b.y : b.y + GRID.nodeH
  if (source.col === target.col) {
    return [
      [a.cx, down ? a.y + GRID.nodeH : a.y],
      [b.cx, targetY],
    ]
  }
  const sourceX = b.cx > a.cx ? a.x + GRID.nodeW : a.x
  return [
    [sourceX, a.cy],
    [b.cx, a.cy],
    [b.cx, targetY],
  ]
}

// Ponto na metade do comprimento da linha, e se o trecho ali é horizontal.
function midpoint(points) {
  const segments = points.slice(1).map((p, i) => [points[i], p, Math.hypot(p[0] - points[i][0], p[1] - points[i][1])])
  let rest = segments.reduce((sum, s) => sum + s[2], 0) / 2
  for (const [p, q, len] of segments) {
    if (rest <= len) {
      const t = len ? rest / len : 0
      return { x: p[0] + (q[0] - p[0]) * t, y: p[1] + (q[1] - p[1]) * t, horizontal: p[1] === q[1] }
    }
    rest -= len
  }
  const [x, y] = points[points.length - 1]
  return { x, y, horizontal: true }
}

function groupRect(group, byId) {
  const boxes = group.nodes.map((id) => box(byId[id]))
  const x = Math.min(...boxes.map((b) => b.x)) - GROUP_PAD
  const y = Math.min(...boxes.map((b) => b.y)) - GROUP_PAD
  const right = Math.max(...boxes.map((b) => b.x + GRID.nodeW)) + GROUP_PAD
  const bottom = Math.max(...boxes.map((b) => b.y + GRID.nodeH)) + GROUP_PAD
  return { x, y, width: right - x, height: bottom - y }
}

/**
 * Diagrama de arquitetura em SVG inline, desenhado a partir dos dados de src/content/diagrams.js.
 * As cores vêm só das classes do CSS (tokens do tema), então o desenho acompanha o tema claro/escuro.
 * `compact`: miniatura decorativa para o card, sem moldura, legenda nem nome acessível.
 */
export function ArchDiagram({ diagram, compact = false }) {
  const { l } = useI18n()
  const reactId = useId()
  // Ids do React trazem caracteres fora de [A-Za-z0-9]; o url(#…) do marcador fica mais seguro sem eles.
  const baseId = `arch-diagram-${reactId.replace(/[^A-Za-z0-9]/g, '')}`
  const markerId = `${baseId}-arrow`
  const titleId = `${baseId}-title`
  const { width, height } = diagramSize(diagram)
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const title = l(diagram.title)

  const svg = (
    <svg
      className={compact ? 'arch-diagram__svg arch-diagram__svg--compact' : 'arch-diagram__svg'}
      viewBox={`0 0 ${width} ${height}`}
      {...(compact
        ? { 'aria-hidden': 'true' }
        : {
            role: 'img',
            'aria-labelledby': titleId,
            style: { minWidth: Math.ceil((width * 11) / 13), maxWidth: width },
          })}
    >
      {!compact && <title id={titleId}>{title}</title>}
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path className="arch-diagram__arrow" d="M0,0 L10,5 L0,10 z" />
        </marker>
      </defs>

      {diagram.groups.map((group) => {
        const r = groupRect(group, byId)
        const label = l(group.label)
        return (
          <g key={group.id}>
            <rect className="arch-diagram__group" x={r.x} y={r.y} width={r.width} height={r.height} rx="10" />
            <rect
              className="arch-diagram__group-label-bg"
              x={r.x + 8}
              y={r.y - 7}
              width={label.length * MONO_CHAR_11 + 8}
              height="14"
            />
            <text className="arch-diagram__group-label" x={r.x + 12} y={r.y} dominantBaseline="central" fontSize="11">
              {label}
            </text>
          </g>
        )
      })}

      {diagram.edges.map((edge) => {
        const points = edgePoints(byId[edge.from], byId[edge.to])
        const mid = midpoint(points)
        const label = l(edge.label)
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <polyline
              className="arch-diagram__edge"
              points={points.map((p) => p.join(',')).join(' ')}
              markerEnd={`url(#${markerId})`}
              markerStart={edge.both ? `url(#${markerId})` : undefined}
            />
            {label && (
              <text
                className="arch-diagram__edge-label"
                x={mid.horizontal ? mid.x : mid.x + 6}
                y={mid.horizontal ? mid.y - 6 : mid.y}
                textAnchor={mid.horizontal ? 'middle' : 'start'}
                dominantBaseline={mid.horizontal ? 'auto' : 'central'}
                fontSize="11"
              >
                {label}
              </text>
            )}
          </g>
        )
      })}

      {diagram.nodes.map((node) => {
        const b = box(node)
        const sub = l(node.sub)
        return (
          <g key={node.id}>
            <rect className="arch-diagram__node" x={b.x} y={b.y} width={GRID.nodeW} height={GRID.nodeH} rx="8" />
            <text
              className="arch-diagram__label"
              x={b.cx}
              y={sub ? b.cy - 8 : b.cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
            >
              {l(node.label)}
            </text>
            {sub && (
              <text
                className="arch-diagram__sub"
                x={b.cx}
                y={b.cy + 10}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
              >
                {sub}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )

  if (compact) return svg
  return (
    <figure className="arch-diagram">
      <div className="arch-diagram__scroll" role="group" aria-label={title} tabIndex={0}>
        {svg}
      </div>
      <figcaption className="mono">{title}</figcaption>
    </figure>
  )
}
