import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import hostinecImg from '../assets/hostinec.png';
import spaImg from '../assets/spa.png';

const ProjectItem = ({ title, desc, link, tech, index, isPlaceholder, img, t }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect: Image moves faster/slower than text
    const yDisplace = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', // Zig-zag layout
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '100px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                position: 'relative'
            }}
            className="project-item"
        >
            {/* Text Content */}
            <div style={{ width: '45%', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {tech.map((item, i) => (
                        <span key={i} style={{
                            fontSize: '0.9rem',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            fontWeight: '600'
                        }}>
                            {item}
                        </span>
                    ))}
                </div>

                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1, marginBottom: '30px', textTransform: 'uppercase' }}>
                    {title}
                </h2>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6 }}>
                    {desc}
                </p>

                <motion.a
                    href={link || "#"}
                    target={link ? "_blank" : ""}
                    rel="noopener noreferrer"
                    whileHover={{ x: 10 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        textDecoration: 'none',
                        cursor: isPlaceholder ? 'not-allowed' : 'pointer',
                        opacity: isPlaceholder ? 0.5 : 1
                    }}
                >
                    {isPlaceholder ? t.projects.inDev : t.projects.viewLive}
                    {!isPlaceholder && <ArrowUpRight size={28} />}
                </motion.a>
            </div>

            {/* Parallax Image / Visualization */}
            <motion.div
                style={{
                    width: '45%',
                    height: '400px',
                    y: yDisplace, // Parallax movement
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    position: 'relative',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
            >
                {img ? (
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={img}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(45deg, #333, #000)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '5rem', fontWeight: '900', opacity: 0.1, color: 'var(--text-main)' }}>
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useLanguage();

    const staticData = [
        {
            link: "https://hostinec-web.vercel.app",
            tech: ["React", "Vite", "Design"],
            img: hostinecImg,
            isPlaceholder: false
        },
        {
            link: "https://www.kheadspatherapy.cz",
            tech: ["React", "Framer", "UX"],
            img: spaImg,
            isPlaceholder: false
        },
        {
            link: "",
            tech: ["Next.js", "Supabase", "TS"],
            img: null,
            isPlaceholder: true
        }
    ];

    return (
        <section id="projects" style={{ padding: '100px 0', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '100px', textAlign: 'center' }}
                >
                    <h2 className="text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px' }}>
                        {t.projects.title}
                    </h2>
                </motion.div>

                <div>
                    {t.projects.items.map((item, i) => (
                        <ProjectItem key={i} {...item} {...staticData[i]} index={i} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
