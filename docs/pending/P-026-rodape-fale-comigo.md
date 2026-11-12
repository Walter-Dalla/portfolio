---
id: P-026
status: open
created: 2026-11-11
related: []
---

# Rodapé: bloco "Fale comigo" com o contato escrito por extenso

## Problem
O contato no rodapé é só rótulos cinza "e-mail · linkedin · github" misturados com o ©; não fica claro.

## Strategy
1. No topo do rodapé, bloco "Fale comigo" / "Get in touch" com o e-mail, `in/walter-dalla` e `Walter-Dalla` escritos por extenso (dados de `profile`), botão de copiar ao lado do e-mail.
2. Abaixo, a navegação e o ©.
3. Textos de interface em `src/i18n/strings.js`; estilos em `layout.css`.

## Locations
- `src/components/Footer.jsx:11-40` — hoje: nav, ©, links com rótulos [code src/components/Footer.jsx:11]
- `src/components/layout.css:194-232` — `.site-footer*` [code src/components/layout.css:194]
- `src/i18n/strings.js` — novas strings do título do bloco (`email`, `copyEmail` já existem) [code src/components/Footer.jsx:23]
- `src/content/profile.js` — `email`, `linkedin`, `github` (URLs; o texto por extenso sai delas ou de campo novo) [code src/components/Footer.jsx:22-31]
- `docs/features/layout.md` — descreve o rodapé [doc]

## Code references
- `Footer` `src/components/Footer.jsx:7`; `CopyButton` `src/components/CopyButton.jsx`; `profile`; `NAV_ITEMS` `src/components/nav.js`

## Other references
- Testes que dependem do rodapé (App.test.jsx, resume.test.jsx) [inferred]

## Open questions
- Derivar "in/walter-dalla" e "Walter-Dalla" das URLs de `profile` ou criar campos de exibição? Resolve pelo código.
