import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { certifications, credentials } from './content/experiences.js'
import { renderApp } from './test/renderApp.jsx'

const card = (label) => screen.getByText(label).closest('.skills__group')

describe('dados dos cursos', () => {
  it('tem 4 itens, 2 da AWS e 2 da Full Cycle', () => {
    expect(credentials).toHaveLength(4)
    const count = (issuer) => credentials.filter((c) => c.issuer === issuer).length
    expect(count('AWS')).toBe(2)
    expect(count('Full Cycle')).toBe(2)
  })

  it('tem data AAAA-MM e link https único em cada item', () => {
    credentials.forEach((c) => {
      expect(c.issued).toMatch(/^\d{4}-\d{2}$/)
      expect(c.url.startsWith('https://')).toBe(true)
    })
    expect(new Set(credentials.map((c) => c.url)).size).toBe(credentials.length)
  })

  it('tem 3 nomes curtos de cursos', () => {
    expect(certifications).toEqual([
      'AWS Academy Graduate — Cloud Foundations',
      'Domain Driven Design',
      'Fundamentos da arquitetura de software',
    ])
  })
})

describe('cartão de cursos no currículo', () => {
  it('mostra os 4 cursos sem clique, na ordem dos dados', () => {
    renderApp('/resume')
    const courses = within(card('cursos/'))
    expect(courses.getByText('cursos/')).toBeVisible()
    const links = courses.getAllByRole('link', { name: 'ver credencial ↗' })
    expect(links).toHaveLength(4)
    links.forEach((link, i) => {
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', credentials[i].url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
    const ddd = courses.getByText('Curso de Domain Driven Design').closest('li')
    expect(within(ddd).getByText('08/2023')).toBeInTheDocument()
  })

  it('não tem botão de mostrar mais', () => {
    renderApp('/resume')
    expect(screen.queryByRole('button', { name: /mostrar mais/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /mostrar menos/ })).not.toBeInTheDocument()
  })

  it('traduz o rótulo e os links em inglês, com a mesma data', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    const courses = within(card('courses/'))
    expect(courses.getAllByRole('link', { name: 'see credential ↗' })).toHaveLength(4)
    const ddd = courses.getByText('Curso de Domain Driven Design').closest('li')
    expect(within(ddd).getByText('08/2023')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /show more/ })).not.toBeInTheDocument()
  })
})
