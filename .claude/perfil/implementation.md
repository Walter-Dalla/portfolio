# Perfil do /wh:implementation

## Build
`npm run build 2>&1 | tail -30` (sem warning novo = verde) [package.json]

## Testes
Área: `npx vitest run <filtro>` [package.json]
Suíte: `npm test 2>&1 | grep -E "Test Files|Tests|FAIL"` [package.json]
Aceite de item = teste Vitest + Testing Library do componente/página tocado; teste novo quando não há [dono]

## Checks
`npm run lint` — por item e no QA final [package.json]

## Serviço descartável
Cliente: `npx vite --port <porta> --strictPort` (health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:<porta>` = `200`; parar: `pkill -f "vite --port <porta>"`) [vite.config.js]
Sem API nem banco [dono]

## Contrato
— (sem API, DTO ou formato persistido; só frontend) [dono]

## Arquivos de união
— [inferido]

## Arquivos protegidos
`CLAUDE.md` `.claude/perfil/*` `docs/features/*` `docs/GLOSSARIO.md` [inferido]

## Leitura do enriquecedor
Sempre: `CLAUDE.md` [CLAUDE.md]
Quando a tarefa toca uma área: o arquivo de `_comum § Docs` correspondente [inferido]

## QA visual ou e2e
Print headless do Chromium (`_comum § Toolchain`) contra o serviço descartável, desktop `1440x900` e mobile `390x844`, temas claro e escuro [inferido]

## Docs de fim
Changelog: — · Status de features: — · Pendências do dono: — · Mapa de features: `/wh:feature-docs` [inferido]

## Relatório
`docs/relatorios/<data>-<slug>.md` [padrão da skill]

## Modelos
— [padrão da skill]

## Comandos na worktree
—
