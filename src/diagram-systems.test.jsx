import { describe, expect, it } from 'vitest'
import { GRID, edgePoints, nodeBox } from './components/ArchDiagram.jsx'
import { defaultNodeId, diagramLayers, diagrams, findDiagram } from './content/diagrams.js'
import { projects } from './content/projects.js'
import { LANGS, pick } from './i18n/context.js'

const both = (value) => LANGS.map((lang) => pick(value, lang))
const ids = (diagram) => diagram.nodes.map((n) => n.id)
const pairs = (diagram) => diagram.edges.map((e) => [e.from, e.to])

// O trecho [p, q] (horizontal ou vertical) passa por dentro da caixa do nó?
function crosses([p, q], node) {
  const b = nodeBox(node)
  const [x1, x2] = [Math.min(p[0], q[0]), Math.max(p[0], q[0])]
  const [y1, y2] = [Math.min(p[1], q[1]), Math.max(p[1], q[1])]
  return x1 < b.x + GRID.nodeW && x2 > b.x && y1 < b.y + GRID.nodeH && y2 > b.y
}

describe('diagramas dos sistemas novos', () => {
  it('GoPrint: SPA, túnel, API, banco, storage e e-mail', () => {
    const goprint = findDiagram('goprint')
    expect(ids(goprint)).toEqual(['web', 'edge', 'api', 'db', 'storage', 'mail'])
    expect(pairs(goprint)).toEqual([
      ['web', 'edge'],
      ['edge', 'api'],
      ['api', 'db'],
      ['edge', 'storage'],
      ['api', 'storage'],
      ['api', 'mail'],
    ])
    expect(goprint.groups.map((g) => [both(g.label), g.nodes])).toEqual([
      [['imagem Docker única', 'single Docker image'], ['api']],
    ])
    expect(defaultNodeId(goprint)).toBe('api')
  })

  it('Nesse Capítulo: app Android, PWA, API, banco, login e fontes de livros', () => {
    const capitulo = findDiagram('nesse-capitulo')
    expect(ids(capitulo)).toEqual(['twa', 'pwa', 'api', 'db', 'oauth', 'books'])
    expect(pairs(capitulo)).toEqual([
      ['twa', 'pwa'],
      ['pwa', 'api'],
      ['api', 'db'],
      ['api', 'oauth'],
      ['api', 'books'],
    ])
    expect(defaultNodeId(capitulo)).toBe('api')
  })

  it('wh-harness: da solicitação ao pull request, com o plugin e o repositório em grupos', () => {
    const harness = findDiagram('wh-harness')
    expect(ids(harness)).toEqual(['request', 'enrich', 'lanes', 'qa', 'hook', 'profile', 'pr'])
    expect(harness.groups.map((g) => [g.id, g.nodes])).toEqual([
      ['plugin', ['enrich', 'lanes', 'qa']],
      ['repo', ['profile']],
    ])
    expect(defaultNodeId(harness)).toBe('enrich')
  })

  it('o cotovelo `bend: v` sai por baixo do nó e entra no alvo pelo lado', () => {
    const goprint = findDiagram('goprint')
    const byId = Object.fromEntries(goprint.nodes.map((n) => [n.id, n]))
    // api (2,0) → mail (3,1): desce do centro da API até a linha do alvo e segue até a borda esquerda dele.
    expect(edgePoints(byId.api, byId.mail, 'v')).toEqual([
      [516, 80],
      [516, 144],
      [636, 144],
    ])
    // api (2,0) → storage (1,1): o mesmo, para a esquerda, até a borda direita do alvo.
    expect(edgePoints(byId.api, byId.storage, 'v')).toEqual([
      [516, 80],
      [516, 144],
      [396, 144],
    ])
  })
})

describe('dados de todo diagrama', () => {
  it('cada projeto com diagrama está na lista de projetos', () => {
    const slugs = projects.map((p) => p.slug)
    for (const key of Object.keys(diagrams)) expect(slugs).toContain(key)
  })

  it.each(Object.entries(diagrams))('%s: todo nó tem camada, detalhe nos dois idiomas e tags', (_, diagram) => {
    for (const node of diagram.nodes) {
      expect(Object.keys(diagramLayers), node.id).toContain(node.layer)
      for (const text of both(node.detail)) expect(text.length, node.id).toBeGreaterThan(30)
      for (const tag of node.tech ?? []) for (const text of both(tag)) expect(typeof text, node.id).toBe('string')
    }
    expect(ids(diagram)).toContain(defaultNodeId(diagram))
  })

  it.each(Object.entries(diagrams))('%s: nenhuma linha passa por cima de um nó', (_, diagram) => {
    const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
    for (const edge of diagram.edges) {
      const points = edgePoints(byId[edge.from], byId[edge.to], edge.bend)
      const segments = points.slice(1).map((q, i) => [points[i], q])
      for (const node of diagram.nodes) {
        if (node.id === edge.from || node.id === edge.to) continue
        for (const segment of segments) {
          expect(crosses(segment, node), `${edge.from}→${edge.to} sobre ${node.id}`).toBe(false)
        }
      }
    }
  })

  it.each(Object.entries(diagrams))('%s: nada sensível nos textos', (_, diagram) => {
    const texts = [
      ...both(diagram.title),
      ...diagram.nodes.flatMap((n) => [...both(n.label), ...(n.sub ? both(n.sub) : []), ...both(n.detail)]),
      ...diagram.groups.flatMap((g) => both(g.label)),
    ].join('\n')
    // Sem endereço de rede interna, porta, nome de máquina ou usuário de servidor.
    expect(texts).not.toMatch(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
    expect(texts).not.toMatch(/:\d{4,5}\b/)
    expect(texts).not.toMatch(/localhost|@|\.local\b/i)
  })
})
