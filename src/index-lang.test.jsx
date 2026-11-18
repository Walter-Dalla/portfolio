import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

// O script inline do index.html (tema e idioma antes do primeiro paint), rodado com localStorage e
// navigator de mentira.
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1]

function runInline({ saved = null, browser }) {
  const storage = { getItem: (key) => (key === 'wd-lang' ? saved : null) }
  const matchMedia = () => ({ matches: false })
  new Function('localStorage', 'navigator', 'matchMedia', 'document', inline)(
    storage,
    { language: browser },
    matchMedia,
    document,
  )
  return document.documentElement.lang
}

describe('idioma no script inline do index.html', () => {
  afterEach(() => {
    document.documentElement.lang = 'en'
  })

  it.each([
    ['sem escolha, navegador pt-BR', 'pt-BR', { browser: 'pt-BR' }],
    ['sem escolha, navegador en-US', 'en', { browser: 'en-US' }],
    ['escolha en, navegador pt-BR', 'en', { saved: 'en', browser: 'pt-BR' }],
    ['escolha pt, navegador en-US', 'pt-BR', { saved: 'pt', browser: 'en-US' }],
  ])('%s → lang %s', (_, lang, options) => {
    document.documentElement.lang = 'en'
    expect(runInline(options)).toBe(lang)
  })
})
