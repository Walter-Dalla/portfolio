import { useEffect, useId, useRef } from 'react'
import { useI18n } from '../i18n/context.js'
import './arch-diagram.css'

// A geometria é exportada junto do componente para os testes e os dados usarem a mesma grade.
/** Geometria da grade do diagrama, em px do viewBox. */
// eslint-disable-next-line react-refresh/only-export-components
export const GRID = { nodeW: 168, nodeH: 56, gapX: 36, gapY: 36, pad: 24 }

const STEP_X = GRID.nodeW + GRID.gapX
const STEP_Y = GRID.nodeH + GRID.gapY
// Margem do grupo em volta dos nós dele.
const GROUP_PAD = 12
// Largura aproximada de um caractere da fonte mono a 11px (0,6em).
const MONO_CHAR_11 = 7.2
// Folga do contorno de foco em volta do nó (modo interativo).
const FOCUS_PAD = 4

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

/** Caixa do nó no viewBox: canto superior esquerdo (`x`, `y`) e centro (`cx`, `cy`). */
// eslint-disable-next-line react-refresh/only-export-components
export function nodeBox(node) {
  return box(node)
}

// Pontos da linha: reta na mesma linha ou coluna; senão cotovelo. O cotovelo padrão sai pelo lado do nó de
// origem (horizontal até o x do alvo, depois vertical); com `bend: 'v'` sai por cima ou por baixo (vertical
// até a linha do alvo, depois horizontal) e entra no alvo pelo lado.
// Exportada para o teste dos dados conferir que nenhuma linha passa por cima de um nó.
// eslint-disable-next-line react-refresh/only-export-components
export function edgePoints(source, target, bend) {
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
  const sourceY = down ? a.y + GRID.nodeH : a.y
  const targetY = down ? b.y : b.y + GRID.nodeH
  if (source.col === target.col) {
    return [
      [a.cx, sourceY],
      [b.cx, targetY],
    ]
  }
  if (bend === 'v') {
    return [
      [a.cx, sourceY],
      [a.cx, b.cy],
      [b.cx > a.cx ? b.x : b.x + GRID.nodeW, b.cy],
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

const classes = (...names) => names.filter(Boolean).join(' ')

/**
 * Diagrama de arquitetura em SVG inline, desenhado a partir dos dados de src/content/diagrams.js.
 * As cores vêm só das classes do CSS (tokens do tema), então o desenho acompanha o tema claro/escuro.
 * `compact`: miniatura decorativa para o card, sem moldura, legenda nem nome acessível.
 * `onSelect` (com `selected`, o id do nó escolhido): modo interativo, usado pelo `ArchExplorer`. Cada nó vira um
 * botão (clique, Enter ou espaço), o escolhido e as ligações dele ganham destaque e as demais linhas esmaecem.
 */
export function ArchDiagram({ diagram, compact = false, selected = null, onSelect = null }) {
  const { l } = useI18n()
  const reactId = useId()
  const scrollRef = useRef(null)
  const interactive = !compact && typeof onSelect === 'function'
  // Ids do React trazem caracteres fora de [A-Za-z0-9]; o url(#…) do marcador fica mais seguro sem eles.
  const baseId = `arch-diagram-${reactId.replace(/[^A-Za-z0-9]/g, '')}`
  const markerId = `${baseId}-arrow`
  const titleId = `${baseId}-title`
  const { width, height } = diagramSize(diagram)
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const title = l(diagram.title)
  const highlight = interactive && selected != null
  const touches = (edge) => edge.from === selected || edge.to === selected
  const linked = new Set(
    highlight ? diagram.edges.filter(touches).map((e) => (e.from === selected ? e.to : e.from)) : [],
  )

  // Em tela estreita o diagrama rola na horizontal: o nó escolhido (pelo painel, por exemplo) vem para o centro
  // da moldura. Só a moldura rola, nunca a página.
  useEffect(() => {
    const scroll = scrollRef.current
    if (!interactive || !scroll || typeof scroll.scrollTo !== 'function') return
    if (scroll.scrollWidth <= scroll.clientWidth) return
    const node = [...scroll.querySelectorAll('[data-node]')].find((el) => el.dataset.node === selected)
    if (!node) return
    const frame = scroll.getBoundingClientRect()
    const rect = node.getBoundingClientRect()
    if (rect.left >= frame.left && rect.right <= frame.right) return
    const center = rect.left - frame.left + scroll.scrollLeft + rect.width / 2
    scroll.scrollTo({ left: center - scroll.clientWidth / 2, behavior: 'smooth' })
  }, [interactive, selected])

  // Moldura que estoura a largura ganha `data-overflow`: o `ArchExplorer` mostra o aviso de arrastar para o lado.
  // Recalcula na montagem e a cada `resize` da janela.
  useEffect(() => {
    const scroll = scrollRef.current
    if (!interactive || !scroll) return
    const update = () => {
      if (scroll.scrollWidth > scroll.clientWidth) scroll.dataset.overflow = 'true'
      else delete scroll.dataset.overflow
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [interactive])

  const svgProps = compact
    ? { 'aria-hidden': 'true' }
    : {
        // Com nós clicáveis o svg é um grupo: `img` esconderia os botões de quem usa leitor de tela.
        role: interactive ? 'group' : 'img',
        'aria-labelledby': titleId,
        style: { minWidth: Math.ceil((width * 11) / 13), maxWidth: width },
      }

  const svg = (
    <svg
      className={compact ? 'arch-diagram__svg arch-diagram__svg--compact' : 'arch-diagram__svg'}
      viewBox={`0 0 ${width} ${height}`}
      {...svgProps}
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
        const points = edgePoints(byId[edge.from], byId[edge.to], edge.bend)
        const mid = midpoint(points)
        const label = l(edge.label)
        return (
          <g
            key={`${edge.from}-${edge.to}`}
            className={classes('arch-diagram__link', highlight && (touches(edge) ? 'is-active' : 'is-dim'))}
          >
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
        const label = l(node.label)
        const sub = l(node.sub)
        const isSelected = highlight && node.id === selected
        const buttonProps = interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-pressed': isSelected,
              'aria-label': sub ? `${label}: ${sub}` : label,
              'data-node': node.id,
              onClick: () => onSelect(node.id),
              onKeyDown: (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return
                event.preventDefault()
                onSelect(node.id)
              },
            }
          : {}
        return (
          <g
            key={node.id}
            className={classes(
              'arch-diagram__item',
              node.layer && `arch-diagram__item--${node.layer}`,
              interactive && 'is-interactive',
              isSelected && 'is-selected',
              linked.has(node.id) && 'is-linked',
            )}
            {...buttonProps}
          >
            {interactive && (
              <rect
                className="arch-diagram__focus"
                x={b.x - FOCUS_PAD}
                y={b.y - FOCUS_PAD}
                width={GRID.nodeW + 2 * FOCUS_PAD}
                height={GRID.nodeH + 2 * FOCUS_PAD}
                rx="11"
              />
            )}
            <rect className="arch-diagram__node" x={b.x} y={b.y} width={GRID.nodeW} height={GRID.nodeH} rx="8" />
            <text
              className="arch-diagram__label"
              x={b.cx}
              y={sub ? b.cy - 8 : b.cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
            >
              {label}
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
  // No modo interativo a moldura e a legenda são do `ArchExplorer`; os nós já são focáveis pelo teclado.
  if (interactive) {
    return (
      <div className="arch-diagram__scroll" ref={scrollRef}>
        {svg}
      </div>
    )
  }
  return (
    <figure className="arch-diagram">
      <div className="arch-diagram__scroll" role="group" aria-label={title} tabIndex={0}>
        {svg}
      </div>
      <figcaption className="mono">{title}</figcaption>
    </figure>
  )
}
