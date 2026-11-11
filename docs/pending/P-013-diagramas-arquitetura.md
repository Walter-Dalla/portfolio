---
id: P-013
status: open
created: 2026-11-10
related: [P-005, P-008]
---

# Diagrama de arquitetura em SVG (tema claro/escuro) por projeto, começando por Homelab, KittyCafé e Cartas Malfaladas

## Problem
"Diagrama de arquitetura por projeto, em SVG com tema claro/escuro (componentes e fluxo de dados). Começar por Homelab (rede e túnel; também serve de capa, hoje sem `cover`), KittyCafé e Cartas Malfaladas."

## Strategy
1. SVG por projeto com componentes e fluxo de dados, seguindo o tema claro/escuro.
2. Começar por Homelab (rede e túnel; também capa), KittyCafé e Cartas Malfaladas.

## Locations
- `src/content/projects.js:314-329` — Homelab, sem `cover`; `about` descreve rede, Cloudflare Tunnel, Komodo, Zot, Trivy [code src/content/projects.js:314-329]
- `src/content/projects.js:330-364` — Cartas Malfaladas (NestJS + Socket.IO, SQLite, Capacitor, pacote de contratos) [code src/content/projects.js:330-331]
- `src/content/projects.js:365-408` — KittyCafé [code src/content/projects.js:365-366]
- `src/styles/global.css` — tokens de cor do tema para o SVG seguir claro/escuro [doc CLAUDE.md]
- `src/pages/ProjectDetail.jsx:50-66` — capa e corpo, onde o diagrama aparece [code src/pages/ProjectDetail.jsx:50-66]
- `src/components/Media.jsx:12-20` — só desenha `<img>`, que não herda as variáveis CSS do tema: o diagrama é SVG inline num componente novo [code src/components/Media.jsx:12-20]
- `src/styles/global.css:3-31` — tokens `--surface`, `--border`, `--strong`, `--text`, `--muted`, `--accent` trocam com `data-theme` [code src/styles/global.css:3-31]
- `src/components/ProjectCard.jsx:24-28` — faixa "sem capa ainda" do Homelab dá lugar à miniatura do diagrama [code src/components/ProjectCard.jsx:24-28]
- `src/App.test.jsx:291-295` — teste do projeto sem capa usa o Homelab e espera `.project__cover` nulo [code src/App.test.jsx:291-295]
- `src/seo.js:60` e `src/seo.test.jsx:21` — `og:image` usa `cover ?? og.png` e o teste exige `/img/` ou `og.png`: o `cover` do Homelab continua `null` [code src/seo.js:60]

## Code references
- `Media` `src/components/Media.jsx:9` [code src/components/Media.jsx:9]
- `useTheme` `src/theme/context.js:5` — não é preciso: as cores vêm das variáveis CSS [code src/theme/context.js:5]

## Other references
- docs/PENDENCIAS.md § Diagramas e processo [doc docs/PENDENCIAS.md]
- `docs/features/projetos.md` (`cover`) [doc docs/features/projetos.md]

## Open questions
- Desenho do diagrama a partir só do texto `about` atual; detalhes não ditos lá (ex.: rede interna do Homelab) ficam fora até o dono confirmar. → vale a regra de conteúdo desta execução: só o que o `about` diz; ligação não dita (AdMob, Play Billing, login Google, MCP do KittyCafé) fica fora (enricher, 2026-11-10)
- O diagrama do Homelab também serve de `cover`? → sim (owner, 2026-11-10)
