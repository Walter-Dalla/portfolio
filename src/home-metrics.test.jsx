import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { metrics } from './content/profile.js'
import { projects, unlistedProjects } from './content/projects.js'
import { pick } from './i18n/context.js'
import { renderApp } from './test/renderApp.jsx'

const LABEL = {
  pt: 'projetos feitos com arquitetura robusta + IA coding',
  en: 'projects built with robust architecture + AI coding',
}

describe('Início: métrica de projetos com IA', () => {
  it('PIX em primeiro, depois −23%, 6 e 7→1', () => {
    expect(metrics.map((m) => pick(m.value, 'pt'))).toEqual(['~7s → ~4,5s', '−23%', '6', '7→1'])
  })

  it('o número acompanha os projetos com seção de IA', () => {
    const ai = metrics.find((m) => m.value === '6')
    expect(Number(ai.value)).toBe([...projects, ...unlistedProjects].filter((p) => p.ai).length)
  })

  it('mostra o rótulo em PT e em EN, sem 8→1', () => {
    renderApp('/')
    const section = document.querySelector('.metrics')
    expect(within(section).getByText(LABEL.pt)).toBeInTheDocument()
    expect(within(section).queryByText('8→1')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(within(document.querySelector('.metrics')).getByText(LABEL.en)).toBeInTheDocument()
    expect(within(document.querySelector('.metrics')).queryByText('8→1')).toBeNull()
  })

  it('o valor do PIX segue o idioma e usa a fonte menor', () => {
    expect(metrics.filter((m) => m.long).map((m) => pick(m.value, 'pt'))).toEqual(['~7s → ~4,5s'])
    renderApp('/')
    expect(within(document.querySelector('.metrics')).getByText('~7s → ~4,5s')).toHaveClass('metric__value--long')
    expect(within(document.querySelector('.metrics')).getByText('6')).not.toHaveClass('metric__value--long')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(within(document.querySelector('.metrics')).getByText('~7s → ~4.5s')).toBeInTheDocument()
  })
})
