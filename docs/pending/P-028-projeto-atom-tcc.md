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
- `src/content/projects.js:36-86` — `simpleProject` (status padrão "Em desenvolvimento"; sem `role` nem links) [code src/content/projects.js:36]
- `src/content/projects.js:644` — fim da lista `projects` (depois do KittyCafé) [code src/content/projects.js:644]
- `src/content/projects.js:1-17` — comentário dos campos [code src/content/projects.js:1]
- `src/pages/ProjectDetail.jsx:37,53-61` — `links` de uma seção já são desenhados (abrem em nova aba) [code src/pages/ProjectDetail.jsx:53]
- `docs/GLOSSARIO.md:14` — "formulário" reservado ao Contato [doc docs/GLOSSARIO.md]
- `src/brief.test.jsx:9-25` — todo projeto precisa de `brief.action`; listas fixas de quem não tem `problem`/`result` [code src/brief.test.jsx:10]
- Testes que contam projetos usam `projects.length` (App.test.jsx:78,84,302; project-diagram.test.jsx:54) e não quebram; `src/home-featured.test.jsx:10` fixa os 4 destaques [code]
- `https://github.com/Walter-Dalla/Atom` responde 200 (público) [medido com curl -I, 2026-11-11]

## Code references
- `simpleProject` `src/content/projects.js:36`; `projects` `src/content/projects.js:88`; `projectCategories` `src/content/projects.js:19` (ids: research, dotnet, databases, ai, web, games, infra) [code]

## Other references
- Relação com P-027 (minicurso, mesma instituição)

## Open questions
- Citar os nomes da equipe ou só "equipe de 5"? → "equipe de 5 pessoas", sem nomes; só o papel do dono explícito (gerente de projeto, desenvolvedor e líder do backend, desenvolvedor do frontend) (owner, 2026-11-11)
- Em qual `categories` entra, e o LinkedIn vai como link extra? Resolve pelo código.
