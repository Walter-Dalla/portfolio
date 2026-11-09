import { useSearchParams } from 'react-router'
import { projectCategories, projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import './projects.css'

// O filtro vive na URL (?cat=web): o link é compartilhável e "voltar" do estudo de caso o preserva.
const FILTER_PARAM = 'cat'

export function Projects() {
  const { t, l } = useI18n()
  usePageTitle(t('projectsTitle'))
  const [searchParams, setSearchParams] = useSearchParams()

  // Só categorias com pelo menos um projeto viram filtro.
  const categories = projectCategories.filter((c) => projects.some((p) => p.categories.includes(c.id)))
  const requested = searchParams.get(FILTER_PARAM)
  const filter = categories.some((c) => c.id === requested) ? requested : 'all'
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  function setFilter(id) {
    const next = new URLSearchParams(searchParams)
    if (id === 'all') next.delete(FILTER_PARAM)
    else next.set(FILTER_PARAM, id)
    setSearchParams(next, { replace: true })
  }

  const chips = [{ id: 'all', label: `${t('filterAll')} · ${projects.length}` }, ...categories]

  return (
    <div className="container page projects">
      <section className="page-intro">
        <span className="eyebrow">$ ls ~/projects</span>
        <h1 className="page-title">{t('projectsTitle')}</h1>
        <p className="lead">{t('projectsLead')}</p>
      </section>

      <div role="group" aria-label={t('filterLabel')} className="chips">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            aria-pressed={filter === chip.id}
            onClick={() => setFilter(chip.id)}
          >
            {l(chip.label)}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid projects__grid">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="lead">{t('noProjects')}</p>
      )}
    </div>
  )
}
