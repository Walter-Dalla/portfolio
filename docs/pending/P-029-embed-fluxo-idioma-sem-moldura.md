---
id: P-029
status: open
created: 2026-11-11
related: [P-002]
---

# Fluxo do wh-harness embutido: idioma do site, sem moldura, sem rolagem própria

## Problem
O fluxo embutido em /projects/wh-harness hoje é só em português (aviso `demoNote` no site em inglês), vem com moldura e rolagem própria. O PR https://github.com/Walter-Dalla/wh-harness/pull/12 (repo wh-harness, `site/flow.html`) oferece, depois de publicado: um caminho por idioma https://walter-dalla.github.io/wh-harness/pt/ e .../en/ (o antigo .../flow.html fica, escolhe por ?lang= ou navegador); modo embed (`?embed=1&theme=dark|light`): sem cabeçalho, título nem padding, espera iframe sem borda alinhado à coluna do site; `postMessage` só das origens https://walterdalla.uk e http://localhost:3000: entrada `{ type: 'wh-flow:theme', theme }`, entrada `{ type: 'wh-flow:lang', lang }` (troca o idioma sem recarregar), saída `{ type: 'wh-flow:height', height }` a cada resize e de novo em resposta a qualquer mensagem do site.

## Strategy
1. `projects.js`: `demoUrl` e `embedUrl` do wh-harness viram `{ pt, en }` (`.../pt/`, `.../en/`); os dois campos aceitam string ou `{ pt, en }`; remover `demoNote` do wh-harness (a demo passa a ter os dois idiomas).
2. `ProjectDetail.jsx`: resolver `demoUrl`/`embedUrl` com `l()` antes de usar (href do botão, `isExternal`, prop `url` do `ProjectEmbed`).
3. `ProjectEmbed.jsx`: `src` guarda idioma e tema da montagem, sem recarregar quando mudam; enviar `wh-flow:theme` e `wh-flow:lang` na montagem, no `onLoad` e a cada troca de tema/idioma (o pré-render é em inglês e o idioma salvo pode ser PT; o iframe do pré-render pode carregar antes da hidratação e perder a altura enviada, hoje fica na altura fixa com rolagem própria; a resposta às mensagens traz a altura de volta); o link "abrir em tela cheia" aponta para o caminho do idioma atual; continuar aceitando `wh-flow:height` só da origem da url.
4. `project-detail.css`: `.project__embed-frame` sem borda e sem border-radius; manter `background: var(--bg)` e a altura reservada.
5. Testes: novas URLs no botão de demo, no `src` do iframe e no link de tela cheia; um caso em EN; um caso verificando que `wh-flow:lang` é enviado.
6. `docs/features/projetos.md`: protocolo e URLs por idioma; `public/wh-harness/flow.html` pode continuar redirecionando para .../flow.html.
7. Rascunho de referência, escrito ANTES do último master (conflita): `/home/walter/portfolio/.impl/ajustes-sessao/draft-embed.patch`.

Restrição: não publicar antes de o PR 12 do wh-harness estar mergeado e o Pages publicado (até lá /pt/ e /en/ dão 404); conferir com `curl -I` nas duas URLs antes do push na master.
Pronto quando: lint e testes passam e, em /projects/wh-harness, desktop e celular, nos dois temas: fluxo no idioma do site, troca com o seletor PT/EN sem recarregar, sem rolagem própria nem moldura, botão de demo e link de tela cheia abrem o caminho do idioma atual.

## Locations
- `src/content/projects.js:32,110-113` — `WH_FLOW_URL`, `demoUrl`, `demoNote`, `embedUrl`; comentário dos campos em 9-15 [code src/content/projects.js:32]
- `src/pages/ProjectDetail.jsx:16,138-144,237` — `isExternal`, botão de demo, `ProjectEmbed` [code src/pages/ProjectDetail.jsx:138]
- `src/components/ProjectEmbed.jsx:11-70` — `embedSrc`, `useState` do src, efeitos de tema e altura, link de tela cheia, `onLoad` [code src/components/ProjectEmbed.jsx:11]
- `src/pages/project-detail.css:318` — `.project__embed-frame` [code src/pages/project-detail.css:318]
- `src/demo-button.test.jsx:16`, `src/App.test.jsx:95-117`, `src/demo-note.test.jsx:10` — testes com a URL `flow.html` e o `demoNote` [code src/App.test.jsx:98]
- `docs/features/projetos.md:17` — protocolo e `demoNote` [code docs/features/projetos.md:17]
- `public/wh-harness/flow.html:7-9` — redireciona para .../flow.html [code public/wh-harness/flow.html:7]

## Code references
- `ProjectEmbed` `src/components/ProjectEmbed.jsx:19`; `useI18n` (`l`, idioma) `src/i18n/context.js`; `useTheme` `src/theme/context.js`; `simpleProject` `src/content/projects.js:44`

## Other references
- P-002 (versão em inglês da página do fluxo, do lado do repo wh-harness)
- PR https://github.com/Walter-Dalla/wh-harness/pull/12
- `/home/walter/portfolio/.impl/ajustes-sessao/draft-embed.patch`

## Open questions
- Remover `demoNote` do wh-harness quando as duas URLs existirem? Recomendado: sim; confirma pelo código/testes.
