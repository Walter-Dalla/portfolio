---
id: P-019
status: open
created: 2026-11-10
related: []
---

# Comprovantes das conquistas (proofUrl): diploma UNESP, COTIL, certificações

## Problem
"Comprovantes: preencher os `proofUrl` em `src/content/achievements.js` (diploma UNESP, COTIL, certificações)." Depende de material do dono: os arquivos ou links dos comprovantes.

## Strategy
1. Preencher os `proofUrl`.

## Locations
- `src/content/achievements.js:16,30,39,48` — `proofUrl: null` [code src/content/achievements.js:16]
- `src/pages/Achievements.jsx:35-36,65-66` — link já aparece quando há `proofUrl` [code src/pages/Achievements.jsx:35]
- `public/` — destino dos arquivos, se forem locais [inferred]

## Code references
—

## Other references
- docs/PENDENCIAS.md § Dependem de material do dono [doc docs/PENDENCIAS.md]

## Open questions
- Fazer nesta execução? → não; fica aberto, esperando o material do dono (owner, 2026-11-10)
