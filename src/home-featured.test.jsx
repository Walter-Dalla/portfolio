import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

describe('Início com quatro projetos em destaque', () => {
  it('marca quatro projetos como destaque, na ordem da lista', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual([
      'wh-harness',
      'nesse-capitulo',
      'insect-behavioral-analysis',
      'kittycafe',
    ])
  })

  it('mostra os quatro cartões no Início, cada um levando ao projeto', () => {
    renderApp('/')
    const grid = document.querySelector('.home-projects')
    const titles = within(grid).getAllByRole('heading', { level: 3 })
    expect(titles.map((h) => h.textContent)).toEqual([
      'wh-harness',
      'Nesse Capítulo',
      'Ferramenta para Análise Comportamental de Insetos',
      'KittyCafé',
    ])
    const slugs = ['wh-harness', 'nesse-capitulo', 'insect-behavioral-analysis', 'kittycafe']
    titles.forEach((h, i) => {
      expect(within(h).getByRole('link')).toHaveAttribute('href', `/projects/${slugs[i]}`)
    })
  })

  it('usa uma grade de duas colunas no lugar do auto-fit', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/pages/home.css'), 'utf8')
    expect(css).toContain('repeat(2, minmax(0, 1fr))')
    expect(css).not.toContain('minmax(300px, 1fr)')
  })
})
