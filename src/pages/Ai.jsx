import { Link } from 'react-router'
import { aiPage } from '../content/ai.js'
import { experiences } from '../content/experiences.js'
import { findProject, projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { Rich } from '../components/Rich.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import './ai.css'

const HARNESS_SLUG = 'wh-harness'

// Bullets do currículo marcados com `ai`, agrupados pelo cargo de onde vieram (entrada simples ou
// grupo de vínculos). Agrupa pelo cargo, não pelo texto da empresa, que muda com o idioma.
const aiWork = experiences
  .flatMap((entry) => entry.positions ?? [entry])
  .map((position) => ({ position, bullets: position.bullets.filter((b) => b.ai) }))
  .filter((group) => group.bullets.length > 0)

// Projetos com texto de IA, sem o wh-harness (que tem seção própria), na ordem de `aiPage.order`.
const rank = (slug) => {
  const i = aiPage.order.indexOf(slug)
  return i === -1 ? aiPage.order.length : i
}
const aiProjects = projects
  .filter((p) => p.ai && p.slug !== HARNESS_SLUG)
  .map((p, i) => ({ p, i }))
  .sort((a, b) => rank(a.p.slug) - rank(b.p.slug) || a.i - b.i)
  .map(({ p }) => p)

export function Ai() {
  const { t, l } = useI18n()
  usePageTitle(t('aiTitle'))
  const harness = findProject(HARNESS_SLUG)

  return (
    <div className="container page ai">
      <section className="ai__intro">
        <span className="eyebrow">$ cat ai-workflow.md</span>
        <h1 className="page-title">{t('aiTitle')}</h1>
        <p className="ai__lede">{l(aiPage.lede)}</p>
      </section>

      <section className="ai__section">
        <SectionHeading eyebrow={t('aiWorkEyebrow')} title={t('aiWorkTitle')} />
        <ul className="ai-work">
          {aiWork.map(({ position, bullets }, i) => (
            <li key={i} className="ai-work__item">
              <span className="ai-work__company mono">{l(position.company)}</span>
              <ul className="ai-work__bullets">
                {bullets.map((bullet, j) => (
                  <li key={j}>
                    <Rich text={l(bullet)} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Link to="/resume" className="link">
          {t('aiSeeResume')}
        </Link>
      </section>

      {harness && (
        <section className="ai__section">
          <SectionHeading eyebrow={t('aiHarnessEyebrow')} title={t('aiHarnessTitle')} />
          <p className="ai__p">{l(harness.summary)}</p>
          {harness.ai && <p className="ai__p">{l(harness.ai)}</p>}
          <Link to={`/projects/${harness.slug}`} className="link">
            {t('aiSeeProject')}
          </Link>
        </section>
      )}

      {aiProjects.length > 0 && (
        <section className="ai__section">
          <SectionHeading eyebrow={t('aiProjectsEyebrow')} title={t('aiProjectsTitle')} />
          <div className="grid ai-projects">
            {aiProjects.map((project) => (
              <article key={project.slug} className="card">
                <div className="card__body">
                  <h3 className="card__title">{l(project.title)}</h3>
                  <p className="card__text">{l(project.ai)}</p>
                  <div className="link-row card__links">
                    <Link to={`/projects/${project.slug}`} className="link">
                      {t('aiSeeProject')}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
