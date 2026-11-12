import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Decisions } from './components/Decisions.jsx'
import { findProject, projects } from './content/projects.js'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'
import { renderApp } from './test/renderApp.jsx'

const headings = () =>
  within(document.querySelector('.project__body'))
    .getAllByRole('heading', { level: 2 })
    .map((h) => h.textContent)

const KITTY = [
  {
    decision: {
      pt: 'O backend é a fonte da verdade e não roda nada em segundo plano',
      en: 'The backend is the source of truth and runs nothing in the background',
    },
    why: {
      pt: 'Guarda timestamps e recalcula o estado a cada requisição; o progresso offline sai do tempo decorrido no próximo sync.',
      en: 'It stores timestamps and recomputes state on each request; offline progress comes from elapsed time on the next sync.',
    },
  },
  {
    decision: { pt: 'A chegada de clientes é prevista de forma determinística', en: 'Customer arrivals are predicted deterministically' },
    why: { pt: 'O cliente só anima o que o servidor já decidiu.', en: 'The client only animates what the server has already decided.' },
  },
  {
    decision: { pt: 'Uma imagem Docker única atrás de Cloudflare Tunnel', en: 'A single Docker image behind Cloudflare Tunnel' },
    why: {
      pt: 'Roda em produção em kittycafe.walterdalla.uk desde setembro de 2026.',
      en: 'It has been live at kittycafe.walterdalla.uk since September 2026.',
    },
  },
]

const CARTAS = [
  {
    decision: { pt: 'O servidor é a fonte da verdade', en: 'The server is the source of truth' },
    why: {
      pt: 'Sorteio, pontos e fases ficam nele, e ninguém recebe a mão dos outros.',
      en: "Draws, points and phases live there, and nobody receives anyone else's hand.",
    },
  },
  {
    decision: {
      pt: 'Regras como funções puras, com relógio e aleatoriedade injetados',
      en: 'Rules as pure functions with injected clock and randomness',
    },
    why: { pt: 'São testadas sem rede.', en: 'They are tested without a network.' },
  },
  {
    decision: { pt: 'Um pacote compartilhado de contratos', en: 'A shared contracts package' },
    why: { pt: 'Reúne os schemas Zod, os tipos e os eventos.', en: 'It holds the Zod schemas, types and events.' },
  },
  {
    decision: {
      pt: 'Web em Vite + React 19 empacotada para Android com Capacitor',
      en: 'A Vite + React 19 web app packaged for Android with Capacitor',
    },
    why: { pt: 'O jogo roda no navegador ou no Android.', en: 'The game is played in the browser or on Android.' },
  },
]

describe('decisões de arquitetura', () => {
  it('o piloto tem 3 decisões no KittyCafé e 4 nas Cartas Malfaladas, sem alternativa nem trade-off', () => {
    const kitty = findProject('kittycafe').decisions
    const cartas = findProject('cartas-malfaladas').decisions
    expect(kitty).toHaveLength(3)
    expect(cartas).toHaveLength(4)
    expect(kitty.map(({ decision, why }) => ({ decision, why }))).toEqual(KITTY)
    expect(cartas.map(({ decision, why }) => ({ decision, why }))).toEqual(CARTAS)
    for (const item of [...kitty, ...cartas]) {
      expect(item.alternative ?? null).toBeNull()
      expect(item.tradeoff ?? null).toBeNull()
    }
  })

  it('os outros projetos não têm decisões', () => {
    const others = projects.filter((p) => !['kittycafe', 'cartas-malfaladas'].includes(p.slug))
    for (const project of others) {
      expect(project.decisions ?? [], project.slug).toEqual([])
    }
  })

  it('no KittyCafé a seção vem numerada entre o texto e a galeria', () => {
    renderApp('/projects/kittycafe')
    expect(headings()).toEqual([
      '01O projeto',
      '02Como foi feito com IA',
      '03Arquitetura',
      '04Decisões de arquitetura',
      '05Galeria',
    ])
    const section = screen.getByRole('heading', { name: /Decisões de arquitetura/ }).closest('section')
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(3)
    expect(screen.queryByText(/alternativa descartada/)).toBeNull()
  })

  it('projeto sem decisões mantém a numeração contínua', () => {
    renderApp('/projects/goprint')
    expect(headings()).toEqual(['01O projeto', '02Como foi feito com IA', '03Galeria'])
    expect(screen.queryByText('Decisões de arquitetura')).toBeNull()
  })

  it('mostra alternativa e trade-off só quando preenchidos', () => {
    const full = {
      decision: { pt: 'Decisão A', en: 'Decision A' },
      why: { pt: 'Porque A', en: 'Because A' },
      alternative: { pt: 'Outra via', en: 'Another way' },
      tradeoff: { pt: 'Custa mais', en: 'Costs more' },
    }
    const { unmount } = render(
      <LanguageProvider>
        <Decisions items={[full]} />
      </LanguageProvider>,
    )
    expect(screen.getByText('alternativa descartada')).toBeInTheDocument()
    expect(screen.getByText('trade-off')).toBeInTheDocument()
    expect(screen.getByText('Outra via')).toBeInTheDocument()
    expect(screen.getByText('Custa mais')).toBeInTheDocument()
    unmount()

    render(
      <LanguageProvider>
        <Decisions items={[{ decision: full.decision, why: full.why }]} />
      </LanguageProvider>,
    )
    expect(document.querySelector('.decision__extra')).toBeNull()
  })
})
