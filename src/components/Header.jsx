import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { useTheme } from '../theme/context.js'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from './Icons.jsx'
import { NAV_ITEMS } from './nav.js'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  // No celular a navegação fica num menu; no desktop ela está sempre visível (CSS).
  // O menu guarda a rota em que foi aberto: trocar de página fecha sem precisar de efeito.
  const [openAt, setOpenAt] = useState(null)
  const menuOpen = openAt === pathname
  const toggleMenu = () => setOpenAt(menuOpen ? null : pathname)

  useEffect(() => {
    if (!menuOpen) return undefined
    function onKey(e) {
      if (e.key === 'Escape') setOpenAt(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`site-header${menuOpen ? ' site-header--open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          ~/walter-dalla
        </Link>
        <div className="site-header__tools">
          <nav id="site-nav" aria-label={t('navLabel')} className="site-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className="site-nav__link">
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <div className="site-header__toggles">
            <div role="group" aria-label={t('langLabel')} className="lang-toggle">
              {['pt', 'en'].map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={lang === code}
                  className="lang-toggle__btn"
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="theme-toggle"
              aria-label={t('themeToggle')}
              onClick={toggleTheme}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={toggleMenu}
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
