import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { act, fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

const ORIGIN = 'https://walter-dalla.github.io'

function renderFlow() {
  renderApp('/projects/wh-harness')
  const frame = screen.getByTitle('wh-harness — Demonstração interativa')
  const post = vi.spyOn(frame.contentWindow, 'postMessage')
  return { frame, post }
}

describe('fluxo embutido: tema e idioma por mensagem', () => {
  it('no load manda o tema e o idioma atuais para a origem do fluxo', () => {
    const { frame, post } = renderFlow()
    fireEvent.load(frame)
    expect(post).toHaveBeenCalledWith({ type: 'wh-flow:theme', theme: 'dark' }, ORIGIN)
    expect(post).toHaveBeenCalledWith({ type: 'wh-flow:lang', lang: 'pt' }, ORIGIN)
  })

  it('trocar o idioma manda a mensagem de idioma', () => {
    const { post } = renderFlow()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(post).toHaveBeenCalledWith({ type: 'wh-flow:lang', lang: 'en' }, ORIGIN)
  })

  it('trocar o tema manda a mensagem de tema', () => {
    const { post } = renderFlow()
    fireEvent.click(screen.getByRole('button', { name: 'Alternar tema claro/escuro' }))
    expect(post).toHaveBeenCalledWith({ type: 'wh-flow:theme', theme: 'light' }, ORIGIN)
  })

  it('a altura só vem de mensagens da origem do fluxo', () => {
    const { frame } = renderFlow()
    const send = (origin, data) => act(() => window.dispatchEvent(new MessageEvent('message', { origin, data })))
    send('https://outra.example', { type: 'wh-flow:height', height: 900 })
    expect(frame.style.height).toBe('')
    send(ORIGIN, { type: 'wh-flow:height', height: 900 })
    expect(frame.style.height).toBe('900px')
  })

  it('o iframe não tem moldura', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/pages/project-detail.css'), 'utf8')
    const block = css.match(/\.project__embed-frame\s*\{([^}]*)\}/)[1]
    expect(block).toMatch(/border:\s*0;/)
    expect(block).not.toMatch(/border-radius/)
  })
})
