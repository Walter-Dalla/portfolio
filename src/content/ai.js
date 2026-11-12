// Página /ai (Como trabalho com IA). Texto próprio da página: `lede` e `harness`. O resto vem de outros
// arquivos, sem cópia: os bullets com `ai: true` de experiences.js, os textos `ai` dos projetos e o
// `summary` do wh-harness, de projects.js.
// `lede`: abertura da página, a mesma frase do segundo parágrafo de about.js.
// `harness`: parágrafos do bloco do wh-harness, abaixo do `summary` do projeto (como uso o harness no dia a dia).
// `order`: ordem dos cards de projeto; projeto com `ai` fora da lista entra no fim, na ordem de projects.js.
export const aiPage = {
  lede: {
    pt: 'Hoje, na AgileEngine, construo fluxos de engenharia com agentes de IA: eles mudam a velocidade com que trabalho, mas o que mantém tudo seguro continua sendo arquitetura e padrões de engenharia.',
    en: 'Today, at AgileEngine, I build engineering workflows with AI agents: they change how fast I move, but architecture and engineering standards are still what keeps it safe.',
  },
  harness: [
    {
      pt: 'Uso o harness em todos os meus projetos atuais: KittyCafé, GoPrint, Nesse Capítulo e este portfólio que você está vendo.',
      en: 'I use the harness in all my current projects: KittyCafé, GoPrint, Nesse Capítulo and this portfolio you are looking at.',
    },
    {
      pt: 'Antes de a IA escrever uma linha, eu faço a arquitetura: qual banco de dados, como as partes se comunicam, a estrutura geral do código e quais são os principais testes. Só depois ponho os agentes para executar. Meu foco é arquitetar; escrever o código fica com a IA.',
      en: "Before the AI writes a line, I design the architecture: which database, how the parts communicate, the overall code structure and which tests matter most. Only then do I put the agents to work. My focus is architecture; writing the code is the AI's job.",
    },
  ],
  order: ['kittycafe', 'cartas-malfaladas', 'goprint', 'nesse-capitulo', 'portfolio'],
}
