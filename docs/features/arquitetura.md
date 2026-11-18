---
aliases: [Architecture, Explorador de arquitetura, Stack por camada, Bloco de arquitetura]
---

# Arquitetura

A arquitetura de cada sistema fica dentro da página do próprio projeto: o diagrama interativo, a stack por camada e as decisões. Não há página nem item de navegação "Arquitetura"; o Início tem uma chamada que leva à arquitetura de cada projeto.

- **Onde aparece** (`ProjectDetail`): projeto com `cover` e diagrama ganha o bloco "Arquitetura" (`id="architecture"`), na largura toda do container, abaixo do texto e da ficha: explorador, stack por camada e decisões. Projeto sem `cover` (Homelab) mostra o explorador no lugar da capa, com a mesma âncora, e a stack e as decisões como seções do texto.
- **Sistemas** (`architectureSystems`): todo projeto de `projects` que tem diagrama, na ordem de `architectureIntro.order`; projeto com diagrama fora da ordem entra no fim. É a lista da chamada do Início; cada link é `architectureHref(slug)` (`/projects/<slug>#architecture`).
- **Explorador** (`ArchExplorer`): o `ArchDiagram` em modo interativo e o painel do nó. Cada nó é um botão (clique, Enter ou espaço); o escolhido, as linhas que o tocam (tracejado em movimento) e os vizinhos ganham destaque, e as outras linhas esmaecem. O painel mostra a camada (`diagramLayers`), a posição (`03 / 06`), o `detail`, as tags de `tech`, os vizinhos (botões) e duas setas que percorrem os nós na ordem de `nodes`, dando a volta. Abre no nó de `defaultNodeId` (`focus`; sem ele, o primeiro da camada `app`). Trocar de projeto volta o explorador ao nó padrão.
- **Layout**: com `side` (bloco "Arquitetura" e capa do projeto), o painel fica ao lado do diagrama quando a raiz do site tem 1190px ou mais; abaixo disso fica embaixo. Abaixo de ~700px o diagrama rola na horizontal dentro da moldura e o nó escolhido vem para o centro (só a moldura rola, nunca a página). Quando o diagrama não cabe na moldura, o `ArchDiagram` interativo marca `data-overflow` em `.arch-diagram__scroll` (na montagem e no `resize`) e o explorador mostra o aviso "arraste para o lado para ver o resto" (`archScrollHint`).
- **Stack por camada** (`StackList`, `projects[].stack`) e **decisões** (`Decisions`) vêm do projeto; bloco vazio não aparece. No bloco "Arquitetura" as decisões fecham em duas colunas largas.
- **Dados do diagrama** (`src/content/diagrams.js`): cada nó tem `layer`, `detail` e `tech`; nó da camada `external` ganha contorno tracejado; aresta com `bend: 'v'` sai por cima ou por baixo do nó e entra no alvo pelo lado.

## Invariantes

- Texto de portfólio: componentes, tecnologias e decisões. Não entram endereço de rede, porta, nome de máquina, segredo, limite interno, dívida nem problema conhecido (o teste "nada sensível nos textos" barra os primeiros).
- O diagrama desenha só o que o projeto (`about`, `stack`, `decisions`) ou o `detail` do nó dizem.
- Nenhuma linha passa por cima de um nó, e os textos cabem no nó (label até 19 caracteres, sub até 24): há teste para os dois.
- Quem pediu menos movimento não vê animação: as linhas ativas ficam paradas e os blocos `.reveal` aparecem direto.
- Todo sistema da chamada do Início tem o elemento `#architecture` na página do projeto (há teste por sistema).

## Símbolos de entrada

`ProjectDetail` (`src/pages/ProjectDetail.jsx`), `architectureIntro`, `architectureSystems`, `ARCHITECTURE_ID`, `architectureHref` (`src/content/architecture.js`), `ArchExplorer`, `StackList`, `Decisions`, `ArchDiagram`, `edgePoints`, `nodeBox` (`src/components/`), `diagrams`, `diagramLayers`, `defaultNodeId` (`src/content/diagrams.js`).

## Interações

- [projetos.md](projetos.md): a página do projeto monta o bloco com o diagrama, a `stack` e as `decisions` do projeto.
- [inicio.md](inicio.md): a seção "Como eu desenho sistemas" lista os sistemas e abre cada projeto já na arquitetura.
- [layout.md](layout.md): `useScrollRestoration` rola até a âncora `#architecture` ao chegar por um link.
- [seo.md](seo.md): a arquitetura sai pré-renderizada dentro da página de cada projeto.
- [tema-idioma.md](tema-idioma.md): diagrama e painel usam só tokens de cor e textos `{ pt, en }`.
