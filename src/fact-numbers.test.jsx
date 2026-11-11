import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject, projects } from './content/projects.js'
import { pick } from './i18n/context.js'
import { renderApp } from './test/renderApp.jsx'

const AI_TITLE = 'Como foi feito com IA'

describe('números de engenharia na ficha', () => {
  it('cartas-malfaladas, kittycafe e wh-harness têm só os números já citados no conteúdo', () => {
    const numbers = (slug) => {
      const { commits, tests, mutation } = findProject(slug).facts
      return { commits, tests, mutation }
    }
    expect(numbers('cartas-malfaladas')).toEqual({
      commits: { pt: '717 · 628 com o Claude como coautor', en: '717 · 628 with Claude as co-author' },
      tests: null,
      mutation: { pt: 'Stryker, toda noite nos módulos críticos', en: 'Stryker, nightly on the critical modules' },
    })
    expect(numbers('kittycafe')).toEqual({
      commits: { pt: '1.822 · 1.594 com o Claude como coautor', en: '1,822 · 1,594 with Claude as co-author' },
      tests: null,
      mutation: { pt: 'job noturno no CI', en: 'nightly CI job' },
    })
    expect(numbers('wh-harness')).toEqual({ commits: null, tests: '32', mutation: null })
  })

  it.each(['pt', 'en'])('cada número de commits aparece no texto de IA do projeto (%s)', (lang) => {
    const withCommits = projects.filter((p) => p.facts.commits)
    expect(withCommits.length).toBeGreaterThan(0)
    for (const project of withCommits) {
      const ai = project.sections.find((s) => s.title.pt === AI_TITLE)
      const text = ai.paragraphs.map((p) => pick(p, lang)).join(' ')
      for (const part of pick(project.facts.commits, lang).split(' · ')) {
        const number = part.match(/^[\d.,]+/)[0]
        expect(text).toContain(number)
      }
    }
  })

  it('a ficha das Cartas Malfaladas mostra commits e testes de mutação', () => {
    renderApp('/projects/cartas-malfaladas')
    const facts = screen.getByRole('complementary', { name: 'Ficha do projeto' })
    expect(within(facts).getByText('commits')).toBeInTheDocument()
    expect(within(facts).getByText('717 · 628 com o Claude como coautor')).toBeInTheDocument()
    expect(within(facts).getByText('testes de mutação')).toBeInTheDocument()
    expect(within(facts).getByText('Stryker, toda noite nos módulos críticos')).toBeInTheDocument()
  })

  it('a ficha do wh-harness mostra 32 testes', () => {
    renderApp('/projects/wh-harness')
    const facts = screen.getByRole('complementary', { name: 'Ficha do projeto' })
    expect(within(facts).getByText('testes')).toBeInTheDocument()
    expect(within(facts).getByText('32')).toBeInTheDocument()
  })

  it.each(['homelab', 'insect-behavioral-analysis'])('%s não mostra nenhum dos três números', (slug) => {
    renderApp(`/projects/${slug}`)
    const facts = screen.getByRole('complementary', { name: 'Ficha do projeto' })
    for (const label of ['commits', 'testes', 'testes de mutação']) {
      expect(within(facts).queryByText(label)).toBeNull()
    }
  })
})
