import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  // Logic for the fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Helmet>
        <title>Arnav Khamparia - Machine Learning Engineer</title>
      </Helmet>
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
              </main>
            }
          />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;