import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { render as renderToHtml } from './entry-server.jsx'
import { seoRoutes } from './seo.js'
import { renderApp } from './test/renderApp.jsx'

const navLinks = (name) => within(screen.getByRole('navigation', { name })).getAllByRole('link')

describe('rota /ai', () => {
  it('entra na navegação principal depois de Projetos, marcada como atual', () => {
    renderApp('/ai')
    const links = navLinks('Principal')
    expect(links.map((a) => a.textContent)).toEqual([
      'Início',
      'Currículo',
      'Projetos',
      'IA',
      'Conquistas',
      'Sobre',
      'Contato',
    ])
    const ai = links.find((a) => a.textContent === 'IA')
    expect(ai).toHaveAttribute('href', '/ai')
    expect(ai).toHaveAttribute('aria-current', 'page')
  })

  it('aparece também no rodapé', () => {
    renderApp('/ai')
    const ai = navLinks('Rodapé').find((a) => a.textContent === 'IA')
    expect(ai).toHaveAttribute('href', '/ai')
  })

  it('em inglês o link se chama AI', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/ai')
    expect(navLinks('Main').map((a) => a.textContent)).toContain('AI')
  })

  it('o link leva à página a partir do Início', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const ai = navLinks('Principal').find((a) => a.textContent === 'IA')
    await user.click(ai)
    expect(screen.getByRole('heading', { level: 1, name: 'Como trabalho com IA' })).toBeInTheDocument()
  })

  it('tem metadados de SEO em inglês', () => {
    const route = seoRoutes().find((r) => r.path === '/ai')
    expect(route.title).toBe('How I work with AI — Walter Dalla')
    expect(route.description.startsWith('Today, at AgileEngine, I build engineering workflows with AI agents')).toBe(true)
    expect(route.description.length).toBeLessThanOrEqual(161)
    expect(route.image).toBe('/og.png')
  })

  it('é pré-renderizada no servidor', () => {
    expect(renderToHtml('/ai')).toMatch(/<h1/)
  })

  it('entra no llms.txt logo depois de Projects', () => {
    const lines = readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8').split('\n')
    const line = '- [AI](https://walterdalla.uk/ai): how he works with AI agents'
    expect(lines).toContain(line)
    expect(lines[lines.indexOf(line) - 1].startsWith('- [Projects]')).toBe(true)
  })
})
