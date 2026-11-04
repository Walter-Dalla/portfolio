import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout.jsx'
import { LanguageProvider } from './i18n/LanguageProvider.jsx'
import { About } from './pages/About.jsx'
import { Achievements } from './pages/Achievements.jsx'
import { Contact } from './pages/Contact.jsx'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ProjectDetail } from './pages/ProjectDetail.jsx'
import { Projects } from './pages/Projects.jsx'
import { Resume } from './pages/Resume.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="curriculo" element={<Resume />} />
            <Route path="projetos" element={<Projects />} />
            <Route path="projetos/:slug" element={<ProjectDetail />} />
            <Route path="conquistas" element={<Achievements />} />
            <Route path="sobre" element={<About />} />
            <Route path="contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}
