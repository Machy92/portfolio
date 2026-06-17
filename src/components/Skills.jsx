import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
    "React", "Three.js", "JavaScript", "Node.js", "CSS3", "HTML5",
    "Git", "Framer Motion", "Next.js", "Vite", "Supabase", "TypeScript"
];

const Skills = () => {
    const { t } = useLanguage();

    return (
        <div
            style={{
                overflow: 'hidden',
                padding: '56px 0',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)',
            }}
        >
            <div className="container">
                <p
                    style={{
                        textAlign: 'center',
                        marginBottom: '28px',
                        color: 'var(--text-muted)',
                        fontSize: '0.7rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                    }}
                >
                    {t.skills.title}
                </p>
            </div>

            <div style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        paddingRight: '0',
                    }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <React.Fragment key={index}>
                            <span
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: 'rgba(255, 255, 255, 0.18)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    padding: '0 32px',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                }}
                            >
                                {skill}
                            </span>
                            <span
                                style={{
                                    color: 'var(--primary)',
                                    fontSize: '0.4rem',
                                    opacity: 0.5,
                                    flexShrink: 0,
                                }}
                            >
                                ◆
                            </span>
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
