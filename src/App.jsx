import { Navigate, Route, Routes, useParams } from 'react-router'
import { Layout } from './components/Layout.jsx'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'
import { About } from './pages/About.jsx'
import { Ai } from './pages/Ai.jsx'
import { Achievements } from './pages/Achievements.jsx'
import { Contact } from './pages/Contact.jsx'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ProjectDetail } from './pages/ProjectDetail.jsx'
import { Projects } from './pages/Projects.jsx'
import { Resume } from './pages/Resume.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

// Caminhos antigos em português (links já compartilhados) redirecionam para os atuais, em inglês.
const LEGACY_PATHS = { curriculo: 'resume', projetos: 'projects', conquistas: 'achievements', sobre: 'about', contato: 'contact' }
const LEGACY_PROJECT_SLUGS = { 'analise-comportamental-insetos': 'insect-behavioral-analysis' }

function LegacyProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/projects/${LEGACY_PROJECT_SLUGS[slug] ?? slug}`} replace />
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="resume" element={<Resume />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="ai" element={<Ai />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            {Object.entries(LEGACY_PATHS).map(([pt, en]) => (
              <Route key={pt} path={pt} element={<Navigate to={`/${en}`} replace />} />
            ))}
            <Route path="projetos/:slug" element={<LegacyProjectRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}
