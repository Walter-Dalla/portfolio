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
- `src/content/profile.js:36-37` — `company.text` { pt, en }: "Clientes: Qyon e AgileEngine (EUA)." / "Clients: Qyon and AgileEngine (USA)." [code src/content/profile.js:36]
- `src/content/experiences.js:16-17` — nota do grupo PJ, pt e en [code src/content/experiences.js:16]
- `src/resume.test.jsx:24,64` — comparam a nota do grupo por texto inteiro, pt e en; mudam junto [code src/resume.test.jsx:24]
- `public/llms.txt:5` — "Clients include BTG Pactual, Linx (Stone Group), Qyon and AgileEngine (USA)" [code public/llms.txt:5]
- Nenhum teste cita `company.text` (grep "Clientes:" / "Clients:" em `src/*.test.jsx`: vazio) [code]

## Code references
- `company` `src/content/profile.js:27` — lido por `Resume` (`src/pages/Resume.jsx:255`) e `Contact` (`src/pages/Contact.jsx:54`; Contato mostra só nome e CNPJ) [code src/pages/Contact.jsx:54]
- GoPrint já tem `client: 'Andelph Group'` [code src/content/projects.js:218]

## Other references
- docs/features/contato.md, docs/features/curriculo.md [inferred]

## Open questions
- Andelph Group é cliente atual ou passado, e de qual país? → atual, Brasil; texto: "Clientes: Qyon, AgileEngine (EUA) e Andelph Group"; experiences.js: "atendo a AgileEngine e a Andelph Group" (owner, 2026-11-11)
