import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const staticData = [
    { link: 'https://hostinec-web.vercel.app', tech: ['React', 'Vite', 'Design'], year: '2024' },
    { link: 'https://www.kheadspatherapy.cz',  tech: ['React', 'Framer', 'UX'],   year: '2024' },
    { link: 'https://mbeauty-eight.vercel.app/', tech: ['React', 'Vite', 'Design'], year: '2025' },
    { link: 'https://barelcup.vercel.app/',     tech: ['React', 'Next.js', 'Supabase'], year: '2026' },
];

const ProjectRow = ({ title, link, tech, year, index }) => {
    const num = String(index + 1).padStart(2, '0');
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
        >
            <span className="project-num">{num}</span>
            <span className="project-title">{title}</span>
            <div className="project-tech-tags">
                {tech.map(tag => (
                    <span key={tag} className="tech-tag">{tag}</span>
                ))}
            </div>
            <span className="project-year">{year}</span>
            <ArrowUpRight size={17} className="project-arrow" />
        </motion.a>
    );
};

const Projects = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="section">
            <div className="container">

                <div className="section-header">
                    <span className="section-index">04</span>
                    <span className="section-label-text">{t.projects.title}</span>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', marginBottom: '56px' }}
                >
                    {t.projects.title}
                </motion.h2>

                <div className="project-list">
                    {t.projects.items.map((item, i) => (
                        <ProjectRow
                            key={i}
                            title={item.title}
                            index={i}
                            {...staticData[i]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
