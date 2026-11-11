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
- `src/content/experiences.js:31-36` — bullets de IA da AgileEngine (harness de orquestração, fluxos com Claude e Codex) [code src/content/experiences.js:31-36]
- `src/content/about.js:23-24` — frase "Hoje, na AgileEngine, construo fluxos de engenharia com agentes de IA…", o `lede` da página [code src/content/about.js:23-24]
- `src/components/nav.js:2-9` (`NAV_ITEMS`) — item novo, no cabeçalho e no rodapé [code src/components/nav.js:2-9]
- `src/seo.js:21-52` (`STATIC_ROUTES`) — rota `/ai`; `scripts/prerender.mjs:51-55` itera `seoRoutes()` e não muda [code src/seo.js:21-52]
- `src/seo.test.jsx:15` — lista de rotas esperadas [code src/seo.test.jsx:15]
- `public/llms.txt:9-14` — lista de páginas [code public/llms.txt:9-14]
- `src/content/projects.js:46-66` — `simpleProject` não expõe `ai` (só dentro de `sections`); passa a devolver o campo [code src/content/projects.js:46-66]

## Code references
—

## Other references
- docs/PENDENCIAS.md § Diagramas e processo [doc docs/PENDENCIAS.md]

## Open questions
- Página ou bloco? → página nova `/ai`, na navegação, pré-renderizada, PT/EN (owner, 2026-11-10)
