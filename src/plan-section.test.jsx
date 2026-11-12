import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const REPORT =
  'https://github.com/Walter-Dalla/portfolio/blob/master/docs/relatorios/2026-11-10-curriculo-vinculos.md'

const PLAN = [
  'pendencias-1 · Demo button at the top of the project page, short label "Ver demo" / "See demo"',
  'pendencias-2 · Notice that the interactive demo is in Portuguese only, shown when the site is in English',
  'pendencias-3 · Engineering numbers in the fact sheet (commits, tests, mutation tests)',
  'pendencias-4 · Three-bullet summary (problem, what I did, result) at the top of each project',
].join('\n')

const planSection = (name) => screen.getByRole('heading', { level: 2, name }).closest('section')

describe('seção "Como eu planejo" do wh-harness', () => {
  it('vem depois das duas seções padrão, com cinco passos numerados', () => {
    renderApp('/projects/wh-harness')
    const titles = within(document.querySelector('.project__body'))
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent)
    expect(titles.slice(0, 3)).toEqual(['01O projeto', '02Como foi feito com IA', '03Como eu planejo'])

    const section = planSection(/Como eu planejo/)
    const list = within(section).getByRole('list')
    expect(list.tagName).toBe('OL')
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(5)
    expect(items.map((li) => li.querySelector('strong').textContent)).toEqual([
      'Solicitação',
      'Análise',
      'Plano em faixas',
      'QA',
      'Retrospectiva',
    ])
  })

  it('liga ao relatório de uma execução e mostra o trecho do plano', () => {
    renderApp('/projects/wh-harness')
    const link = screen.getByRole('link', { name: 'relatório de uma execução (em português)' })
    expect(link).toHaveAttribute('href', REPORT)
    expect(link).toHaveAttribute('target', '_blank')
    expect(planSection(/Como eu planejo/).querySelector('pre').textContent).toBe(PLAN)
  })

  it('em inglês o título e os rótulos são traduzidos', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/wh-harness')
    const section = planSection(/How I plan/)
    expect(section.querySelector('ol.project__steps strong').textContent).toBe('Request')
    expect(section.querySelector('pre').textContent).toBe(PLAN)
  })

  it('projeto sem passos não tem lista de passos', () => {
    renderApp('/projects/goprint')
    expect(document.querySelector('ol.project__steps')).toBeNull()
  })
})
