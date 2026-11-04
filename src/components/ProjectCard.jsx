import { Link } from 'react-router'
import { useI18n } from '../i18n/context.js'
import { Media } from './Media.jsx'
import { Tags } from './Tags.jsx'

/**
 * Cartão de projeto. `compact` (Início): capa 16:9, título h3, meta numa linha.
 * Padrão (Projetos): capa 16:10, título h2, selo de patente à direita.
 */
export function ProjectCard({ project, compact = false }) {
  const { t, l } = useI18n()
  const Title = compact ? 'h3' : 'h2'
  const kind = project.patented ? t('patented') : l(project.kind)

  return (
    <article className="card">
      <Media
        src={project.cover}
        alt={project.title}
        ratio={compact ? '16 / 9' : '16 / 10'}
        label={`~/projetos/${project.slug}`}
      />
      <div className="card__body">
        {compact ? (
          <span className="card__meta">
            {l(project.period)} · {kind}
          </span>
        ) : (
          <div className="card__meta">
            <span>{l(project.period)}</span>
            <span className={project.patented ? 'card__badge' : undefined}>
              {project.patented ? `● ${kind}` : kind}
            </span>
          </div>
        )}
        <Title className="card__title">{l(project.title)}</Title>
        <p className="card__text">{l(project.summary)}</p>
        <Tags items={project.tags} />
        <div className="link-row card__links">
          <Link to={`/projetos/${project.slug}`} className="link">
            {t('readCaseStudy')}
          </Link>
          {project.repo && (
            <a href={project.repo} className="link link--muted" target="_blank" rel="noreferrer">
              {t('repository')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
