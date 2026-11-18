import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

describe('botão da demo no KittyCafé e no Nesse Capítulo', () => {
  it('o KittyCafé tem a demo em nova aba e avisa que pede login', () => {
    renderApp('/projects/kittycafe')
    const link = screen.getByRole('link', { name: 'Ver demo' })
    expect(link).toHaveAttribute('href', 'https://kittycafe.walterdalla.uk')
    expect(link).toHaveAttribute('target', '_blank')
    const note = screen.getByText('pede login com Google')
    expect(note).toHaveClass('project__demo-note')
    expect(note.previousElementSibling).toBe(link)
  })

  it('em inglês o aviso do KittyCafé é "requires Google sign-in"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/kittycafe')
    expect(screen.getByRole('link', { name: 'See demo' })).toBeInTheDocument()
    expect(screen.getByText('requires Google sign-in')).toBeInTheDocument()
  })

  it('o Nesse Capítulo tem a demo em nova aba, sem aviso', () => {
    renderApp('/projects/nesse-capitulo')
    const link = screen.getByRole('link', { name: 'Ver demo' })
    expect(link).toHaveAttribute('href', 'https://nesse-capitulo.walterdalla.uk')
    expect(link).toHaveAttribute('target', '_blank')
    expect(document.querySelector('.project__demo-note')).toBeNull()
  })

  it('o GoPrint segue sem botão nem aviso', () => {
    renderApp('/projects/goprint')
    expect(screen.queryByRole('link', { name: 'Ver demo' })).toBeNull()
    expect(document.querySelector('.project__demo-note')).toBeNull()
  })
})
