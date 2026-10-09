import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { ProjectsPage } from './sections/ProjectsPage';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className='min-h-screen relative font-sans text-brand-light bg-brand-dark'>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </main>
        } />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}

export default App;
