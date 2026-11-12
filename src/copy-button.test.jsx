import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

function copyButtons(name) {
  return screen.getAllByRole('button', { name })
}

function onlySpan(button) {
  const children = [...button.children]
  expect(children).toHaveLength(1)
  expect(children[0].tagName).toBe('SPAN')
  return children[0]
}

describe('botão de copiar: largura estável', () => {
  it('em /contact, cada botão "Copiar e-mail" traz os dois textos em data-* e um único span', () => {
    renderApp('/contact')
    const buttons = copyButtons('Copiar e-mail')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    for (const button of buttons) {
      expect(button).toHaveClass('copy-btn')
      expect(button).toHaveAttribute('data-label', 'Copiar e-mail')
      expect(button).toHaveAttribute('data-copied', 'copiado ✓')
      expect(onlySpan(button)).toHaveTextContent('Copiar e-mail')
    }
  })

  it('em inglês, os textos são "Copy e-mail" e "copied ✓"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/contact')
    for (const button of copyButtons('Copy e-mail')) {
      expect(button).toHaveAttribute('data-label', 'Copy e-mail')
      expect(button).toHaveAttribute('data-copied', 'copied ✓')
      expect(onlySpan(button)).toHaveTextContent('Copy e-mail')
    }
  })

  it('depois do clique o span mostra "copiado ✓" e os atributos não mudam', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderApp('/contact')
    const [button] = copyButtons('Copiar e-mail')
    await userEvent.click(button)
    expect(await screen.findByText('copiado ✓')).toBeInTheDocument()
    expect(onlySpan(button)).toHaveTextContent('copiado ✓')
    expect(button).toHaveAttribute('data-label', 'Copiar e-mail')
    expect(button).toHaveAttribute('data-copied', 'copiado ✓')
  })

  it('o CSS reserva a largura dos dois textos', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/components/layout.css'), 'utf8')
    expect(css).toContain('attr(data-label)')
    expect(css).toContain('attr(data-copied)')
  })
})
