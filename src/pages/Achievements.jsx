import { Link } from 'react-router'
import { achievements, featuredAchievement as featured } from '../content/achievements.js'
import { useI18n } from '../i18n/context.js'
import { Media } from '../components/Media.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import './achievements.css'

const PROOF_LABEL = { proof: 'seeProof', diploma: 'seeDiploma' }

export function Achievements() {
  const { t, l } = useI18n()
  usePageTitle(t('navAchievements'))

  return (
    <div className="container page achievements">
      <section className="page-intro">
        <span className="eyebrow">$ ls conquistas/</span>
        <h1 className="page-title">{t('achievementsTitle')}</h1>
        <p className="lead">{t('achievementsLead')}</p>
      </section>

      <article className="feature">
        <Media src={featured.photo} alt={featured.title} className="feature__media" label="~/conquistas/patente" />
        <div className="feature__body">
          <span className="mono feature__label">{l(featured.label)}</span>
          <h2 className="feature__title">{l(featured.title)}</h2>
          <p className="feature__text">{l(featured.text)}</p>
          <div className="link-row">
            {featured.proofUrl && (
              <a href={featured.proofUrl} className="link" target="_blank" rel="noreferrer">
                {t('seeProof')}
              </a>
            )}
            {featured.projectSlug && (
              <Link to={`/projetos/${featured.projectSlug}`} className="link link--muted">
                {t('aboutProject')}
              </Link>
            )}
          </div>
        </div>
      </article>

      <div className="grid achievements__grid">
        {achievements.map((item) => (
          <article key={l(item.title)} className="card">
            <Media src={item.photo} alt={item.title} ratio="16 / 9" label={l(item.text)} />
            <div className="card__body achievement__body">
              <span className="mono achievement__label">{l(item.label)}</span>
              <h3 className="achievement__title">{l(item.title)}</h3>
              <p className="card__text">{l(item.text)}</p>
              {item.proofUrl && (
                <a href={item.proofUrl} className="link card__links" target="_blank" rel="noreferrer">
                  {t(PROOF_LABEL[item.proofKind])}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
