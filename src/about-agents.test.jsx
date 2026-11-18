import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { about } from './content/about.js'
import { renderApp } from './test/renderApp.jsx'

const TEXT = {
  pt: 'Fiz o KittyCafé de propósito como um projeto de agentes: jogos, por definição, pedem mais loop e refinamento do que backends e sites em geral, porque são mais dinâmicos, e isso faz deles um ótimo teste de estresse para os agentes. Minha ideia agora é otimizar o wh-harness para gastar o mínimo de tokens por feature implementada.',
  en: 'I built KittyCafé on purpose as an agent project: games, by definition, need more looping and refinement than backends and websites in general, because they are more dynamic, which makes them a great stress test for the agents. My idea now is to optimize wh-harness to spend the minimum of tokens per implemented feature.',
}

const blockOf = (text) => screen.getByText(text).closest('.about__block')

describe('Sobre: parágrafo do KittyCafé e dos tokens', () => {
  it('entra no índice 3, sem links, com o texto do dono', () => {
    expect(about.paragraphs[3].text).toEqual(TEXT)
    expect(about.paragraphs[3].links).toEqual([])
  })

  it('aparece em PT e, depois da troca de idioma, em EN, sem .link-row', () => {
    renderApp('/about')
    expect(blockOf(TEXT.pt).querySelector('.link-row')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(blockOf(TEXT.en).querySelector('.link-row')).toBeNull()
  })

  it('os outros parágrafos continuam com os seus links', () => {
    renderApp('/about')
    const blocks = [...document.querySelectorAll('.about__block')]
    expect(blocks).toHaveLength(about.paragraphs.length)
    about.paragraphs.forEach((p, i) => {
      if (i === 3) return
      const hrefs = [...blocks[i].querySelectorAll('.link-row a')].map((a) => a.getAttribute('href'))
      expect(hrefs, `parágrafo ${i}`).toEqual(p.links.map((link) => link.to))
    })
  })
})
