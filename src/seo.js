// Metadados de SEO por rota: título, descrição e imagem usados no pré-render (scripts/prerender.mjs),
// no sitemap.xml e nas tags Open Graph. O HTML pré-renderizado é em inglês (idioma padrão do site).
import { aiPage } from './content/ai.js'
import { profile } from './content/profile.js'
import { projects } from './content/projects.js'
import { strings } from './i18n/strings.js'

export const SITE_URL = 'https://walterdalla.uk'
export const SITE_NAME = 'Walter Dalla'
export const DEFAULT_IMAGE = '/og.png'

const en = (content) => (content && typeof content === 'object' ? content.en : content)

// Buscadores cortam descrições longas; corta na última frase inteira que cabe em ~160 caracteres.
export function shortDescription(text, max = 160) {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max + 1)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  return end > 40 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

const STATIC_ROUTES = [
  {
    path: '/',
    title: `${profile.name} — ${en(profile.tagline)}`,
    description: `${en(profile.pitch)} Portfolio of ${profile.name}: resume, projects, achievements and contact.`,
  },
  {
    path: '/resume',
    title: `${en(strings.resumeTitle)} — ${SITE_NAME}`,
    description: en(strings.resumeLead),
  },
  {
    path: '/projects',
    title: `${en(strings.projectsTitle)} — ${SITE_NAME}`,
    description: en(strings.projectsLead),
  },
  {
    path: '/ai',
    title: `${en(strings.aiTitle)} — ${SITE_NAME}`,
    description: en(aiPage.lede),
  },
  {
    path: '/achievements',
    title: `${en(strings.achievementsTitle)} — ${SITE_NAME}`,
    description: en(strings.achievementsLead),
  },
  {
    path: '/about',
    title: `About — ${SITE_NAME}`,
    description: en(strings.exploreAbout),
  },
  {
    path: '/contact',
    title: `Contact — ${SITE_NAME}`,
    description: `Get in touch with ${profile.name}: e-mail, LinkedIn and GitHub.`,
  },
]

/** Todas as rotas públicas do site, com título, descrição e imagem (en). */
export function seoRoutes() {
  const projectRoutes = projects.map((p) => ({
    path: `/projects/${p.slug}`,
    title: `${en(p.title)} — ${SITE_NAME}`,
    description: en(p.summary),
    image: p.cover ?? DEFAULT_IMAGE,
  }))
  return [...STATIC_ROUTES.map((r) => ({ image: DEFAULT_IMAGE, ...r })), ...projectRoutes].map((r) => ({
    ...r,
    description: shortDescription(r.description),
  }))
}

export const absoluteUrl = (path) => `${SITE_URL}${path === '/' ? '/' : path}`
