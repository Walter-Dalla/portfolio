import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const box = () => document.querySelector('.contact__resume')
const follows = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('Contato: currículo em destaque', () => {
  it('mostra título e apoio dentro da caixa', () => {
    renderApp('/contact')
    const b = within(box())
    expect(b.getByText('Prefere o currículo direto?')).toBeInTheDocument()
    expect(b.getByText('Versões em PDF, prontas para enviar ao seu time.')).toBeInTheDocument()
  })

  it('tem um botão por PDF, o do idioma atual como principal, e o link para /resume', () => {
    renderApp('/contact')
    const b = within(box())
    const pt = b.getByRole('link', { name: 'Baixar PDF · PT' })
    expect(pt).toHaveAttribute('href', '/cv/walter-dalla-cv-pt.pdf')
    expect(pt).toHaveClass('btn--primary')
    const en = b.getByRole('link', { name: 'Download PDF · EN' })
    expect(en).toHaveAttribute('href', '/cv/walter-dalla-cv-en.pdf')
    expect(en).toHaveClass('btn--secondary')
    expect(b.getByRole('link', { name: 'ver currículo online →' })).toHaveAttribute('href', '/resume')
  })

  it('vem logo depois do e-mail e antes dos cartões', () => {
    renderApp('/contact')
    expect(follows(document.querySelector('.contact__email'), box())).toBe(true)
    expect(follows(box(), document.querySelector('.contact__grid'))).toBe(true)
  })

  it('em inglês, o PDF em inglês vem primeiro, como principal', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/contact')
    const b = within(box())
    const pdfs = b.getAllByRole('link').filter((a) => a.classList.contains('btn'))
    expect(pdfs[0]).toHaveTextContent('Download PDF · EN')
    expect(pdfs[0]).toHaveClass('btn--primary')
    expect(screen.getByRole('link', { name: 'see resume online →' })).toHaveAttribute('href', '/resume')
  })
})
