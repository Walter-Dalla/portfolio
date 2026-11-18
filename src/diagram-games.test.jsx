import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ArchDiagram, diagramSize } from './components/ArchDiagram.jsx'
import { diagrams, findDiagram } from './content/diagrams.js'
import { LANGS, pick } from './i18n/context.js'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'

const both = (value) => (value == null ? null : LANGS.map((lang) => pick(value, lang)))

const nodesOf = (diagram) => diagram.nodes.map((n) => [n.id, n.col, n.row, both(n.label), both(n.sub)])
const edgesOf = (diagram) => diagram.edges.map((e) => [e.from, e.to, Boolean(e.both), both(e.label)])
const groupsOf = (diagram) => diagram.groups.map((g) => [g.id, both(g.label), g.nodes])

function countNodes(diagram) {
  const { container } = render(
    <LanguageProvider>
      <ArchDiagram diagram={diagram} />
    </LanguageProvider>,
  )
  return container.querySelectorAll('rect.arch-diagram__node').length
}

describe('diagramas dos jogos', () => {
  it('lista os diagramas na ordem', () => {
    expect(Object.keys(diagrams)).toEqual([
      'homelab',
      'goprint',
      'kittycafe',
      'cartas-malfaladas',
      'nesse-capitulo',
      'wh-harness',
    ])
  })

  it('KittyCafé: cliente, túnel, backend, banco, login e catálogos', () => {
    const kitty = findDiagram('kittycafe')
    expect(both(kitty.title)).toEqual([
      'Arquitetura do KittyCafé: cliente Godot, túnel, backend, banco, login e catálogos',
      'KittyCafé architecture: Godot client, tunnel, backend, database, sign-in and catalogs',
    ])
    expect(nodesOf(kitty)).toEqual([
      ['client', 0, 0, ['Godot 4', 'Godot 4'], ['cliente 3D isométrico', 'isometric 3D client']],
      ['tunnel', 1, 0, ['Cloudflare Tunnel', 'Cloudflare Tunnel'], ['borda · HTTPS', 'edge · HTTPS']],
      ['backend', 2, 0, ['.NET 10', '.NET 10'], ['backend REST', 'REST backend']],
      ['sqlite', 3, 0, ['SQLite', 'SQLite'], ['documentos JSON · WAL', 'JSON documents · WAL']],
      ['google', 1, 1, ['Google Sign-In', 'Google Sign-In'], ['OAuth 2.0 + PKCE', 'OAuth 2.0 + PKCE']],
      ['catalogs', 3, 1, ['catálogos JSON', 'JSON catalogs'], ['versionados no git', 'versioned in git']],
    ])
    expect(edgesOf(kitty)).toEqual([
      ['client', 'tunnel', false, null],
      ['tunnel', 'backend', false, null],
      ['backend', 'sqlite', false, null],
      ['backend', 'google', false, ['OAuth', 'OAuth']],
      ['catalogs', 'sqlite', false, ['seed', 'seed']],
    ])
    expect(groupsOf(kitty)).toEqual([['image', ['imagem Docker única', 'single Docker image'], ['backend']]])
    expect(diagramSize(kitty)).toEqual({ width: 828, height: 196 })
    expect(countNodes(kitty)).toBe(6)
  })

  it('Cartas Malfaladas: web, Android, API, contratos, regras e dados', () => {
    const cartas = findDiagram('cartas-malfaladas')
    expect(both(cartas.title)).toEqual([
      'Arquitetura da Cartas Malfaladas: web, Android, API, contratos, regras e dados',
      'Cartas Malfaladas architecture: web, Android, API, contracts, rules and data',
    ])
    expect(nodesOf(cartas)).toEqual([
      ['contracts', 1, 0, ['pacote de contratos', 'contracts package'], ['Zod, tipos e eventos', 'Zod, types and events']],
      ['catalog', 3, 0, ['baralhos JSON', 'JSON decks'], ['catálogo versionado', 'versioned catalog']],
      ['web', 0, 1, ['Vite + React 19', 'Vite + React 19'], ['web', 'web']],
      ['api', 2, 1, ['NestJS', 'NestJS'], ['API + Socket.IO', 'API + Socket.IO']],
      ['sqlite', 3, 1, ['SQLite', 'SQLite'], ['Drizzle', 'Drizzle']],
      ['android', 0, 2, ['Android', 'Android'], ['Capacitor', 'Capacitor']],
      ['rules', 2, 2, ['regras do jogo', 'game rules'], ['funções puras', 'pure functions']],
    ])
    expect(edgesOf(cartas)).toEqual([
      ['contracts', 'web', false, null],
      ['contracts', 'api', false, null],
      ['web', 'api', true, ['Socket.IO', 'Socket.IO']],
      ['api', 'sqlite', false, null],
      ['catalog', 'sqlite', false, ['seed', 'seed']],
      ['android', 'web', false, ['empacota', 'packages']],
      ['api', 'rules', false, null],
    ])
    expect(cartas.groups).toEqual([])
    expect(diagramSize(cartas)).toEqual({ width: 828, height: 288 })
    expect(countNodes(cartas)).toBe(7)
  })
})
