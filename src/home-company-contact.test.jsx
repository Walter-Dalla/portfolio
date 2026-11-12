import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { company, profile } from './content/profile.js'
import { renderApp } from './test/renderApp.jsx'

const card = () => document.querySelector('.home-company')

describe('Início: cartão de contato da empresa', () => {
  it('é uma seção com heading "Atendimento como PJ"', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 2, name: 'Atendimento como PJ' })).toBeInTheDocument()
  })

  it('traz a empresa e o contato por extenso, com os links certos', () => {
    renderApp('/')
    const c = within(card())
    expect(c.getByRole('heading', { level: 3, name: company.name })).toBeInTheDocument()
    expect(c.getByText(company.cnpj)).toBeInTheDocument()
    expect(c.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`)
    const linkedin = c.getByRole('link', { name: 'in/walter-dalla' })
    expect(linkedin).toHaveAttribute('href', profile.linkedin)
    expect(linkedin).toHaveAttribute('target', '_blank')
    const github = c.getByRole('link', { name: 'Walter-Dalla' })
    expect(github).toHaveAttribute('href', profile.github)
    expect(github).toHaveAttribute('target', '_blank')
  })

  it('copia o e-mail pelo botão do cartão', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderApp('/')
    await userEvent.click(within(card()).getByRole('button', { name: 'Copiar e-mail' }))
    expect(writeText).toHaveBeenCalledWith(profile.email)
  })

  it('vem depois de "Mais sobre mim"', () => {
    renderApp('/')
    const explore = document.querySelector('.explore')
    expect(explore.compareDocumentPosition(card()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('no Início o rodapé não repete "Fale comigo"', () => {
    renderApp('/')
    expect(within(screen.getByRole('contentinfo')).queryByRole('heading', { name: 'Fale comigo' })).not.toBeInTheDocument()
  })

  it('em /about o rodapé mantém "Fale comigo"', () => {
    renderApp('/about')
    expect(within(screen.getByRole('contentinfo')).getByRole('heading', { name: 'Fale comigo' })).toBeInTheDocument()
  })

  it('em inglês o heading é "Contracting through my company"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/')
    expect(screen.getByRole('heading', { level: 2, name: 'Contracting through my company' })).toBeInTheDocument()
  })
})
