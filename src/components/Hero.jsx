import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const Hero = () => {
    const { t, language } = useLanguage();

    return (
        <section
            id="hero"
            style={{
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingTop: 'var(--nav-height)',
                paddingBottom: '72px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Available dot — top right */}
            <motion.div
                {...fadeUp(0.6)}
                style={{
                    position: 'absolute',
                    top: 'calc(var(--nav-height) + 28px)',
                    right: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#22C55E',
                    display: 'inline-block',
                    animation: 'pulse-dot 2s infinite',
                    flexShrink: 0,
                }} />
                <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}>
                    {language === 'cs' ? 'Dostupný pro projekty' : 'Available for projects'}
                </span>
            </motion.div>

            {/* Background year — decorative */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    right: '-16px',
                    bottom: '48px',
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 'clamp(160px, 28vw, 380px)',
                    color: 'rgba(255,255,255,0.022)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
            >
                '26
            </div>

            <div className="container">
                {/* CodeCore badge */}
                <motion.div {...fadeUp(0.3)} style={{ marginBottom: '28px' }}>
                    <a
                        href="https://codecore.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.65rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                            padding: '6px 14px',
                            textDecoration: 'none',
                            transition: 'border-color 0.2s, color 0.2s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        <span style={{ color: 'var(--accent)', fontSize: '0.55rem' }}>▶</span>
                        {t.hero.workingAt} CodeCore.cz
                    </a>
                </motion.div>

                {/* Name */}
                <motion.h1
                    {...fadeUp(0.45)}
                    style={{
                        fontSize: 'clamp(4rem, 14vw, 14rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 0.88,
                        marginBottom: '36px',
                    }}
                >
                    {t.hero.title[0]}
                    <br />
                    {t.hero.title[1]}
                </motion.h1>

                {/* Bottom row */}
                <motion.div
                    {...fadeUp(0.6)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '24px',
                        borderTop: '1px solid var(--border)',
                        paddingTop: '28px',
                    }}
                >
                    <div>
                        <p style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                        }}>
                            {t.hero.subtitle}
                        </p>
                        <p style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.62rem',
                            color: 'var(--text-subtle)',
                            letterSpacing: '0.06em',
                        }}>
                            Ústí nad Labem, CZ
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a href="#projects" className="btn-primary">
                            {t.hero.cta} <ArrowRight size={15} />
                        </a>
                        <a href="#about" className="btn-outline">
                            {t.hero.learnMore}
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: '28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'var(--text-subtle)',
                }}
            >
                <ArrowDown size={17} />
            </motion.div>
        </section>
    );
};

export default Hero;
