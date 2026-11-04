// Dados pessoais e do topo do site. Campos `null` não aparecem na página:
// preencha quando tiver o arquivo (ponha em public/) ou o texto.
export const profile = {
  name: 'Walter Dalla Torre Neto',
  email: 'walterdallaprofissional@gmail.com',
  linkedin: 'https://linkedin.com/in/walter-dalla',
  linkedinHandle: 'in/walter-dalla',
  github: 'https://github.com/Walter-Dalla',
  githubHandle: 'Walter-Dalla',
  location: 'São Paulo, BR',
  timezone: 'UTC−3',
  // Retrato 4:5, ex.: '/img/walter.jpg'.
  photo: null,
  tagline: {
    pt: 'Desenvolvedor backend sênior, arquiteto de software e DevOps. Hoje construo com IA — Claude, Codex e orquestração de agentes.',
    en: 'Senior backend developer, software architect and DevOps engineer. Today I build with AI — Claude, Codex and agent orchestration.',
  },
  pitch: {
    pt: 'Construo sistemas que custam menos, respondem mais rápido e não param.',
    en: "I build systems that cost less, respond faster and don't go down.",
  },
  // Disponibilidade mostrada em Contato, ex.: aberto a oportunidades no Brasil e no exterior.
  availability: null,
}

// PDFs do currículo, servidos de public/cv/.
export const resumePdf = {
  pt: null,
  en: '/cv/walter-dalla-cv-en.pdf',
  // Data da última atualização dos PDFs, ex.: { pt: '05/2026', en: '05/2026' }.
  updated: null,
}

export const metrics = [
  {
    value: '−23%',
    label: { pt: 'custos de AWS', en: 'AWS costs' },
    source: 'Qyon · 2025–26',
  },
  {
    value: '+216%',
    label: { pt: 'de eficiência com observabilidade', en: 'efficiency through observability' },
    source: 'BTG Pactual · 2025',
  },
  {
    value: '7→1',
    label: { pt: 'dias de SLA (fallback PIX/TED)', en: 'days of SLA (PIX/TED fallback)' },
    source: 'BTG Pactual · 2025',
  },
  {
    value: '<1s',
    label: { pt: 'de latência (antes 2s)', en: 'latency (down from 2s)' },
    source: 'Act Digital / BTG · 2023–25',
  },
]
