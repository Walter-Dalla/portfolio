// Entrada do pré-render (scripts/prerender.mjs): renderiza o app em HTML para uma URL.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import './styles/global.css'
import { App } from './App.jsx'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { absoluteUrl, seoRoutes, sitemapRoutes, SITE_NAME } from './seo.js'
