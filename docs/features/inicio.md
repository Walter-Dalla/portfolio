---
aliases: [Home, Página inicial]
---

# Início

Apresentação: nome, frase de efeito, disponibilidade (`profile.availability`; `null` esconde a linha), botão "ver projetos" (ação principal), botão secundário "fale comigo →" para Contato e botões de currículo; abaixo do hero, a faixa "Onde atuei" (`workedAt`, só nomes, sem links), depois métricas de impacto (a segunda, "6 projetos … IA coding", é o número de `projects` com `ai`, amarrado por `home-metrics.test.jsx`), projetos em destaque, a chamada de arquitetura, atalhos para as outras páginas e, por último, o cartão de contato da empresa PJ (`.home-company`, só com `company`: e-mail com `CopyButton`, LinkedIn, GitHub). Faixa "Onde atuei": BTG Pactual, Linx & Stone, AgileEngine, Act Digital. A chamada ("Como eu desenho sistemas") traz o `lede` de `architectureIntro`, um link por sistema, que abre o projeto já na arquitetura (`architectureHref`: `/projects/<slug>#architecture`), e a miniatura decorativa do diagrama do primeiro sistema, que some abaixo de 600px. As seções abaixo da primeira tela entram com `.reveal` (animação ligada à rolagem, só onde o navegador suporta e sem "menos movimento"). No celular o retrato vira um avatar redondo acima do nome, para o nome e os botões ficarem na primeira tela (`home.css`).

## Símbolos de entrada

`Home` (`src/pages/Home.jsx`), `profile`, `workedAt`, `metrics` (`src/content/profile.js`), `ProjectCard`.

## Interações

- [projetos.md](projetos.md): mostra os `projects` com `featured` (hoje 4, na ordem da lista: wh-harness, GoPrint, Nesse Capítulo, Insetos), em grade 2×2 a partir de 640px e 1 coluna abaixo (`.home-projects`).
- [curriculo.md](curriculo.md): botões baixam os PDFs de `resumePdf`.
- [arquitetura.md](arquitetura.md): a chamada lista `architectureSystems`, usa o `ArchDiagram` compacto e liga para o bloco de arquitetura de cada projeto.
- [contato.md](contato.md): botão "fale comigo →" leva a `/contact`; a mesma frase de `profile.availability` aparece nas duas páginas.
