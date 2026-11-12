import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

// Textos aprovados pelo dono em 2026-11-12 (P-021), na ordem dos cartões.
const KITTY = [
  {
    alternative: {
      pt: 'Um processo em segundo plano simulando cada café o tempo todo, mesmo sem ninguém jogando.',
      en: 'A background process simulating every café all the time, even with nobody playing.',
    },
    tradeoff: {
      pt: 'O trabalho vai para a requisição: cada sync refaz a simulação do último instante salvo até agora.',
      en: 'The work moves into the request: each sync replays the simulation from the last saved instant up to now.',
    },
  },
  {
    alternative: {
      pt: 'Empurrar cada chegada em tempo real por WebSocket; cada conexão custa memória e traz reconexão e heartbeat próprios.',
      en: 'Pushing each arrival in real time over WebSocket; every connection costs memory and brings its own reconnection and heartbeat.',
    },
    tradeoff: {
      pt: 'Todo sorteio da simulação usa a semente da visita, e tempo e aleatoriedade entram por parâmetro; se um escapar, previsão e execução divergem.',
      en: "Every draw in the simulation uses the visit's seed, and time and randomness come in as parameters; if one slips, forecast and execution diverge.",
    },
  },
  {
    alternative: {
      pt: 'Servir o jogo web separado da API e publicar uma porta no servidor.',
      en: 'Serving the web game apart from the API and publishing a port on the server.',
    },
    tradeoff: {
      pt: 'Qualquer mudança no cliente web pede uma imagem nova, e ela sai da máquina de desenvolvimento, não do CI.',
      en: 'Any change to the web client needs a new image, and it is built on the development machine, not in CI.',
    },
  },
]

const CARTAS = [
  {
    alternative: {
      pt: 'Deixar o navegador de cada jogador calcular sorteio e pontos e só sincronizar o resultado.',
      en: "Letting each player's browser compute draws and points and only sync the result.",
    },
    tradeoff: {
      pt: 'Sem conexão com o servidor não há jogo, e tudo que vai para o navegador passa por um filtro que esconde a mão dos outros e o dono de cada carta na votação.',
      en: "Without a connection to the server there is no game, and everything sent to the browser goes through a filter that hides other players' hands and who owns each card during the vote.",
    },
  },
  {
    alternative: {
      pt: 'Regras dentro dos handlers do Socket.IO, lendo a hora e sorteando direto.',
      en: 'Rules inside the Socket.IO handlers, reading the time and drawing directly.',
    },
    tradeoff: {
      pt: 'Cada regra recebe a sala e o contexto e devolve uma sala nova ou um erro; um lint barra Date.now() e Math.random() fora dos módulos de relógio e sorteio.',
      en: 'Each rule takes the room and a context and returns a new room or an error; a lint blocks Date.now() and Math.random() outside the clock and randomness modules.',
    },
  },
  {
    alternative: {
      pt: 'Tipos e eventos escritos duas vezes, na API e na web.',
      en: 'Types and events written twice, in the API and in the web app.',
    },
    tradeoff: {
      pt: 'O pacote é compilado: mudou o contrato, ele é recompilado antes de a API e a web enxergarem, e a mudança de payload aparece num snapshot que precisa ser aceito.',
      en: 'The package is compiled: when the contract changes it is rebuilt before the API and the web app see it, and the payload change shows up in a snapshot that has to be accepted.',
    },
  },
  {
    alternative: {
      pt: 'Um app Android nativo, com uma segunda base de código.',
      en: 'A native Android app, with a second codebase.',
    },
    tradeoff: {
      pt: 'O app é o site num WebView: sem servidor mostra "Sem conexão", e o login do Google, recusado em WebView, precisou de um caminho nativo com a conta do aparelho.',
      en: 'The app is the site in a WebView: with no server it shows "No connection", and Google sign-in, refused inside a WebView, needed a native path using the device account.',
    },
  },
]

const extras = (slug) => findProject(slug).decisions.map(({ alternative, tradeoff }) => ({ alternative, tradeoff }))

describe('decisões: alternativa descartada e trade-off', () => {
  it('os 3 cartões do KittyCafé têm os textos aprovados', () => {
    expect(extras('kittycafe')).toEqual(KITTY)
  })

  it('os 4 cartões das Cartas Malfaladas têm os textos aprovados', () => {
    expect(extras('cartas-malfaladas')).toEqual(CARTAS)
  })

  it('a página do KittyCafé mostra os rótulos nos 3 cartões', () => {
    renderApp('/projects/kittycafe')
    const section = screen.getByRole('heading', { name: /Decisões de arquitetura/ }).closest('section')
    expect(within(section).getAllByText('alternativa descartada')).toHaveLength(3)
    expect(within(section).getAllByText('trade-off')).toHaveLength(3)
  })
})
