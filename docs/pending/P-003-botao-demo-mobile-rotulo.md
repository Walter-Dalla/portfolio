---
id: P-003
status: open
created: 2026-11-10
related: [P-001]
---

# Botão da demonstração do wh-harness visível no celular e com rótulo que não quebra

## Problem
"No celular, o botão "Ver a demonstração interativa" fica no fim da página de `/projects/wh-harness`; e em PT ele quebra em duas linhas no card lateral do desktop — manter ou trocar por um rótulo curto, ex.: "Ver demo"" (QA-final-06, QA-final-10).

## Strategy
1. Tirar o botão do fim da página no celular.
2. Manter o rótulo ou trocar por um curto, ex.: "Ver demo".

## Locations
- `src/pages/ProjectDetail.jsx:115-125` — botão `demoUrl` dentro da ficha (`aside.facts`), que no celular vem depois do texto [code src/pages/ProjectDetail.jsx:115-125]
- `src/pages/ProjectDetail.jsx:41-48` (`project__intro`) — lugar possível para o botão no celular [code src/pages/ProjectDetail.jsx:41-48] [inferred]
- `src/i18n/strings.js:80` (`demoButton`) — rótulo PT/EN [code src/i18n/strings.js:80]
- `src/pages/project-detail.css:130,182-195` — `@media (max-width: 599px)` e `.facts__links` [code src/pages/project-detail.css:130]

## Code references
- `Project` `src/pages/ProjectDetail.jsx:24` — layout da página do projeto [code src/pages/ProjectDetail.jsx:24]

## Other references
- docs/PENDENCIAS.md § Página do fluxo do wh-harness [doc docs/PENDENCIAS.md]
- `docs/relatorios/2026-11-10-curriculo-vinculos.md` (QA-final-02, -03, -06, -10) [doc docs/relatorios/2026-11-10-curriculo-vinculos.md]
- `docs/features/projetos.md` (`demoUrl` → `demoButton`) [doc docs/features/projetos.md]

## Open questions
- Rótulo do botão de demo? → "Ver demo" / "See demo" (owner, 2026-11-10)
- Posição do botão no celular? → sobe para o topo da página do projeto (`project__intro`) (owner, 2026-11-10)
