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
- `src/pages/Ai.jsx:13-15,43-52` — `aiBullets` plano e `<li>` com a empresa repetida [code src/pages/Ai.jsx:13]
- `src/pages/ai.css:32-49` — `.ai-work`, `.ai-work__item`, `.ai-work__company` [code src/pages/ai.css:32]
- `src/content/experiences.js:34,39,78` — bullets `ai: true` (os dois da AgileEngine são 34 e 39) [code src/content/experiences.js:34]
- `src/ai-page.test.jsx` — teste da página [doc]

## Code references
- `aiBullets` `src/pages/Ai.jsx:13` — flatMap de posições e bullets [code src/pages/Ai.jsx:13]
- `Ai` `src/pages/Ai.jsx:26` [code src/pages/Ai.jsx:26]

## Other references
- docs/features/ia.md

## Open questions
- Agrupar por `position.company` (texto) ou por entrada de experiência? Resolve pelo código.
