import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { projects } from './content/projects.js'
import { seoRoutes } from './seo.js'
import { renderApp } from './test/renderApp.jsx'

const h2Texts = () => screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
// Só as seções numeradas do texto do projeto (sem o título do rodapé).
const bodyH2Texts = () =>
  within(document.querySelector('.project__body'))
    .getAllByRole('heading', { level: 2 })
    .map((h) => h.textContent)
// O bloco (ou a capa) de arquitetura do projeto: é para onde os links do Início apontam.
const arch = () => document.getElementById('architecture')
const follows = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('diagramas de arquitetura no site', () => {
  it('no Homelab, sem capa, o diagrama ocupa o lugar da capa', () => {
    renderApp('/projects/homelab')
    const slots = document.querySelectorAll('.project__diagram--cover')
    expect(slots).toHaveLength(1)
    const slot = slots[0]
    expect(slot).toBe(arch())
    const layout = document.querySelector('.project__layout')
    expect(slot.compareDocumentPosition(layout) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    // No lugar da capa vai o explorador: o svg é um grupo de nós clicáveis, com o painel do nó ao lado.
    expect(
      within(slot).getByRole('group', {
        name: 'Arquitetura do Homelab: publicação das imagens, acesso pelo túnel e backup',
      }),
    ).toBeInTheDocument()
    expect(within(slot).getAllByRole('button', { pressed: true })).toHaveLength(1)
    expect(within(slot).getByRole('region', { name: 'Componente selecionado' })).toHaveTextContent('Cloudflare Tunnel')
    expect(document.querySelector('.project__cover')).toBeNull()
    expect(h2Texts().some((text) => text.includes('Arquitetura'))).toBe(false)
  })

  it('no Homelab a stack por camada e as decisões têm seção própria', () => {
    renderApp('/projects/homelab')
    expect(bodyH2Texts()).toEqual(['01O projeto', '02Stack por camada', '03Decisões de arquitetura'])
    const stack = screen.getByRole('heading', { level: 2, name: /Stack por camada/ }).closest('section')
    expect(within(stack).getAllByRole('term').map((dt) => dt.textContent)).toEqual([
      'Hardware',
      'Orquestração',
      'Imagens',
      'Rede',
      'Dados',
    ])
  })

  it('no KittyCafé, com capa, a arquitetura é um bloco numerado de largura total, depois do texto e da ficha', () => {
    renderApp('/projects/kittycafe')
    expect(bodyH2Texts()).toEqual(['01O projeto', '02Como foi feito com IA', '03Galeria'])
    const block = arch()
    expect(block.tagName).toBe('SECTION')
    expect(within(block).getByRole('heading', { level: 2 }).textContent).toBe('04Arquitetura')
    // Fora da coluna de texto: depois do texto e da ficha, antes da navegação entre projetos.
    const layout = document.querySelector('.project__layout')
    expect(layout.contains(block)).toBe(false)
    expect(follows(layout, block)).toBe(true)
    expect(follows(block, document.querySelector('.project__pager'))).toBe(true)
    // Um só explorador na página, com o painel ao lado em tela larga.
    expect(document.querySelectorAll('.arch-explorer')).toHaveLength(1)
    expect(block.querySelector('.arch-explorer--side')).not.toBeNull()
    expect(document.querySelector('.project__cover')).not.toBeNull()
  })

  it('em inglês o bloco se chama "Architecture"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/kittycafe')
    expect(within(arch()).getByRole('heading', { level: 2 }).textContent).toBe('04Architecture')
    expect(within(arch()).getByText('// stack by layer')).toBeInTheDocument()
    expect(within(arch()).getByText('// architecture decisions')).toBeInTheDocument()
  })

  it('no GoPrint o bloco "Arquitetura" traz o explorador, a stack por camada e as decisões', () => {
    renderApp('/projects/goprint')
    const block = arch()
    expect(
      within(block).getByRole('group', {
        name: 'Arquitetura do GoPrint: SPA, túnel, API, banco, storage de anexos e e-mail',
      }),
    ).toBeInTheDocument()
    expect(within(block).getByRole('region', { name: 'Componente selecionado' })).toHaveTextContent('ASP.NET Core')
    expect(within(block).getByText('// stack por camada')).toBeInTheDocument()
    expect(within(block).getAllByRole('term').map((dt) => dt.textContent)).toEqual([
      'Front-end',
      'API',
      'Dados',
      'Integrações',
      'Infra',
      'Qualidade',
    ])
    expect(within(block).getByText('// decisões de arquitetura')).toBeInTheDocument()
    expect(
      within(block)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual([
      'Isolamento entre empresas no escopo de toda consulta',
      'Anexos sobem direto para o storage',
      'SQL explícito com migrations versionadas',
      'Uma única imagem entrega a API e o front',
    ])
    // A arquitetura mora no projeto: não há página à parte para onde ligar.
    expect(document.querySelector('a[href^="/architecture"]')).toBeNull()
  })

  it('trocar de componente no bloco troca o painel', async () => {
    const user = userEvent.setup()
    renderApp('/projects/goprint')
    const panel = within(arch()).getByRole('region', { name: 'Componente selecionado' })
    await user.click(within(arch()).getByRole('button', { name: 'PostgreSQL: Dapper · DbUp' }))
    expect(panel).toHaveTextContent('PostgreSQL')
    await user.click(within(arch()).getByRole('button', { name: 'Próximo componente' }))
    expect(within(panel).getByText('05 / 06')).toBeInTheDocument()
  })

  it('projeto sem diagrama não muda', () => {
    renderApp('/projects/portfolio')
    expect(document.querySelector('.project__diagram')).toBeNull()
    expect(arch()).toBeNull()
    expect(document.querySelector('.stack-list')).toBeNull()
    expect(bodyH2Texts()).toEqual(['01O projeto', '02Como foi feito com IA', '03Galeria'])
  })

  it('o card do Homelab usa a miniatura do diagrama no lugar da faixa sem capa', () => {
    renderApp('/projects')
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(projects.length)
    const homelab = cards.find((card) => card.querySelector('a[href="/projects/homelab"]'))
    expect(homelab.querySelector('.card__cover--diagram svg[aria-hidden="true"]')).not.toBeNull()
    expect(screen.queryByText(/sem capa ainda/)).toBeNull()
  })

  it('o Homelab continua com a imagem padrão no SEO', () => {
    const route = seoRoutes().find((r) => r.path === '/projects/homelab')
    expect(route.image).toBe('/og.png')
  })
})
