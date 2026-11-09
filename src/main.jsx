import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App.jsx'
import { readStored } from './storage.js'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// O build pré-renderiza cada rota em inglês e tema escuro (scripts/prerender.mjs) e marca a rota em
// data-route. Só hidrata quando o HTML pronto bate com a página pedida e com as preferências salvas;
// nos outros casos descarta o HTML e renderiza do zero, como uma SPA comum.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const lang = readStored('wd-lang')
const theme = readStored('wd-theme')
const canHydrate =
  root.hasChildNodes() &&
  root.dataset.route === path &&
  (lang === null || lang === 'en') &&
  (theme === null || theme === 'dark')

if (canHydrate) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
