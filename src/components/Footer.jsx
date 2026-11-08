import { NavLink } from 'react-router'
import { profile } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'
import { CopyButton } from './CopyButton.jsx'
import { NAV_ITEMS } from './nav.js'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <nav aria-label={t('footerNavLabel')} className="site-footer__nav mono">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="link link--muted">
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="site-footer__row">
          <span>
            © {year} {profile.name} · {t('footerRights')}
          </span>
          <div className="site-footer__links mono">
            <a href={`mailto:${profile.email}`} className="link link--muted">
              {t('email')}
            </a>
            <CopyButton text={profile.email} label={t('copyEmail')} className="link link--muted site-footer__copy" />
            <a href={profile.linkedin} className="link link--muted" target="_blank" rel="noreferrer">
              linkedin
            </a>
            <a href={profile.github} className="link link--muted" target="_blank" rel="noreferrer">
              github
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
