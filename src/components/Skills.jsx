import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
    "React", "Three.js", "JavaScript", "Node.js", "CSS3", "HTML5",
    "Git", "Framer Motion", "TailwindIDontUse", "Next.js", "Vite", "Supabase"
];

const Skills = () => {
    const { t } = useLanguage();

    return (
        <div style={{ overflowX: 'hidden', padding: '50px 0', background: 'var(--glass-bg)', backdropFilter: 'blur(5px)' }}>
            <div className="container">
                <h3 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-secondary)' }}>{t.skills.title}</h3>
            </div>
            <div style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    style={{ display: 'flex', gap: '50px', paddingRight: '50px' }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <span key={index} style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase'
                        }}>
                            {skill}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
