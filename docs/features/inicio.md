---
aliases: [Home, Página inicial]
---

# Início

Apresentação: nome, frase de efeito, disponibilidade (`profile.availability`; `null` esconde a linha), botão "ver projetos" (ação principal), botão secundário "fale comigo →" para Contato e um botão de currículo (o PDF do idioma atual; o do outro idioma fica em `/resume`); abaixo do hero, a faixa "Onde atuei" (`workedAt`, só nomes, sem links), depois métricas de impacto (a primeira é o P95 do antifraude do PIX, com `value` `{ pt, en }` e `long: true`, que dá a fonte menor `.metric__value--long`; a terceira, "6 projetos … IA coding", é o número de projetos com `ai`, contando `projects` e `unlistedProjects`, amarrado por `home-metrics.test.jsx`), projetos em destaque, a chamada de arquitetura, atalhos para Currículo, Sobre e Contato e, por último, o cartão de contato da empresa PJ (`.home-company`, só com `company`: e-mail com `CopyButton`, LinkedIn, GitHub). Faixa "Onde atuei": BTG Pactual, Linx (Grupo Stone), AgileEngine, Qyon (um nome é texto ou `{ pt, en }`). A chamada ("Como eu desenho sistemas") traz o `lede` de `architectureIntro`, um link por sistema, que abre o projeto já na arquitetura (`architectureHref`: `/projects/<slug>#architecture`), e a miniatura decorativa do diagrama do primeiro sistema, que some abaixo de 600px. As seções abaixo da primeira tela entram com `.reveal` (animação ligada à rolagem, só onde o navegador suporta e sem "menos movimento"). Sem `profile.photo` não há bloco de retrato (`hero__aside`): o local (`hero__location`) fica no texto do hero, logo acima da disponibilidade. Com foto, o retrato volta ao lado e, no celular, vira um avatar redondo acima do nome, para o nome e os botões ficarem na primeira tela (`home.css`).

## Símbolos de entrada

`Home` (`src/pages/Home.jsx`), `profile`, `workedAt`, `metrics` (`src/content/profile.js`), `ProjectCard`.

## Interações

- [projetos.md](projetos.md): mostra os `projects` com `featured` (hoje 4, na ordem da lista: wh-harness, GoPrint, Nesse Capítulo, Insetos), em grade 2×2 a partir de 640px e 1 coluna abaixo (`.home-projects`).
- [curriculo.md](curriculo.md): o botão do hero baixa o PDF de `resumePdf` no idioma atual.
- [arquitetura.md](arquitetura.md): a chamada lista `architectureSystems`, usa o `ArchDiagram` compacto e liga para o bloco de arquitetura de cada projeto.
- [contato.md](contato.md): botão "fale comigo →" leva a `/contact`; a mesma frase de `profile.availability` aparece nas duas páginas.
