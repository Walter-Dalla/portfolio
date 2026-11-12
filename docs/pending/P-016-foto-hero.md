---
id: P-016
status: open
created: 2026-11-10
related: []
---

# Foto do hero (profile.photo)

## Problem
"Foto do hero: preencher `profile.photo` (retrato 4:5 em `public/img/`)." Depende de material do dono: o retrato 4:5.

## Strategy
1. Pôr o retrato em `public/img/`.
2. Preencher `profile.photo`.

## Locations
- `src/content/profile.js:12-13` — `photo: null` [code src/content/profile.js:13]
- `src/pages/Home.jsx:64-71` — `Media` do hero já usa `profile.photo` (sem foto, mostra "WD") [code src/pages/Home.jsx:64-71]
- `src/pages/home.css:56-67,100-107` — `.hero__photo` [code src/pages/home.css:56]
- `public/img/` — destino do arquivo [code public/img]

## Code references
- `profile` `src/content/profile.js:3` [code src/content/profile.js:3]

## Other references
- docs/PENDENCIAS.md § Dependem de material do dono [doc docs/PENDENCIAS.md]

## Open questions
- Fazer nesta execução? → não; fica aberto, esperando o material do dono (owner, 2026-11-10)
