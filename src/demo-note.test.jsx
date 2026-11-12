import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

const NOTE = 'The interactive demo is available in Portuguese only.'

describe('aviso de demo só em português', () => {
  it('o wh-harness tem o aviso só em inglês', () => {
    expect(findProject('wh-harness').demoNote).toEqual({ pt: '', en: NOTE })
  })

  it('em inglês aparece sob o botão e na demonstração embutida', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/wh-harness')
    const notes = screen.getAllByText(NOTE)
    expect(notes).toHaveLength(2)
    expect(notes.filter((n) => n.closest('.project__intro'))).toHaveLength(1)
    expect(notes.filter((n) => n.closest('.project__embed'))).toHaveLength(1)
  })

  it('em português não aparece', () => {
    renderApp('/projects/wh-harness')
    expect(document.querySelector('.project__demo-note')).toBeNull()
    expect(document.querySelector('.project__embed-note')).toBeNull()
  })

  it('projeto sem aviso não mostra nada em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/kittycafe')
    expect(document.querySelector('.project__demo-note')).toBeNull()
    expect(document.querySelector('.project__embed-note')).toBeNull()
  })
})
