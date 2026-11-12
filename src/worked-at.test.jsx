import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const after = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('Início: faixa "Onde atuei"', () => {
  it('lista os quatro nomes, na ordem, entre o hero e as métricas', () => {
    renderApp('/')
    const list = screen.getByRole('list', { name: 'Onde atuei' })
    expect(within(list).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'BTG Pactual',
      'Qyon',
      'AgileEngine',
      'UNICAMP',
    ])
    expect(within(list).queryAllByRole('link')).toHaveLength(0)
    expect(after(document.querySelector('.hero'), list)).toBe(true)
    expect(after(list, document.querySelector('.metrics'))).toBe(true)
  })

  it('em EN o nome da lista é "Where I\'ve worked"', () => {
    renderApp('/')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('list', { name: "Where I've worked" })).toBeInTheDocument()
  })
})
