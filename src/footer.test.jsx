import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { strings } from './i18n/strings.js'
import { renderApp } from './test/renderApp.jsx'

const EMAIL = 'walterdallaprofissional@gmail.com'

describe('rodapé: bloco "Fale comigo"', () => {
  it('tem o título nos dois idiomas', () => {
    expect(strings.footerContactTitle).toEqual({ pt: 'Fale comigo', en: 'Get in touch' })
  })

  it('mostra o título como heading de nível 2', () => {
    renderApp('/about')
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('heading', { level: 2, name: 'Fale comigo' })).toBeInTheDocument()
  })

  it('mostra o contato por extenso, com os links certos', () => {
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`)
    const linkedin = footer.getByRole('link', { name: 'in/walter-dalla' })
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/walter-dalla')
    expect(linkedin).toHaveAttribute('target', '_blank')
    expect(footer.getByRole('link', { name: 'Walter-Dalla' })).toHaveAttribute('href', 'https://github.com/Walter-Dalla')
  })

  it('copia o e-mail pelo botão do rodapé', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    await userEvent.click(footer.getByRole('button', { name: 'Copiar e-mail' }))
    expect(writeText).toHaveBeenCalledWith(EMAIL)
  })

  it('vem antes da navegação do rodapé', () => {
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    const heading = footer.getByRole('heading', { level: 2, name: 'Fale comigo' })
    const nav = footer.getByRole('navigation', { name: 'Rodapé' })
    expect(heading.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('em inglês o título é "Get in touch"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/about')
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.getByRole('heading', { level: 2, name: 'Get in touch' })).toBeInTheDocument()
  })
})
