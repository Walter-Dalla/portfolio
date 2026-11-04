import { Link, useParams } from 'react-router'
import { findProject, projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { Media } from '../components/Media.jsx'
import { Tags } from '../components/Tags.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import { NotFound } from './NotFound.jsx'
import './project-detail.css'

function Fact({ label, children }) {
  return (
    <div className="facts__item">
      <dt className="mono">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const { t, l } = useI18n()
  const project = findProject(slug)
  usePageTitle(project ? l(project.title) : t('notFoundTitle'))

  if (!project) return <NotFound />

  const index = projects.indexOf(project)
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null
  const sections = project.sections.filter((s) => s.paragraphs.length > 0)
  const gallery = project.gallery ?? []
  const { facts } = project

  return (
    <div className="container page project">
      <Link to="/projetos" className="link link--muted project__back">
        {t('backToProjects')}
      </Link>

      <div className="project__intro">
        <div className="project__meta mono">
          {project.patented && <span className="project__badge">● {t('patented')}</span>}
          <span>{l(project.period)}</span>
          <span>{l(project.kind)}</span>
        </div>
        <h1 className="project__title">{l(project.title)}</h1>
        <p className="project__lede">{l(project.lede)}</p>
      </div>

      <Media
        src={project.cover}
        alt={project.title}
        ratio="21 / 9"
        className="project__cover"
        label={`~/projetos/${project.slug}`}
      />

      <div className="project__layout">
        <article className="project__body">
          {sections.map((section, i) => (
            <section key={l(section.title)} className="project__section">
              <h2 className="project__h2">
                <span className="project__num mono">{String(i + 1).padStart(2, '0')}</span>
                {l(section.title)}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j}>{l(p)}</p>
              ))}
            </section>
          ))}

          {gallery.length > 0 && (
            <section className="project__section">
              <h2 className="project__h2">
                <span className="project__num mono">{String(sections.length + 1).padStart(2, '0')}</span>
                {t('gallery')}
              </h2>
              <div className="project__gallery">
                {gallery.map((img) => (
                  <Media key={img.src} src={img.src} alt={img.alt} ratio="4 / 3" className="project__shot" />
                ))}
              </div>
            </section>
          )}

          <nav className="project__pager mono">
            <Link to="/projetos" className="link link--muted">
              {t('allProjects')}
            </Link>
            {next && (
              <Link to={`/projetos/${next.slug}`} className="link">
                {t('nextProject')}: {l(next.title)} →
              </Link>
            )}
          </nav>
        </article>

        <aside aria-label={t('factSheetLabel')} className="facts">
          <span className="eyebrow">{t('factSheet')}</span>
          <dl className="facts__list">
            <Fact label={t('factPeriod')}>{l(project.period)}</Fact>
            {facts.role && <Fact label={t('factRole')}>{l(facts.role)}</Fact>}
            {facts.status && <Fact label={t('factStatus')}>{l(facts.status)}</Fact>}
            {facts.adoption && <Fact label={t('factAdoption')}>{l(facts.adoption)}</Fact>}
            {project.tags.length > 0 && (
              <Fact label={t('factTech')}>
                <Tags items={project.tags} />
              </Fact>
            )}
          </dl>
          {(project.repo || project.patentUrl) && (
            <div className="facts__links">
              {project.repo && (
                <a href={project.repo} className="btn btn--primary btn--block" target="_blank" rel="noreferrer">
                  {t('repositoryButton')} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.patentUrl && (
                <a
                  href={project.patentUrl}
                  className="btn btn--secondary btn--block"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('patentButton')} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
