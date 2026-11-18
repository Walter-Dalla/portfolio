import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp.jsx'

// DOCUMENT_POSITION_FOLLOWING: `b` vem depois de `a` na ordem do documento.
const after = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('navegação entre projetos no fim da página', () => {
  it('com embed: o pager fica fora do texto e depois da demonstração', () => {
    renderApp('/projects/wh-harness')
    const pager = document.querySelector('.project__pager')
    const embed = document.querySelector('.project__embed')
    expect(pager).not.toBeNull()
    expect(embed).not.toBeNull()
    expect(pager.closest('.project__body')).toBeNull()
    expect(after(embed, pager)).toBe(true)
  })

  it('sem embed: o pager vem depois do texto e da ficha', () => {
    renderApp('/projects/goprint')
    const pager = document.querySelector('.project__pager')
    expect(document.querySelector('.project__embed')).toBeNull()
    expect(pager.closest('.project__body')).toBeNull()
    expect(after(document.querySelector('.project__layout'), pager)).toBe(true)
  })
})
