import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { findProject, projects, unlistedProjects } from './content/projects.js'
import { renderApp } from './test/renderApp.jsx'

const ABOUT_PT =
  'O Atom foi o trabalho de conclusão do curso técnico em informática, requisito para o certificado. Com ele dá para criar questionários totalmente customizáveis, enviá-los e analisar as respostas de forma simples. Foi feito por uma equipe de 5 pessoas; o backend é em Java com Spring Boot, o frontend em React e o banco é MySQL. A banca deu nota média 9,5. O repositório público é o do backend; o do frontend é privado.'
const ABOUT_EN =
  'Atom was the capstone project of my technical degree in IT, required for the certificate. It lets you build fully customizable questionnaires, send them and analyze the answers in a simple way. It was built by a team of 5; the backend is Java with Spring Boot, the frontend is React and the database is MySQL. The examining board gave it an average grade of 9.5. The public repository is the backend; the frontend one is private.'
const ROLE = {
  pt: 'Gerente de projeto, líder e desenvolvedor do backend, desenvolvedor do frontend',
  en: 'Project manager, backend lead and developer, frontend developer',
}
const LINKEDIN = 'https://www.linkedin.com/feed/update/urn:li:activity:6610003994779631616/'

describe('Atom: projeto fora da lista', () => {
  it('não está em projects, só em unlistedProjects', () => {
    expect(projects.map((p) => p.slug)).not.toContain('atom')
    expect(unlistedProjects.map((p) => p.slug)).toEqual(['atom'])
  })

  it('findProject encontra o Atom com o conteúdo combinado', () => {
    const atom = findProject('atom')
    expect(atom.summary).toEqual({
      pt: 'TCC do curso técnico em informática no COTIL/UNICAMP: questionários totalmente customizáveis, com envio e análise simples das respostas.',
      en: 'Capstone project of my technical degree in IT at COTIL/UNICAMP: fully customizable questionnaires, with sending and simple analysis of the answers.',
    })
    expect(atom.facts.role).toEqual(ROLE)
    expect(atom.facts.status).toEqual({ pt: 'Concluído', en: 'Completed' })
    expect(atom.repo).toBe('https://github.com/Walter-Dalla/Atom')
    expect(atom.categories).toEqual(['web'])
    expect(atom.featured).toBe(false)
    expect(atom.brief).toEqual({
      problem: null,
      action: {
        pt: 'Aplicação web de questionários feita em equipe de 5 pessoas: backend em Java com Spring Boot, frontend em React e MySQL.',
        en: 'A questionnaire web app built by a team of 5: Java with Spring Boot backend, React frontend and MySQL.',
      },
      result: { pt: 'Nota média 9,5 da banca.', en: 'Average grade of 9.5 from the examining board.' },
    })
  })

  it.each(['/projects', '/', '/ai'])('%s não tem link para o Atom', (path) => {
    renderApp(path)
    expect(document.querySelector('a[href="/projects/atom"]')).toBeNull()
  })

  it('/projects/atom mostra a página do projeto, sem IA e sem vizinhos', () => {
    renderApp('/projects/atom')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Atom')
    expect(screen.getByText(ABOUT_PT)).toBeInTheDocument()
    expect(screen.getByText('Concluído')).toBeInTheDocument()
    expect(screen.getByText(ROLE.pt)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Repositório' })).toHaveAttribute(
      'href',
      'https://github.com/Walter-Dalla/Atom',
    )
    const post = screen.getByRole('link', { name: 'publicação no LinkedIn' })
    expect(post).toHaveAttribute('href', LINKEDIN)
    expect(post).toHaveAttribute('target', '_blank')
    expect(screen.queryByRole('heading', { name: /Como foi feito com IA/ })).toBeNull()
    expect(screen.queryByRole('link', { name: /^(← )?(anterior|próximo):/ })).toBeNull()
    expect(screen.getByRole('link', { name: '← todos os projetos' })).toBeInTheDocument()
  })

  it('o wh-harness continua com o último projeto da lista como anterior', () => {
    renderApp('/projects/wh-harness')
    const last = projects[projects.length - 1]
    expect(screen.getByRole('link', { name: /anterior:/ })).toHaveAttribute('href', `/projects/${last.slug}`)
  })

  it('em inglês mostra o texto e o status em inglês', () => {
    localStorage.setItem('wd-lang', 'en')
    renderApp('/projects/atom')
    expect(screen.getByText(ABOUT_EN)).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})
