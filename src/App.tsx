import { Routes, Route } from 'react-router-dom'
import HeroSection from '../components/HeroSection'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      {/* сторінки проєктів — додаси пізніше */}
      {/* <Route path="/projects/:slug" element={<ProjectPage />} /> */}
    </Routes>
  )
}

export default App