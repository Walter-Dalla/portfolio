import { describe, expect, it } from 'vitest'
import { findProject } from './content/projects.js'
import { render as renderToHtml } from './entry-server.jsx'
import { seoRoutes, sitemapRoutes } from './seo.js'

describe('seo de projeto fora da lista', () => {
  it('o Atom tem rota pré-renderizada com noindex, título e descrição em inglês', () => {
    const atom = seoRoutes().find((r) => r.path === '/projects/atom')
    expect(atom.noindex).toBe(true)
    expect(atom.title).toBe('Atom — Walter Dalla')
    expect(atom.description).toBe(findProject('atom').summary.en)
  })

  it('nenhuma outra rota tem noindex', () => {
    const marked = seoRoutes().filter((r) => r.noindex).map((r) => r.path)
    expect(marked).toEqual(['/projects/atom'])
  })

  it('o sitemap tem todas as rotas, menos o Atom', () => {
    const sitemap = sitemapRoutes().map((r) => r.path)
    expect(sitemap).not.toContain('/projects/atom')
    const others = seoRoutes()
      .map((r) => r.path)
      .filter((p) => p !== '/projects/atom')
    expect(sitemap).toEqual(others)
  })

  it('a página do Atom pré-renderiza', () => {
    expect(renderToHtml('/projects/atom')).toContain('<h1')
  })
})
