# Common profile

## Clone
— (checkout atual, WSL2; sem outro checkout) [inferred]

## Toolchain
Node ≥ 22.12 e npm (Linux/WSL): `npm install`, `npm run build`, `npm test` [package.json]
HTTP local: `curl` [inferred]
Matar o servidor de dev: `pkill -f "[v]ite --port <porta>"`, numa chamada própria (sem o `[v]` o padrão casa com o próprio shell e sai 144) [retro ajustes-sessao]
Navegador headless para print: `~/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell --no-sandbox --screenshot=<arquivo> --window-size=<W>,<H> <url>` [inferred]
Print do servidor de dev pode sair em branco: somar `--virtual-time-budget=15000`; para rota com âncora ou uma área, página temporária `public/_shot.html` (mesma origem) com um iframe do tamanho alvo, fora do commit [retro pending-002-095]
Tema no print: `--blink-settings=preferredColorScheme=0` (escuro) ou `=1` (claro); `--force-dark-mode` não muda `prefers-color-scheme` [retro pending-002-095]
Medir ou dirigir a página (clique, largura de texto, mensagens de iframe): CDP pelo `WebSocket` global do Node 22 contra o `chrome-headless-shell --remote-debugging-port=<porta>`; não há pacote playwright no repo [retro pending-002-095]
Páginas do Credly não carregam no headless: a conferência desses links fica com o dono [retro pending-002-095]

## Git
Principal: `master`. Remote de PR: `origin` (github.com/Walter-Dalla/portfolio) [git remote]
Identidade: `Walter Dalla` (config local) [git config]
Branches protegidas: — [owner]

## Ports
Do dono: `3000` (`npm run dev`) [vite.config.js]
Agentes do `/wh:implementation`: `3100–3105` [owner]
QA visual/e2e: a partir de `3108` (primeira livre) [owner]

## Navigation
Sem `.codegraph/`: `grep`/`Read` em `src/` [check.py]

## Docs
`CLAUDE.md` — mapa do repo [CLAUDE.md]
`README.md` — visão geral e onde editar o conteúdo [CLAUDE.md]
`docs/GLOSSARIO.md` — glossário site ↔ código [CLAUDE.md]
`docs/features/README.md` — mapa de features [CLAUDE.md]

## Pending
`pending/` — uma pendência por arquivo `P-NNN-*.md`, local e gitignorado (padrão do `/wh:implementation`); concluídas em `pending/done/` [owner 2026-11-12]

## Limits
Só frontend por enquanto: nenhum backend, API ou banco [owner]
Nenhum agente toca a porta `3000` do dono, segredos ou arquivos fora do repo e do scratchpad [inferred]
