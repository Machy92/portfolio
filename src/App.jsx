import React, { useState } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import { LanguageProvider } from './context/LanguageContext';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <Background />
          <SmoothScroll>
            <div className="App">
              <Hero />
              <About />
              <Services />
              <Skills />
              <Projects />
              <Contact />
            </div>
          </SmoothScroll>
        </>
      )}
    </LanguageProvider>
  );
}

export default App;
