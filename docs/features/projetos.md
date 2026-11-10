---
aliases: [Projects, Estudo de caso]
---

# Projetos e estudo de caso

Lista filtrável de projetos e uma página por projeto com estudo de caso, ficha e links.

- O filtro vive na URL (`/projects?cat=<id>`), lido ao abrir e gravado com `replace`; ids inválidos caem em "todos".
- `ProjectCard` é clicável inteiro (capa e título levam ao estudo de caso; `card--link` dá o hover). Sem `cover`, mostra uma faixa baixa com o caminho em vez do bloco vazio.
- `ProjectDetail`: sem `cover` não há bloco de capa; a capa carrega com prioridade (`Media priority`); a ficha acompanha a rolagem no desktop; a galeria abre no `Lightbox`; o rodapé do texto tem "anterior", "todos" e "próximo".

## Símbolos de entrada

`Projects`, `ProjectDetail` (`src/pages/`), `ProjectCard`, `ProjectEmbed`, `projects`, `projectCategories`, `simpleProject`, `findProject` (`src/content/projects.js`). `simpleProject` monta o card de um projeto ainda sem estudo de caso completo, com a seção opcional "Como foi feito com IA" (`ai`). `cover` e `gallery` (também em `simpleProject`) apontam para `public/img/projects/<slug>/`: capturas reais do projeto rodando com dados fictícios. `thesisUrl` (opcional) vira o botão do TCC na ficha. `demoUrl` (opcional, também em `simpleProject`) vira o botão "Ver a demonstração interativa" (`demoButton`); URL externa abre em nova aba. `embedUrl` (opcional) embute uma página de outra origem por `ProjectEmbed` (`src/components/ProjectEmbed.jsx`), numa seção larga abaixo do texto e da ficha: `?embed=1&theme=` no `src`, `postMessage` `wh-flow:theme` na troca de tema e `wh-flow:height` vindo da página (só da origem do `embedUrl`). O fluxo do wh-harness mora no repo dele (`site/flow.html`, GitHub Pages); `public/wh-harness/flow.html` só redireciona para lá. `client` (opcional em `simpleProject`) vira a linha "cliente" da ficha. Slugs em inglês; slug renomeado entra em `LEGACY_PROJECT_SLUGS` (`src/App.jsx`).

## Interações

- [inicio.md](inicio.md): os destaques usam `ProjectCard` compacto.
- [conquistas.md](conquistas.md): a conquista em destaque aponta para o estudo de caso.
