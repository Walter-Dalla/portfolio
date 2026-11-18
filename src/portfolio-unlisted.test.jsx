import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject, projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

describe('portfólio fora da lista de projetos, com colofão no rodapé', () => {
  it('não está em projects, mas a página existe', () => {
    expect(projects.map((p) => p.slug)).not.toContain('portfolio')
    expect(findProject('portfolio')).toBeTruthy()
  })

  it('a lista de projetos não mostra "Este portfólio"', () => {
    renderApp('/projects')
    expect(within(screen.getByRole('main')).queryByText('Este portfólio')).not.toBeInTheDocument()
  })

  it('a página do portfólio abre por link direto', () => {
    renderApp('/projects/portfolio')
    expect(screen.getByRole('heading', { level: 1, name: 'Este portfólio' })).toBeInTheDocument()
  })

  it('o rodapé tem o colofão e o link do código', () => {
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.getByRole('link', { name: 'Como este site é feito →' })).toHaveAttribute('href', '/projects/portfolio')
    const source = footer.getByRole('link', { name: 'código ↗' })
    expect(source).toHaveAttribute('href', 'https://github.com/Walter-Dalla/portfolio')
    expect(source).toHaveAttribute('target', '_blank')
  })

  it('em inglês o colofão é "How this site is built →"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.getByRole('link', { name: 'How this site is built →' })).toHaveAttribute('href', '/projects/portfolio')
    expect(footer.getByRole('link', { name: 'source ↗' })).toBeInTheDocument()
  })
})
