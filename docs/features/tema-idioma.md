---
aliases: [Tema, Idioma, i18n, Dark mode]
---

# Tema e idioma

Tema escuro e claro, idioma EN (padrão) e PT, ambos lembrados no `localStorage`. Sem idioma salvo, `detectLang` (`src/i18n/detect.js`) abre em PT quando `window.navigator.language` começa com `pt` e em EN nos outros casos; a detecção não grava nada (só a escolha no botão grava `wd-lang`, `LANG_KEY` em `src/i18n/context.js`), e o script do `index.html` põe `lang="pt-BR"` pela mesma regra antes do primeiro paint. `detectLang` lê só `window.navigator`: o `navigator` global do Node faria o pré-render sair em português numa máquina pt-BR. Sem escolha salva, o tema segue `prefers-color-scheme` (escuro se o navegador não informar), já no script do `index.html` antes do primeiro paint; a escolha no botão passa a valer. O `<meta name="theme-color">` acompanha o tema.

## Símbolos de entrada

`ThemeProvider`, `useTheme` (`src/theme/`), `LanguageProvider`, `useI18n`, `pick`, `strings`, `detectLang`, `LANG_KEY` (`src/i18n/`), `readStored`, `writeStored`.

## Interações

- [layout.md](layout.md): os botões de tema e idioma ficam no `Header`.
