import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { architectureIntro, architectureSystems } from './content/architecture.js'
import { diagrams } from './content/diagrams.js'
import { render as renderToHtml } from './entry-server.jsx'
import { seoRoutes } from './seo.js'
import { renderApp } from './test/renderApp.jsx'

const navLinks = (name) => within(screen.getByRole('navigation', { name })).getAllByRole('link')
const callout = () => screen.getByRole('heading', { level: 2, name: 'Como eu desenho sistemas' }).closest('section')
const systemLinks = () => within(within(callout()).getByRole('list', { name: 'Arquitetura por sistema' })).getAllByRole('link')
const arch = () => document.getElementById('architecture')

describe('arquitetura dentro de cada projeto', () => {
  it('os sistemas são os projetos com diagrama, na ordem da chamada', () => {
    expect(architectureSystems.map((p) => p.slug)).toEqual(architectureIntro.order)
    expect(architectureIntro.order.toSorted()).toEqual(Object.keys(diagrams).toSorted())
  })

  it('não há página de arquitetura: fora do cabeçalho e do rodapé, e o endereço cai no 404', () => {
    renderApp('/architecture')
    expect(navLinks('Principal').map((a) => a.textContent)).toEqual([
      'Início',
      'Currículo',
      'Projetos',
      'IA',
      'Conquistas',
      'Sobre',
      'Contato',
    ])
    // O rodapé não tem navegação, só os contatos.
    expect(within(screen.getByRole('contentinfo')).queryByRole('link', { name: 'Arquitetura' })).toBeNull()
    expect(screen.getByRole('navigation', { name: 'Talvez você procure:' })).toBeInTheDocument()
  })

  it.each(architectureIntro.order)('%s tem a arquitetura na própria página, com o painel ao lado do diagrama', (slug) => {
    renderApp(`/projects/${slug}`)
    expect(arch().querySelector('.arch-explorer--side')).not.toBeNull()
    expect(document.querySelectorAll('.arch-explorer')).toHaveLength(1)
    expect(document.querySelector('.stack-list')).not.toBeNull()
    expect(document.querySelector('.decisions')).not.toBeNull()
  })

  it('fica fora do SEO como página, e o projeto já sai pré-renderizado com a arquitetura', () => {
    expect(seoRoutes().map((r) => r.path)).not.toContain('/architecture')
    expect(readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8')).not.toContain('/architecture')
    const html = renderToHtml('/projects/goprint')
    expect(html).toMatch(/id="architecture"/)
    expect(html).toMatch(/arch-diagram__svg/)
    expect(html).toMatch(/arch-panel__title/)
    expect(html).toMatch(/stack-list/)
  })
})

describe('chamada de arquitetura no Início', () => {
  it('tem um link por sistema, que abre o projeto na arquitetura, e a miniatura decorativa', () => {
    renderApp('/')
    expect(systemLinks().map((a) => [a.textContent, a.getAttribute('href')])).toEqual(
      architectureSystems.map((p) => [`${p.title.pt ?? p.title} →`, `/projects/${p.slug}#architecture`]),
    )
    const figure = callout().querySelector('.home-arch__figure')
    expect(figure).toHaveAttribute('href', '/projects/goprint#architecture')
    expect(figure.querySelector('svg[aria-hidden="true"]')).not.toBeNull()
    expect(document.querySelector('a[href^="/architecture"]')).toBeNull()
    expect(screen.getByText('03 · explore')).toBeInTheDocument()
  })

  it('Projetos não tem link para uma página de arquitetura', () => {
    renderApp('/projects')
    expect(document.querySelector('a[href^="/architecture"]')).toBeNull()
  })
})

describe('âncora da arquitetura', () => {
  // jsdom não implementa scrollIntoView: guarda quem foi rolado para a tela.
  let scrolled
  beforeEach(() => {
    scrolled = []
    Element.prototype.scrollIntoView = function () {
      scrolled.push(this)
    }
  })
  afterEach(() => {
    delete Element.prototype.scrollIntoView
  })

  it('um sistema do Início abre o projeto já na arquitetura, sem pular para o topo', async () => {
    const user = userEvent.setup()
    renderApp('/')
    window.scrollTo.mockClear()
    await user.click(systemLinks().find((a) => a.textContent.startsWith('KittyCafé')))
    expect(screen.getByRole('heading', { level: 1, name: 'KittyCafé' })).toBeInTheDocument()
    expect(arch().tagName).toBe('SECTION')
    expect(scrolled).toContain(arch())
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('abrir o endereço direto também rola até a arquitetura (no Homelab, o diagrama da capa)', () => {
    renderApp('/projects/homelab#architecture')
    expect(arch()).toBe(document.querySelector('.project__diagram--cover'))
    expect(scrolled).toContain(arch())
  })

  it('sair de um endereço com âncora para outra página abre no topo', async () => {
    const user = userEvent.setup()
    renderApp('/projects/portfolio#architecture')
    expect(arch()).toBeNull()
    window.scrollTo.mockClear()
    await user.click(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Projetos' }))
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
  })
})
