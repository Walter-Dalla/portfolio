---
aliases: [Contact]
---

# Contato

Disponibilidade (`profile.availability`) abaixo do título; e-mail em destaque com "Enviar e-mail" (`mailto:`) e "Copiar e-mail" (`CopyButton`), logo abaixo do e-mail, o bloco do currículo (texto de apoio, os dois PDFs como botões, o do idioma atual primeiro, e "ver currículo online →"), depois LinkedIn, GitHub, local e a empresa PJ. Sem formulário nem backend. O endereço cabe numa linha em 390px (`contact.css`).

## Símbolos de entrada

`Contact` (`src/pages/Contact.jsx`), `CopyButton`, `profile`, `company` (`src/content/profile.js`).

## Interações

- [curriculo.md](curriculo.md): links dos PDFs via `availableResumes`.
- [inicio.md](inicio.md): o hero mostra a mesma disponibilidade e o botão "fale comigo →" para cá.
