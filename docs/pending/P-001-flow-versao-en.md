---
id: P-001
status: open
created: 2026-11-10
related: [P-002, P-003]
---

# Aviso em /projects/wh-harness: a demonstração interativa é só em inglês

## Problem
"A página só existe em português, mas o site abre em inglês: fazer uma versão EN que siga a escolha `wd-lang`" (QA-final-02).

## Strategy
Decisão do dono (2026-11-10): "O iframe é só em en, adicione isso ao site do portifolio como obs".
1. Mostrar em `/projects/wh-harness` um aviso visível, PT/EN, junto do embed e do botão de demo, dizendo que a demonstração interativa é só em inglês.
2. A tradução da página em si fica no repo wh-harness, fora desta execução.

## Locations
- `src/components/ProjectEmbed.jsx:44-60` — cabeçalho do embed (`project__embed-head`), lugar do aviso [code src/components/ProjectEmbed.jsx:44-60]
- `src/pages/ProjectDetail.jsx:115-125` — botão `demoUrl`, lugar do aviso [code src/pages/ProjectDetail.jsx:115-125]
- `src/i18n/strings.js:80-82` — `demoButton`, `embedTitle`, `embedFullscreen`; texto novo do aviso ao lado [code src/i18n/strings.js:80-82]
- `public/wh-harness/flow.html:7-9` — hoje só redireciona para a página publicada no repo wh-harness [code public/wh-harness/flow.html:7-9]
- `src/content/projects.js:22-23` (`WH_FLOW_URL`) e `:90-91` (`demoUrl`, `embedUrl` do wh-harness) — link "abrir em tela cheia" e botão de demo [code src/content/projects.js:22-23]
- `site/flow.html` no repo wh-harness — a tradução da página mora lá, fora desta execução [doc docs/features/projetos.md]

## Code references
- `ProjectEmbed` `src/components/ProjectEmbed.jsx:19` — iframe e protocolo `wh-flow:*` [code src/components/ProjectEmbed.jsx:19]

## Other references
- docs/PENDENCIAS.md § Página do fluxo do wh-harness [doc docs/PENDENCIAS.md]
- `docs/relatorios/2026-11-10-curriculo-vinculos.md` (QA-final-02, -03, -06, -10) [doc docs/relatorios/2026-11-10-curriculo-vinculos.md]
- A página do fluxo não mora mais neste repo: `public/wh-harness/flow.html` só redireciona para `https://walter-dalla.github.io/wh-harness/flow.html` (fonte em `site/flow.html` do repo wh-harness), embutida por iframe em `/projects/wh-harness` [code public/wh-harness/flow.html:7-9] [doc docs/features/projetos.md]

## Open questions
- O que fazer com a página do fluxo, que mora no repo wh-harness? → "O iframe é só em en, adicione isso ao site do portifolio como obs": aqui só um aviso visível PT/EN de que a demo é só em inglês; a tradução da página fica no repo wh-harness, fora desta execução (owner, 2026-11-10)
