---
aliases: [Home, Página inicial]
---

# Início

Apresentação: nome, frase de efeito, botão "ver projetos" (ação principal) e botões de currículo, métricas de impacto, projetos em destaque e atalhos para as outras páginas. No celular o retrato vira um avatar redondo acima do nome, para o nome e os botões ficarem na primeira tela (`home.css`).

## Símbolos de entrada

`Home` (`src/pages/Home.jsx`), `profile`, `metrics` (`src/content/profile.js`), `ProjectCard`.

## Interações

- [projetos.md](projetos.md): mostra os `projects` com `featured` (hoje 4: wh-harness, Nesse Capítulo, Insetos, KittyCafé), em grade 2×2 a partir de 640px e 1 coluna abaixo (`.home-projects`).
- [curriculo.md](curriculo.md): botões baixam os PDFs de `resumePdf`.
