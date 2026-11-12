---
id: P-031
status: open
created: 2026-11-12
related: [P-028]
---

# Confirmar o formato do Atom: página fora da lista (decisão sem o dono)

## Problem
O dono pediu que o Atom (TCC do técnico, 2019) não apareça em Projetos. A forma foi decidida na análise, sem pergunta ao dono: o Atom tem página em `/projects/atom`, mas fica fora de Projetos, Início, /ai, paginação e `sitemap.xml`, com `noindex`; a única entrada é o link "sobre o projeto →" no cartão do técnico (COTIL) em Conquistas.

## Strategy
1. Confirmar o formato atual; ou
2. Alternativa descartada: sem página, Atom resumido no próprio cartão do técnico (perde texto, repositório e papel). Nesse caso remover `unlistedProjects`, o link `projectSlug` do cartão e a rota.

## Locations
- `src/content/projects.js` — `unlistedProjects`, `findProject` [code]
- `src/content/achievements.js` — `projectSlug: 'atom'` no cartão do técnico [code]
- `src/seo.js` — `sitemapRoutes`, `noindex` [code]
