import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { strings } from './i18n/strings.js'
import { renderApp } from './test/renderApp.jsx'

describe('botão da demo no topo do projeto', () => {
  it('tem rótulo curto nos dois idiomas', () => {
    expect(strings.demoButton).toEqual({ pt: 'Ver demo', en: 'See demo' })
  })

  it('fica na introdução do wh-harness, em nova aba, e sai da ficha', () => {
    renderApp('/projects/wh-harness')
    const links = screen.getAllByRole('link', { name: 'Ver demo' })
    expect(links).toHaveLength(1)
    const [link] = links
    expect(link).toHaveAttribute('href', 'https://walter-dalla.github.io/wh-harness/flow.html')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.closest('.project__intro')).not.toBeNull()

    const facts = screen.getByRole('complementary', { name: 'Ficha do projeto' })
    expect(within(facts).queryByRole('link', { name: 'Ver demo' })).toBeNull()
    expect(within(facts).getByRole('link', { name: 'Repositório' })).toBeInTheDocument()
  })

  it('em inglês o rótulo é "See demo"', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/wh-harness')
    expect(screen.getByRole('link', { name: 'See demo' })).toBeInTheDocument()
  })

  it('projeto sem repositório, TCC nem demo não tem bloco de links na ficha', () => {
    renderApp('/projects/homelab')
    expect(document.querySelector('.facts__links')).toBeNull()
  })

  it('projeto sem demo não tem o botão', () => {
    renderApp('/projects/goprint')
    expect(document.querySelector('.project__demo')).toBeNull()
  })
})
