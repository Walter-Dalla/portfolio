import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experiences } from './content/experiences.js'
import { company } from './content/profile.js'
import { renderApp } from './test/renderApp.jsx'

const timeline = () => document.getElementById('experiencia')
const entry = (title) => within(timeline()).getByRole('heading', { level: 3, name: title }).closest('article')

describe('linha do tempo por vínculo', () => {
  it('mostra 4 entradas', () => {
    renderApp('/resume')
    const articles = within(timeline()).getAllByRole('article')
    expect(articles).toHaveLength(4)
    expect(articles).toHaveLength(experiences.length)
  })

  it('agrupa AgileEngine e Qyon sob a empresa PJ', () => {
    renderApp('/resume')
    const group = within(entry(company.name))
    group.getByRole('heading', { level: 4, name: 'Desenvolvedor Fullstack Sênior Orientado a IA' })
    group.getByRole('heading', { level: 4, name: 'Arquiteto de Sistemas & DevOps' })
    group.getByText('09/2025 — atual')
    group.getByText('Minha empresa (PJ), pela qual atendi a Qyon e atendo a AgileEngine.')
    group.getByText('AgileEngine (EUA) · Remoto · 07/2026 — atual')
    group.getByText('Qyon · Remoto · 09/2025 — 05/2026')
  })

  it('mostra BTG e Act Digital como um bloco só', () => {
    renderApp('/resume')
    const group = within(entry('BTG Pactual e Act Digital'))
    const roles = group.getAllByRole('heading', { level: 4 })
    expect(roles).toHaveLength(1)
    expect(roles[0]).toHaveTextContent('Engenheiro de Software Sênior & Arquiteto de Sistemas')
    group.getByText('Comecei como terceiro pela Act Digital e depois fui contratado diretamente pelo banco.')
    group.getByText('BTG Pactual (Banco de Investimentos) · São Paulo-SP')
    expect(group.getAllByRole('listitem')).toHaveLength(7)
  })

  it('agrupa Linx e Ez.Devs com o período de cada vínculo', () => {
    renderApp('/resume')
    const group = within(entry('Linx (Grupo Stone) e Ez.Devs'))
    group.getByText('09/2020 — 11/2023')
    group.getByText('Comecei alocado na Linx pela Ez.Devs e depois fui contratado diretamente.')
    group.getByText(
      'Linx (Grupo Stone) - Software para Varejo e Food Service · Remoto/Bauru-SP/São Paulo-SP · 10/2021 — 11/2023',
    )
    group.getByText('Ez.Devs (Outsourcing de Software) · Remoto · 09/2020 — 10/2021')
    expect(group.getAllByRole('listitem')).toHaveLength(9)
  })

  it('mantém a Assertiva como cargo simples', () => {
    renderApp('/resume')
    const single = within(entry('Estagiário Backend'))
    expect(single.queryAllByRole('heading', { level: 4 })).toHaveLength(0)
  })

  it('traduz títulos e notas dos grupos', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    entry('BTG Pactual and Act Digital')
    entry('Linx (Stone Group) and Ez.Devs')
    const tl = within(timeline())
    tl.getByText('My own company, through which I served Qyon and now serve AgileEngine.')
    tl.getByText('Started as a contractor through Act Digital, then was hired directly by the bank.')
    tl.getByText('Started embedded at Linx through Ez.Devs, then was hired directly.')
    tl.getByText('09/2025 — present')
  })

  it('conta cargos, não entradas, na Home', () => {
    renderApp('/')
    screen.getByText(
      '6 cargos desde 2018 — de estágio a arquiteto, passando por BTG Pactual e Linx (Grupo Stone).',
    )
  })
})

describe('formação', () => {
  it('segue o CV em português', () => {
    renderApp('/resume')
    screen.getByRole('heading', {
      level: 3,
      name: 'Bacharelado em Sistemas de Informação (equivalente a Ciência da Computação)',
    })
    screen.getByText('COTIL / UNICAMP (Universidade Estadual de Campinas) · Limeira-SP')
  })

  it('segue o CV em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/resume')
    screen.getByRole('heading', {
      level: 3,
      name: "Bachelor's Degree in Information Systems (Computer Science-equivalent)",
    })
  })
})
