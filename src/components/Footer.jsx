import { profile } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>
          © {year} {profile.name} · {t('footerRights')}
        </span>
        <div className="site-footer__links mono">
          <a href={`mailto:${profile.email}`} className="link link--muted">
            {t('email')}
          </a>
          <a href={profile.linkedin} className="link link--muted" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={profile.github} className="link link--muted" target="_blank" rel="noreferrer">
            github
          </a>
        </div>
      </div>
    </footer>
  )
}
