import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { experiences } from './content/experiences.js'
import { company } from './content/profile.js'

const lastSentence = (text) => text.slice(text.lastIndexOf('Client'))

describe('Andelph Group como cliente da empresa', () => {
  it('fecha o texto da empresa com os três clientes', () => {
    expect(lastSentence(company.text.pt)).toBe('Clientes: Qyon, AgileEngine (EUA) e Andelph Group.')
    expect(lastSentence(company.text.en)).toBe('Clients: Qyon, AgileEngine (USA) and Andelph Group.')
  })

  it('cita a Andelph Group na nota do grupo da empresa', () => {
    expect(experiences[0].note.pt).toBe('Minha empresa (PJ), pela qual atendi a Qyon e atendo a AgileEngine e a Andelph Group.')
    expect(experiences[0].note.en).toBe(
      'My own company, through which I served Qyon and now serve AgileEngine and Andelph Group.',
    )
  })

  it('cita a Andelph Group no llms.txt', () => {
    const llms = readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8')
    expect(llms).toContain('Qyon, AgileEngine (USA) and Andelph Group.')
  })
})
