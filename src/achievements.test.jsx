import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { achievements } from './content/achievements.js'
import { renderApp } from './test/renderApp.jsx'

const POST_URL =
  'https://www.linkedin.com/posts/walter-dalla_nessa-ultima-sexta-eu-tive-o-prazer-inenarr%C3%A1vel-share-6584492874379874304-sEfv/'
const TEXT_PT =
  'Ministrei um minicurso de Spring Boot no COTIL (Colégio Técnico de Limeira, UNICAMP) para 12 participantes, entre eles a minha professora Tania Basso, idealizadora do projeto.'
const TEXT_EN =
  "I taught a Spring Boot short course at COTIL (UNICAMP's technical high school in Limeira) to 12 participants, among them my teacher Tania Basso, who conceived the project."

const springCard = (title) => screen.getByRole('heading', { level: 3, name: title }).closest('article')

describe('conquista: minicurso de Spring Boot no COTIL', () => {
  it('tem os dados do minicurso no conteúdo', () => {
    const item = achievements.find((a) => a.mark === 'Spring Boot')
    expect(item.label).toEqual({ pt: 'minicurso · 2019', en: 'short course · 2019' })
    expect(item.title).toEqual({ pt: 'Minicurso de Spring Boot no COTIL', en: 'Spring Boot short course at COTIL' })
    expect(item.text).toEqual({ pt: TEXT_PT, en: TEXT_EN })
    expect(item.mark).toEqual('Spring Boot')
    expect(item.proofKind).toEqual('post')
    expect(item.proofUrl).toEqual(POST_URL)
  })

  it('mostra o cartão com texto, sigla e link para a publicação', () => {
    renderApp('/achievements')
    const card = within(springCard('Minicurso de Spring Boot no COTIL'))
    expect(card.getByText(TEXT_PT)).toBeInTheDocument()
    expect(card.getByText('Spring Boot')).toBeInTheDocument()
    const link = card.getByRole('link', { name: 'ver publicação ↗' })
    expect(link).toHaveAttribute('href', POST_URL)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('fica entre o curso técnico e os cursos e certificações', () => {
    const { container } = renderApp('/achievements')
    const titles = [...container.querySelectorAll('.achievements__grid h3')].map((h) => h.textContent)
    const i = titles.indexOf('Minicurso de Spring Boot no COTIL')
    expect(titles[i - 1]).toBe('Curso Técnico em Informática (Software)')
    expect(titles[i + 1]).toBe('Cursos e certificações')
  })

  it('em inglês mostra o título e o link traduzidos', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/achievements')
    const card = within(springCard('Spring Boot short course at COTIL'))
    expect(card.getByRole('link', { name: 'see post ↗' })).toHaveAttribute('href', POST_URL)
  })
})
