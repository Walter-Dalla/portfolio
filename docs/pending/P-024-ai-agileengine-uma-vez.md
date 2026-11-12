---
id: P-024
status: open
created: 2026-11-11
related: []
---

# /ai: "AgileEngine (US)" aparece uma vez só, com os dois bullets embaixo

## Problem
Em "Com clientes" da página /ai, "AgileEngine (US)" aparece duas vezes: um cabeçalho por bullet com `ai: true`.

## Strategy
1. Agrupar `aiBullets` pelo cargo/empresa e renderizar um rótulo por grupo, com os bullets em lista embaixo.
2. Ajustar o CSS de `.ai-work` ao novo agrupamento.
3. Cobrir com teste em `src/ai-page.test.jsx`.

## Locations
- `src/pages/Ai.jsx:14-16` — `aiBullets`, lista plana { position, bullet } [code src/pages/Ai.jsx:14]
- `src/pages/Ai.jsx:44-53` — `<ul class="ai-work">` com um `<li>` e a empresa por bullet [code src/pages/Ai.jsx:44]
- `src/pages/ai.css:32-52` — `.ai-work`, `.ai-work__item`, `.ai-work__company` [code src/pages/ai.css:32]
- `src/content/experiences.js:34,39,78` — bullets `ai: true` (AgileEngine 34 e 39, Qyon 78); não mudam [code src/content/experiences.js:34]
- `src/ai-page.test.jsx:30-41` — hoje exige `.ai-work > li` = 3 e "AgileEngine (EUA)" 2 vezes; muda junto [code src/ai-page.test.jsx:33]

## Code references
- `aiBullets` `src/pages/Ai.jsx:14` — flatMap de posições e bullets [code src/pages/Ai.jsx:14]
- `Ai` `src/pages/Ai.jsx:29` [code src/pages/Ai.jsx:29]

## Other references
- docs/features/ia.md

## Open questions
- Agrupar por `position.company` (texto) ou por entrada de experiência? Resolve pelo código. → por vínculo (`position`): um grupo por cargo com bullet `ai`; o texto da empresa depende do idioma e juntaria cargos diferentes (enricher, 2026-11-11) [doc .impl/ajustes-sessao/ANALYSIS.md]
