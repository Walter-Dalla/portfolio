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
- `src/pages/Ai.jsx:59-68` — bloco do wh-harness: `harness.summary` (62) e `harness.ai` (63) [code src/pages/Ai.jsx:62]
- `src/content/projects.js:96-107` — `summary`, `about` e `ai` do wh-harness; não mudam [code src/content/projects.js:96]
- `src/content/ai.js:1-11` — `aiPage` (`lede`, `order`) e o comentário "sem cópia"; ganha o campo novo [code src/content/ai.js:5]
- `src/ai-page.test.jsx:43-48` — exige `harness.summary.pt` e `harness.ai.pt` em /ai; muda junto [code src/ai-page.test.jsx:43]
- `docs/features/ia.md` — diz "Não tem texto próprio além do `lede`" [doc docs/features/ia.md]

## Code references
- `aiPage` `src/content/ai.js:5` — conteúdo da página [code src/content/ai.js:5]
- `findProject` `src/content/projects.js:646` — usado em `src/pages/Ai.jsx:32` [code src/pages/Ai.jsx:32]

## Other references
- docs/features/ia.md

## Open questions
- Os projetos atuais a nomear (KittyCafé, GoPrint, Nesse Capítulo e este portfólio, como em `brief.result`) ficam como estão? Resolve pelo código. → sim, os quatro de `about`/`brief.result` [code src/content/projects.js:101,122] (enricher, 2026-11-11)
- O texto novo substitui o parágrafo `harness.ai` em /ai ou entra além dele? (texto proposto em [doc .impl/ajustes-sessao/ANALYSIS.md])
