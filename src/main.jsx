import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/global.css'
import { App } from './App.jsx'
import { detectLang } from './i18n/detect.js'
import { readStored } from './storage.js'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// O build pré-renderiza cada rota em inglês e tema escuro (scripts/prerender.mjs) e marca a rota em
// data-route. Só hidrata quando o HTML pronto bate com a página pedida, o idioma inicial é inglês
// (escolha salva ou, sem ela, navegador fora do português) e o tema salvo é escuro ou nenhum; nos
// outros casos descarta o HTML e renderiza do zero, como uma SPA comum.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const theme = readStored('wd-theme')
const canHydrate =
  root.hasChildNodes() &&
  root.dataset.route === path &&
  detectLang() === 'en' &&
  (theme === null || theme === 'dark')

if (canHydrate) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
