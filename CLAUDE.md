# Portfólio — Walter Dalla

Site de portfólio pessoal, só frontend (sem backend): SPA React 19 + Vite, tema escuro/claro, PT/EN.

## Onde mora cada coisa

- `index.html` — página raiz do Vite (fontes, tema salvo antes do primeiro paint).
- `src/main.jsx` — entrada; `src/App.jsx` — rotas (`react-router`).
- `src/pages/` — uma página por rota, cada uma com seu `.css`.
- `src/components/` — layout (`Header`, `Footer`, `Layout`) e peças comuns (`ProjectCard`, `Media`, `Tags`).
- `src/content/` — todo o conteúdo do site, bilíngue `{ pt, en }`; `null` esconde o bloco.
- `src/i18n/` — idioma (`useI18n`) e textos de interface (`src/i18n/strings.js`).
- `src/theme/` — tema claro/escuro (`useTheme`).
- `src/styles/global.css` — tokens de cor do design e classes comuns.
- `src/test/` — setup do Vitest; testes em `src/*.test.jsx`.
- `public/` — favicon, `robots.txt`, `llms.txt` e PDFs do currículo (`public/cv/`).
- `src/seo.js`, `src/entry-server.jsx`, `scripts/prerender.mjs` — SEO: metadados por rota e pré-render no build.

## Construir e testar

- `npm install` — dependências (Node ≥ 22.12).
- `npm run dev` — servidor de desenvolvimento em http://localhost:3000.
- `npm run build` — build de produção em `dist/` (inclui pré-render, `404.html` e `sitemap.xml`).
- `npm run lint` — ESLint (`eslint.config.js`).
- `npm test` — Vitest (`vite.config.js`, ambiente jsdom).

## Docs

- `README.md` — visão geral e onde editar o conteúdo.
- `docs/GLOSSARIO.md` — termos do site ↔ código.
- `docs/features/README.md` — mapa de features; leia o arquivo da feature que a tarefa toca.
- `docs/PENDENCIAS.md` — pendências do dono (tarefas em aberto).
- `.github/workflows/ci.yml` — CI e deploy no GitHub Pages (push na `master`).
