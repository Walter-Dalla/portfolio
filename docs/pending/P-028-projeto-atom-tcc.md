---
id: P-028
status: open
created: 2026-11-11
related: [P-027]
---

# Projeto Atom (TCC do técnico, COTIL/UNICAMP, 2019) com pouco destaque

## Problem
Cadastrar o TCC do curso técnico, "Atom", como degrau, não projeto relevante: sem `featured`, texto curto, no fim da lista. Dados do dono: requisito do certificado de técnico em informática; escopo: questionários totalmente customizáveis, enviá-los e analisar as respostas de forma simples; nota média da banca 9,5; backend Java Spring Boot, frontend React JS, MySQL. GitHub (backend; o frontend é privado): https://github.com/Walter-Dalla/Atom/. LinkedIn: https://www.linkedin.com/feed/update/urn:li:activity:6610003994779631616/. Equipe: Walter Dalla Torre Neto (gerente de projeto / dev backend e líder / dev frontend), Samuel Calegnan (dev frontend e líder), Bruno Gandolfi (dev frontend), Joao Henrique Corrêa Lima (dev backend e frontend / auxiliar), Pedro Otávio Azevedo da Róz (dev frontend / auxiliar).

## Strategy
1. Novo `simpleProject` `atom` no fim de `projects`, `featured: false`, resumo curto PT/EN, `repo` com o GitHub, link do LinkedIn, tags Java, Spring Boot, React, MySQL.
2. Usar "questionários" em PT (o glossário reserva "formulário" para o Contato) e "questionnaires" em EN.
3. Equipe: "equipe de 5 pessoas", sem nomes; só o papel do dono explícito.

## Locations
- `src/content/projects.js:44-76,~640` — `simpleProject` e fim da lista [code src/content/projects.js:44]
- `src/content/projects.js:1-30` — comentário dos campos (`featured`, `repo`, `thesisUrl`) [code src/content/projects.js:1]
- `docs/GLOSSARIO.md:14` — "formulário" reservado ao Contato [code docs/GLOSSARIO.md:14]
- `docs/features/projetos.md` — contagem/ordem de projetos, se citada [inferred]
- Testes que contam projetos (App.test.jsx, home-featured.test.jsx) [inferred]

## Code references
- `simpleProject` `src/content/projects.js:44`; `projects`; `projectCategories`

## Other references
- Relação com P-027 (minicurso, mesma instituição)

## Open questions
- Citar os nomes da equipe ou só "equipe de 5"? → "equipe de 5 pessoas", sem nomes; só o papel do dono explícito (gerente de projeto, desenvolvedor e líder do backend, desenvolvedor do frontend) (owner, 2026-11-11)
- Em qual `categories` entra, e o LinkedIn vai como link extra? Resolve pelo código.
