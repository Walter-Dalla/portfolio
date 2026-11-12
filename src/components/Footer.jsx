import { useLocation } from 'react-router'
import { company, profile } from '../content/profile.js'
import { useI18n } from '../i18n/context.js'
import { CopyButton } from './CopyButton.jsx'

export function Footer() {
  const { t } = useI18n()
  // No Início o cartão "Atendimento como PJ" já traz os mesmos três contatos logo acima.
  const showContact = !(useLocation().pathname === '/' && company)
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        {showContact && (
          <section className="site-footer__contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="site-footer__title">
              {t('footerContactTitle')}
            </h2>
            <ul className="site-footer__contact-list">
              <li className="site-footer__contact-item">
                <span className="mono site-footer__label">{t('email')}</span>
                <span className="site-footer__value">
                  <a href={`mailto:${profile.email}`} className="link link--text site-footer__address">
                    {profile.email}
                  </a>
                  <CopyButton text={profile.email} label={t('copyEmail')} className="link link--muted copy-link" />
                </span>
              </li>
              <li className="site-footer__contact-item">
                <span className="mono site-footer__label">linkedin</span>
                <span className="site-footer__value">
                  <a href={profile.linkedin} className="link link--text site-footer__address" target="_blank" rel="noreferrer">
                    {profile.linkedinHandle}
                  </a>
                </span>
              </li>
              <li className="site-footer__contact-item">
                <span className="mono site-footer__label">github</span>
                <span className="site-footer__value">
                  <a href={profile.github} className="link link--text site-footer__address" target="_blank" rel="noreferrer">
                    {profile.githubHandle}
                  </a>
                </span>
              </li>
            </ul>
          </section>
        )}
        <span>
          {profile.name} · {t('footerRights')}
        </span>
      </div>
    </footer>
  )
}
