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
- `src/components/Media.jsx` — imagem via `<img>` não herda o tema; SVG inline ou componente pode ser preciso [inferred]

## Code references
- `Media` `src/components/Media.jsx` [inferred]
- `useTheme` `src/theme/` [doc CLAUDE.md]

## Other references
- docs/PENDENCIAS.md § Diagramas e processo [doc docs/PENDENCIAS.md]
- `docs/features/projetos.md` (`cover`) [doc docs/features/projetos.md]

## Open questions
- Desenho do diagrama a partir só do texto `about` atual; detalhes não ditos lá (ex.: rede interna do Homelab) ficam fora até o dono confirmar.
- O diagrama do Homelab também serve de `cover`? → sim (owner, 2026-11-10)
