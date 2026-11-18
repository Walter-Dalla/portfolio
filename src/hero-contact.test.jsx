import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const PT = 'Aberto a propostas · remoto · PJ ou CLT'
const EN = 'Open to offers · remote · contractor or full-time'

const hero = () => document.querySelector('.hero')

describe('hero: disponibilidade e chamada para contato', () => {
  it('mostra a disponibilidade e o botão para /contact em PT', () => {
    renderApp('/')
    expect(within(hero()).getByText(PT, { exact: true })).toBeInTheDocument()
    const link = within(hero()).getByRole('link', { name: 'fale comigo →' })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('mostra a disponibilidade e o botão em EN', () => {
    renderApp('/')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(within(hero()).getByText(EN, { exact: true })).toBeInTheDocument()
    expect(within(hero()).getByRole('link', { name: 'get in touch →' })).toHaveAttribute('href', '/contact')
  })

  it('a mesma frase aparece em Contato', () => {
    renderApp('/contact')
    expect(screen.getByText(PT, { exact: true })).toBeInTheDocument()
  })
})
