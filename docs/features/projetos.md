---
aliases: [Projects, Estudo de caso]
---

# Projetos e estudo de caso

Lista filtrável de projetos e uma página por projeto com estudo de caso, ficha e links.

- O filtro vive na URL (`/projects?cat=<id>`), lido ao abrir e gravado com `replace`; ids inválidos caem em "todos".
- `ProjectCard` é clicável inteiro (capa e título levam ao estudo de caso; `card--link` dá o hover). Sem `cover`, mostra uma faixa baixa com o caminho em vez do bloco vazio.
- `ProjectDetail`: sem `cover` não há bloco de capa; a capa carrega com prioridade (`Media priority`); a ficha acompanha a rolagem no desktop; a galeria abre no `Lightbox`; a navegação "anterior", "todos" e "próximo" fecha a página, depois do embed (ou do texto e da ficha, sem embed), em todo projeto.
- Ordem da página: intro (com o botão "Ver demo") → capa (ou o diagrama, no projeto sem `cover`) → resumo `brief` → corpo com seções numeradas por posição (texto → "Arquitetura" → decisões → galeria) e ficha ao lado → embed largo → navegação entre projetos. Nos cartões de decisão, "alternativa descartada" e "trade-off" só aparecem quando preenchidos (hoje nos 7 cartões do KittyCafé e da Cartas Malfaladas).
- Diagramas de arquitetura: dados em `src/content/diagrams.js` (`diagrams`, `findDiagram`), desenhados por `ArchDiagram` (`src/components/ArchDiagram.jsx`) em SVG inline com tokens de cor, então seguem o tema. Só se desenha o que o `about` do projeto diz. Abaixo de ~700px a moldura rola na horizontal; no card do Homelab vira miniatura (`compact`).

## Símbolos de entrada

`Projects`, `ProjectDetail` (`src/pages/`), `ProjectCard`, `ProjectEmbed`, `projects`, `projectCategories`, `simpleProject`, `findProject` (`src/content/projects.js`). `simpleProject` monta o card de um projeto ainda sem estudo de caso completo, com a seção opcional "Como foi feito com IA" (`ai`). `cover` e `gallery` (também em `simpleProject`) apontam para `public/img/projects/<slug>/`: capturas reais do projeto rodando com dados fictícios. `thesisUrl` (opcional) vira o botão do TCC na ficha. `demoUrl` (opcional, também em `simpleProject`) vira o botão "Ver demo" (`demoButton`) no topo da página, em todas as larguras; URL externa abre em nova aba. `demoUrl` e `embedUrl` aceitam string ou `{ pt, en }` (resolvidos com `l()`); o fluxo do wh-harness tem um caminho por idioma (`WH_FLOW_URL`: `…/wh-harness/pt/` e `…/en/`). `role` (opcional em `simpleProject`) vira a linha "papel" da ficha e `links` (opcional) entra na seção "O projeto". `unlistedProjects`: projeto com página, mas fora de Projetos, Início, /ai, paginação e sitemap (hoje o Atom, TCC do técnico, aberto só pelo cartão do COTIL em Conquistas); `findProject` procura nas duas listas. Campos opcionais do estudo de caso: `brief { problem, action, result }` (resumo do topo; item `null` não aparece), `decisions [{ decision, why, alternative?, tradeoff? }]` (cartões de `Decisions`, `src/components/Decisions.jsx`), `numbers` de `simpleProject` → `facts.commits`/`tests`/`mutation` (linhas da ficha) e `extraSections` (seções com `steps`, `links` e `excerpt` opcionais, ex.: "Como eu planejo" no wh-harness). `embedUrl` (opcional) embute uma página de outra origem por `ProjectEmbed` (`src/components/ProjectEmbed.jsx`), numa seção abaixo do texto e da ficha que sai da coluna do site até 1284px, centralizada (`.project__embed`; largura natural do fluxo, onde ele mostra 3 colunas, a partir de ~1352px de janela): `?embed=1&theme=` no `src` com o idioma e o tema da montagem (o iframe não recarrega quando eles mudam); `postMessage` `wh-flow:theme` e `wh-flow:lang` na montagem, no `onLoad` e a cada troca; `wh-flow:height` vindo da página (só da origem do `embedUrl`), que responde a cada mensagem. Iframe sem borda nem cantos arredondados. A página do fluxo só conversa com `https://walterdalla.uk` e `http://localhost:3000`: em outras portas (agentes, QA) o iframe fica na altura fixa, com rolagem própria, e isso não é defeito. O fluxo do wh-harness mora no repo dele (`site/flow.html`, GitHub Pages); `public/wh-harness/flow.html` só redireciona para lá. `client` (opcional em `simpleProject`) vira a linha "cliente" da ficha. Slugs em inglês; slug renomeado entra em `LEGACY_PROJECT_SLUGS` (`src/App.jsx`).

## Interações

- [inicio.md](inicio.md): os destaques usam `ProjectCard` compacto.
- [ia.md](ia.md): a página `/ai` lê o `ai` de cada projeto.
- [conquistas.md](conquistas.md): a conquista em destaque aponta para o estudo de caso.
