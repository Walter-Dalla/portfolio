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
- `src/content/achievements.js:20-51` — lista `achievements` (`label`, `title`, `text`, `photo`, `mark`, `proofUrl`, `proofKind`); entra depois do cartão do técnico (33-41) [code src/content/achievements.js:20]
- `src/pages/Achievements.jsx:8,50-72` — `PROOF_LABEL` e o cartão; `proofUrl` vira link e `card--link` (nenhum cartão tem `proofUrl` hoje) [code src/pages/Achievements.jsx:65]
- `src/i18n/strings.js:134-135` — `seeProof`, `seeDiploma` [code src/i18n/strings.js:134]
- `docs/features/conquistas.md` — doc da feature [doc docs/features/conquistas.md]
- `https://lnkd.in/p/dy86hb59` redireciona (301) para `https://www.linkedin.com/posts/walter-dalla_nessa-ultima-sexta-eu-tive-o-prazer-inenarr%C3%A1vel-share-6584492874379874304-sEfv/` com parâmetros de rastreio [medido com curl -I, 2026-11-11]

## Code references
- `achievements` `src/content/achievements.js:20`; `featuredAchievement` `src/content/achievements.js:5`; `Achievements` `src/pages/Achievements.jsx:10` [code]

## Other references
- docs/pending/P-019 (comprovantes das conquistas, `proofUrl`)

## Open questions
- Entra como conquista ou como projeto? → conquista em src/content/achievements.js, com o post do LinkedIn como `proofUrl` (owner, 2026-11-11)
- O ano é mesmo 2019? → confirmado (owner, 2026-11-11)
- Citar a professora Tania Basso pelo nome? → sim: "…entre eles a minha professora Tania Basso, idealizadora do projeto" (owner, 2026-11-11)
