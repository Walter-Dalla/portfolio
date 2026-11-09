---
aliases: [Tema, Idioma, i18n, Dark mode]
---

# Tema e idioma

Tema escuro e claro, idioma EN (padrão) e PT, ambos lembrados no `localStorage`. Sem escolha salva, o tema segue `prefers-color-scheme` (escuro se o navegador não informar), já no script do `index.html` antes do primeiro paint; a escolha no botão passa a valer. O `<meta name="theme-color">` acompanha o tema.

## Símbolos de entrada

`ThemeProvider`, `useTheme` (`src/theme/`), `LanguageProvider`, `useI18n`, `pick`, `strings` (`src/i18n/`), `readStored`, `writeStored`.

## Interações

- [layout.md](layout.md): os botões de tema e idioma ficam no `Header`.
