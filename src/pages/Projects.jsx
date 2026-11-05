import { useState } from 'react'
import { projectCategories, projects } from '../content/projects.js'
import { useI18n } from '../i18n/context.js'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { usePageTitle } from '../components/usePageTitle.js'
import './projects.css'

export function Projects() {
  const { t, l } = useI18n()
  usePageTitle(t('projectsTitle'))
  const [filter, setFilter] = useState('all')

  // Só categorias com pelo menos um projeto viram filtro.
  const categories = projectCategories.filter((c) => projects.some((p) => p.categories.includes(c.id)))
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

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
