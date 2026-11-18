// Roda o script de verdade num processo Node à parte (o setup dos testes exige o jsdom deste arquivo).
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { profile } from './content/profile.js'

const SCRIPT = resolve(process.cwd(), 'scripts/check-dist.mjs')
const dirs = []

function distWith(files) {
  const dir = mkdtempSync(join(tmpdir(), 'check-dist-'))
  dirs.push(dir)
  for (const [name, text] of Object.entries(files)) {
    mkdirSync(join(dir, name, '..'), { recursive: true })
    writeFileSync(join(dir, name), text)
  }
  return dir
}

function exitCode(dir) {
  try {
    execFileSync('node', [SCRIPT, dir], { stdio: 'pipe' })
    return 0
  } catch (error) {
    return error.status
  }
}

const CLEAN = {
  'index.html': `<html><body><a href="mailto:${profile.email}">e-mail</a><img src="logo@2x.png"></body></html>`,
  'assets/app.js': 'console.log("ok")',
}

describe('guarda do dist', () => {
  afterEach(() => {
    while (dirs.length) rmSync(dirs.pop(), { recursive: true, force: true })
  })

  it('pasta limpa sai 0', () => {
    expect(exitCode(distWith(CLEAN))).toBe(0)
  })

  it.each([
    ['source map', { 'assets/app.js.map': '{}' }],
    ['caminho local', { 'assets/app.js': 'const p = "/home/x/portfolio"' }],
    ['e-mail estranho', { 'contact.html': '<p>alguem@exemplo.com</p>' }],
    ['chave falsa', { 'assets/app.js': `const k = "AKIA${'A'.repeat(16)}"` }],
    ['pasta de trabalho local', { 'pending/P-001.md': '# x' }],
  ])('%s sai 1', (_, files) => {
    expect(exitCode(distWith({ ...CLEAN, ...files }))).toBe(1)
  })
})
