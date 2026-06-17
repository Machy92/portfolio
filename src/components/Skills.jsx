import React from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'Three.js', 'Framer Motion', 'Tailwind', 'CSS',
    'Node.js', 'Supabase', 'Vite', 'Git',
    'Figma', 'HTML5', 'WebGL', 'REST APIs',
];

const Skills = () => {
    const { t } = useLanguage();

    return (
        <section id="skills" className="section">
            <div className="container">

                <div className="section-header">
                    <span className="section-index">03</span>
                    <span className="section-label-text">{t.skills.title}</span>
                </div>

                <m.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', marginBottom: '56px' }}
                >
                    {t.skills.title}
                </m.h2>

                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <m.div
                            key={skill}
                            className="skill-item"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.035 }}
                        >
                            {skill}
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
