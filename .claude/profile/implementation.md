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
Testes de conteúdo comparam listas e contagens por literal: antes de fechar `Owns:`, `git grep` do valor antigo e do símbolo exportado cujo conteúdo muda (ex.: `unlistedProjects`) em `src/*.test.jsx` [retro pendencias, pending-002-095]
jsdom não aplica CSS: bloco com `hidden` e `display` próprio precisa de `[hidden] { display: none }`; `global.css` é importado antes do `App`, então o CSS do componente vence empates com as classes comuns (`src/css-order.test.jsx`) [retro pendencias, pending-002-095]
Todo arquivo de teste roda em jsdom (`src/test/setup.js` usa `window`): `// @vitest-environment node` falha; trabalho de Node vai por `execFileSync` [retro pending-002-095]
Largura de media query = largura de `.site` (`cqi`) + 15px da barra de rolagem no Chromium desktop; medir no navegador antes de fixar um limite [retro pending-002-095]
No jsdom, `scrollWidth`/`clientWidth` ficam em `Element.prototype`: simular ali e restaurar o descritor [retro pending-002-095]

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
Medir posições antes do print de página inteira (o print muda o layout); print por área tocada (seletor), página inteira só como arquivo [retro pendencias]
Dois prints do mesmo código diferem nas áreas animadas (pulso do cabeçalho, diagrama de arquitetura): comparar antes/depois contra dois "antes" [retro pending-002-095]
Comparar com a base: `git archive <base>` para o scratchpad, link simbólico de `node_modules` e `vite` na próxima porta de QA [retro pending-002-095]

## Closing docs
Changelog: — · Status de features: — · Pendências do dono: `pending/` (mover concluídas para `pending/done/`) · Mapa de features: `/wh:feature-docs` [inferred]

## Report
`docs/relatorios/<data>-<slug>.md` [skill default]

## Models
— [skill default]

## Worktree commands
O worktree não tem `node_modules`: `npx vitest` e `npm run lint` resolvem pelo do clone; `npm run build` também roda (medido 2026-11-10) [enricher retro]
`git -C` recebe o caminho absoluto do worktree, nunca `.` (o guard recusa) [retro ajustes-sessao]
