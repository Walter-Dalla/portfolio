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
- `src/components/Footer.jsx:11-38` — hoje: nav (13-19), linha com © (21-23) e links com rótulos "e-mail", "linkedin", "github" (24-35) [code src/components/Footer.jsx:11]
- `src/components/layout.css:194-237` — `.site-footer`, `__inner`, `__nav`, `__row`, `__links`, `__copy` [code src/components/layout.css:194]
- `src/i18n/strings.js:6,16,17,22` — `footerNavLabel`, `footerRights`, `email`, `copyEmail` existem; falta o título do bloco [code src/i18n/strings.js:17]
- `src/content/profile.js:5-9` — `email`, `linkedin`, `linkedinHandle` ('in/walter-dalla'), `github`, `githubHandle` ('Walter-Dalla') já existem [code src/content/profile.js:7]
- `src/App.test.jsx:223-227,346-353`, `src/ai-route.test.jsx:30-34` — testes que leem o rodapé (nav "Rodapé", primeiro botão "Copiar e-mail" em /contact) [code src/App.test.jsx:350]
- `docs/features/layout.md` — descreve o rodapé [doc docs/features/layout.md]

## Code references
- `Footer` `src/components/Footer.jsx:7`; `CopyButton` `src/components/CopyButton.jsx:7`; `profile` `src/content/profile.js:3`; `NAV_ITEMS` `src/components/nav.js:2` [code]
- `Contact` já mostra os mesmos `linkedinHandle`/`githubHandle` [code src/pages/Contact.jsx:42]

## Other references
- Testes que dependem do rodapé (App.test.jsx, resume.test.jsx) [inferred]

## Open questions
- Derivar "in/walter-dalla" e "Walter-Dalla" das URLs de `profile` ou criar campos de exibição? Resolve pelo código. → nenhum dos dois: `profile.linkedinHandle` e `profile.githubHandle` já existem [code src/content/profile.js:7,9] (enricher, 2026-11-11)
