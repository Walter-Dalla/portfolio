---
aliases: [Home, Página inicial]
---

# Início

Apresentação: nome, frase de efeito, botão "ver projetos" (ação principal) e botões de currículo, métricas de impacto, projetos em destaque, a chamada de arquitetura e atalhos para as outras páginas. A chamada ("Como eu desenho sistemas") traz o `lede` de `architectureIntro`, um link por sistema, que abre o projeto já na arquitetura (`architectureHref`: `/projects/<slug>#architecture`), e a miniatura decorativa do diagrama do primeiro sistema, que some abaixo de 600px. As seções abaixo da primeira tela entram com `.reveal` (animação ligada à rolagem, só onde o navegador suporta e sem "menos movimento"). No celular o retrato vira um avatar redondo acima do nome, para o nome e os botões ficarem na primeira tela (`home.css`).

## Símbolos de entrada

`Home` (`src/pages/Home.jsx`), `profile`, `metrics` (`src/content/profile.js`), `ProjectCard`.

## Interações

- [projetos.md](projetos.md): mostra os `projects` com `featured` (hoje 4: wh-harness, Nesse Capítulo, Insetos, KittyCafé), em grade 2×2 a partir de 640px e 1 coluna abaixo (`.home-projects`).
- [curriculo.md](curriculo.md): botões baixam os PDFs de `resumePdf`.
- [arquitetura.md](arquitetura.md): a chamada lista `architectureSystems`, usa o `ArchDiagram` compacto e liga para o bloco de arquitetura de cada projeto.
