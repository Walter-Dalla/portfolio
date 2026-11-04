import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'
import './layout.css'

export function Layout() {
  const { t } = useI18n()
  const { pathname } = useLocation()

  // Cada rota abre no topo, como uma página nova.
  useEffect(() => {
    window.scrollTo?.(0, 0)
  }, [pathname])

  return (
    <div className="site">
      <a href="#conteudo" className="skip-link">
        {t('skipToContent')}
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
