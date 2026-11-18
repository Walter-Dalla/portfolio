// Arquitetura dos sistemas: a chamada "Como eu desenho sistemas" do Início (texto e ordem dos sistemas) e o
// link que leva à arquitetura na página de cada projeto. Cada sistema é um projeto de src/content/projects.js
// que tem diagrama em src/content/diagrams.js; o diagrama, a `stack` e as `decisions` vêm de lá.
// `order`: slugs na ordem da chamada; projeto com diagrama que não esteja aqui entra depois, na ordem de `projects`.
import { findDiagram } from './diagrams.js'
import { projects } from './projects.js'

export const architectureIntro = {
  lede: {
    pt: 'Como os sistemas que eu projetei são organizados: os componentes, as tecnologias de cada camada e as decisões de arquitetura por trás de cada um.',
    en: 'How the systems I designed are put together: the components, the technologies in each layer and the architecture decisions behind each one.',
  },
  order: ['goprint', 'kittycafe', 'cartas-malfaladas', 'nesse-capitulo', 'wh-harness', 'homelab'],
}

const rank = (slug) => {
  const i = architectureIntro.order.indexOf(slug)
  return i === -1 ? architectureIntro.order.length : i
}

/** Sistemas da chamada: os projetos da lista que têm diagrama, na ordem de `architectureIntro.order`. */
export const architectureSystems = projects
  .filter((p) => findDiagram(p.slug))
  .map((p, i) => ({ p, i }))
  .sort((a, b) => rank(a.p.slug) - rank(b.p.slug) || a.i - b.i)
  .map(({ p }) => p)

/** `id` do bloco de arquitetura na página do projeto, e o link que abre a página já nele. */
export const ARCHITECTURE_ID = 'architecture'
export const architectureHref = (slug) => `/projects/${slug}#${ARCHITECTURE_ID}`
