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
    expect(Object.keys(diagrams)).toEqual(['homelab', 'kittycafe', 'cartas-malfaladas'])
  })

  it('KittyCafé: cliente, túnel, backend e banco', () => {
    const kitty = findDiagram('kittycafe')
    expect(both(kitty.title)).toEqual([
      'Arquitetura do KittyCafé: cliente Godot, túnel, backend e banco',
      'KittyCafé architecture: Godot client, tunnel, backend and database',
    ])
    expect(nodesOf(kitty)).toEqual([
      ['client', 0, 0, ['Godot 4', 'Godot 4'], ['cliente 3D isométrico', 'isometric 3D client']],
      ['tunnel', 1, 0, ['Cloudflare Tunnel', 'Cloudflare Tunnel'], null],
      ['backend', 2, 0, ['.NET 10', '.NET 10'], ['backend REST', 'REST backend']],
      ['sqlite', 3, 0, ['SQLite', 'SQLite'], null],
    ])
    expect(edgesOf(kitty)).toEqual([
      ['client', 'tunnel', false, null],
      ['tunnel', 'backend', false, null],
      ['backend', 'sqlite', false, null],
    ])
    expect(groupsOf(kitty)).toEqual([['image', ['imagem Docker única', 'single Docker image'], ['backend']]])
    expect(diagramSize(kitty)).toEqual({ width: 748, height: 104 })
    expect(countNodes(kitty)).toBe(4)
  })

  it('Cartas Malfaladas: web, Android, API e contratos', () => {
    const cartas = findDiagram('cartas-malfaladas')
    expect(both(cartas.title)).toEqual([
      'Arquitetura da Cartas Malfaladas: web, Android, API e contratos',
      'Cartas Malfaladas architecture: web, Android, API and contracts',
    ])
    expect(nodesOf(cartas)).toEqual([
      ['contracts', 1, 0, ['pacote de contratos', 'contracts package'], ['Zod, tipos e eventos', 'Zod, types and events']],
      ['web', 0, 1, ['Vite + React 19', 'Vite + React 19'], ['web', 'web']],
      ['api', 2, 1, ['NestJS', 'NestJS'], ['API + Socket.IO', 'API + Socket.IO']],
      ['sqlite', 3, 1, ['SQLite', 'SQLite'], ['Drizzle', 'Drizzle']],
      ['android', 0, 2, ['Android', 'Android'], ['Capacitor', 'Capacitor']],
    ])
    expect(edgesOf(cartas)).toEqual([
      ['contracts', 'web', false, null],
      ['contracts', 'api', false, null],
      ['web', 'api', true, ['Socket.IO', 'Socket.IO']],
      ['api', 'sqlite', false, null],
      ['android', 'web', false, ['empacota', 'packages']],
    ])
    expect(cartas.groups).toEqual([])
    expect(diagramSize(cartas)).toEqual({ width: 748, height: 288 })
    expect(countNodes(cartas)).toBe(5)
  })
})
