import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { metrics } from './content/profile.js'
import { projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

const LABEL = {
  pt: 'projetos feitos com arquitetura robusta + IA coding',
  en: 'projects built with robust architecture + AI coding',
}

describe('Início: métrica de projetos com IA', () => {
  it('troca 8→1 por 6, na 2ª posição', () => {
    expect(metrics.map((m) => m.value)).toEqual(['−23%', '6', '7→1', '~36%'])
  })

  it('o número acompanha os projetos com seção de IA', () => {
    expect(Number(metrics[1].value)).toBe(projects.filter((p) => p.ai).length)
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
})
