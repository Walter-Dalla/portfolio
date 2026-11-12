---
aliases: [Projects, Estudo de caso]
---

# Projetos e estudo de caso

Lista filtrável de projetos e uma página por projeto com estudo de caso, ficha e links.

- O filtro vive na URL (`/projects?cat=<id>`), lido ao abrir e gravado com `replace`; ids inválidos caem em "todos".
- `ProjectCard` é clicável inteiro (capa e título levam ao estudo de caso; `card--link` dá o hover). Sem `cover`, mostra uma faixa baixa com o caminho em vez do bloco vazio.
- `ProjectDetail`: sem `cover` não há bloco de capa; a capa carrega com prioridade (`Media priority`); a ficha acompanha a rolagem no desktop; a galeria abre no `Lightbox`; o rodapé do texto tem "anterior", "todos" e "próximo".
- Ordem da página: intro (com o botão "Ver demo" e o aviso `demoNote`) → capa (ou o diagrama, no projeto sem `cover`) → resumo `brief` → corpo com seções numeradas por posição (texto → "Arquitetura" → decisões → galeria) e ficha ao lado → embed largo.
- Diagramas de arquitetura: dados em `src/content/diagrams.js` (`diagrams`, `findDiagram`), desenhados por `ArchDiagram` (`src/components/ArchDiagram.jsx`) em SVG inline com tokens de cor, então seguem o tema. Só se desenha o que o `about` do projeto diz. Abaixo de ~700px a moldura rola na horizontal; no card do Homelab vira miniatura (`compact`).

## Símbolos de entrada

`Projects`, `ProjectDetail` (`src/pages/`), `ProjectCard`, `ProjectEmbed`, `projects`, `projectCategories`, `simpleProject`, `findProject` (`src/content/projects.js`). `simpleProject` monta o card de um projeto ainda sem estudo de caso completo, com a seção opcional "Como foi feito com IA" (`ai`). `cover` e `gallery` (também em `simpleProject`) apontam para `public/img/projects/<slug>/`: capturas reais do projeto rodando com dados fictícios. `thesisUrl` (opcional) vira o botão do TCC na ficha. `demoUrl` (opcional, também em `simpleProject`) vira o botão "Ver demo" (`demoButton`) no topo da página, em todas as larguras; URL externa abre em nova aba. `demoNote` (`{ pt, en }`, string vazia esconde naquele idioma) avisa o idioma da demo, sob o botão e no cabeçalho do embed (`ProjectEmbed` prop `note`); o fluxo do wh-harness é só em português e o aviso só aparece no site em inglês. Campos opcionais do estudo de caso: `brief { problem, action, result }` (resumo do topo; item `null` não aparece), `decisions [{ decision, why, alternative?, tradeoff? }]` (cartões de `Decisions`, `src/components/Decisions.jsx`), `numbers` de `simpleProject` → `facts.commits`/`tests`/`mutation` (linhas da ficha) e `extraSections` (seções com `steps`, `links` e `excerpt` opcionais, ex.: "Como eu planejo" no wh-harness). `embedUrl` (opcional) embute uma página de outra origem por `ProjectEmbed` (`src/components/ProjectEmbed.jsx`), numa seção larga abaixo do texto e da ficha: `?embed=1&theme=` no `src`, `postMessage` `wh-flow:theme` na troca de tema e `wh-flow:height` vindo da página (só da origem do `embedUrl`). O fluxo do wh-harness mora no repo dele (`site/flow.html`, GitHub Pages); `public/wh-harness/flow.html` só redireciona para lá. `client` (opcional em `simpleProject`) vira a linha "cliente" da ficha. Slugs em inglês; slug renomeado entra em `LEGACY_PROJECT_SLUGS` (`src/App.jsx`).

## Interações

- [inicio.md](inicio.md): os destaques usam `ProjectCard` compacto.
- [ia.md](ia.md): a página `/ai` lê o `ai` de cada projeto.
- [conquistas.md](conquistas.md): a conquista em destaque aponta para o estudo de caso.
