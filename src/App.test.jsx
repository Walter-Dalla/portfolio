import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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

  it('liga o wh-harness ao fluxo interativo estático', () => {
    renderApp('/projects/wh-harness')
    expect(screen.getByRole('link', { name: 'Ver a demonstração interativa' })).toHaveAttribute(
      'href',
      '/wh-harness/flow.html',
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

  it('mostra o cliente e a tag de projeto de cliente no GoPrint', () => {
    renderApp('/projects/goprint')
    expect(screen.getByText('cliente')).toBeInTheDocument()
    expect(screen.getByText('Andelph Group')).toBeInTheDocument()
    expect(screen.getByText('Projeto de cliente')).toBeInTheDocument()
  })

  it('liga a página Sobre ao currículo, aos projetos e às conquistas', () => {
    renderApp('/about')
    expect(screen.getByRole('link', { name: 'ver currículo completo →' })).toHaveAttribute('href', '/resume')
    expect(screen.getByRole('link', { name: 'todos os projetos →' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: 'ver conquistas →' })).toHaveAttribute('href', '/achievements')
    expect(screen.getByRole('link', { name: 'GoPrint →' })).toHaveAttribute('href', '/projects/goprint')
  })

  it('não menciona patente em nenhuma página', () => {
    for (const path of ['/', '/resume', '/projects', '/projects/insect-behavioral-analysis', '/achievements', '/about']) {
      const { container, unmount } = renderApp(path)
      expect(container.textContent).not.toMatch(/patent/i)
      unmount()
    }
  })

  it('mostra a adoção em destaque e as certificações em Conquistas', () => {
    renderApp('/achievements')
    expect(screen.getByRole('heading', { name: 'Software adotado por 3 laboratórios da UNICAMP' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cursos e certificações' })).toBeInTheDocument()
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

describe('navegação', () => {
  it('abre e fecha o menu do celular, fechando ao trocar de página', async () => {
    renderApp('/')
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    await userEvent.click(within(nav).getByRole('link', { name: 'Projetos' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projetos')
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu com Escape', async () => {
    renderApp('/')
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('repete a navegação no rodapé', () => {
    renderApp('/about')
    const footer = screen.getByRole('navigation', { name: 'Rodapé' })
    expect(within(footer).getByRole('link', { name: 'Sobre' })).toHaveAttribute('aria-current', 'page')
  })

  it('rola ao topo numa página nova, mas não ao trocar só o filtro', async () => {
    renderApp('/')
    window.scrollTo.mockClear()
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    await userEvent.click(within(nav).getByRole('link', { name: 'Projetos' }))
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
    window.scrollTo.mockClear()
    await userEvent.click(screen.getByRole('button', { name: 'web' }))
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('a página 404 oferece atalhos', () => {
    renderApp('/nao-existe')
    const hint = screen.getByRole('navigation', { name: 'Talvez você procure:' })
    expect(within(hint).getByRole('link', { name: 'Projetos →' })).toHaveAttribute('href', '/projects')
    expect(within(hint).getByRole('link', { name: 'Contato →' })).toHaveAttribute('href', '/contact')
  })
})

describe('início', () => {
  it('leva aos projetos como ação principal e mantém os PDFs', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: 'ver projetos →' })).toHaveClass('btn--primary')
    expect(screen.getByRole('link', { name: /Baixar currículo/ })).toHaveClass('btn--secondary')
  })
})

describe('tema do sistema', () => {
  it('abre claro quando o sistema prefere claro e nada foi salvo', () => {
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    try {
      renderApp('/')
      expect(document.documentElement.dataset.theme).toBe('light')
    } finally {
      window.matchMedia = original
    }
  })

  it('a escolha salva vence a preferência do sistema', () => {
    const original = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    localStorage.setItem('wd-theme', 'dark')
    try {
      renderApp('/')
      expect(document.documentElement.dataset.theme).toBe('dark')
    } finally {
      window.matchMedia = original
    }
  })
})

describe('cards e estudo de caso', () => {
  it('título e capa do card levam ao estudo de caso', () => {
    renderApp('/projects')
    const card = screen.getAllByRole('article')[0]
    const slug = projects[0].slug
    const title = within(card).getByRole('heading', { level: 2 })
    expect(within(title).getByRole('link')).toHaveAttribute('href', `/projects/${slug}`)
    expect(card).toHaveClass('card--link')
  })

  it('projeto sem capa não mostra bloco de capa', () => {
    const noCover = projects.find((p) => !p.cover)
    renderApp(`/projects/${noCover.slug}`)
    expect(document.querySelector('.project__cover')).toBeNull()
  })

  it('lê o filtro da URL e o grava ao trocar', async () => {
    renderApp('/projects?cat=research')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'pesquisa' })).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button', { name: `todos · ${projects.length}` }))
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })

  it('pagina para o projeto anterior e o próximo', () => {
    renderApp(`/projects/${projects[1].slug}`)
    expect(screen.getByRole('link', { name: new RegExp(`anterior: .*`) })).toHaveAttribute(
      'href',
      `/projects/${projects[0].slug}`,
    )
    expect(screen.getByRole('link', { name: new RegExp(`próximo: .*`) })).toHaveAttribute(
      'href',
      `/projects/${projects[2].slug}`,
    )
  })

  it('abre a galeria ampliada e fecha com Escape', async () => {
    renderApp('/projects/insect-behavioral-analysis')
    const zooms = screen.getAllByRole('button', { name: 'Ampliar imagem' })
    expect(zooms.length).toBeGreaterThan(0)
    await userEvent.click(zooms[0])
    const dialog = screen.getByRole('dialog', { name: 'Imagem ampliada' })
    expect(within(dialog).getByRole('img')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('a capa do estudo de caso carrega com prioridade', () => {
    renderApp('/projects/insect-behavioral-analysis')
    const cover = document.querySelector('.project__cover img')
    expect(cover).toHaveAttribute('loading', 'eager')
  })
})

describe('currículo', () => {
  it('tem índice com âncoras para as seções', () => {
    renderApp('/resume')
    const index = screen.getByRole('navigation', { name: 'Seções do currículo' })
    expect(within(index).getByRole('link', { name: /experiência/ })).toHaveAttribute('href', '#experiencia')
    expect(within(index).getByRole('link', { name: /empresa/ })).toHaveAttribute('href', '#empresa')
    expect(document.getElementById('stack')).not.toBeNull()
  })
})

describe('contato', () => {
  it('copia o e-mail e confirma', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderApp('/contact')
    await userEvent.click(screen.getAllByRole('button', { name: 'Copiar e-mail' })[0])
    expect(writeText).toHaveBeenCalledWith('walterdallaprofissional@gmail.com')
    expect(await screen.findByText('copiado ✓')).toBeInTheDocument()
  })
})

describe('conquistas', () => {
  it('cards sem foto mostram a sigla, não o texto repetido', () => {
    renderApp('/achievements')
    expect(screen.getByText('UNESP')).toBeInTheDocument()
    expect(screen.getAllByText('UNESP — Bauru')).toHaveLength(1)
  })
})
