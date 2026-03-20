import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const HeroPage = lazy(() => import('./pages/HeroPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </Suspense>
  )
}

export default App