import { describe, expect, it } from 'vitest'
import { findProject } from './content/projects.js'
import { render as renderToHtml } from './entry-server.jsx'
import { seoRoutes, sitemapRoutes } from './seo.js'

const unlisted = ['/projects/atom', '/projects/portfolio']

describe('seo de projeto fora da lista', () => {
  it('o Atom tem rota pré-renderizada com noindex, título e descrição em inglês', () => {
    const atom = seoRoutes().find((r) => r.path === '/projects/atom')
    expect(atom.noindex).toBe(true)
    expect(atom.title).toBe('Atom — Walter Dalla')
    expect(atom.description).toBe(findProject('atom').summary.en)
  })

  it('o portfólio tem rota pré-renderizada com noindex', () => {
    const portfolio = seoRoutes().find((r) => r.path === '/projects/portfolio')
    expect(portfolio.noindex).toBe(true)
    expect(portfolio.description).toBe(findProject('portfolio').summary.en)
  })

  it('nenhuma outra rota tem noindex', () => {
    const marked = seoRoutes().filter((r) => r.noindex).map((r) => r.path)
    expect(marked.sort()).toEqual([...unlisted].sort())
  })

  it('o sitemap tem todas as rotas, menos o Atom e o portfólio', () => {
    const sitemap = sitemapRoutes().map((r) => r.path)
    for (const path of unlisted) expect(sitemap).not.toContain(path)
    const others = seoRoutes()
      .map((r) => r.path)
      .filter((p) => !unlisted.includes(p))
    expect(sitemap).toEqual(others)
  })

  it('as páginas fora da lista pré-renderizam', () => {
    expect(renderToHtml('/projects/atom')).toContain('<h1')
    expect(renderToHtml('/projects/portfolio')).toContain('<h1')
  })
})
