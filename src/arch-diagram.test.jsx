import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ArchDiagram, GRID, diagramSize } from './components/ArchDiagram.jsx'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'

// 4 colunas × 2 linhas: uma aresta reta, um cotovelo com seta nas duas pontas e um grupo.
const fixture = {
  title: { pt: 'Diagrama de teste', en: 'Test diagram' },
  nodes: [
    { id: 'a', label: 'A', sub: { pt: 'primeiro', en: 'first' }, col: 0, row: 0 },
    { id: 'b', label: 'B', col: 1, row: 0 },
    { id: 'c', label: 'C', col: 3, row: 0 },
    { id: 'x', label: { pt: 'xis', en: 'ex' }, col: 2, row: 1 },
  ],
  edges: [
    { from: 'a', to: 'b', label: 'reta' },
    { from: 'b', to: 'x', both: true },
  ],
  groups: [{ id: 'g', label: { pt: 'grupo', en: 'group' }, nodes: ['a', 'b'] }],
}

function renderDiagram(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('ArchDiagram', () => {
  it('calcula o tamanho pela grade', () => {
    expect(GRID).toEqual({ nodeW: 168, nodeH: 56, gapX: 36, gapY: 36, pad: 24 })
    expect(diagramSize(fixture)).toEqual({ width: 828, height: 196 })
  })

  it('desenha o svg com viewBox, nome acessível e limites de largura', () => {
    const { container } = renderDiagram(<ArchDiagram diagram={fixture} />)
    const svg = screen.getByRole('img', { name: 'Diagrama de teste' })
    expect(svg).toHaveAttribute('viewBox', '0 0 828 196')
    expect(svg.style.minWidth).toBe('701px')
    expect(svg.style.maxWidth).toBe('828px')

    const scroll = screen.getByRole('group', { name: 'Diagrama de teste' })
    expect(scroll).toHaveClass('arch-diagram__scroll')
    expect(scroll).toHaveAttribute('tabindex', '0')
    expect(container.querySelector('figcaption')).toHaveTextContent('Diagrama de teste')

    const rects = container.querySelectorAll('rect.arch-diagram__node')
    expect(rects).toHaveLength(4)
    const x = rects[3]
    expect(x).toHaveAttribute('x', '432')
    expect(x).toHaveAttribute('y', '116')
    expect(x).toHaveAttribute('width', '168')
    expect(x).toHaveAttribute('height', '56')
  })

  it('usa o título em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderDiagram(<ArchDiagram diagram={fixture} />)
    expect(screen.getByRole('img', { name: 'Test diagram' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Test diagram' })).toBeInTheDocument()
  })

  it('traça arestas retas e em cotovelo, e o grupo antes dos nós', () => {
    const { container } = renderDiagram(<ArchDiagram diagram={fixture} />)
    const [straight, elbow] = container.querySelectorAll('polyline.arch-diagram__edge')
    // a (0,0) → b (1,0): da borda direita de a à borda esquerda de b.
    expect(straight).toHaveAttribute('points', '192,52 228,52')
    expect(straight).not.toHaveAttribute('marker-start')
    // b (1,0) → x (2,1): horizontal até o centro de x, depois desce até o topo dele.
    expect(elbow).toHaveAttribute('points', '396,52 516,52 516,116')
    expect(elbow).toHaveAttribute('marker-start')
    expect(screen.getByText('reta')).toHaveClass('arch-diagram__edge-label')

    const group = container.querySelector('rect.arch-diagram__group')
    expect(group).toHaveAttribute('x', '12')
    expect(group).toHaveAttribute('y', '12')
    expect(group).toHaveAttribute('width', `${168 * 2 + 36 + 24}`)
    expect(group.compareDocumentPosition(container.querySelector('rect.arch-diagram__node'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(screen.getByText('grupo')).toHaveClass('arch-diagram__group-label')
  })

  it('não tem cor literal na marcação', () => {
    const { container } = renderDiagram(<ArchDiagram diagram={fixture} />)
    expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,8}\b/i)
    expect(container.innerHTML).not.toMatch(/rgb\(/)
  })

  it('dá a cada diagrama o seu marcador', () => {
    const { container } = renderDiagram(
      <>
        <ArchDiagram diagram={fixture} />
        <ArchDiagram diagram={fixture} />
      </>,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(2)
    const ids = [...svgs].map((svg) => svg.querySelector('marker').id)
    expect(ids[0]).not.toBe(ids[1])
    svgs.forEach((svg, i) => {
      for (const edge of svg.querySelectorAll('polyline')) {
        expect(edge).toHaveAttribute('marker-end', `url(#${ids[i]})`)
      }
    })
  })

  it('compact: só o svg decorativo', () => {
    const { container } = renderDiagram(<ArchDiagram diagram={fixture} compact />)
    const svg = container.querySelector('svg[aria-hidden="true"]')
    expect(svg).toBeInTheDocument()
    expect(svg).not.toHaveAttribute('role')
    expect(svg).not.toHaveAttribute('style')
    expect(container.querySelector('title')).toBeNull()
    expect(container.querySelector('figcaption')).toBeNull()
    expect(container.querySelector('[tabindex]')).toBeNull()
  })

  it('renderiza no servidor', () => {
    expect(() => renderToString(<LanguageProvider><ArchDiagram diagram={fixture} /></LanguageProvider>)).not.toThrow()
  })
})
