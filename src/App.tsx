import { Routes, Route } from 'react-router-dom'
import HeroPage from './pages/HeroPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      {/* сторінки проєктів — додаси пізніше */}
      {/* <Route path="/projects/:slug" element={<ProjectPage />} /> */}
    </Routes>
  )
}

export default App