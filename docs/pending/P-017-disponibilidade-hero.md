---
id: P-017
status: open
created: 2026-11-10
related: []
---

# Disponibilidade preenchida e chamada para contato visível no hero

## Problem
"Disponibilidade: preencher `profile.availability` (ex.: aberto a propostas · remoto · PJ/CLT) e deixar a chamada para contato visível no hero." Depende de material do dono: o texto da disponibilidade.

## Strategy
1. Preencher `profile.availability`.
2. Chamada para contato visível no hero.

## Locations
- `src/content/profile.js:22-23` — `availability: null` [code src/content/profile.js:23]
- `src/pages/Contact.jsx:14,21` — hoje só Contato mostra a disponibilidade [code src/pages/Contact.jsx:14]
- `src/pages/Home.jsx:28-62` — hero (`btn-row` em `:34`, links sociais em `:51`) [code src/pages/Home.jsx:28-62]
- `src/i18n/strings.js` — rótulo da chamada [inferred]

## Code references
- `Home` `src/pages/Home.jsx:20` [code src/pages/Home.jsx:20]
- `Contact` `src/pages/Contact.jsx` [code src/pages/Contact.jsx:14]

## Other references
- docs/PENDENCIAS.md § Dependem de material do dono [doc docs/PENDENCIAS.md]

## Open questions
- Fazer nesta execução? → não; fica aberto, esperando o material do dono (owner, 2026-11-10)
