# Perfil comum

## Clone
— (checkout atual em `/home/walter/portfolio`, WSL2; sem outro checkout) [inferido]

## Toolchain
Node ≥ 22.12 e npm (Linux/WSL): `npm install`, `npm run build`, `npm test` [package.json]
HTTP local: `curl` [inferido]
Matar o servidor de dev: `pkill -f "vite --port <porta>"` [inferido]
Navegador headless para print: `~/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell --no-sandbox --screenshot=<arquivo> --window-size=<W>,<H> <url>` [inferido]

## Git
Principal: `master`. Remote de PR: `origin` (github.com/Walter-Dalla/portfolio) [git remote]
Identidade: `Walter Dalla` (config local) [git config]
Branches protegidas: — [dono]

## Portas
Do dono: `3000` (`npm run dev`) [vite.config.js]
Agentes do `/wh:implementation`: `3100–3105` [dono]
QA visual/e2e: a partir de `3108` (primeira livre) [dono]

## Navegação
Sem `.codegraph/`: `grep`/`Read` em `src/` [checar.py]

## Docs
`CLAUDE.md` — mapa do repo [CLAUDE.md]
`README.md` — visão geral e onde editar o conteúdo [CLAUDE.md]
`docs/GLOSSARIO.md` — glossário site ↔ código [CLAUDE.md]
`docs/features/README.md` — mapa de features [CLAUDE.md]

## Limites
Só frontend por enquanto: nenhum backend, API ou banco [dono]
Nenhum agente toca a porta `3000` do dono, segredos ou arquivos fora do repo e do scratchpad [inferido]
