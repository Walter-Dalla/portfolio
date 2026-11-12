---
id: P-027
status: open
created: 2026-11-11
related: [P-028]
---

# Minicurso de Spring Boot ministrado no COTIL/UNICAMP (2019)

## Problem
O dono ministrou um minicurso de Spring Boot no COTIL (Colégio Técnico de Limeira, UNICAMP), ano 2019 (a confirmar). LinkedIn: https://lnkd.in/p/dy86hb59. Descrição do dono: "Nessa ultima sexta eu tive o prazer inenarrável de ministrar um minicurso de Spring Boot no COTIL - Colégio Técnico de Limeira, com 12 participantes entre eles a minha professora Tania Basso, idealizadora do projeto." Reescrever na voz do site (PT/EN), sem "nessa última sexta". Pedido: "adicionar ao projeto".

## Strategy
1. Escrever texto curto PT/EN: minicurso de Spring Boot, COTIL, 12 participantes, entre eles a professora Tania Basso, idealizadora do projeto.
2. Cadastrar no lugar decidido pelo dono (ver perguntas), com o link do LinkedIn.

## Locations
- `src/content/achievements.js:27-51` — lista de conquistas (`label`, `title`, `text`, `proofUrl`) [code src/content/achievements.js:28]
- `src/content/projects.js` — alternativa: `simpleProject` (linha 44-76) [code src/content/projects.js:44]
- `docs/features/sobre.md` ou `projetos.md` — doc da feature escolhida [inferred]

## Code references
- `achievements` `src/content/achievements.js:15`; `simpleProject` `src/content/projects.js:44`

## Other references
- docs/pending/P-019 (comprovantes das conquistas, `proofUrl`)

## Open questions
- Entra como conquista ou como projeto? → conquista em src/content/achievements.js, com o post do LinkedIn como `proofUrl` (owner, 2026-11-11)
- O ano é mesmo 2019? → confirmado (owner, 2026-11-11)
- Citar a professora Tania Basso pelo nome? → sim: "…entre eles a minha professora Tania Basso, idealizadora do projeto" (owner, 2026-11-11)
