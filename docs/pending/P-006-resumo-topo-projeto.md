---
id: P-006
status: open
created: 2026-11-10
related: [P-005]
---

# Resumo de três bullets (problema, o que fiz, resultado) no topo de cada projeto

## Problem
"Resumo no topo de cada projeto: três bullets (problema, o que fiz, resultado) antes do texto."

## Strategy
1. Três bullets por projeto — problema, o que fiz, resultado — antes do texto.
2. Conteúdo bilíngue em `src/content/projects.js`; sem resumo, o bloco some.

## Locations
- `src/pages/ProjectDetail.jsx:41-66` — entre a introdução/capa e as seções [code src/pages/ProjectDetail.jsx:41-66]
- `src/content/projects.js:27-66` (`simpleProject`) e os projetos completos (ex.: `:186`) — campo novo [code src/content/projects.js:27]
- `src/i18n/strings.js` — rótulos "problema / o que fiz / resultado" [inferred]

## Code references
- `Project` `src/pages/ProjectDetail.jsx:24` [code src/pages/ProjectDetail.jsx:24]

## Other references
- docs/PENDENCIAS.md § Estrutura dos projetos [doc docs/PENDENCIAS.md]

## Open questions
- O texto dos bullets sai só do conteúdo existente (`summary`, `lede`, `about`, `sections`) ou o dono revisa a redação antes do merge.
