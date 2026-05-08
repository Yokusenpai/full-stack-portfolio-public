import { Routes, Route } from 'react-router';
import MainLayout from './MainLayout';
import AboutSection from './pages/about-section';
import ProjectsSection from './pages/project-section';
import ArtSection from './pages/art-section';
import GamesSection from './pages/game-section';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <MainLayout>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/artworks" element={<ArtSection />} />
        <Route path="/games" element={<GamesSection />} />
      </Routes>
      <Footer />
    </MainLayout>
  );
}

export default App;
