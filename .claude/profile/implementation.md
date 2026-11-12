# Profile of /wh:implementation

## Commands
build: `npm run build` [package.json]
suite: `npm test` [package.json]
typecheck: `npm run lint` [package.json]
service: `npx vite --port <port> --strictPort` [vite.config.js]
health: `curl -sf -o /dev/null http://localhost:<port>` [vite.config.js]

## Build
`npm run build` (sem warning novo = verde; veredito = exit code, sem pipe) [package.json]

## Tests
Área: `npx vitest run <filtro>` [package.json]
Aceite com arquivo de teste novo: `test -f <arquivo> && npx vitest run <arquivos>` (filtro inexistente não é erro no Vitest: sai 0 se outro filtro casar) [retro ajustes-sessao]
Suíte: `npm test` (veredito = exit code, sem pipe; só para ler: `npm test 2>&1 | tail -30`) [package.json]
Arquivo lido com `node:fs` no Vitest: `resolve(process.cwd(), '<caminho>')` (`import.meta.url` não é `file:` no jsdom) [retro 2026-11-11]
Aceite de item = teste Vitest + Testing Library do componente/página tocado; teste novo quando não há [owner]

## Checks
`npm run lint` — por item e no QA final [package.json]

## Disposable service
Cliente: `npx vite --port <porta> --strictPort` (health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:<porta>` = `200`; parar: `pkill -f "[v]ite --port <porta>"`) [vite.config.js]
Sem API nem banco [owner]

## Contract
— (sem API, DTO ou formato persistido; só frontend) [owner]

## Union files
`src/i18n/strings.js` `src/content/projects.js` (só acrescentar chaves e campos) [retro 2026-11-11]

## Protected files
`CLAUDE.md` `.claude/profile/*` `.claude/agents/*` `docs/features/*` `docs/GLOSSARIO.md` [inferred]

## Enricher reading
Sempre: `CLAUDE.md` [CLAUDE.md]
Quando a tarefa toca uma área: o arquivo de `_common § Docs` correspondente [inferred]

## Visual or e2e QA
Print headless do Chromium (`_common § Toolchain`) contra o serviço descartável, desktop `1440x900` e mobile `390x844`, temas claro e escuro [inferred]
Cada rota tocada × os dois tamanhos × os dois temas; combinação não rodada vai ao relatório como "não conferida" [retro pendencias-site]

## Closing docs
Changelog: — · Status de features: — · Pendências do dono: `docs/PENDENCIAS.md` · Mapa de features: `/wh:feature-docs` [inferred]

## Report
`docs/relatorios/<data>-<slug>.md` [skill default]

## Models
— [skill default]

## Worktree commands
O worktree não tem `node_modules`: `npx vitest` e `npm run lint` resolvem pelo do clone; `npm run build` também roda (medido 2026-11-10) [enricher retro]
`git -C` recebe o caminho absoluto do worktree, nunca `.` (o guard recusa) [retro ajustes-sessao]
