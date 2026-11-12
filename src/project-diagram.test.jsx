import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from './content/projects.js'
import { seoRoutes } from './seo.js'
import { renderApp } from './test/renderApp.jsx'

const h2Texts = () => screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)

describe('diagramas de arquitetura no site', () => {
  it('no Homelab, sem capa, o diagrama ocupa o lugar da capa', () => {
    renderApp('/projects/homelab')
    const slots = document.querySelectorAll('.project__diagram--cover')
    expect(slots).toHaveLength(1)
    const slot = slots[0]
    const layout = document.querySelector('.project__layout')
    expect(slot.compareDocumentPosition(layout) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(
      within(slot).getByRole('img', {
        name: 'Arquitetura do Homelab: publicação das imagens, acesso pelo túnel e backup',
      }),
    ).toBeInTheDocument()
    expect(slot.querySelector('svg[role="img"]')).not.toBeNull()
    expect(document.querySelector('.project__cover')).toBeNull()
    expect(h2Texts().some((text) => text.includes('Arquitetura'))).toBe(false)
  })

  it('no KittyCafé, com capa, o diagrama vira a seção numerada "Arquitetura"', () => {
    renderApp('/projects/kittycafe')
    const body = document.querySelector('.project__body')
    expect(
      within(body)
        .getAllByRole('heading', { level: 2 })
        .map((h) => h.textContent),
    ).toEqual(['01O projeto', '02Como foi feito com IA', '03Arquitetura', '04Decisões de arquitetura', '05Galeria'])
    expect(document.querySelectorAll('.project__diagram')).toHaveLength(1)
    expect(body.querySelector('.project__diagram')).not.toBeNull()
    expect(document.querySelector('.project__cover')).not.toBeNull()
  })

  it('em inglês a seção se chama "Architecture"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/kittycafe')
    expect(screen.getByRole('heading', { level: 2, name: /Architecture$/ })).toBeInTheDocument()
  })

  it('projeto sem diagrama não muda', () => {
    renderApp('/projects/goprint')
    expect(document.querySelector('.project__diagram')).toBeNull()
  })

  it('o card do Homelab usa a miniatura do diagrama no lugar da faixa sem capa', () => {
    renderApp('/projects')
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(projects.length)
    const homelab = cards.find((card) => card.querySelector('a[href="/projects/homelab"]'))
    expect(homelab.querySelector('.card__cover--diagram svg[aria-hidden="true"]')).not.toBeNull()
    expect(screen.queryByText(/sem capa ainda/)).toBeNull()
  })

  it('o Homelab continua com a imagem padrão no SEO', () => {
    const route = seoRoutes().find((r) => r.path === '/projects/homelab')
    expect(route.image).toBe('/og.png')
  })
})
