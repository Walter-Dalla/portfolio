---
id: P-007
status: open
created: 2026-11-10
related: [P-005]
---

# Ficha técnica com números de engenharia (testes, mutação, commits, uptime)

## Problem
"Ficha técnica expandida (`facts`): números de engenharia por projeto — testes, testes de mutação, commits, uptime. Cartas Malfaladas e KittyCafé já têm esses números no campo `ai`."

## Strategy
1. Novos itens em `facts` para números de engenharia.
2. Preencher com os números que já estão no campo `ai` (Cartas Malfaladas, KittyCafé); número ausente não aparece.

## Locations
- `src/content/projects.js:60` — `facts` de `simpleProject` (`client, role, status, adoption`) [code src/content/projects.js:60]
- `src/content/projects.js:344-346` — `ai` da Cartas Malfaladas (717 commits, 628 com Claude, Stryker) [code src/content/projects.js:344-346]
- `src/content/projects.js:381-383` — `ai` do KittyCafé (1.822 commits, 1.594 com Claude, mutação noturna) [code src/content/projects.js:381-383]
- `src/content/projects.js:102-103` — wh-harness: 32 testes (na galeria) [code src/content/projects.js:102-103]
- `src/pages/ProjectDetail.jsx:101-114` — lista da ficha (`Fact`) [code src/pages/ProjectDetail.jsx:101-114]
- `src/i18n/strings.js` — rótulos novos (`factTests`…) [inferred]

## Code references
- `Fact` `src/pages/ProjectDetail.jsx:15` [code src/pages/ProjectDetail.jsx:15]
- `simpleProject` `src/content/projects.js:27` [code src/content/projects.js:27]

## Other references
- docs/PENDENCIAS.md § Estrutura dos projetos [doc docs/PENDENCIAS.md]

## Open questions
—
