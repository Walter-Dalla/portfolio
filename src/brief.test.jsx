import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject, projects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

const labels = (block) => within(block).getAllByRole('term').map((dt) => dt.textContent)

describe('resumo em três tópicos no topo do projeto', () => {
  it('todo projeto tem ao menos "o que fiz"', () => {
    for (const project of projects) {
      expect(project.brief?.action, project.slug).toBeTruthy()
    }
  })

  it('os tópicos vazios são só os sem texto no conteúdo', () => {
    const without = (key) =>
      projects
        .filter((p) => p.brief[key] === null)
        .map((p) => p.slug)
        .sort()
    expect(without('problem')).toEqual(
      ['cartas-malfaladas', 'kittycafe', 'nesse-capitulo', 'portfolio', 'wh-harness'].sort(),
    )
    expect(without('result')).toEqual(['cartas-malfaladas', 'goprint'])
    expect(without('action')).toEqual([])
  })

  it('o resumo dos insetos e do KittyCafé tem os textos combinados', () => {
    expect(findProject('insect-behavioral-analysis').brief).toEqual({
      problem: {
        pt: 'Medir mudanças de comportamento de insetos a partir de vídeos, à mão, é lento e subjetivo; as alternativas são softwares proprietários, com custo por análise.',
        en: 'Measuring insect behavioral changes from experiment videos by hand is slow and subjective; the alternatives are proprietary tools with a cost per analysis.',
      },
      action: {
        pt: 'Software em Python com OpenCV e NumPy que rastreia o inseto com duas câmeras a 90° e gera a rota em 3D, quadro a quadro.',
        en: 'Python software with OpenCV and NumPy that tracks the insect with two cameras at 90° and produces a frame-by-frame 3D route.',
      },
      result: {
        pt: 'Adotado por 3 laboratórios de farmacologia da UNICAMP.',
        en: 'Adopted by 3 pharmacology labs at UNICAMP.',
      },
    })
    expect(findProject('kittycafe').brief).toEqual({
      problem: null,
      action: {
        pt: 'Backend .NET 10 que é a fonte da verdade e não roda nada em segundo plano: guarda timestamps e recalcula o estado a cada requisição; cliente Godot 4 em 3D isométrico.',
        en: 'A .NET 10 backend that is the source of truth and runs nothing in the background: it stores timestamps and recomputes state on each request; an isometric 3D Godot 4 client.',
      },
      result: {
        pt: 'Em produção em kittycafe.walterdalla.uk desde setembro de 2026.',
        en: 'Live at kittycafe.walterdalla.uk since September 2026.',
      },
    })
  })

  it('nos insetos mostra os três tópicos em ordem, antes do texto', () => {
    renderApp('/projects/insect-behavioral-analysis')
    const block = screen.getByLabelText('Resumo do projeto')
    expect(labels(block)).toEqual(['problema', 'o que fiz', 'resultado'])
    const layout = document.querySelector('.project__layout')
    expect(block.compareDocumentPosition(layout) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('no KittyCafé mostra só os tópicos preenchidos', () => {
    renderApp('/projects/kittycafe')
    expect(labels(screen.getByLabelText('Resumo do projeto'))).toEqual(['o que fiz', 'resultado'])
  })

  it('em inglês os rótulos são traduzidos', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/insect-behavioral-analysis')
    expect(labels(screen.getByLabelText('Project summary'))).toEqual(['problem', 'what I did', 'result'])
  })
})
