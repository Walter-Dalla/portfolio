import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Decisions } from './components/Decisions.jsx'
import { diagrams } from './content/diagrams.js'
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
  it('o KittyCafé tem 5 decisões e as Cartas Malfaladas 6, começando pelas do piloto', () => {
    const kitty = findProject('kittycafe').decisions
    const cartas = findProject('cartas-malfaladas').decisions
    expect(kitty).toHaveLength(5)
    expect(cartas).toHaveLength(6)
    expect(kitty.slice(0, 3).map(({ decision, why }) => ({ decision, why }))).toEqual(KITTY)
    expect(cartas.slice(0, 4).map(({ decision, why }) => ({ decision, why }))).toEqual(CARTAS)
  })

  it('todo projeto com diagrama tem decisões; os demais não', () => {
    const withDecisions = projects.filter((p) => (p.decisions ?? []).length > 0).map((p) => p.slug)
    expect(withDecisions).toEqual(['wh-harness', 'goprint', 'nesse-capitulo', 'homelab', 'cartas-malfaladas', 'kittycafe'])
    expect(withDecisions.toSorted()).toEqual(Object.keys(diagrams).toSorted())
  })

  it('cada decisão tem título e porquê nos dois idiomas; alternativa e trade-off só nas 7 do piloto', () => {
    const withExtras = []
    for (const project of projects) {
      for (const [i, item] of (project.decisions ?? []).entries()) {
        for (const text of [item.decision, item.why]) {
          expect(text.pt.length, project.slug).toBeGreaterThan(10)
          expect(text.en.length, project.slug).toBeGreaterThan(10)
        }
        // Alternativa e trade-off andam juntos.
        expect(Boolean(item.alternative), project.slug).toBe(Boolean(item.tradeoff))
        if (item.alternative) withExtras.push(`${project.slug}-${i}`)
      }
    }
    expect(withExtras.toSorted()).toEqual([
      'cartas-malfaladas-0',
      'cartas-malfaladas-1',
      'cartas-malfaladas-2',
      'cartas-malfaladas-3',
      'kittycafe-0',
      'kittycafe-1',
      'kittycafe-2',
    ])
  })

  it('no KittyCafé as decisões ficam no bloco "Arquitetura", numeradas', () => {
    renderApp('/projects/kittycafe')
    expect(headings()).toEqual(['01O projeto', '02Como foi feito com IA', '03Galeria'])
    const block = document.getElementById('architecture')
    expect(within(block).getByText('// decisões de arquitetura')).toBeInTheDocument()
    expect(within(block).getAllByRole('heading', { level: 3 })).toHaveLength(5)
    expect([...block.querySelectorAll('.decision__num')].map((n) => n.textContent)).toEqual(['01', '02', '03', '04', '05'])
    // Dentro do bloco as decisões não têm seção numerada própria.
    expect(screen.queryByRole('heading', { level: 2, name: /Decisões de arquitetura/ })).toBeNull()
    // Só as 3 decisões do piloto trazem alternativa descartada e trade-off.
    expect(within(block).getAllByText('alternativa descartada')).toHaveLength(3)
  })

  it('projeto sem decisões mantém a numeração contínua', () => {
    renderApp('/projects/portfolio')
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
