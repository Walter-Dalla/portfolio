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
- `src/i18n/strings.js:80-84` — rótulos "problema / o que fiz / resultado" junto dos textos de Projetos [code src/i18n/strings.js:80-84]
- No conteúdo atual só 3 dos 8 projetos têm frase de "problema" (Insetos, GoPrint, Homelab) e 2 não têm "resultado" (GoPrint, Cartas Malfaladas): bullet sem fonte fica `null` e oculto [code src/content/projects.js:76-83,113-120,155-162,223-263,288-295,320-327,336-343,373-380]

## Code references
- `Project` `src/pages/ProjectDetail.jsx:24` [code src/pages/ProjectDetail.jsx:24]

## Other references
- docs/PENDENCIAS.md § Estrutura dos projetos [doc docs/PENDENCIAS.md]

## Open questions
- O texto dos bullets sai só do conteúdo existente (`summary`, `lede`, `about`, `sections`) ou o dono revisa a redação antes do merge. → bullets só do texto existente; bullet sem fonte fica oculto; o dono revisa a redação no PR (owner, 2026-11-10)
