---
aliases: [Cabeçalho, Navegação, Rodapé, Rotas]
---

# Layout do site

Moldura comum: cabeçalho com navegação e toggles, rodapé, rotas e página 404. As rotas são em inglês nos dois idiomas; os caminhos antigos em português redirecionam para elas.

- O cabeçalho é fixo ao rolar (`position: sticky`, fundo translúcido). Abaixo de 760px a navegação vira um menu (`menu-toggle`, `aria-expanded`) que fecha ao trocar de rota ou com Esc; os itens vêm de `NAV_ITEMS` (`src/components/nav.js`) e se repetem no rodapé.
- `useScrollRestoration`: rota nova abre no topo; "voltar"/"avançar" restaura a posição; trocar só a query (`?cat=`) ou abrir uma âncora não rola.
- `BackToTop`: botão "↑" que aparece após rolar uma tela.
- `CopyButton`: copia um texto (e-mail) e confirma por dois segundos; usado em Contato e no rodapé.
- `Lightbox` + `useLightbox` + `Zoom`: visualizador de imagens em tela cheia (Esc, ← →), usado nas galerias.
- A 404 oferece atalhos para Projetos, Currículo e Contato.
- `index.html` traz as tags Open Graph/Twitter (prévia do link; imagem em `public/og.png`), `theme-color` e `apple-touch-icon`.

## Símbolos de entrada

`App`, `LEGACY_PATHS`, `LEGACY_PROJECT_SLUGS`, `LegacyProjectRedirect` (`src/App.jsx`), `Layout`, `Header`, `Footer`, `NAV_ITEMS`, `BackToTop`, `CopyButton`, `Lightbox`, `useLightbox`, `Zoom`, `useScrollRestoration` (`src/components/`), `NotFound`, `usePageTitle`.

## Interações

- [tema-idioma.md](tema-idioma.md): `Header` usa `useTheme` e `useI18n`.
