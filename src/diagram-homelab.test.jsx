import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ArchDiagram } from './components/ArchDiagram.jsx'
import { diagrams, findDiagram } from './content/diagrams.js'
import { projects } from './content/projects.js'
import { LANGS, pick } from './i18n/context.js'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'

const both = (value) => LANGS.map((lang) => pick(value, lang))

// id, (col, row), label [pt, en], sub [pt, en] ou null.
const NODES = [
  ['dev', 0, 0, ['máquina de dev', 'dev machine'], ['build das imagens', 'image build']],
  ['trivy', 1, 0, ['Trivy', 'Trivy'], ['scan antes do push', 'scan before the push']],
  ['zot', 2, 0, ['Zot', 'Zot'], ['registry de imagens', 'image registry']],
  ['komodo', 3, 0, ['Komodo', 'Komodo'], ['stacks Docker', 'Docker stacks']],
  ['internet', 0, 1, ['internet', 'internet'], null],
  ['tunnel', 1, 1, ['Cloudflare Tunnel', 'Cloudflare Tunnel'], null],
  ['cloudflared', 2, 1, ['cloudflared', 'cloudflared'], null],
  ['apps', 3, 1, ['KittyCafé · GoPrint', 'KittyCafé · GoPrint'], ['containers sem root', 'non-root containers']],
  ['backup', 2, 2, ['backup diário', 'daily backup'], ['cópia fora do servidor', 'off-host copy']],
  ['sqlite', 3, 2, ['bancos SQLite', 'SQLite databases'], null],
]

const EDGES = [
  ['dev', 'trivy'],
  ['trivy', 'zot'],
  ['zot', 'komodo'],
  ['komodo', 'apps'],
  ['internet', 'tunnel'],
  ['tunnel', 'cloudflared'],
  ['cloudflared', 'apps'],
  ['apps', 'sqlite'],
  ['sqlite', 'backup'],
]

describe('diagrama do Homelab', () => {
  const homelab = findDiagram('homelab')

  it('tem os nós, arestas e grupos do texto do projeto', () => {
    expect(homelab.nodes.map((n) => [n.id, n.col, n.row])).toEqual(NODES.map(([id, col, row]) => [id, col, row]))
    expect(homelab.edges.map((e) => [e.from, e.to])).toEqual(EDGES)
    expect(homelab.edges.every((e) => !e.label && !e.both)).toBe(true)
    expect(homelab.groups.map((g) => [g.id, both(g.label), g.nodes])).toEqual([
      ['internal', ['rede interna', 'internal network'], ['zot', 'komodo']],
      ['docker', ['rede Docker · sem porta publicada', 'Docker network · no published ports'], ['cloudflared', 'apps']],
    ])
  })

  it('tem o título e os textos nos dois idiomas', () => {
    expect(both(homelab.title)).toEqual([
      'Arquitetura do Homelab: publicação das imagens, acesso pelo túnel e backup',
      'Homelab architecture: image publishing, access through the tunnel and backup',
    ])
    expect(homelab.nodes.map((n) => [both(n.label), n.sub == null ? null : both(n.sub)])).toEqual(
      NODES.map(([, , , label, sub]) => [label, sub]),
    )
  })

  it('não tem diagrama para projeto sem um', () => {
    expect(findDiagram('goprint')).toBeNull()
  })

  it('desenha o Homelab com os 10 nós na grade', () => {
    const { container } = render(
      <LanguageProvider>
        <ArchDiagram diagram={homelab} />
      </LanguageProvider>,
    )
    const rects = container.querySelectorAll('rect.arch-diagram__node')
    expect(rects).toHaveLength(10)
    const cloudflared = rects[homelab.nodes.findIndex((n) => n.id === 'cloudflared')]
    expect(cloudflared).toHaveAttribute('x', '392')
    expect(cloudflared).toHaveAttribute('y', '116')
  })
})

describe('dados dos diagramas', () => {
  it('cada chave é o slug de um projeto', () => {
    const slugs = projects.map((p) => p.slug)
    for (const key of Object.keys(diagrams)) expect(slugs).toContain(key)
  })

  it.each(Object.entries(diagrams))('%s: referências, células e textos cabem no nó', (_, diagram) => {
    const ids = diagram.nodes.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const e of diagram.edges) {
      expect(ids).toContain(e.from)
      expect(ids).toContain(e.to)
    }
    for (const g of diagram.groups) for (const id of g.nodes) expect(ids).toContain(id)

    const cells = diagram.nodes.map((n) => `${n.col},${n.row}`)
    expect(new Set(cells).size).toBe(cells.length)
    for (const n of diagram.nodes) {
      expect(n.col).toBeLessThanOrEqual(3)
      for (const text of both(n.label)) expect(text.length).toBeLessThanOrEqual(19)
      if (n.sub != null) for (const text of both(n.sub)) expect(text.length).toBeLessThanOrEqual(24)
    }
  })
})
