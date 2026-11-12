---
aliases: [AI, Como trabalho com IA]
---

# Como trabalho com IA

Página `/ai` que reúne o que já está escrito sobre IA no site: os bullets de IA do currículo, o wh-harness e o parágrafo "feito com IA" de cada projeto. Texto próprio: o `lede` e os parágrafos do harness (`aiPage.harness`).

- Seções: (01) no trabalho, os bullets de `experiences` com `ai: true`, agrupados por vínculo (a empresa aparece uma vez, com seus bullets embaixo); (02) o harness, `summary` do wh-harness + os parágrafos de `aiPage.harness` (uso em todos os projetos atuais; arquitetura primeiro, código pela IA) — o `ai` do wh-harness fica só na página do projeto; (03) nos projetos, um cartão por projeto com `ai`, na ordem de `aiPage.order` (projeto fora da lista entra no fim).
- O `lede` é uma frase de `about.js`; um teste exige que continue contida no parágrafo de origem.

## Símbolos de entrada

`Ai` (`src/pages/Ai.jsx`), `aiPage` (`src/content/ai.js`), `projects[].ai`, `experiences[].bullets[].ai`. Rota em `App`, item `navAi` em `NAV_ITEMS`, `/ai` em `STATIC_ROUTES` e em `public/llms.txt`.

## Interações

- [projetos.md](projetos.md): lê o `ai` de cada projeto e liga para o estudo de caso.
- [curriculo.md](curriculo.md): lê os bullets com `ai: true` (o `Resume` ignora a flag; bullet com `aiOnly: true` aparece só em `/ai`, o `Position` o pula).
- [layout.md](layout.md): item "IA" / "AI" no cabeçalho e no rodapé, depois de Projetos.
- [seo.md](seo.md): `/ai` é pré-renderizada e entra no sitemap.
