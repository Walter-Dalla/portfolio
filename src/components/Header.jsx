import { Link, NavLink } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { useTheme } from '../theme/context.js'
import { MoonIcon, SunIcon } from './Icons.jsx'

const NAV_ITEMS = [
  { to: '/', key: 'navHome', end: true },
  { to: '/resume', key: 'navResume' },
  { to: '/projects', key: 'navProjects' },
  { to: '/achievements', key: 'navAchievements' },
  { to: '/about', key: 'navAbout' },
  { to: '/contact', key: 'navContact' },
]

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          ~/walter-dalla
        </Link>
        <div className="site-header__tools">
          <nav aria-label={t('navLabel')} className="site-nav">
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
          </div>
        </div>
      </div>
    </header>
  )
}
