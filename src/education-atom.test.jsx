import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const education = () => within(document.getElementById('formacao'))

describe('Atom na formação do currículo', () => {
  it('liga o curso técnico à página do Atom, na mesma aba', () => {
    renderApp('/resume')
    education().getByText(/TCC: Atom, questionários totalmente customizáveis/)
    const link = education().getByRole('link', { name: 'Ver projeto →' })
    expect(link).toHaveAttribute('href', '/projects/atom')
    expect(link).not.toHaveAttribute('target')
  })

  it('mantém o artigo da UNESP como link externo', () => {
    renderApp('/resume')
    const link = education().getByRole('link', { name: 'Ver artigo ↗' })
    expect(link).toHaveAttribute('href', 'https://hdl.handle.net/11449/258670')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('traduz o link em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    education().getByText(/Capstone project: Atom, fully customizable questionnaires/)
    expect(education().getByRole('link', { name: 'View project →' })).toHaveAttribute('href', '/projects/atom')
  })
})
