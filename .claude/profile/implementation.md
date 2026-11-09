# Profile of /wh:implementation

## Build
`npm run build` (sem warning novo = verde; veredito = exit code, sem pipe) [package.json]

## Tests
Área: `npx vitest run <filtro>` [package.json]
Suíte: `npm test` (veredito = exit code, sem pipe; só para ler: `npm test 2>&1 | tail -30`) [package.json]
Aceite de item = teste Vitest + Testing Library do componente/página tocado; teste novo quando não há [owner]

## Checks
`npm run lint` — por item e no QA final [package.json]

## Disposable service
Cliente: `npx vite --port <porta> --strictPort` (health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:<porta>` = `200`; parar: `pkill -f "vite --port <porta>"`) [vite.config.js]
Sem API nem banco [owner]

## Contract
— (sem API, DTO ou formato persistido; só frontend) [owner]

## Union files
— [inferred]

## Protected files
`CLAUDE.md` `.claude/profile/*` `.claude/agents/*` `docs/features/*` `docs/GLOSSARIO.md` [inferred]

## Enricher reading
Sempre: `CLAUDE.md` [CLAUDE.md]
Quando a tarefa toca uma área: o arquivo de `_common § Docs` correspondente [inferred]

## Visual or e2e QA
Print headless do Chromium (`_common § Toolchain`) contra o serviço descartável, desktop `1440x900` e mobile `390x844`, temas claro e escuro [inferred]

## Closing docs
Changelog: — · Status de features: — · Pendências do dono: — · Mapa de features: `/wh:feature-docs` [inferred]

## Report
`docs/relatorios/<data>-<slug>.md` [skill default]

## Models
— [skill default]

## Worktree commands
—
