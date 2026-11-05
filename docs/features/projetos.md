---
aliases: [Projects, Estudo de caso]
---

# Projetos e estudo de caso

Lista filtrável de projetos e uma página por projeto com estudo de caso, ficha e links.

## Símbolos de entrada

`Projects`, `ProjectDetail` (`src/pages/`), `ProjectCard`, `projects`, `projectCategories`, `simpleProject`, `findProject` (`src/content/projects.js`). `simpleProject` monta o card de um projeto ainda sem estudo de caso completo, com a seção opcional "Como foi feito com IA" (`ai`). `thesisUrl` (opcional) vira o botão do TCC na ficha. Slugs em inglês; slug renomeado entra em `LEGACY_PROJECT_SLUGS` (`src/App.jsx`).

## Interações

- [inicio.md](inicio.md): os destaques usam `ProjectCard` compacto.
- [conquistas.md](conquistas.md): a patente aponta para o estudo de caso.
