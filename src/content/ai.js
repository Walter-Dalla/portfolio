// Página /ai (Como trabalho com IA). O resto do conteúdo vem de outros arquivos, sem cópia:
// os bullets com `ai: true` de experiences.js e os textos `ai` (e o `summary` do wh-harness) de projects.js.
// `lede`: abertura da página, a mesma frase do segundo parágrafo de about.js.
// `order`: ordem dos cards de projeto; projeto com `ai` fora da lista entra no fim, na ordem de projects.js.
export const aiPage = {
  lede: {
    pt: 'Hoje, na AgileEngine, construo fluxos de engenharia com agentes de IA: eles mudam a velocidade com que trabalho, mas o que mantém tudo seguro continua sendo arquitetura e padrões de engenharia.',
    en: 'Today, at AgileEngine, I build engineering workflows with AI agents: they change how fast I move, but architecture and engineering standards are still what keeps it safe.',
  },
  order: ['kittycafe', 'cartas-malfaladas', 'goprint', 'nesse-capitulo', 'portfolio'],
}
