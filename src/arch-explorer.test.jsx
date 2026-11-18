import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ArchExplorer } from './components/ArchExplorer.jsx'
import { findDiagram } from './content/diagrams.js'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'

const goprint = findDiagram('goprint')

function renderExplorer(props = {}) {
  return render(
    <LanguageProvider>
      <ArchExplorer diagram={goprint} {...props} />
    </LanguageProvider>,
  )
}

const panel = () => screen.getByRole('region', { name: 'Componente selecionado' })
const node = (name) => screen.getByRole('button', { name })
const edge = (container, from, to) =>
  [...container.querySelectorAll('.arch-diagram__link')][goprint.edges.findIndex((e) => e.from === from && e.to === to)]

describe('ArchExplorer', () => {
  it('abre no nó da aplicação, com camada, posição, detalhe, tags e ligações', () => {
    renderExplorer()
    expect(node('ASP.NET Core: .NET 10 · API REST')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(1)
    expect(within(panel()).getByText('aplicação')).toBeInTheDocument()
    expect(within(panel()).getByText('03 / 06')).toBeInTheDocument()
    expect(within(panel()).getByText('ASP.NET Core')).toHaveClass('arch-panel__title')
    expect(within(panel()).getByText(/isolamento por empresa em toda consulta/)).toBeInTheDocument()
    expect([...panel().querySelectorAll('.tag')].map((tag) => tag.textContent)).toEqual([
      '.NET 10',
      'JWT',
      'ProblemDetails',
      'OpenAPI',
    ])
    expect([...panel().querySelectorAll('.arch-panel__link')].map((b) => b.textContent)).toEqual([
      'Cloudflare Tunnel',
      'PostgreSQL',
      'MinIO (S3)',
      'SendGrid',
    ])
  })

  it('o svg é um grupo com nome, e cada nó é um botão alcançável pelo teclado', () => {
    const { container } = renderExplorer()
    expect(
      screen.getByRole('group', { name: 'Arquitetura do GoPrint: SPA, túnel, API, banco, storage de anexos e e-mail' }),
    ).toBe(container.querySelector('svg'))
    expect(container.querySelector('svg[role="img"]')).toBeNull()
    const buttons = container.querySelectorAll('svg [role="button"]')
    expect(buttons).toHaveLength(goprint.nodes.length)
    for (const button of buttons) expect(button).toHaveAttribute('tabindex', '0')
  })

  it('clicar num nó troca o painel e o destaque', async () => {
    const user = userEvent.setup()
    const { container } = renderExplorer()
    await user.click(node('PostgreSQL: Dapper · DbUp'))
    expect(node('PostgreSQL: Dapper · DbUp')).toHaveAttribute('aria-pressed', 'true')
    expect(node('ASP.NET Core: .NET 10 · API REST')).toHaveAttribute('aria-pressed', 'false')
    expect(within(panel()).getByText('dados')).toBeInTheDocument()
    expect(within(panel()).getByText('04 / 06')).toBeInTheDocument()
    expect(within(panel()).getByText(/SQL explícito via Dapper/)).toBeInTheDocument()
    // Só a ligação que toca o banco fica ativa; as outras esmaecem.
    expect(edge(container, 'api', 'db')).toHaveClass('is-active')
    expect(edge(container, 'web', 'edge')).toHaveClass('is-dim')
    expect(container.querySelectorAll('.arch-diagram__link.is-active')).toHaveLength(1)
    expect(container.querySelectorAll('.arch-diagram__item.is-linked')).toHaveLength(1)
  })

  it('Enter e espaço escolhem o nó em foco', async () => {
    const user = userEvent.setup()
    renderExplorer()
    node('SendGrid: e-mail transacional').focus()
    await user.keyboard('{Enter}')
    expect(within(panel()).getByText('serviço externo')).toBeInTheDocument()
    node('React SPA: Vite · TypeScript').focus()
    await user.keyboard(' ')
    expect(within(panel()).getByText('cliente')).toBeInTheDocument()
    expect(within(panel()).getByText('01 / 06')).toBeInTheDocument()
  })

  it('as setas do painel percorrem os nós em ordem e dão a volta', async () => {
    const user = userEvent.setup()
    renderExplorer()
    await user.click(screen.getByRole('button', { name: 'Próximo componente' }))
    expect(within(panel()).getByText('04 / 06')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Próximo componente' }))
    await user.click(screen.getByRole('button', { name: 'Próximo componente' }))
    expect(within(panel()).getByText('06 / 06')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Próximo componente' }))
    expect(within(panel()).getByText('01 / 06')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Componente anterior' }))
    expect(within(panel()).getByText('06 / 06')).toBeInTheDocument()
    expect(panel().querySelector('.arch-panel__title')).toHaveTextContent('SendGrid')
  })

  it('uma ligação do painel leva ao nó vizinho', async () => {
    const user = userEvent.setup()
    renderExplorer()
    await user.click(within(panel()).getByRole('button', { name: 'MinIO (S3)' }))
    expect(node('MinIO (S3): anexos dos chamados')).toHaveAttribute('aria-pressed', 'true')
    expect(within(panel()).getByText(/formulário pré-assinado/)).toBeInTheDocument()
  })

  it('serviço externo tem a classe da camada (contorno tracejado)', () => {
    const { container } = renderExplorer()
    expect(container.querySelectorAll('.arch-diagram__item--external')).toHaveLength(1)
    expect(node('SendGrid: e-mail transacional')).toHaveClass('arch-diagram__item--external')
  })

  it('`side` só muda a classe do layout', () => {
    const { container, unmount } = renderExplorer()
    expect(container.querySelector('.arch-explorer')).not.toHaveClass('arch-explorer--side')
    unmount()
    const again = renderExplorer({ side: true })
    expect(again.container.querySelector('.arch-explorer')).toHaveClass('arch-explorer--side')
  })

  it('em inglês, rótulos, painel e botões mudam de idioma', () => {
    localStorage.setItem('wd-lang', 'en')
    renderExplorer()
    expect(node('ASP.NET Core: .NET 10 · REST API')).toHaveAttribute('aria-pressed', 'true')
    const region = screen.getByRole('region', { name: 'Selected component' })
    expect(within(region).getByText('application')).toBeInTheDocument()
    expect(within(region).getByText('connects to')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next component' })).toBeInTheDocument()
    expect(screen.getByText('click a component to see its role in the architecture')).toBeInTheDocument()
  })

  it('renderiza no servidor', () => {
    const html = renderToString(
      <LanguageProvider>
        <ArchExplorer diagram={goprint} side />
      </LanguageProvider>,
    )
    expect(html).toMatch(/arch-panel__title/)
  })
})
