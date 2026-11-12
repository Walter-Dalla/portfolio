// Pré-render para SEO: roda depois de `vite build` (cliente) e `vite build --ssr` (dist-ssr/).
// Para cada rota pública gera um .html em dist/ com o app já renderizado em inglês, título,
// descrição, canonical e Open Graph próprios; também gera dist/404.html e dist/sitemap.xml (sem as rotas `noindex`).
// O GitHub Pages serve `/resume` a partir de `resume.html`, sem redirecionar para `/resume/`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, seoRoutes, sitemapRoutes, absoluteUrl, SITE_NAME } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function page({ path, title, description, image, html, route, noindex = false }) {
  const url = absoluteUrl(path)
  const head = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${path === '/' ? 'profile' : 'article'}" />`,
    `<meta property="og:site_name" content="${escape(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="pt_BR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:image" content="${absoluteUrl(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${absoluteUrl(image)}" />`,
    // Página só para link direto (projeto fora da lista): pré-renderizada, mas fora dos buscadores.
    ...(noindex ? ['<meta name="robots" content="noindex" />'] : []),
  ].join('\n    ')
  return template
    .replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, head)
    .replace('<div id="root"></div>', `<div id="root" data-route="${escape(route)}">${html}</div>`)
}

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

const routes = seoRoutes()
for (const r of routes) {
  const file = r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`
  await write(join(dist, file), page({ ...r, html: render(r.path), route: r.path }))
}

// Caminho desconhecido no GitHub Pages cai no 404.html; data-route="404" nunca bate com a URL,
// então o cliente renderiza do zero (inclusive os redirecionamentos de caminhos antigos).
await write(
  join(dist, '404.html'),
  page({
    path: '/404',
    title: `Page not found — ${SITE_NAME}`,
    description: 'This page does not exist.',
    image: routes[0].image,
    html: render('/404'),
    route: '404',
  }).replace(/<link rel="canonical"[^>]*>\n\s*/, '<meta name="robots" content="noindex" />\n    '),
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes().map((r) => `  <url><loc>${absoluteUrl(r.path)}</loc></url>`).join('\n')}
</urlset>
`
await write(join(dist, 'sitemap.xml'), sitemap)
await rm(ssrDir, { recursive: true, force: true })
console.log(`pré-render: ${routes.length} rotas + 404.html + sitemap.xml`)
