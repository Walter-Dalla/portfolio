import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

describe('rotas', () => {
  it.each([
    ['/', 'Walter Dalla Torre Neto'],
    ['/curriculo', 'Currículo'],
    ['/projetos', 'Projetos'],
    ['/projetos/analise-comportamental-insetos', 'Análise comportamental de insetos'],
    ['/projetos/mongodb-benchmark', 'MongoDB Benchmark'],
    ['/conquistas', 'Conquistas acadêmicas'],
    ['/sobre', 'Oi, eu sou o Walter.'],
    ['/contato', 'Vamos conversar.'],
    ['/nao-existe', 'Página não encontrada'],
    ['/projetos/nao-existe', 'Página não encontrada'],
  ])('%s mostra o título "%s"', (path, title) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title)
  })

  it('marca o item ativo da navegação', () => {
    renderApp('/sobre')
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    expect(within(nav).getByRole('link', { name: 'Sobre' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('tema', () => {
  it('começa escuro e alterna para claro, lembrando a escolha', async () => {
    renderApp('/')
    expect(document.documentElement.dataset.theme).toBe('dark')
    await userEvent.click(screen.getByRole('button', { name: 'Alternar tema claro/escuro' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('wd-theme')).toBe('light')
  })
})

describe('idioma', () => {
  it('troca a interface e o conteúdo para inglês', async () => {
    renderApp('/contato')
    await userEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Let's talk.")
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('wd-lang')).toBe('en')
  })

  it('traduz o conteúdo do currículo', async () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/curriculo')
    expect(screen.getByText('Mentored 4 developers.')).toBeInTheDocument()
  })
})

describe('projetos', () => {
  it('filtra por categoria', async () => {
    renderApp('/projetos')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'pesquisa' }))
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Análise comportamental de insetos')
    await userEvent.click(screen.getByRole('button', { name: 'todos · 2' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('só mostra link de repositório quando ele existe', () => {
    renderApp('/projetos')
    const repos = screen.getAllByRole('link', { name: 'repositório ↗' })
    expect(repos).toHaveLength(1)
    expect(repos[0]).toHaveAttribute('href', 'https://github.com/Walter-Dalla/MongoDBBenchmark')
  })
})

describe('conteúdo pendente', () => {
  it('não mostra textos de placeholder do design', () => {
    for (const path of ['/', '/curriculo', '/projetos', '/conquistas', '/sobre', '/contato']) {
      const { container, unmount } = renderApp(path)
      expect(container.textContent).not.toMatch(/\[[A-ZÀ-Ú][A-ZÀ-Ú ]+/)
      unmount()
    }
  })

  it('oferece só os PDFs que existem', () => {
    renderApp('/curriculo')
    expect(screen.getByRole('link', { name: /Download in English/ })).toHaveAttribute(
      'href',
      '/cv/walter-dalla-cv-en.pdf',
    )
    expect(screen.queryByRole('link', { name: /Baixar em português/ })).not.toBeInTheDocument()
  })
})
