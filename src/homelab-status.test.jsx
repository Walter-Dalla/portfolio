import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

describe('Homelab: status e texto do projeto', () => {
  it('a ficha mostra "Em produção"', () => {
    renderApp('/projects/homelab')
    const facts = screen.getByRole('complementary', { name: 'Ficha do projeto' })
    expect(within(facts).getByText('status')).toBeInTheDocument()
    expect(within(facts).getByText('Em produção')).toBeInTheDocument()
    expect(within(facts).queryByText('Em desenvolvimento')).toBeNull()
  })

  it('o status em inglês é "In production"', () => {
    expect(findProject('homelab').facts.status).toEqual({ pt: 'Em produção', en: 'In production' })
  })

  it('o texto começa pela stack e termina na ressolda (PT)', () => {
    const { pt } = findProject('homelab').sections[0].paragraphs[0]
    expect(pt.startsWith('Cada aplicação é uma stack Docker')).toBe(true)
    expect(pt.endsWith('sem sair das especificações do fabricante.')).toBe(true)
  })

  it('o texto começa pela stack e termina na ressolda (EN)', () => {
    const { en } = findProject('homelab').sections[0].paragraphs[0]
    expect(en.startsWith('Each application is a Docker stack')).toBe(true)
    expect(en.endsWith("within the manufacturer's specifications.")).toBe(true)
  })
})
