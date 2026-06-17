import React from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpg';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const About = () => {
    const { t, language } = useLanguage();

    const stats = [
        { num: '6+', label: t.about.yearsLabel },
        { num: '10+', label: language === 'cs' ? 'Projektů' : 'Projects' },
        { num: '19',  label: language === 'cs' ? 'Let' : 'Years old' },
    ];

    return (
        <section id="about" className="section">
            <div className="container">

                <div className="section-header">
                    <span className="section-index">01</span>
                    <span className="section-label-text">{t.about.title}</span>
                </div>

                <div className="about-grid">
                    {/* Left: stats + photo */}
                    <div>
                        {stats.map((s, i) => (
                            <m.div key={i} {...fadeUp(i * 0.1)} className="stat-row">
                                <div className="stat-num">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </m.div>
                        ))}

                        <m.div
                            {...fadeUp(0.4)}
                            style={{ marginTop: '40px', position: 'relative', overflow: 'hidden' }}
                        >
                            <img
                                src={profileImg}
                                alt="Matěj Machovský"
                                loading="lazy"
                                decoding="async"
                                style={{
                                    width: '100%',
                                    aspectRatio: '3/4',
                                    objectFit: 'cover',
                                    objectPosition: '85% 20%',
                                    display: 'block',
                                    filter: 'grayscale(15%)',
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0,
                                padding: '20px 16px 14px',
                                background: 'linear-gradient(transparent, rgba(13,13,15,0.85))',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.6rem',
                                color: 'rgba(255,255,255,0.45)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}>
                                Matěj Machovský — 2026
                            </div>
                        </m.div>
                    </div>

                    {/* Right: heading + bio + info grid */}
                    <div>
                        <m.h2
                            {...fadeUp(0.1)}
                            style={{
                                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                                marginBottom: '28px',
                            }}
                        >
                            {t.about.title}
                        </m.h2>

                        <m.p
                            {...fadeUp(0.2)}
                            style={{
                                fontSize: '1.05rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.75,
                                marginBottom: '48px',
                                maxWidth: '520px',
                            }}
                        >
                            {t.about.bio}
                        </m.p>

                        <div className="info-grid">
                            {t.about.cards.map((card, i) => (
                                <m.div
                                    key={i}
                                    {...fadeUp(0.1 + i * 0.07)}
                                    className="info-cell"
                                >
                                    <div style={{
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '0.6rem',
                                        color: 'var(--accent)',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        marginBottom: '8px',
                                    }}>
                                        {card.title}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.6,
                                    }}>
                                        {card.desc}
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
