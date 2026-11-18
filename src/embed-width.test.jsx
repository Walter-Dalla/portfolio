import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('largura do embed', () => {
  it('sai da coluna do site, centralizado, até 1284px', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/pages/project-detail.css'), 'utf8')
    const block = css.match(/\.project__embed\s*\{([^}]*)\}/)[1]
    const decl = (prop) => block.match(new RegExp(`(?:^|;|\\s)${prop}:\\s*([^;]+);`))?.[1].trim()
    expect(decl('align-self')).toBe('center')
    expect(decl('width')).toBe('min(100cqi - 2 * var(--gutter), 1284px)')
  })
})
