---
id: P-030
status: open
created: 2026-11-12
related: [P-029]
---

# Conferir ao vivo o fluxo embutido do wh-harness (passo do dono)

## Problem
A página do fluxo só conversa com `https://walterdalla.uk` e `http://localhost:3000`; nas portas dos agentes ela ignora mensagens e não manda a altura. Por isso dois comportamentos de P-029 só podem ser conferidos pelo dono (decisão do dono, 2026-11-11).

## Strategy
1. Antes do merge do PR de `impl/ajustes-sessao`: `curl -s -o /dev/null -I -w "%{http_code}\n" https://walter-dalla.github.io/wh-harness/pt/` e `.../en/` respondem `200` (medido 200 em 2026-11-11).
2. Em `/projects/wh-harness`, com `npm run dev` (:3000) ou em produção, desktop e celular, nos dois temas:
   - o fluxo não tem rolagem própria (a altura acompanha o conteúdo);
   - trocar PT/EN no cabeçalho troca o idioma do fluxo sem recarregar o iframe.
3. Se algo falhar, abrir pendência com o print e a combinação (tela, tema, idioma).

## Locations
- `src/components/ProjectEmbed.jsx` — `sync` manda `wh-flow:theme` e `wh-flow:lang`; recebe `wh-flow:height` só da origem do `url` [code]
- `src/content/projects.js` — `WH_FLOW_URL` { pt, en } [code]
