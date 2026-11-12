---
id: P-012
status: open
created: 2026-11-10
related: [P-004, P-008, P-009, P-010]
---

# Categoria dos estudos de caso profissionais e se entram nos destaques do Início

## Problem
"Decidir a categoria desses casos em `projectCategories` (ex.: "profissional") e se entram nos destaques do Início."

## Strategy
1. Categoria nova (ex.: "profissional") em `projectCategories`, ou uma existente.
2. Decisão do dono sobre `featured` nesses casos.

## Locations
- `src/content/projects.js:10-18` (`projectCategories`) — nova categoria [code src/content/projects.js:10-18]
- `src/pages/Projects.jsx:17` — só categorias com projeto viram filtro [code src/pages/Projects.jsx:17]

## Code references
- `projectCategories` `src/content/projects.js:10` [code src/content/projects.js:10]

## Other references
- docs/PENDENCIAS.md § Estudos de caso profissionais [doc docs/PENDENCIAS.md]

## Open questions
- Quando decidir a categoria dos casos? → adiado junto com P-008 a P-010; fora desta execução (owner, 2026-11-10)
- Categoria nova `professional` sem destaque, nova com destaque, ou reaproveitar `.NET`/`infra`? (aberta até os casos chegarem)
