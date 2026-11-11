---
id: P-004
status: open
created: 2026-11-10
related: [P-012]
---

# wh-harness e Nesse Capítulo nos destaques do Início

## Problem
"Pôr wh-harness (`slug: 'wh-harness'`) e Nesse Capítulo (`slug: 'nesse-capitulo'`) como projetos em destaque: `featured: true` em `src/content/projects.js`. Hoje os destaques são a Ferramenta de Análise Comportamental de Insetos e o KittyCafé — decidir se saem ou se ficam os quatro."

## Strategy
1. `featured: true` em wh-harness e Nesse Capítulo.
2. Conforme a decisão do dono, tirar ou manter os destaques atuais.

## Locations
- `src/content/projects.js:70-71` — `simpleProject` do wh-harness (sem `featured`) [code src/content/projects.js:70-71]
- `src/content/projects.js:149-150` — `simpleProject` do Nesse Capítulo [code src/content/projects.js:149-150]
- `src/content/projects.js:190` — `featured: true` da Ferramenta de Insetos [code src/content/projects.js:190]
- `src/content/projects.js:371` — `featured: true` do KittyCafé [code src/content/projects.js:371]
- `src/pages/Home.jsx:23,100-104` — filtra `featured` e monta a grade `home-projects` [code src/pages/Home.jsx:23]
- `src/pages/home.css:172-174` (`.home-projects`) — `repeat(auto-fit, minmax(300px, 1fr))` com gap 24: em 1104px úteis cabem 3 colunas, então 4 cards ficam 3 + 1; passa a 2 colunas (2×2) [code src/pages/home.css:172-174] [code src/styles/global.css:123-127,402-405]

## Code references
- `simpleProject` `src/content/projects.js:27` — parâmetro `featured = false` [code src/content/projects.js:38]
- `Home` `src/pages/Home.jsx:20` [code src/pages/Home.jsx:20]

## Other references
- docs/PENDENCIAS.md § Destaques do Início [doc docs/PENDENCIAS.md]
- `docs/features/inicio.md` [doc docs/features/inicio.md]

## Open questions
- Os destaques atuais saem ou ficam os quatro? → ficam os quatro: Insetos, KittyCafé, wh-harness e Nesse Capítulo (owner, 2026-11-10)
