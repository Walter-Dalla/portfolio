---
aliases: [SEO, pré-render, sitemap, robots, llms.txt, Open Graph]
---

# SEO e pré-render

O site é uma SPA, mas o build gera um `.html` já renderizado por rota (em inglês, tema escuro) para buscadores e agentes de IA lerem o conteúdo sem executar JavaScript.

## Símbolos de entrada

`seoRoutes`, `shortDescription`, `SITE_URL` (`src/seo.js`); `render` (`src/entry-server.jsx`); `scripts/prerender.mjs`; gate de hidratação em `src/main.jsx`.

## Como funciona

- `npm run build` = build do cliente + `vite build --ssr src/entry-server.jsx` + `node scripts/prerender.mjs`.
- O pré-render troca o bloco `<!-- seo:start -->…<!-- seo:end -->` de `index.html` por título, descrição, canonical e Open Graph da rota, e escreve `dist/<rota>.html` (`/` → `index.html`, `/projects/<slug>` → `projects/<slug>.html`). O GitHub Pages serve `/resume` a partir de `resume.html`.
- `dist/404.html` é o app renderizado em "Página não encontrada", com `noindex`; `dist/sitemap.xml` lista as rotas de `sitemapRoutes()` (as de `seoRoutes()` menos as de `unlistedProjects`); a rota de projeto fora da lista é pré-renderizada com `<meta name="robots" content="noindex">`.
- `#root` recebe `data-route`. `main.jsx` só hidrata quando a rota bate com a URL e o visitante não salvou PT nem tema claro; senão limpa e renderiza do zero.
- `public/robots.txt` libera tudo e aponta o sitemap; `public/llms.txt` resume o site para agentes de IA; `index.html` traz JSON-LD `Person`.

## Ao mudar o site

- Nova rota pública: adicione em `STATIC_ROUTES` (`src/seo.js`). Projetos entram sozinhos pelo `slug`.
- Texto só de interface que o pré-render usa como descrição: `resumeLead`, `projectsLead`, `achievementsLead`, `exploreAbout` (`src/i18n/strings.js`).
- Componente que leia `window`/`document` fora de `useEffect` quebra o pré-render (`src/seo.test.jsx` cobre a hidratação de cada rota).

## Interações

- [layout.md](layout.md): 404 e rotas antigas passam pelo `404.html`.
- [tema-idioma.md](tema-idioma.md): preferências salvas decidem se o HTML pronto é hidratado ou descartado.
- [projetos.md](projetos.md): `cover` do projeto vira `og:image`; `summary`, a descrição.
