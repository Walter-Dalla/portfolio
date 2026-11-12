import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { aiPage } from './content/ai.js'
import { findProject } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

describe('página /ai: bloco do wh-harness com o jeito de trabalhar do dono', () => {
  it('guarda os dois parágrafos do bloco em aiPage.harness', () => {
    expect(aiPage.harness).toEqual([
      {
        pt: 'Uso o harness em todos os meus projetos atuais: KittyCafé, GoPrint, Nesse Capítulo e este portfólio que você está vendo.',
        en: 'I use the harness in all my current projects: KittyCafé, GoPrint, Nesse Capítulo and this portfolio you are looking at.',
      },
      {
        pt: 'Antes de a IA escrever uma linha, eu faço a arquitetura: qual banco de dados, como as partes se comunicam, a estrutura geral do código e quais são os principais testes. Só depois ponho os agentes para executar. Meu foco é arquitetar; escrever o código fica com a IA.',
        en: "Before the AI writes a line, I design the architecture: which database, how the parts communicate, the overall code structure and which tests matter most. Only then do I put the agents to work. My focus is architecture; writing the code is the AI's job.",
      },
    ])
  })

  it('mostra o resumo do projeto e os dois parágrafos, sem o texto de IA do projeto', () => {
    const harness = findProject('wh-harness')
    renderApp('/ai')
    expect(screen.getByText(harness.summary.pt)).toBeInTheDocument()
    expect(screen.getByText(aiPage.harness[0].pt)).toBeInTheDocument()
    expect(screen.getByText(aiPage.harness[1].pt)).toBeInTheDocument()
    expect(screen.queryByText(harness.ai.pt)).not.toBeInTheDocument()
  })

  it('mostra os parágrafos em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/ai')
    expect(screen.getByText(aiPage.harness[0].en)).toBeInTheDocument()
    expect(screen.getByText(aiPage.harness[1].en)).toBeInTheDocument()
  })

  it('a página do projeto continua com o texto de IA do wh-harness', () => {
    renderApp('/projects/wh-harness')
    expect(screen.getByText(findProject('wh-harness').ai.pt)).toBeInTheDocument()
  })
})
