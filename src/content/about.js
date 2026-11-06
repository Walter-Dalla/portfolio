// Página Sobre. Parágrafos e fatos com valor `null` não aparecem;
// a galeria só aparece com pelo menos uma foto.
export const about = {
  intro: {
    pt: 'Comecei a programar no técnico do COTIL/UNICAMP, segui para Sistemas de Informação na UNESP de Bauru e, desde 2018, construo software — hoje com agentes de IA.',
    en: 'I started coding at the COTIL/UNICAMP technical school, went on to Information Systems at UNESP Bauru and, since 2018, I have been building software — today with AI agents.',
  },
  // Texto em primeira pessoa: o que te levou à tecnologia, hobbies… [{ pt, en }]
  paragraphs: [],
  facts: [
    { label: { pt: 'base', en: 'based in' }, value: 'São Paulo, BR' },
    { label: { pt: '1º emprego', en: '1st job' }, value: { pt: '2018, Assertiva', en: '2018, Assertiva' } },
    { label: { pt: 'formação', en: 'education' }, value: 'UNESP · COTIL' },
    { label: { pt: 'agora', en: 'now' }, value: { pt: 'agentes de IA', en: 'AI agents' } },
    { label: { pt: 'hobby', en: 'hobby' }, value: null },
    { label: { pt: 'café ou chá', en: 'coffee or tea' }, value: null },
  ],
  // [{ src, caption: { pt, en }, size: 'large' | 'wide' | 'tall' | undefined }]
  gallery: [],
  story: [
    {
      year: '2017',
      text: {
        pt: 'Entro no técnico de Informática do COTIL/UNICAMP.',
        en: 'I join the IT technical program at COTIL/UNICAMP.',
      },
    },
    {
      year: '2018',
      text: {
        pt: 'Primeiro estágio, em backend, na Assertiva.',
        en: 'First internship, in backend, at Assertiva.',
      },
    },
    {
      year: '2020',
      text: {
        pt: 'UNESP Bauru e primeiro emprego como dev.',
        en: 'UNESP Bauru and my first job as a developer.',
      },
    },
    {
      year: '2024',
      text: {
        pt: 'Formatura na UNESP e início do software de análise de insetos.',
        en: 'Graduation at UNESP and the start of the insect-analysis software.',
      },
    },
    {
      year: '2026',
      text: {
        pt: 'Desenvolvimento orientado por IA na AgileEngine.',
        en: 'AI-driven development at AgileEngine.',
      },
    },
  ],
}
