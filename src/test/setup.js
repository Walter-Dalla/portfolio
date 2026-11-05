import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// jsdom não implementa scroll; o Layout rola ao topo a cada rota.
window.scrollTo = vi.fn()

// Os testes são escritos em português; o padrão do site (inglês) tem teste próprio.
beforeEach(() => {
  localStorage.setItem('wd-lang', 'pt')
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})
