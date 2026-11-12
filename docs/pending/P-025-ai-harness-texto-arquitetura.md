---
id: P-025
status: open
created: 2026-11-11
related: []
---

# /ai: texto do wh-harness com o uso em todos os projetos e o foco em arquitetura

## Problem
O bloco do wh-harness deve dizer melhor que uso o harness em todos os meus projetos atuais, inclusive neste portfólio que o visitante está vendo. Reforçar que primeiro faço a arquitetura do projeto e só depois ponho a IA para executar o código; meu foco é arquitetar: qual banco de dados, qual comunicação, estrutura geral do código, quais os principais testes. Escrever o código fica com a IA.

## Strategy
1. Reescrever o texto do bloco (hoje `harness.summary` + `harness.ai`), no tom do site, PT e EN.
2. Fazer em `aiPage` (novo campo) ou em `harness.ai`, sem duplicar o que aparece na página do projeto.

## Locations
- `src/pages/Ai.jsx:57-66` — bloco do wh-harness: `summary` e `ai` [code src/pages/Ai.jsx:57]
- `src/content/projects.js:96-107` — `summary`, `about` e `ai` do wh-harness [code src/content/projects.js:96]
- `src/content/ai.js` — textos da página /ai (`aiPage`) [code src/content/ai.js:2]
- `src/ai-page.test.jsx` — pode depender dos textos [inferred]

## Code references
- `aiPage` `src/content/ai.js` — conteúdo da página
- `findProject` `src/content/projects.js` — usado em Ai.jsx:28

## Other references
- docs/features/ia.md

## Open questions
- Os projetos atuais a nomear (KittyCafé, GoPrint, Nesse Capítulo e este portfólio, como em `brief.result`) ficam como estão? Resolve pelo código.
