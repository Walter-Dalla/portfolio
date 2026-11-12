---
aliases: [Home, Página inicial]
---

# Início

Apresentação: nome, frase de efeito, disponibilidade (`profile.availability`; `null` esconde a linha), botão "ver projetos" (ação principal), botão secundário "fale comigo →" para Contato e botões de currículo; abaixo do hero, a faixa "Onde atuei" (`workedAt`, só nomes, sem links), depois métricas de impacto, projetos em destaque e atalhos para as outras páginas. No celular o retrato vira um avatar redondo acima do nome, para o nome e os botões ficarem na primeira tela (`home.css`).

## Símbolos de entrada

`Home` (`src/pages/Home.jsx`), `profile`, `workedAt`, `metrics` (`src/content/profile.js`), `ProjectCard`.

## Interações

- [projetos.md](projetos.md): mostra os `projects` com `featured` (hoje 4: wh-harness, Nesse Capítulo, Insetos, KittyCafé), em grade 2×2 a partir de 640px e 1 coluna abaixo (`.home-projects`).
- [curriculo.md](curriculo.md): botões baixam os PDFs de `resumePdf`.
- [contato.md](contato.md): botão "fale comigo →" leva a `/contact`; a mesma frase de `profile.availability` aparece nas duas páginas.
