import { Link, useParams } from 'react-router'
import { findDiagram } from '../content/diagrams.js'
import { findProject, projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { ArchDiagram } from '../components/ArchDiagram.jsx'
import { Decisions } from '../components/Decisions.jsx'
import { Zoom } from '../components/Lightbox.jsx'
import { useLightbox } from '../components/useLightbox.jsx'
import { Media } from '../components/Media.jsx'
import { ProjectEmbed } from '../components/ProjectEmbed.jsx'
import { Tags } from '../components/Tags.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import { NotFound } from './NotFound.jsx'
import './project-detail.css'

const isExternal = (url) => /^https?:\/\//.test(url)

// Tópicos do resumo do topo (`brief`), na ordem em que aparecem, com a chave do rótulo.
const BRIEF_ITEMS = [
  ['problem', 'briefProblem'],
  ['action', 'briefAction'],
  ['result', 'briefResult'],
]

function Fact({ label, children }) {
  return (
    <div className="facts__item">
      <dt className="mono">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

// Corpo de uma seção do estudo de caso: parágrafos e, se houver, passos numerados, links e um trecho.
function SectionBody({ section }) {
  const { l } = useI18n()
  const { paragraphs, steps = [], links = [], excerpt = null } = section

  return (
    <>
      {paragraphs.map((p, j) => (
        <p key={j}>{l(p)}</p>
      ))}
      {steps.length > 0 && (
        <ol className="project__steps">
          {steps.map((step) => (
            <li key={l(step.label)}>
              <strong>{l(step.label)}</strong> {l(step.text)}
            </li>
          ))}
        </ol>
      )}
      {links.length > 0 && (
        <div className="link-row">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link" target="_blank" rel="noreferrer">
              {l(link.label)} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
      {excerpt && (
        <figure className="project__excerpt">
          <figcaption className="mono">{l(excerpt.caption)}</figcaption>
          <pre className="mono">{excerpt.lines.join('\n')}</pre>
        </figure>
      )}
    </>
  )
}

function Project({ project }) {
  const { t, l } = useI18n()
  const index = projects.indexOf(project)
  const many = projects.length > 1
  const next = many ? projects[(index + 1) % projects.length] : null
  const prev = many ? projects[(index - 1 + projects.length) % projects.length] : null
  const sections = project.sections.filter((s) => s.paragraphs.length > 0 || s.steps?.length > 0)
  const gallery = project.gallery ?? []
  const { facts } = project
  const demoNote = l(project.demoNote)
  const brief = BRIEF_ITEMS.filter(([key]) => project.brief?.[key])
  const decisions = project.decisions ?? []
  const diagram = findDiagram(project.slug)
  const { open, lightbox } = useLightbox(gallery)

  // Blocos numerados do texto, na ordem da página; o número sai da posição na lista.
  const blocks = [
    ...sections.map((section) => ({
      key: `section-${l(section.title)}`,
      title: l(section.title),
      body: <SectionBody section={section} />,
    })),
    // Com capa, o diagrama vira a seção "Arquitetura"; sem capa, ele ocupa o lugar da capa.
    project.cover &&
      diagram && {
        key: 'diagram',
        title: t('diagramTitle'),
        body: (
          <div className="project__diagram">
            <ArchDiagram diagram={diagram} />
          </div>
        ),
      },
    decisions.length > 0 && {
      key: 'decisions',
      title: t('decisionsTitle'),
      body: <Decisions items={decisions} />,
    },
    gallery.length > 0 && {
      key: 'gallery',
      title: t('gallery'),
      body: (
        <div className="project__gallery">
          {gallery.map((img, i) => (
            <Zoom key={img.src} onClick={() => open(i)} className="project__shot">
              <Media src={img.src} alt={img.alt} ratio="4 / 3" />
            </Zoom>
          ))}
        </div>
      ),
    },
  ].filter(Boolean)

  return (
    <div className="container page project">
      <Link to="/projects" className="link link--muted project__back">
        {t('backToProjects')}
      </Link>

      <div className="project__intro">
        <div className="project__meta mono">
          <span>{l(project.period)}</span>
          <span>{l(project.kind)}</span>
        </div>
        <h1 className="project__title">{l(project.title)}</h1>
        <p className="project__lede">{l(project.lede)}</p>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            className="btn btn--secondary project__demo"
            {...(isExternal(project.demoUrl) && { target: '_blank', rel: 'noreferrer' })}
          >
            {t('demoButton')} <span aria-hidden="true">{isExternal(project.demoUrl) ? '↗' : '→'}</span>
          </a>
        )}
        {demoNote && <p className="project__demo-note mono">{demoNote}</p>}
      </div>

      {project.cover && (
        <Media src={project.cover} alt={project.title} ratio="21 / 9" className="project__cover" priority />
      )}
      {!project.cover && diagram && (
        <div className="project__diagram project__diagram--cover">
          <ArchDiagram diagram={diagram} />
        </div>
      )}

      {brief.length > 0 && (
        <dl className="project__brief" aria-label={t('briefLabel')}>
          {brief.map(([key, label]) => (
            <div key={key} className="project__brief-item">
              <dt className="mono">{t(label)}</dt>
              <dd>{l(project.brief[key])}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="project__layout">
        <article className="project__body">
          {blocks.map((block, i) => (
            <section key={block.key} className="project__section">
              <h2 className="project__h2">
                <span className="project__num mono">{String(i + 1).padStart(2, '0')}</span>
                {block.title}
              </h2>
              {block.body}
            </section>
          ))}

          <nav aria-label={t('allProjects')} className="project__pager mono">
            {prev && (
              <Link to={`/projects/${prev.slug}`} className="link project__pager-prev">
                ← {t('prevProject')}: {l(prev.title)}
              </Link>
            )}
            <Link to="/projects" className="link link--muted project__pager-all">
              {t('allProjects')}
            </Link>
            {next && (
              <Link to={`/projects/${next.slug}`} className="link project__pager-next">
                {t('nextProject')}: {l(next.title)} →
              </Link>
            )}
          </nav>
        </article>

        <aside aria-label={t('factSheetLabel')} className="facts">
          <span className="eyebrow">{t('factSheet')}</span>
          <dl className="facts__list">
            <Fact label={t('factPeriod')}>{l(project.period)}</Fact>
            {facts.client && <Fact label={t('factClient')}>{l(facts.client)}</Fact>}
            {facts.role && <Fact label={t('factRole')}>{l(facts.role)}</Fact>}
            {facts.status && <Fact label={t('factStatus')}>{l(facts.status)}</Fact>}
            {facts.adoption && <Fact label={t('factAdoption')}>{l(facts.adoption)}</Fact>}
            {facts.commits && <Fact label={t('factCommits')}>{l(facts.commits)}</Fact>}
            {facts.tests && <Fact label={t('factTests')}>{l(facts.tests)}</Fact>}
            {facts.mutation && <Fact label={t('factMutation')}>{l(facts.mutation)}</Fact>}
            {project.tags.length > 0 && (
              <Fact label={t('factTech')}>
                <Tags items={project.tags} />
              </Fact>
            )}
          </dl>
          {(project.repo || project.thesisUrl) && (
            <div className="facts__links">
              {project.repo && (
                <a href={project.repo} className="btn btn--primary btn--block" target="_blank" rel="noreferrer">
                  {t('repositoryButton')} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.thesisUrl && (
                <a
                  href={project.thesisUrl}
                  className="btn btn--secondary btn--block"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('thesisButton')} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
      {project.embedUrl && <ProjectEmbed url={project.embedUrl} title={l(project.title)} note={demoNote} />}
      {lightbox}
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const { t, l } = useI18n()
  const project = findProject(slug)
  usePageTitle(project ? l(project.title) : t('notFoundTitle'))

  if (!project) return <NotFound />
  // `key` zera o estado (visualizador, índice) ao navegar entre projetos.
  return <Project key={project.slug} project={project} />
}
