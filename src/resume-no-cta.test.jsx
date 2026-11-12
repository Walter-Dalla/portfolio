import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

describe('currículo sem o bloco final de PDFs', () => {
  it('não mostra o convite nem os botões repetidos em português', () => {
    renderApp('/resume')
    expect(screen.queryByText('Quer levar o currículo com você?')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Baixar PDF · PT' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Download PDF · EN' })).not.toBeInTheDocument()
  })

  it('não mostra o convite em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    expect(screen.queryByText('Want to take the resume with you?')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Download PDF · PT' })).not.toBeInTheDocument()
  })

  it('mantém os PDFs no topo', () => {
    renderApp('/resume')
    expect(screen.getByRole('link', { name: /Baixar em português/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Download in English/ })).toBeInTheDocument()
  })
})
