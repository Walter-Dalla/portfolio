---
id: P-021
status: open
created: 2026-11-11
related: [P-005]
---

# Alternativa descartada e trade-off dos cartões de decisão (KittyCafé e Cartas Malfaladas)

## Problem
Os 7 cartões de "Decisões de arquitetura" (P-005) saíram só com decisão e consequência, porque o texto `about` não traz a alternativa descartada (só 1 de 7) nem o trade-off (nenhum). Decisão do dono em 2026-11-10: os campos ficam opcionais e vazios até ele escrever os textos. Depende de material do dono.

## Strategy
1. O dono escreve, para cada cartão, `alternative` e `tradeoff` em `{ pt, en }`.
2. Preencher em `decisions` de cada projeto; o cartão mostra os campos quando preenchidos, sem mudança de código.

## Locations
- `src/content/projects.js:512` — `decisions` da Cartas Malfaladas [code src/content/projects.js:512]
- `src/content/projects.js:591` — `decisions` do KittyCafé [code src/content/projects.js:591]

## Code references
- `Decisions` `src/components/Decisions.jsx` [code src/components/Decisions.jsx]

## Other references
- docs/relatorios/2026-11-11-pendencias.md [doc]

## Open questions
—
