---
id: P-009
status: open
created: 2026-11-10
related: [P-011, P-012, P-013]
---

# Estudo de caso: Qyon, processamento redesenhado com RabbitMQ Shovel para o cliente de volume 2×

## Problem
"Qyon: redesenho do processamento com RabbitMQ Shovel para o cliente de volume 2×." Depende de material do dono: contexto, restrições, opções consideradas, números medidos e o que pode ser dito sob NDA; o site só tem a frase do currículo.

## Strategy
1. Página nova em `src/content/projects.js`, anonimizada onde houver NDA.
2. Estrutura: contexto, restrições, opções consideradas, decisão, resultado medido e diagrama antes/depois.
3. Conteúdo a partir do material do dono (ver Open questions).

## Locations
- `src/content/projects.js` (lista `projects`) — novo projeto com `sections` próprias, como `insect-behavioral-analysis` (`:186`) [code src/content/projects.js:186]
- `src/content/experiences.js:61-62` — frase do currículo (RabbitMQ Shovel, cliente com mais que o dobro do volume) [code src/content/experiences.js:61-62]
- `public/img/projects/<slug>/` — diagrama antes/depois (SVG claro/escuro) [inferred]
- `src/App.jsx:32` — rota `projects/:slug` já serve a página [code src/App.jsx:32]

## Code references
- `findProject` `src/content/projects.js:408` — resolve o slug novo [code src/content/projects.js:408]
- `ProjectDetail` `src/pages/ProjectDetail.jsx:151` [code src/pages/ProjectDetail.jsx:151]

## Other references
- docs/PENDENCIAS.md § Estudos de caso profissionais [doc docs/PENDENCIAS.md]

## Open questions
- Como produzir o conteúdo do estudo de caso? → adiado até o dono mandar as notas (contexto, restrições, opções, números medidos, limites de NDA); fora desta execução (owner, 2026-11-10)
- Nomear as empresas ou anonimizar? → nomes das empresas como no currículo; detalhes internos anonimizados (owner, 2026-11-10)
