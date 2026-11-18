import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// O CSS global carrega antes do CSS de componente: num empate de especificidade, vence o componente.
function lineOf(lines, pattern) {
  return lines.findIndex((line) => pattern.test(line))
}

describe('ordem do CSS', () => {
  for (const entry of ['src/main.jsx', 'src/entry-server.jsx']) {
    it(`${entry} importa global.css antes de App`, () => {
      const lines = readFileSync(resolve(process.cwd(), entry), 'utf8').split('\n')
      const global = lineOf(lines, /^import\s+['"]\.\/styles\/global\.css['"]/)
      const app = lineOf(lines, /^import\s+\{\s*App\s*\}\s+from\s+['"]\.\/App\.jsx['"]/)
      expect(global).toBeGreaterThanOrEqual(0)
      expect(app).toBeGreaterThanOrEqual(0)
      expect(global).toBeLessThan(app)
    })
  }
})
