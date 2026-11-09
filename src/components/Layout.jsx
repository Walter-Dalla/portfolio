import { Outlet } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { BackToTop } from './BackToTop.jsx'
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'
import { useScrollRestoration } from './useScrollRestoration.js'
import './layout.css'

export function Layout() {
  const { t } = useI18n()
  // Rota nova abre no topo; "voltar" restaura a posição anterior.
  useScrollRestoration()

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
      <BackToTop />
    </div>
  )
}
