---
id: P-002
status: open
created: 2026-11-10
related: [P-001]
---

# Página do fluxo legível no celular: rótulos do mapa e painel "Arquivos"

## Problem
"No celular, os rótulos do mapa ficam com ~7 px e as linhas do painel "Arquivos" são cortadas à direita sem sinal de rolagem" (QA-final-03).

## Strategy
Fora desta execução (dono, 2026-11-10): a correção mora em `site/flow.html` do repo wh-harness; nada muda neste repo.
1. Aumentar os rótulos do mapa no celular.
2. Não cortar as linhas do painel "Arquivos" sem sinal de rolagem.

## Locations
- `site/flow.html` no repo wh-harness — mapa e painel "Arquivos" moram lá, fora deste repo [doc docs/features/projetos.md]
- `src/components/ProjectEmbed.jsx:16-17,44-60` — altura do iframe (`MIN_HEIGHT`/`MAX_HEIGHT`) e o elemento `iframe`; só a moldura é deste repo [code src/components/ProjectEmbed.jsx:16-17]
- `src/pages/project-detail.css` (`.project__embed-frame`) — largura da moldura no celular [inferred]

## Code references
- `ProjectEmbed` `src/components/ProjectEmbed.jsx:19` — moldura do iframe [code src/components/ProjectEmbed.jsx:19]

## Other references
- docs/PENDENCIAS.md § Página do fluxo do wh-harness [doc docs/PENDENCIAS.md]
- `docs/relatorios/2026-11-10-curriculo-vinculos.md` (QA-final-02, -03, -06, -10) [doc docs/relatorios/2026-11-10-curriculo-vinculos.md]
- A página do fluxo não mora mais neste repo: `public/wh-harness/flow.html` só redireciona para `https://walter-dalla.github.io/wh-harness/flow.html` (fonte em `site/flow.html` do repo wh-harness), embutida por iframe em `/projects/wh-harness` [code public/wh-harness/flow.html:7-9] [doc docs/features/projetos.md]

## Open questions
- O que fazer com a página do fluxo, que mora no repo wh-harness? → a legibilidade no celular (mapa e painel "Arquivos") pertence ao repo wh-harness e fica fora desta execução (owner, 2026-11-10)
