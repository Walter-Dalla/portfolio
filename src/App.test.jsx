import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

describe('rotas', () => {
  it.each([
    ['/', 'Walter Dalla Torre Neto'],
    ['/resume', 'Currículo'],
    ['/projects', 'Projetos'],
    ['/projects/insect-behavioral-analysis', 'Ferramenta para Análise Comportamental de Insetos'],
    ['/projects/wh-harness', 'wh-harness'],
    ['/achievements', 'Conquistas acadêmicas'],
    ['/about', 'Oi, eu sou o Walter.'],
    ['/contact', 'Vamos conversar.'],
    ['/nao-existe', 'Página não encontrada'],
    ['/projects/nao-existe', 'Página não encontrada'],
    ['/projects/mongodb-benchmark', 'Página não encontrada'],
    // Caminhos antigos em português redirecionam para os atuais.
    ['/curriculo', 'Currículo'],
    ['/projetos', 'Projetos'],
    ['/projetos/analise-comportamental-insetos', 'Ferramenta para Análise Comportamental de Insetos'],
    ['/projetos/wh-harness', 'wh-harness'],
    ['/conquistas', 'Conquistas acadêmicas'],
    ['/sobre', 'Oi, eu sou o Walter.'],
    ['/contato', 'Vamos conversar.'],
  ])('%s mostra o título "%s"', (path, title) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title)
  })

  it('marca o item ativo da navegação', () => {
    renderApp('/about')
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
  it('abre em inglês quando não há escolha salva', () => {
    localStorage.removeItem('wd-lang')
    renderApp('/contact')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Let's talk.")
    expect(document.documentElement.lang).toBe('en')
  })

  it('troca a interface e o conteúdo para inglês', async () => {
    renderApp('/contact')
    await userEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Let's talk.")
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('wd-lang')).toBe('en')
  })

  it('traduz o conteúdo do currículo', async () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    expect(screen.getByRole('heading', { name: 'Senior Software Engineer & Systems Architect' })).toBeInTheDocument()
    expect(screen.getByText(/BTG Pactual \(Brazilian Investment Bank\)/)).toBeInTheDocument()
  })
})

describe('projetos', () => {
  it('filtra por categoria', async () => {
    renderApp('/projects')
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
    await userEvent.click(screen.getByRole('button', { name: 'pesquisa' }))
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Ferramenta para Análise Comportamental de Insetos')
    await userEvent.click(screen.getByRole('button', { name: `todos · ${projects.length}` }))
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })

  it('liga o estudo de caso de insetos ao TCC', () => {
    renderApp('/projects/insect-behavioral-analysis')
    expect(screen.getByRole('link', { name: 'TCC (UNESP)' })).toHaveAttribute(
      'href',
      'https://hdl.handle.net/11449/258670',
    )
  })

  it('só mostra link de repositório quando ele existe', () => {
    renderApp('/projects')
    const repos = screen.getAllByRole('link', { name: 'repositório ↗' })
    const withRepo = projects.filter((p) => p.repo)
    expect(repos).toHaveLength(withRepo.length)
    expect(repos.map((a) => a.getAttribute('href'))).toEqual(withRepo.map((p) => p.repo))
  })
})

describe('conteúdo pendente', () => {
  it('não mostra textos de placeholder do design', () => {
    for (const path of ['/', '/resume', '/projects', '/achievements', '/about', '/contact']) {
      const { container, unmount } = renderApp(path)
      expect(container.textContent).not.toMatch(/\[[A-ZÀ-Ú][A-ZÀ-Ú ]+/)
      unmount()
    }
  })

  it('oferece os PDFs em inglês e português', () => {
    renderApp('/resume')
    expect(screen.getByRole('link', { name: /Download in English/ })).toHaveAttribute(
      'href',
      '/cv/walter-dalla-cv-en.pdf',
    )
    expect(screen.getByRole('link', { name: /Baixar em português/ })).toHaveAttribute(
      'href',
      '/cv/walter-dalla-cv-pt.pdf',
    )
  })

  it('destaca o PDF do idioma atual no currículo', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    expect(screen.getByRole('link', { name: /Download in English/ })).toHaveClass('btn--primary')
    expect(screen.getByRole('link', { name: /Download in Portuguese/ })).toHaveClass('btn--secondary')
  })

  it('mantém o PDF em português em destaque na página em português', () => {
    renderApp('/resume')
    expect(screen.getByRole('link', { name: /Baixar em português/ })).toHaveClass('btn--primary')
    expect(screen.getByRole('link', { name: /Download in English/ })).toHaveClass('btn--secondary')
  })
})
