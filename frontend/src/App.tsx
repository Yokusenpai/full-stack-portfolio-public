import { Routes, Route } from 'react-router';
import AboutSection from './pages/about-section';
import ProjectsSection from './pages/project-section';
import ArtSection from './pages/art-section';
import GamesSection from './pages/game-section';
import AdminPage from './pages/AdminPage';
import PublicLayout from './pages/layouts/PublicLayout';
import AdminLayout from './pages/layouts/AdminLayout';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<AboutSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/artworks" element={<ArtSection />} />
        <Route path="/games" element={<GamesSection />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
