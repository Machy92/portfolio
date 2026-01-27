import React from 'react';
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

function App() {
  return (
    <LanguageProvider>
      <Cursor />
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
    </LanguageProvider>
  );
}

export default App;
