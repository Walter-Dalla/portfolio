import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

describe('rodapé enxuto: sem navegação e sem ©', () => {
  it('não repete a navegação do cabeçalho', () => {
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.queryByRole('navigation')).not.toBeInTheDocument()
    expect(footer.queryByRole('link', { name: 'Sobre' })).not.toBeInTheDocument()
  })

  it('termina com nome e cidade, sem © nem ano', () => {
    renderApp('/about')
    const text = screen.getByRole('contentinfo').textContent
    expect(text).toContain('Walter Dalla Torre Neto · São Paulo, Brasil')
    expect(text).not.toContain('©')
    expect(text).not.toContain(String(new Date().getFullYear()))
  })

  it('em inglês, a cidade vem em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/about')
    expect(screen.getByRole('contentinfo').textContent).toContain('Walter Dalla Torre Neto · São Paulo, Brazil')
  })
})
