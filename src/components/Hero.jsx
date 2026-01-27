import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlitchText from './GlitchText';

const Hero = () => {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Skew effect based on velocity
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-15, 15]);

    return (
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', perspective: '1000px' }}>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
                <motion.h1
                    className="text-gradient"
                    initial={{ opacity: 0, y: 100, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        letterSpacing: '-2px',
                        skewX, // Apply kinetic skew
                        transformOrigin: "bottom center",
                        minHeight: '2.2em' // Prevent layout shift during loading
                    }}
                >
                    <div style={{ display: 'block' }}>
                        <GlitchText text={t.hero.title[0]} speed={40} delay={0.2} />
                    </div>
                    <div style={{ display: 'block' }}>
                        <GlitchText text={t.hero.title[1]} speed={40} delay={0.8} />
                    </div>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--text-secondary)', fontWeight: '400', marginBottom: '40px' }}
                >
                    {t.hero.subtitle}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 30px var(--primary)' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            fontSize: '1.2rem',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                        }}
                    >
                        {t.hero.cta}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
