---
id: P-015
status: open
created: 2026-11-10
related: [P-014]
---

# Página ou bloco "Como trabalho com IA", reunindo os campos ai dos projetos

## Problem
"Página ou bloco "Como trabalho com IA", reunindo o que hoje está espalhado nos campos `ai` dos projetos (harness, regras adotadas por 20+ devs)."

## Strategy
1. Reunir num lugar só o conteúdo dos campos `ai` dos projetos.
2. Incluir o harness e as regras adotadas por 20+ devs.

## Locations
- `src/content/projects.js:84-86,121-123,163-164,296,344-346,381-383` — campos `ai` de wh-harness, GoPrint, Nesse Capítulo, portfólio, Cartas Malfaladas, KittyCafé [code src/content/projects.js:84]
- `src/content/experiences.js:73-74` — regras para Claude Code e Cursor adotadas por 20+ devs [code src/content/experiences.js:73-74]
- `src/App.jsx:30-40` — rotas, se virar página [code src/App.jsx:30-40]
- `src/components/nav.js` — navegação, se virar página [inferred]
- `src/seo.js`, `scripts/prerender.mjs` — metadados e pré-render de rota nova [doc CLAUDE.md]

## Code references
—

## Other references
- docs/PENDENCIAS.md § Diagramas e processo [doc docs/PENDENCIAS.md]

## Open questions
- Página ou bloco? → página nova `/ai`, na navegação, pré-renderizada, PT/EN (owner, 2026-11-10)
