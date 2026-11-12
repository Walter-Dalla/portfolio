import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experiences } from './content/experiences.js'
import { renderApp } from './test/renderApp.jsx'

const flaggedCount = experiences
  .flatMap((entry) => entry.positions ?? [entry])
  .flatMap((p) => p.bullets.filter((b) => b.ai)).length

const labels = () => [...document.querySelectorAll('.ai-work__company')].map((el) => el.textContent)

describe('página /ai: um rótulo de empresa por cargo', () => {
  it('mostra cada empresa uma vez, com os bullets abaixo', () => {
    renderApp('/ai')
    expect(labels()).toEqual(['AgileEngine (EUA)', 'Qyon'])
    expect(document.querySelectorAll('.ai-work > li')).toHaveLength(labels().length)
    expect(document.querySelectorAll('.ai-work__bullets > li')).toHaveLength(flaggedCount)
  })

  it('põe os dois bullets da AgileEngine no primeiro grupo', () => {
    renderApp('/ai')
    const first = document.querySelector('.ai-work > li')
    const bullets = [...first.querySelectorAll('.ai-work__bullets > li')].map((li) => li.textContent)
    expect(bullets).toEqual([
      'Projetei e implementei um harness customizado de orquestração de IA que executa skills programáticas de forma concorrente em múltiplas tarefas, viabilizando o desenvolvimento paralelizado.',
      'Construí fluxos de engenharia orientados por IA de ponta a ponta (análise, planejamento, implementação, testes, deploy) com agentes Claude e Codex, em Azure DevOps e Azure Cloud.',
    ])
  })

  it('mantém o destaque do bullet da Qyon', () => {
    renderApp('/ai')
    const strong = within(document.querySelector('.ai-work')).getByText('mais de 20 desenvolvedores')
    expect(strong.tagName).toBe('STRONG')
    expect(strong).toHaveClass('hl')
  })

  it('traduz os rótulos em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/ai')
    expect(labels()).toEqual(['AgileEngine (US)', 'Qyon'])
  })
})
