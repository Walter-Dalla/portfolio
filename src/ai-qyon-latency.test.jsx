import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const PT = 'Analisei diversos erros de latência e de memória com IA para identificar os pontos de lentidão e reestruturei a arquitetura onde a latência real ocorria.'
const EN = 'Analyzed multiple latency and memory errors with AI to pinpoint the slow spots, and restructured the architecture where the real latency occurred.'

const qyonBullets = () => {
  const group = [...document.querySelectorAll('.ai-work > li')].find(
    (li) => li.querySelector('.ai-work__company')?.textContent === 'Qyon',
  )
  return [...group.querySelectorAll('.ai-work__bullets > li')].map((li) => li.textContent)
}

describe('bullet da Qyon sobre latência e memória', () => {
  it('aparece em /ai como segundo bullet da Qyon, em português', () => {
    renderApp('/ai')
    const bullets = qyonBullets()
    expect(bullets).toHaveLength(2)
    expect(bullets[1]).toBe(PT)
  })

  it('aparece em /ai em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/ai')
    const bullets = qyonBullets()
    expect(bullets).toHaveLength(2)
    expect(bullets[1]).toBe(EN)
  })

  it('não aparece no currículo em português', () => {
    renderApp('/resume')
    expect(screen.queryByText(PT)).not.toBeInTheDocument()
    const timeline = within(document.getElementById('experiencia'))
    expect(timeline.getByText('mais de 20 desenvolvedores')).toBeInTheDocument()
  })

  it('não aparece no currículo em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    expect(screen.queryByText(EN)).not.toBeInTheDocument()
    expect(within(document.getElementById('experiencia')).getByText('20+ developers')).toBeInTheDocument()
  })
})
