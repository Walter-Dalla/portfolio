# Common profile

## Clone
— (checkout atual em `/home/walter/portfolio`, WSL2; sem outro checkout) [inferred]

## Toolchain
Node ≥ 22.12 e npm (Linux/WSL): `npm install`, `npm run build`, `npm test` [package.json]
HTTP local: `curl` [inferred]
Matar o servidor de dev: `pkill -f "[v]ite --port <porta>"`, numa chamada própria (sem o `[v]` o padrão casa com o próprio shell e sai 144) [retro ajustes-sessao]
Navegador headless para print: `~/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell --no-sandbox --screenshot=<arquivo> --window-size=<W>,<H> <url>` [inferred]

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
`docs/pending/` — uma pendência por arquivo `P-NNN-*.md`; `docs/PENDENCIAS.md` é a lista curta do dono [retro 2026-11-11]

## Limits
Só frontend por enquanto: nenhum backend, API ou banco [owner]
Nenhum agente toca a porta `3000` do dono, segredos ou arquivos fora do repo e do scratchpad [inferred]
