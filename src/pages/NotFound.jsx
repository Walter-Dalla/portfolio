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
      </section>
    </div>
  )
}
