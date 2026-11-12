import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const card = (title) => screen.getByRole('heading', { level: 3, name: title }).closest('article')

describe('conquistas: cartão do curso técnico leva ao projeto de TCC', () => {
  it('mostra "sobre o projeto →" apontando para /projects/atom', () => {
    renderApp('/achievements')
    const link = within(card('Curso Técnico em Informática (Software)')).getByRole('link', { name: 'sobre o projeto →' })
    expect(link).toHaveAttribute('href', '/projects/atom')
  })

  it('os outros cartões da grade não têm esse link', () => {
    const { container } = renderApp('/achievements')
    const others = [...container.querySelectorAll('.achievements__grid article')].filter(
      (article) => article.querySelector('h3').textContent !== 'Curso Técnico em Informática (Software)',
    )
    expect(others.length).toBeGreaterThan(0)
    for (const article of others) {
      expect(within(article).queryByRole('link', { name: 'sobre o projeto →' })).toBeNull()
    }
  })

  it('em inglês o link se chama "about the project →"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/achievements')
    const link = within(card('Technical Degree in IT (Software)')).getByRole('link', { name: 'about the project →' })
    expect(link).toHaveAttribute('href', '/projects/atom')
  })
})
