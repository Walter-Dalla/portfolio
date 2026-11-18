// Guarda do que vai para o GitHub Pages: percorre a pasta do build (padrão `dist`) e falha se achar
// source map, caminho local da máquina, padrão de segredo, e-mail que não é o do perfil ou pasta de
// trabalho local (pendências, retros, .impl, .claude). Uso: node scripts/check-dist.mjs [pasta]
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Saída fechada (ex.: `| head`) não vira exceção.
for (const stream of [process.stdout, process.stderr]) stream.on('error', () => {})

const root = resolve(process.argv[2] ?? 'dist')
const repo = join(dirname(fileURLToPath(import.meta.url)), '..')
const { profile } = await import(pathToFileURL(join(repo, 'src/content/profile.js')).href)
const allowedEmail = String(profile.email).toLowerCase()

const TEXT = new Set(['.html', '.js', '.css', '.txt', '.xml', '.json', '.map'])
const LOCAL_DIRS = new Set(['pending', 'retro', 'retros', '.impl', '.claude'])
const CHECKS = [
  ['caminho local', /\/home\/|\/mnt\/c|C:\\Users/i],
  ['segredo (chave AWS)', /AKIA[0-9A-Z]{16}/],
  ['segredo (token GitHub)', /ghp_|github_pat_/],
  ['segredo (chave privada)', /-----BEGIN [A-Z ]*PRIVATE KEY/],
  ['segredo (token Slack)', /xox[baprs]-/],
  ['segredo (chave Google)', /AIza[0-9A-Za-z_-]{35}/],
]
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g
// Nome de arquivo com densidade (`logo@2x.png`) parece e-mail e não é.
const NOT_EMAIL = /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i

const findings = []
let read = 0

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    const rel = relative(root, path)
    if (entry.isDirectory()) {
      if (LOCAL_DIRS.has(entry.name)) findings.push(`${rel}: pasta de trabalho local`)
      walk(path)
      continue
    }
    const ext = extname(entry.name).toLowerCase()
    if (ext === '.map') findings.push(`${rel}: source map`)
    if (!TEXT.has(ext)) continue
    read++
    const text = readFileSync(path, 'utf8')
    for (const [reason, pattern] of CHECKS) if (pattern.test(text)) findings.push(`${rel}: ${reason}`)
    const strange = new Set(
      (text.match(EMAIL) ?? []).filter((e) => !NOT_EMAIL.test(e) && e.toLowerCase() !== allowedEmail),
    )
    for (const email of strange) findings.push(`${rel}: e-mail fora do perfil (${email})`)
  }
}

walk(root)

if (findings.length) {
  process.stderr.write(findings.join('\n') + '\n')
  process.exitCode = 1
} else {
  process.stdout.write(`check-dist: ${read} arquivos lidos em ${relative(process.cwd(), root) || '.'}, nada suspeito\n`)
}
