import { act, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { ArchExplorer } from './components/ArchExplorer.jsx'
import { findDiagram } from './content/diagrams.js'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'

const goprint = findDiagram('goprint')
const proto = Element.prototype
const original = {
  scrollWidth: Object.getOwnPropertyDescriptor(proto, 'scrollWidth'),
  clientWidth: Object.getOwnPropertyDescriptor(proto, 'clientWidth'),
}

// Simula a largura do conteúdo e da moldura; o jsdom não faz layout e devolve 0 nas duas.
function setWidths(scrollWidth, clientWidth) {
  Object.defineProperty(proto, 'scrollWidth', { configurable: true, get: () => scrollWidth })
  Object.defineProperty(proto, 'clientWidth', { configurable: true, get: () => clientWidth })
}

afterEach(() => {
  Object.defineProperty(proto, 'scrollWidth', original.scrollWidth)
  Object.defineProperty(proto, 'clientWidth', original.clientWidth)
})

function renderExplorer() {
  render(
    <LanguageProvider>
      <ArchExplorer diagram={goprint} />
    </LanguageProvider>,
  )
  return document.querySelector('.arch-diagram__scroll')
}

describe('aviso de rolagem do explorador', () => {
  it('a moldura que estoura ganha data-overflow', () => {
    setWidths(828, 350)
    expect(renderExplorer()).toHaveAttribute('data-overflow', 'true')
  })

  it('sem estouro, a moldura fica sem data-overflow', () => {
    setWidths(828, 828)
    expect(renderExplorer()).not.toHaveAttribute('data-overflow')
  })

  it('recalcula no resize da janela', () => {
    setWidths(828, 828)
    const scroll = renderExplorer()
    setWidths(828, 350)
    act(() => window.dispatchEvent(new Event('resize')))
    expect(scroll).toHaveAttribute('data-overflow', 'true')
    setWidths(828, 900)
    act(() => window.dispatchEvent(new Event('resize')))
    expect(scroll).not.toHaveAttribute('data-overflow')
  })

  it('o texto do aviso está no DOM em português', () => {
    renderExplorer()
    expect(screen.getByText('arraste para o lado para ver o resto')).toHaveClass('arch-explorer__scroll-hint')
  })

  it('o texto do aviso está no DOM em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderExplorer()
    expect(screen.getByText('swipe sideways to see the rest')).toHaveClass('arch-explorer__scroll-hint')
  })

  it('o CSS só mostra o aviso quando a moldura estoura', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/arch-explorer.css'), 'utf8')
    expect(css).toMatch(/\.arch-explorer__scroll-hint \{\s*display: none;/)
    expect(css).toMatch(
      /\.arch-explorer__diagram:has\(\.arch-diagram__scroll\[data-overflow\]\) \.arch-explorer__scroll-hint \{\s*display: inline;/,
    )
  })
})
