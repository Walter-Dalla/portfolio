---
aliases: [Resume, CV]
---

# Currículo

Resumo profissional, PDFs para baixar, índice das seções (`ResumeIndex`: chips com âncoras `#experiencia`, `#stack`, `#formacao`, `#empresa`; a seção visível fica em destaque via `IntersectionObserver`), linha do tempo das experiências (fotos abrem no `Lightbox`), grupos de habilidades, formação (com idiomas e certificações) e a empresa PJ.

O CV é a fonte da verdade: cargos, datas, descrições, resumo (`resumeLead`) e habilidades seguem o texto dele. Ao atualizar o CV, troque também os PDFs em `public/cv/` e `resumePdf.updated`.

## Símbolos de entrada

`Resume` (`src/pages/Resume.jsx`), `experiences`, `skillGroups`, `education`, `languages`, `certifications` (`src/content/experiences.js`), `resumePdf`, `company` (`src/content/profile.js`), `Rich`.

## Interações

- [tema-idioma.md](tema-idioma.md): textos `{ pt, en }` escolhidos por `l()`.
