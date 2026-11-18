import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from './content/profile.js'
import { renderApp } from './test/renderApp.jsx'

const after = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('Início: hero sem foto', () => {
  it('sem profile.photo não há caixa "WD"', () => {
    expect(profile.photo).toBeNull()
    renderApp('/')
    const hero = document.querySelector('.hero')
    expect(hero.querySelector('.hero__aside')).toBeNull()
    expect(within(hero).queryByText('WD')).toBeNull()
  })

  it('a localização fica no texto, logo antes da disponibilidade', () => {
    renderApp('/')
    const location = document.querySelector('.hero__location')
    expect(location).toHaveTextContent('São Paulo, BR')
    expect(location.closest('.hero__text')).not.toBeNull()
    const availability = document.querySelector('.hero__availability')
    expect(after(location, availability)).toBe(true)
    expect(location.nextElementSibling).toBe(availability)
  })
})
