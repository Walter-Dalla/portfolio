import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { diagramSize } from './components/ArchDiagram.jsx'
import { architectureSystems } from './content/architecture.js'
import { findDiagram } from './content/diagrams.js'
import { renderApp } from './test/renderApp.jsx'

const css = readFileSync(resolve(process.cwd(), 'src/pages/home.css'), 'utf8')
const { width } = diagramSize(findDiagram(architectureSystems[0].slug))

const clamp = (min, value, max) => Math.min(Math.max(value, min), max)

// Largura do svg da miniatura com a raiz do site em `site` px, pelas medidas do CSS:
// container (max-width 1200, gutter clamp(20px, 5cqi, 48px)), cartão `.home-arch` (borda 1, padding
// clamp(24px, 4cqi, 48px)) e figura (max-width = largura do diagrama, borda 1 e padding 12, border-box).
function svgWidth(site) {
  const gutter = clamp(20, 0.05 * site, 48)
  const cardPad = clamp(24, 0.04 * site, 48)
  const card = Math.min(site, 1200) - 2 * gutter - 2 * 1 - 2 * cardPad
  return Math.min(width, card) - 2 * (12 + 1)
}

// A media query mede a janela com a barra de rolagem; o cqi mede a raiz do site, sem ela. Barra clássica do
// Chromium no desktop: 15px (medido a 1440px de janela: raiz com 1425px).
const SCROLLBAR = 15

// Menor largura de janela em que o rótulo do nó (13px no viewBox) fica com 11px ou mais na tela.
function threshold() {
  let site = 320
  while ((svgWidth(site) * 13) / width < 11) site += 1
  return site + SCROLLBAR
}

describe('miniatura de arquitetura do Início', () => {
  it('a figura tem o max-width do diagrama', () => {
    renderApp('/')
    const figure = document.querySelector('.home-arch__figure')
    expect(figure.style.maxWidth).toBe(`${width}px`)
  })

  it('a figura ocupa a linha de baixo, na largura do cartão', () => {
    const rule = css.match(/\.home-arch__figure \{[^}]*\}/)[0]
    expect(rule).toContain('flex-basis: 100%')
  })

  it('some abaixo da largura em que o rótulo cairia de 11px', () => {
    const limit = threshold()
    expect(svgWidth(limit - SCROLLBAR) * 13).toBeGreaterThanOrEqual(11 * width)
    expect(svgWidth(limit - SCROLLBAR - 1) * 13).toBeLessThan(11 * width)
    expect(css).toMatch(new RegExp(`@media \\(max-width: ${limit - 1}px\\) \\{\\s*\\.home-arch__figure \\{\\s*display: none;`))
  })
})
