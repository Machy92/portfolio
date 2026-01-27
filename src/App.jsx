import React, { useState } from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MouseTrail from './components/MouseTrail';
import LanguageSwitcher from './components/LanguageSwitcher';
import SmoothScroll from './components/SmoothScroll';
import { LanguageProvider } from './context/LanguageContext';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <Cursor />
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <MouseTrail />
          <LanguageSwitcher />
          <Background />
          <SmoothScroll>
            <div className="App">
              <Hero />
              <Skills />
              <Services />
              <About />
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
