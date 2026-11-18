import { describe, expect, it } from 'vitest'
import { about } from './content/about.js'
import { renderApp } from './test/renderApp.jsx'

const STORY = [
  {
    year: '2017',
    pt: 'Entro no técnico de Informática do COTIL/UNICAMP; é onde começo a programar.',
    en: 'I join the IT technical program at COTIL/UNICAMP; it is where I start coding.',
  },
  {
    year: '2018',
    pt: 'Ainda no técnico, primeiro estágio, em backend, na Assertiva: integrações com provedores externos em Java e T-SQL e uma passagem pelo suporte, para ver o produto pelo lado do cliente.',
    en: 'Still in the technical program, my first internship, in backend, at Assertiva: integrations with external providers in Java and T-SQL, and a spell in support to see the product from the customer side.',
  },
  {
    year: '2020',
    pt: 'Começo Sistemas de Informação na UNESP de Bauru. No mesmo ano faço freelas (integração com PayPal, sistema de comissionamento) e entro na Ez.Devs, meu primeiro emprego como desenvolvedor, com projetos para 3 clientes.',
    en: 'I start Information Systems at UNESP Bauru. That same year I do freelance work (PayPal integration, a sales commission system) and join Ez.Devs, my first job as a developer, with projects for 3 clients.',
  },
  {
    year: '2021',
    pt: 'Um desses clientes é a Linx (Grupo Stone): depois de 7 meses alocado no time de P&D, sou contratado direto. Lá, até 2023, desenho a arquitetura offline-first do novo PDV, levantando requisitos com CEOs e CTOs dos clientes.',
    en: 'One of those clients is Linx (Stone Group): after 7 months embedded in its R&D team, I am hired directly. There, until 2023, I design the offline-first architecture of the new POS, gathering requirements with client CEOs and CTOs.',
  },
  {
    year: '2023',
    pt: 'Entro no BTG Pactual pela Act Digital, na prevenção a fraudes, e lidero a frente antifraude do projeto de latência do PIX: P95 de ~7s para ~4,5s, dentro do novo limite do Banco Central.',
    en: "I join BTG Pactual through Act Digital, in fraud prevention, and lead the fraud-prevention side of the PIX latency project: P95 from ~7s to ~4.5s, within the Central Bank's new limit.",
  },
  {
    year: '2024',
    pt: 'Formatura na UNESP. Meu TCC vira a ferramenta de análise comportamental de insetos, em uso por 3 laboratórios de farmacologia da UNICAMP.',
    en: 'Graduation at UNESP. My undergraduate thesis becomes the insect behavioral analysis tool, in use by 3 pharmacology labs at UNICAMP.',
  },
  {
    year: '2025',
    pt: 'Depois da entrega do PIX, sou contratado direto pelo banco e promovido ao time de arquitetura. Em setembro abro minha própria empresa e, por ela, atendo a Qyon como único arquiteto, cobrindo também DevOps e FinOps.',
    en: 'After the PIX delivery, I am hired directly by the bank and promoted to the architecture team. In September I open my own company and, through it, serve Qyon as the sole architect, also covering DevOps and FinOps.',
  },
  {
    year: '2026',
    pt: 'Pela mesma empresa, passo a trabalhar com desenvolvimento orientado por IA na AgileEngine (EUA). Nos meus projetos, o KittyCafé serve de teste de estresse para os agentes, e o fluxo que nasce ali vira o wh-harness, hoje usado também no GoPrint, no Nesse Capítulo e neste portfólio.',
    en: 'Through the same company, I move to AI-driven development at AgileEngine (US). In my own projects, KittyCafé works as a stress test for the agents, and the workflow born there becomes wh-harness, now also used in GoPrint, Nesse Capítulo and this portfolio.',
  },
]

const LINKS = [
  '/achievements',
  '/resume',
  '/resume',
  '/resume',
  '/resume',
  '/projects/insect-behavioral-analysis',
  '/resume',
  '/projects/wh-harness',
]

describe('Sobre: "Como cheguei aqui"', () => {
  it('tem os 8 anos, na ordem', () => {
    expect(about.story.map((s) => s.year)).toEqual(STORY.map((s) => s.year))
  })

  it('cada marco tem o texto PT e EN aprovado e o seu link', () => {
    STORY.forEach((s, i) => {
      expect(about.story[i].text, s.year).toEqual({ pt: s.pt, en: s.en })
      expect(about.story[i].link.to, s.year).toBe(LINKS[i])
    })
  })

  it('em /about mostra os 8 marcos na ordem, em PT, e o último leva ao wh-harness', () => {
    renderApp('/about')
    const steps = [...document.querySelectorAll('.story > li')]
    expect(steps.map((li) => li.querySelector('.story__year').textContent)).toEqual(STORY.map((s) => s.year))
    expect(steps.map((li) => li.querySelector('.story__text').textContent)).toEqual(STORY.map((s) => s.pt))
    expect(steps.at(-1).querySelector('a')).toHaveAttribute('href', '/projects/wh-harness')
  })
})
