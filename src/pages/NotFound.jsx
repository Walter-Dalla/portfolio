import { Link } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { usePageTitle } from '../components/usePageTitle.js'

export function NotFound() {
  const { t } = useI18n()
  usePageTitle(t('notFoundTitle'))
  return (
    <div className="container page">
      <section className="page-intro">
        <span className="eyebrow">$ cd ??? · 404</span>
        <h1 className="page-title">{t('notFoundTitle')}</h1>
        <p className="lead">{t('notFoundText')}</p>
        <Link to="/" className="link">
          {t('backHome')}
        </Link>
        <p className="lead not-found__hint">{t('notFoundHint')}</p>
        <nav aria-label={t('notFoundHint')} className="link-row">
          <Link to="/projects" className="link link--text">
            {t('navProjects')} →
          </Link>
          <Link to="/resume" className="link link--text">
            {t('navResume')} →
          </Link>
          <Link to="/contact" className="link link--text">
            {t('navContact')} →
          </Link>
        </nav>
      </section>
    </div>
  )
}
