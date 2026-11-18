import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { detectLang } from './i18n/detect.js'
import { renderApp } from './test/renderApp.jsx'

function browserLanguage(value) {
  vi.spyOn(window.navigator, 'language', 'get').mockReturnValue(value)
}

describe('idioma do navegador no primeiro acesso', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sem escolha salva e navegador pt-BR, abre em português', () => {
    localStorage.removeItem('wd-lang')
    browserLanguage('pt-BR')
    expect(detectLang()).toBe('pt')
    renderApp('/contact')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Vamos conversar.')
    expect(document.documentElement.lang).toBe('pt-BR')
  })

  it('sem escolha salva e navegador en-US, abre em inglês', () => {
    localStorage.removeItem('wd-lang')
    browserLanguage('en-US')
    expect(detectLang()).toBe('en')
  })

  it('não diferencia maiúsculas no idioma do navegador', () => {
    localStorage.removeItem('wd-lang')
    browserLanguage('PT')
    expect(detectLang()).toBe('pt')
  })

  it('a escolha salva vence o navegador', () => {
    localStorage.setItem('wd-lang', 'en')
    browserLanguage('pt-BR')
    expect(detectLang()).toBe('en')
  })

  it('a detecção não grava a escolha', () => {
    localStorage.removeItem('wd-lang')
    browserLanguage('pt-BR')
    detectLang()
    renderApp('/contact')
    expect(localStorage.getItem('wd-lang')).toBeNull()
  })
})
