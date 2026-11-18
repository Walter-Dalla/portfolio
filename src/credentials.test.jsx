import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { certifications, credentials } from './content/experiences.js'
import { renderApp } from './test/renderApp.jsx'

const list = () => document.getElementById('credenciais')

describe('dados de licenças e certificados', () => {
  it('tem 23 itens, 2 da AWS, 2 da Full Cycle e 19 da Alura', () => {
    expect(credentials).toHaveLength(23)
    const count = (issuer) => credentials.filter((c) => c.issuer === issuer).length
    expect(count('AWS')).toBe(2)
    expect(count('Full Cycle')).toBe(2)
    expect(count('Alura')).toBe(19)
  })

  it('tem data AAAA-MM e link https único em cada item', () => {
    credentials.forEach((c) => {
      expect(c.issued).toMatch(/^\d{4}-\d{2}$/)
      expect(c.url.startsWith('https://')).toBe(true)
    })
    expect(new Set(credentials.map((c) => c.url)).size).toBe(credentials.length)
  })
})

describe('mostrar mais no currículo', () => {
  it('começa recolhida e abre e fecha pelo botão', () => {
    renderApp('/resume')
    const button = screen.getByRole('button', { name: 'mostrar mais' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls', 'credenciais')
    expect(list()).not.toBeVisible()
    expect(screen.queryAllByRole('link', { name: 'ver credencial ↗' })).toHaveLength(0)

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveTextContent('mostrar menos')
    expect(list()).toBeVisible()
    const links = screen.getAllByRole('link', { name: 'ver credencial ↗' })
    expect(links).toHaveLength(23)
    links.forEach((link, i) => {
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', credentials[i].url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
    const ddd = within(list()).getByText('Curso de Domain Driven Design').closest('li')
    expect(within(ddd).getByText('08/2023')).toBeInTheDocument()
    expect(within(list()).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'AWS',
      'Full Cycle',
      'Alura',
    ])

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveTextContent('mostrar mais')
    expect(list()).not.toBeVisible()
  })

  it('traduz o botão e os links em inglês, com a mesma data', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    fireEvent.click(screen.getByRole('button', { name: 'show more' }))
    expect(screen.getByRole('button', { name: 'show less' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'see credential ↗' })).toHaveLength(23)
    expect(within(list()).getByText('licenses & certifications/')).toBeVisible()
    const ddd = within(list()).getByText('Curso de Domain Driven Design').closest('li')
    expect(within(ddd).getByText('08/2023')).toBeInTheDocument()
  })

  it('mantém as 4 etiquetas de certificações', () => {
    expect(certifications).toHaveLength(4)
    renderApp('/resume')
    const card = screen.getByText('certificações/').closest('.skills__group')
    within(card).getByText('AWS Academy Graduate — Cloud Foundations')
    within(card).getByText('Domain Driven Design')
    within(card).getByText('Spring MVC I & II')
    within(card).getByText('Maven')
  })
})
