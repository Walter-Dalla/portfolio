# Pendências

Tarefas em aberto do dono do site. Ao concluir, apague o item.

## Atualizar o currículo (PT e EN)

Fonte: os PDFs novos em `C:\Users\walter\Desktop\cv\` (no WSL: `/mnt/c/Users/walter/Desktop/cv/`): `CV Walter Dalla - PT.pdf` e `CV Walter Dalla - EN.pdf` (há também as versões `.txt` com o texto).

- Trocar `public/cv/walter-dalla-cv-pt.pdf` e `public/cv/walter-dalla-cv-en.pdf` pelos PDFs novos (mantendo esses nomes).
- Atualizar `resumePdf.updated` em `src/content/profile.js`.
- Conferir o conteúdo da página `/resume` contra o texto novo do CV (cargos, datas, descrições, `resumeLead`, habilidades): veja [features/curriculo.md](features/curriculo.md).

## Agrupar experiências por vínculo na linha do tempo do currículo

Em `experiences` (`src/content/experiences.js`), mostrar como uma experiência só o período em que trabalhei para a mesma empresa por vínculos diferentes, nomeando os dois lados:

- **BTG e Act**: hoje "BTG Pactual" cita "via Act Digital" só na descrição; comecei como terceiro pela Act e depois fui contratado direto pelo BTG.
- **Linx/Stone e Ez.devs**: hoje são duas entradas separadas ("Linx (Grupo Stone)" e "Ez.Devs"); comecei alocado na Linx pela Ez.devs e depois fui contratado direto.
- **Walter Arquitetura de Software (CNPJ)**, no mesmo estilo: juntar "Qyon" e "AgileEngine" numa entrada só, embaixo da minha empresa (`company` em `src/content/profile.js`), já que trabalhei para as duas como PJ por ela.

Conferir com o texto do CV novo (item acima) e manter PT e EN iguais.
