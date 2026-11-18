import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { LANG_KEY } from './i18n/context.js'

// O script inline do index.html (tema e idioma antes do primeiro paint), rodado com localStorage e
// navigator de mentira.
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
const inline = html.match(/<script>([\s\S]*?)<\/script>/)[1]

function runInline({ saved = null, browser }) {
  // A chave do script é um literal (ele não importa nada): ligada a `LANG_KEY`, uma troca só de um lado quebra o teste.
  const storage = { getItem: (key) => (key === LANG_KEY ? saved : null) }
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

  it('o script lê a mesma chave que o app grava', () => {
    expect(inline).toContain(`localStorage.getItem('${LANG_KEY}')`)
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
