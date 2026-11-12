---
aliases: [Cabeçalho, Navegação, Rodapé, Rotas]
---

# Layout do site

Moldura comum: cabeçalho com navegação e toggles, rodapé, rotas e página 404. A navegação tem 7 itens (Início, Projetos, IA, …); "IA"/"AI" leva a `/ai`. As rotas são em inglês nos dois idiomas; os caminhos antigos em português redirecionam para elas.

- O cabeçalho é fixo ao rolar (`position: sticky`, fundo translúcido). Abaixo de 760px a navegação vira um menu (`menu-toggle`, `aria-expanded`) que fecha ao trocar de rota ou com Esc; os itens vêm de `NAV_ITEMS` (`src/components/nav.js`) .
- `useScrollRestoration`: rota nova abre no topo; "voltar"/"avançar" restaura a posição; trocar só a query (`?cat=`) ou abrir uma âncora não rola.
- `BackToTop`: botão "↑" que aparece após rolar uma tela.
- Rodapé, de cima para baixo: bloco "Fale comigo" / "Get in touch" (`h2`; e-mail, `in/walter-dalla` e `Walter-Dalla` por extenso, de `profile`, com `CopyButton` ao lado do e-mail) e nome e local; sem navegação e sem ©. No Início, com `company`, o bloco "Fale comigo" some porque o cartão da empresa logo acima mostra os mesmos contatos.
- `CopyButton`: copia um texto (e-mail) e confirma por dois segundos; usado em Contato, no rodapé e no cartão da empresa no Início. Largura estável: rótulo e "copiado ✓" ocupam a mesma célula do grid (`button.copy-btn`, especificidade maior porque `global.css` carrega por último); a classe `copy-link` dá a cara de link no rodapé e no Início.
- `Lightbox` + `useLightbox` + `Zoom`: visualizador de imagens em tela cheia (Esc, ← →), usado nas galerias.
- A 404 oferece atalhos para Projetos, Currículo e Contato.
- `index.html` traz as tags Open Graph/Twitter (prévia do link; imagem em `public/og.png`), `theme-color` e `apple-touch-icon`.

## Símbolos de entrada

`App`, `LEGACY_PATHS`, `LEGACY_PROJECT_SLUGS`, `LegacyProjectRedirect` (`src/App.jsx`), `Layout`, `Header`, `Footer`, `NAV_ITEMS`, `BackToTop`, `CopyButton`, `Lightbox`, `useLightbox`, `Zoom`, `useScrollRestoration` (`src/components/`), `NotFound`, `usePageTitle`.

## Interações

- [tema-idioma.md](tema-idioma.md): `Header` usa `useTheme` e `useI18n`.
- [seo.md](seo.md): no GitHub Pages, rota desconhecida e caminho antigo caem no `404.html` gerado pelo pré-render; cada rota pública tem seu `.html`.
