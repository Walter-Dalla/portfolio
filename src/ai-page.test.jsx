import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { about } from './content/about.js'
import { aiPage } from './content/ai.js'
import { experiences } from './content/experiences.js'
import { findProject, projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

const flaggedBullets = experiences.flatMap((entry) => entry.positions ?? [entry]).flatMap((p) => p.bullets.filter((b) => b.ai))

describe('página Como trabalho com IA', () => {
  it('mostra o título em português', () => {
    renderApp('/ai')
    expect(screen.getByRole('heading', { level: 1, name: 'Como trabalho com IA' })).toBeInTheDocument()
  })

  it('mostra o título em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/ai')
    expect(screen.getByRole('heading', { level: 1, name: 'How I work with AI' })).toBeInTheDocument()
  })

  it('abre com a frase do Sobre, sem texto novo', () => {
    expect(about.paragraphs[1].text.pt).toContain(aiPage.lede.pt)
    expect(about.paragraphs[1].text.en).toContain(aiPage.lede.en)
    renderApp('/ai')
    expect(screen.getByText(aiPage.lede.pt)).toBeInTheDocument()
  })

  it('lista os bullets do currículo marcados com ai, com a empresa', () => {
    expect(flaggedBullets).toHaveLength(3)
    renderApp('/ai')
    const items = document.querySelectorAll('.ai-work > li')
    expect(items).toHaveLength(flaggedBullets.length)
    const companies = [...document.querySelectorAll('.ai-work .mono')].map((el) => el.textContent)
    expect(companies.filter((c) => c === 'AgileEngine (EUA)')).toHaveLength(2)
    expect(companies.filter((c) => c === 'Qyon')).toHaveLength(1)
    const strong = within(document.querySelector('.ai-work')).getByText('mais de 20 desenvolvedores')
    expect(strong.tagName).toBe('STRONG')
    expect(strong).toHaveClass('hl')
  })

  it('mostra o resumo e o texto de IA do wh-harness', () => {
    const harness = findProject('wh-harness')
    renderApp('/ai')
    expect(screen.getByText(harness.summary.pt)).toBeInTheDocument()
    expect(screen.getByText(harness.ai.pt)).toBeInTheDocument()
  })

  it('mostra os outros projetos com texto de IA, na ordem definida', () => {
    renderApp('/ai')
    const grid = document.querySelector('.ai-projects')
    const titles = within(grid).getAllByRole('heading', { level: 3 })
    expect(titles.map((h) => h.textContent)).toEqual([
      'KittyCafé',
      'Cartas Malfaladas',
      'GoPrint',
      'Nesse Capítulo',
      'Este portfólio',
    ])
    const slugs = ['kittycafe', 'cartas-malfaladas', 'goprint', 'nesse-capitulo', 'portfolio']
    const cards = within(grid).getAllByRole('article')
    cards.forEach((card, i) => {
      const project = findProject(slugs[i])
      expect(within(card).getByText(project.ai.pt)).toBeInTheDocument()
      expect(within(card).getByRole('link')).toHaveAttribute('href', `/projects/${slugs[i]}`)
    })
  })

  it('o texto ai de cada projeto é o parágrafo de "Como foi feito com IA"', () => {
    const withAi = projects.filter((p) => p.ai)
    expect(withAi).toHaveLength(6)
    for (const project of withAi) {
      const section = project.sections.find((s) => s.title.pt === 'Como foi feito com IA')
      expect(section.paragraphs, project.slug).toEqual([project.ai])
    }
    expect(findProject('homelab').ai).toBeFalsy()
    expect(findProject('insect-behavioral-analysis').ai).toBeFalsy()
  })

  it('leva ao currículo, que continua com o bullet original', () => {
    renderApp('/ai')
    expect(screen.getByRole('link', { name: 'ver no currículo →' })).toHaveAttribute('href', '/resume')
  })

  it('o currículo continua mostrando o bullet marcado uma vez', () => {
    renderApp('/resume')
    expect(screen.getAllByText(/adotados por um time de/)).toHaveLength(1)
  })
})
