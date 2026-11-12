import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const PT = 'https://walter-dalla.github.io/wh-harness/pt/'
const EN = 'https://walter-dalla.github.io/wh-harness/en/'
const TITLE_PT = 'wh-harness — Demonstração interativa'

const frameSrc = (frame) => new URL(frame.getAttribute('src'))

describe('demo e fluxo embutido do wh-harness no idioma do site', () => {
  it('em português, botão, iframe e tela cheia vão para o caminho em português', () => {
    renderApp('/projects/wh-harness')
    expect(screen.getByRole('link', { name: 'Ver demo' })).toHaveAttribute('href', PT)
    const src = frameSrc(screen.getByTitle(TITLE_PT))
    expect(src.origin + src.pathname).toBe(PT)
    expect(src.searchParams.get('embed')).toBe('1')
    expect(src.searchParams.get('theme')).toBe('dark')
    expect(screen.getByRole('link', { name: 'abrir em tela cheia' })).toHaveAttribute('href', PT)
  })

  it('em inglês, botão, iframe e tela cheia vão para o caminho em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/wh-harness')
    expect(screen.getByRole('link', { name: 'See demo' })).toHaveAttribute('href', EN)
    const src = frameSrc(screen.getByTitle('wh-harness — Interactive demo'))
    expect(src.origin + src.pathname).toBe(EN)
    expect(src.searchParams.get('embed')).toBe('1')
    expect(src.searchParams.get('theme')).toBe('dark')
    expect(screen.getByRole('link', { name: 'open full screen' })).toHaveAttribute('href', EN)
  })

  it('trocar o idioma não recarrega o iframe, mas os links seguem o idioma novo', () => {
    renderApp('/projects/wh-harness')
    const frame = screen.getByTitle(TITLE_PT)
    const before = frame.getAttribute('src')
    expect(before).toBe(`${PT}?embed=1&theme=dark`)

    fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    const after = screen.getByTitle('wh-harness — Interactive demo')
    expect(after).toBe(frame)
    expect(after.getAttribute('src')).toBe(before)
    expect(screen.getByRole('link', { name: 'See demo' })).toHaveAttribute('href', EN)
    expect(screen.getByRole('link', { name: 'open full screen' })).toHaveAttribute('href', EN)
  })
})
