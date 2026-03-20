import { Routes, Route } from 'react-router-dom'
import HeroPage from './pages/HeroPage'
import ProjectPage from './pages/ProjectPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  )
}

export default App