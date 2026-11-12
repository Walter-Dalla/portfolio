import { Link } from 'react-router'
import { findDiagram } from '../content/diagrams.js'
import { useI18n } from '../i18n/context.js'
import { ArchDiagram } from './ArchDiagram.jsx'
import { Media } from './Media.jsx'
import { Tags } from './Tags.jsx'

/**
 * Cartão de projeto. Capa e título levam ao estudo de caso; o cartão inteiro reage ao mouse.
 * `compact` (Início): capa 16:9, título h3, meta numa linha. Padrão (Projetos): capa 16:10, título h2, tipo à direita.
 * Sem `cover`, a miniatura do diagrama de arquitetura (se houver) ou uma faixa baixa com o caminho substitui a capa.
 */
export function ProjectCard({ project, compact = false }) {
  const { t, l } = useI18n()
  const Title = compact ? 'h3' : 'h2'
  const kind = l(project.kind)
  const href = `/projects/${project.slug}`
  const diagram = project.cover ? null : findDiagram(project.slug)

  return (
    <article className="card card--link">
      {project.cover ? (
        <Link to={href} className="card__cover" tabIndex={-1} aria-hidden="true">
          <Media src={project.cover} alt={project.title} ratio={compact ? '16 / 9' : '16 / 10'} />
        </Link>
      ) : diagram ? (
        <Link
          to={href}
          className="card__cover card__cover--diagram"
          tabIndex={-1}
          aria-hidden="true"
          style={{ aspectRatio: compact ? '16 / 9' : '16 / 10' }}
        >
          <ArchDiagram diagram={diagram} compact />
        </Link>
      ) : (
        <span className="card__path mono" aria-hidden="true">
          ~/projects/{project.slug} · {t('noCover')}
        </span>
      )}
      <div className="card__body">
        {compact ? (
          <span className="card__meta">
            {l(project.period)} · {kind}
          </span>
        ) : (
          <div className="card__meta">
            <span>{l(project.period)}</span>
            <span>{kind}</span>
          </div>
        )}
        <Title className="card__title">
          <Link to={href}>{l(project.title)}</Link>
        </Title>
        <p className="card__text">{l(project.summary)}</p>
        <Tags items={project.tags} />
        <div className="link-row card__links">
          <Link to={href} className="link" tabIndex={-1}>
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
