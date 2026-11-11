---
id: P-014
status: open
created: 2026-11-10
related: [P-015]
---

# Seção "Como eu planejo": solicitação → análise → plano em faixas → QA → retrospectiva, com artefatos reais

## Problem
"Seção "Como eu planejo": solicitação → análise → plano em faixas → QA → retrospectiva, com artefatos reais (um plano numerado e um relatório de `docs/relatorios/`)."

## Strategy
1. Seção com as etapas solicitação → análise → plano em faixas → QA → retrospectiva.
2. Mostrar artefatos reais: um plano numerado e um relatório de `docs/relatorios/`.

## Locations
- `docs/relatorios/2026-11-10-curriculo-vinculos.md` — relatório real disponível [doc docs/relatorios/2026-11-10-curriculo-vinculos.md]
- `src/content/projects.js:61-64` — `sections` de `simpleProject`; a seção entra como terceira do wh-harness, com `steps` e `links` opcionais [code src/content/projects.js:61-64]
- `src/pages/ProjectDetail.jsx:56-66` — desenho das seções; passa a mostrar `steps` e `links` [code src/pages/ProjectDetail.jsx:56-66]
- `src/content/projects.js:77,81,122,382` — frases existentes que sustentam os cinco passos [code src/content/projects.js:77]
- Plano numerado: nenhum versionado; `PLAN.md` vive em `.impl/`, fora do git, e é apagado no fim (`git log --all --diff-filter=A` não tem plano) [code .git]

## Code references
—

## Other references
- docs/PENDENCIAS.md § Diagramas e processo [doc docs/PENDENCIAS.md]

## Open questions
- Onde mora a seção "Como eu planejo"? → seção na página do projeto wh-harness (`/projects/wh-harness`) (owner, 2026-11-10)
- Qual plano numerado mostrar, se nenhum está versionado: trecho literal do `PLAN.md` desta execução, só o relatório por agora, ou um plano de outro repo indicado pelo dono? → link do relatório no GitHub + trecho literal (3 a 5 itens) do `PLAN.md` desta execução num bloco `mono`, no idioma original (owner, 2026-11-10)
