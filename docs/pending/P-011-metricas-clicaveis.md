---
id: P-011
status: open
created: 2026-11-10
related: [P-008, P-009, P-010]
---

# Métricas do Início clicáveis, cada uma levando ao estudo de caso que a explica

## Problem
"Métricas do Início clicáveis: cada item de `metrics` (`src/content/profile.js`) leva ao estudo de caso que o explica. Depende do item acima." Depende de P-008, P-009, P-010 (que dependem de material do dono).

## Strategy
1. Cada item de `metrics` ganha o destino do estudo de caso.
2. `Home` renderiza o item como link quando há destino.
3. Só depois que os estudos de caso existirem.

## Locations
- `src/content/profile.js:49-70` (`metrics`) — campo novo de destino por item [code src/content/profile.js:49-70]
- `src/pages/Home.jsx:79-91` — `div.metric` vira `Link` [code src/pages/Home.jsx:79-91]
- `src/pages/home.css:117-122` (`.metrics`, `.metrics__grid`) — estado de hover/foco [code src/pages/home.css:117]

## Code references
- `metrics` `src/content/profile.js:49` [code src/content/profile.js:49]
- `Home` `src/pages/Home.jsx:20` [code src/pages/Home.jsx:20]

## Other references
- docs/PENDENCIAS.md § Estudos de caso profissionais [doc docs/PENDENCIAS.md]

## Open questions
- Quando fazer as métricas clicáveis? → adiado junto com P-008 a P-010; fora desta execução (owner, 2026-11-10)
- As métricas sem estudo de caso previsto (−23% AWS, 7→1 dias de SLA) ficam sem link, levam a `/resume` ou ganham estudos de caso próprios? (aberta até os casos chegarem)
