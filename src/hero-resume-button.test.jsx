import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { resumePdf } from './content/profile.js'
import { resumeHref } from './components/resume.js'
import { renderApp } from './test/renderApp.jsx'

const heroDownloads = () => [...document.querySelector('.hero').querySelectorAll('a[download]')]

describe('Início: um só botão de currículo no hero', () => {
  it('em PT baixa o PDF em PT', () => {
    expect(resumePdf.pt).toBeTruthy()
    renderApp('/')
    expect(heroDownloads()).toHaveLength(1)
    const link = within(document.querySelector('.hero')).getByRole('link', { name: 'Baixar currículo PT' })
    expect(link).toHaveAttribute('href', resumeHref('pt'))
    expect(within(document.querySelector('.hero')).queryByText('Resume')).toBeNull()
  })

  it('em EN baixa o PDF em EN', () => {
    expect(resumePdf.en).toBeTruthy()
    renderApp('/')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(heroDownloads()).toHaveLength(1)
    const link = within(document.querySelector('.hero')).getByRole('link', { name: 'Download resume EN' })
    expect(link).toHaveAttribute('href', resumeHref('en'))
  })
})
