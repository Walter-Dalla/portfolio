---
id: P-023
status: open
created: 2026-11-11
related: []
---

# Andelph Group como cliente da minha empresa (Currículo/Contato)

## Problem
"Contratação pela minha empresa: adicionar a Andelph Group como um dos meus clientes." Hoje o texto cita só Qyon e AgileEngine.

## Strategy
1. Incluir a Andelph Group na lista de clientes de `company.text` (PT e EN).
2. Ajustar a linha do vínculo PJ em `experiences.js` ("pela qual atendi a Qyon e atendo a AgileEngine"), respeitando passado/presente.

## Locations
- `src/content/profile.js:36-37` — `company.text` { pt, en } com "Clientes: Qyon e AgileEngine (EUA)" [code src/content/profile.js:36]
- `src/content/experiences.js:16` — "pela qual atendi a Qyon e atendo a AgileEngine" [code src/content/experiences.js:16]
- `src/resume.test.jsx` — pode citar o texto da empresa [inferred]

## Code references
- `company` `src/content/profile.js:27` — dados da empresa em Currículo e Contato [code src/content/profile.js:27]

## Other references
- docs/features/contato.md, docs/features/curriculo.md [inferred]

## Open questions
- Andelph Group é cliente atual ou passado, e de qual país? → atual, Brasil; texto: "Clientes: Qyon, AgileEngine (EUA) e Andelph Group"; experiences.js: "atendo a AgileEngine e a Andelph Group" (owner, 2026-11-11)
