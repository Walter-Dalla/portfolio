// Conquistas. `proofUrl` (comprovante/diploma) e `photo` são opcionais: `null` esconde o link
// e mostra um bloco decorativo no lugar da foto.
export const featuredAchievement = {
  label: { pt: 'patente', en: 'patent' },
  title: {
    pt: 'Patente do software de análise comportamental de insetos',
    en: 'Patent for the insect behavioral analysis software',
  },
  text: {
    pt: 'Registro de patente do software de análise de imagens desenvolvido para pesquisas de farmacologia.',
    en: 'Patent record for the image-analysis software built for pharmacology research.',
  },
  photo: null,
  proofUrl: null,
  projectSlug: 'analise-comportamental-insetos',
}

export const achievements = [
  {
    label: { pt: 'adoção · 2024 – atual', en: 'adoption · 2024 – present' },
    title: {
      pt: 'Software adotado por 2 laboratórios da UNICAMP',
      en: 'Software adopted by 2 UNICAMP labs',
    },
    text: { pt: 'Em uso por laboratórios de farmacologia.', en: 'In use by pharmacology labs.' },
    photo: null,
    proofUrl: null,
    proofKind: 'proof',
  },
  {
    label: { pt: 'graduação · 2020 – 2024', en: 'degree · 2020 – 2024' },
    title: {
      pt: 'Bacharelado em Sistemas de Informação',
      en: "Bachelor's degree in Information Systems",
    },
    text: 'UNESP — Bauru',
    photo: null,
    proofUrl: null,
    proofKind: 'diploma',
  },
  {
    label: { pt: 'técnico · 2017 – 2019', en: 'technical · 2017 – 2019' },
    title: { pt: 'Técnico em Informática', en: 'IT Technician' },
    text: 'COTIL — UNICAMP',
    photo: null,
    proofUrl: null,
    proofKind: 'diploma',
  },
]
