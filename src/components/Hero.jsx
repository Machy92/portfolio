import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import GlitchText from './GlitchText';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-12, 12]);

    return (
        <section
            id="hero"
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                perspective: '1000px',
            }}
        >
            <div style={{ textAlign: 'center', zIndex: 1 }}>

                {/* CodeCore badge */}
                <motion.a
                    href="https://codecore.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{
                        borderColor: 'rgba(168, 85, 247, 0.4)',
                        background: 'rgba(168, 85, 247, 0.08)',
                    }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '30px',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        marginBottom: '36px',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s',
                        fontWeight: '500',
                    }}
                >
                    {t.hero.workingAt}&nbsp;
                    <strong style={{ color: 'var(--primary)', fontWeight: '700' }}>CodeCore.cz</strong>
                </motion.a>

                {/* Main heading */}
                <motion.h1
                    className="text-gradient"
                    initial={{ opacity: 0, y: 80, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                    style={{
                        fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                        fontWeight: '800',
                        lineHeight: 1.0,
                        marginBottom: '20px',
                        letterSpacing: '-3px',
                        skewX,
                        transformOrigin: 'bottom center',
                        minHeight: '2em',
                    }}
                >
                    <div><GlitchText text={t.hero.title[0]} speed={25} delay={0.2} /></div>
                    <div><GlitchText text={t.hero.title[1]} speed={25} delay={0.5} /></div>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: 'var(--text-secondary)',
                        fontWeight: '400',
                        marginBottom: '48px',
                        letterSpacing: '0.5px',
                    }}
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.7 }}
                    style={{
                        display: 'flex',
                        gap: '14px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(168, 85, 247, 0.45)' }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            display: 'inline-block',
                            padding: '14px 36px',
                            fontSize: '1rem',
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'box-shadow 0.3s',
                        }}
                    >
                        {t.hero.cta}
                    </motion.a>

                    <motion.a
                        href="#about"
                        whileHover={{
                            scale: 1.05,
                            borderColor: 'rgba(168, 85, 247, 0.5)',
                            color: 'var(--text-main)',
                        }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            display: 'inline-block',
                            padding: '14px 36px',
                            fontSize: '1rem',
                            background: 'transparent',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-secondary)',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                        }}
                    >
                        {t.hero.learnMore}
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none',
                }}
            >
                <span
                    style={{
                        fontSize: '0.65rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontWeight: '500',
                    }}
                >
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    <ArrowDown size={14} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
