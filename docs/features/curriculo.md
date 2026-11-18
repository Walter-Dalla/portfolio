---
aliases: [Resume, CV]
---

# Currículo

Resumo profissional, PDFs para baixar, índice das seções (`ResumeIndex`: chips com âncoras `#experiencia`, `#stack`, `#formacao`, `#empresa`; a seção visível fica em destaque via `IntersectionObserver`), linha do tempo das experiências (fotos abrem no `Lightbox`; uma entrada com `positions` é um grupo de vínculos com a mesma empresa — título, período e nota próprios do site, e um cargo por vínculo com o texto do CV, renderizado por `Position` como `h4`; o grupo da empresa PJ tem o título "Consultor independente", com a razão social e os clientes na nota), grupos de habilidades, formação (item com `note` e `noteLink` opcionais: `noteLink.to` é rota interna, com "→", e `noteLink.href` é link externo, com "↗"; o técnico do COTIL leva a `/projects/atom`; ao lado, idiomas e o cartão "cursos/" com os 4 cursos de `credentials`, sempre visíveis: título, data `MM/AAAA` e "ver credencial ↗") e a empresa PJ. Sem bloco de PDF no fim da página: o download fica no topo e em Contato.

O CV é a fonte da verdade: cargos, datas, descrições, resumo (`resumeLead`) e habilidades seguem o texto dele. Ao atualizar o CV, troque também os PDFs em `public/cv/` e `resumePdf.updated`.

## Símbolos de entrada

`Resume`, `Experience`, `Position` (`src/pages/Resume.jsx`), `experiences`, `skillGroups`, `education`, `languages`, `certifications`, `credentials` (`src/content/experiences.js`), `resumePdf`, `company` (`src/content/profile.js`), `Rich`.

## Interações

- [tema-idioma.md](tema-idioma.md): textos `{ pt, en }` escolhidos por `l()`.
