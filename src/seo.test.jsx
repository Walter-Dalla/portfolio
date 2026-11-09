import { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { projects } from './content/projects.js'
import { render as renderToHtml } from './entry-server.jsx'
import { seoRoutes, shortDescription } from './seo.js'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { App } from './App.jsx'

describe('seo', () => {
  it('lista todas as páginas públicas, com título e descrição', () => {
    const routes = seoRoutes()
    const paths = routes.map((r) => r.path)
    expect(paths).toEqual(expect.arrayContaining(['/', '/resume', '/projects', '/achievements', '/about', '/contact']))
    for (const p of projects) expect(paths).toContain(`/projects/${p.slug}`)
    for (const r of routes) {
      expect(r.title).toMatch(/Walter Dalla/)
      expect(r.description.length).toBeGreaterThan(20)
      expect(r.description.length).toBeLessThanOrEqual(161)
      expect(r.image).toMatch(/^\/img\//)
    }
  })

  it('corta descrições longas na última frase inteira', () => {
    expect(shortDescription('Curta.')).toBe('Curta.')
    expect(shortDescription(`${'a'.repeat(100)}. ${'b'.repeat(100)}.`)).toBe(`${'a'.repeat(100)}.`)
  })
})

describe('pré-render', () => {
  afterEach(() => {
    localStorage.clear()
    window.history.replaceState(null, '', '/')
  })

  // O cliente padrão (inglês, tema escuro) hidrata o HTML do build sem divergência.
  it.each(seoRoutes().map((r) => [r.path]))('hidrata %s sem erros', async (path) => {
    localStorage.clear()
    window.history.replaceState(null, '', path)
    const html = renderToHtml(path)
    expect(html).toMatch(/<h1/)
    const root = document.createElement('div')
    root.innerHTML = html
    document.body.append(root)
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    let app
    await act(async () => {
      app = hydrateRoot(
        root,
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>,
      )
    })
    expect(errors).not.toHaveBeenCalled()
    act(() => app.unmount())
    root.remove()
    errors.mockRestore()
  })
})
