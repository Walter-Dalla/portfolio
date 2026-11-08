import { certifications } from './experiences.js'

// Conquistas. `proofUrl` (comprovante/diploma) e `photo` são opcionais: `null` esconde o link.
// Sem `photo`, o cartão mostra `mark` (sigla curta, ex.: 'UNESP') numa faixa baixa; sem os dois, só o texto.
export const featuredAchievement = {
  label: { pt: 'adoção · 2024 – atual', en: 'adoption · 2024 – present' },
  title: {
    pt: 'Software adotado por 3 laboratórios da UNICAMP',
    en: 'Software adopted by 3 UNICAMP labs',
  },
  text: {
    pt: 'Meu TCC na UNESP virou a ferramenta de análise comportamental de insetos em uso por laboratórios de farmacologia.',
    en: 'My undergraduate thesis at UNESP became the insect behavioral analysis tool in use by pharmacology labs.',
  },
  photo: '/img/projects/insect-behavioral-analysis/cover.webp',
  proofUrl: null,
  projectSlug: 'insect-behavioral-analysis',
}

export const achievements = [
  {
    label: { pt: 'graduação · 2020 – 2024', en: 'degree · 2020 – 2024' },
    title: {
      pt: 'Bacharelado em Sistemas de Informação',
      en: "Bachelor's degree in Information Systems",
    },
    text: 'UNESP — Bauru',
    photo: null,
    mark: 'UNESP',
    proofUrl: null,
    proofKind: 'diploma',
  },
  {
    label: { pt: 'técnico · 2017 – 2019', en: 'technical · 2017 – 2019' },
    title: { pt: 'Curso Técnico em Informática (Software)', en: 'Technical Degree in IT (Software)' },
    text: 'COTIL — UNICAMP',
    photo: null,
    mark: 'COTIL',
    proofUrl: null,
    proofKind: 'diploma',
  },
  {
    label: { pt: 'certificações', en: 'certifications' },
    title: { pt: 'Cursos e certificações', en: 'Courses and certifications' },
    text: certifications.map((c) => c.en ?? c).join(' · '),
    photo: null,
    mark: 'AWS · DDD · Spring',
    proofUrl: null,
    proofKind: 'proof',
  },
]
