# Perfil do /wh:start-app

## Serviços
Nenhum serviço: projeto só frontend [dono]

## Cliente
`npm run dev` — Vite em `http://localhost:3000` (`--strictPort` falha se ocupada) · stop: `pkill -f vite` · health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` = `200` [package.json, vite.config.js]
Sem janela: print com o Chromium headless (`_comum § Toolchain`) [inferido]
Build estático: `npm run build && npm run preview` (porta `4173`) [package.json]

## Alternativa
—

## Estado
Sem estado do lado do servidor; tema e idioma no `localStorage` do navegador [inferido]

## Credenciais de dev
—

## Sinais
Lockfile mudou → `npm install` antes de subir [inferido]
Porta `3000` ocupada → outro `vite` ou CRA antigo rodando: `ss -ltnp | grep 3000` [inferido]
