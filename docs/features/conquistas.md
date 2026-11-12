---
aliases: [Achievements]
---

# Conquistas

Adoção do software pela UNICAMP em destaque (título leva ao projeto) e cartões de formação e certificações, com link de comprovante quando houver (`proofUrl`; `proofKind: 'post'` troca o rótulo para "ver publicação ↗" / "see post ↗", ex.: o minicurso de Spring Boot no COTIL, 2019). Cartão com `projectSlug` ganha `card--link` e o link "sobre o projeto →" (o técnico do COTIL leva a `/projects/atom`). As certificações vêm de `certifications` (`src/content/experiences.js`). Cartão sem `photo` mostra `mark` (sigla curta) numa faixa baixa, nunca o texto repetido.

## Símbolos de entrada

`Achievements` (`src/pages/Achievements.jsx`), `featuredAchievement`, `achievements` (`src/content/achievements.js`), `Media`.

## Interações

- [projetos.md](projetos.md): `featuredAchievement.projectSlug` abre o projeto; `achievements[].projectSlug` também (o Atom, projeto fora da lista).
