import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import hostinecImg from '../assets/hostinec.png';
import spaImg from '../assets/spa.png';

const ProjectItem = ({ title, desc, link, tech, index, isPlaceholder, img, t, skewY }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const yDisplace = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`project-item ${index % 2 === 1 ? 'reverse-layout' : ''}`}
        >
            {/* Text content */}
            <div className="project-content" style={{ order: index % 2 === 0 ? 1 : 2 }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {tech.map((item, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: '0.75rem',
                                color: 'var(--primary)',
                                border: '1px solid var(--glass-border)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                background: 'var(--glass-bg)',
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <h2
                    style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                        fontWeight: '800',
                        lineHeight: 1.0,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '-1px',
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '36px',
                        maxWidth: '560px',
                        lineHeight: 1.7,
                    }}
                >
                    {desc}
                </p>

                <motion.a
                    href={link || '#'}
                    target={link ? '_blank' : ''}
                    rel="noopener noreferrer"
                    whileHover={{ x: 8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: isPlaceholder ? 'var(--text-muted)' : 'var(--text-main)',
                        textDecoration: 'none',
                        cursor: isPlaceholder ? 'not-allowed' : 'pointer',
                        opacity: isPlaceholder ? 0.5 : 1,
                        borderBottom: isPlaceholder ? 'none' : '1px solid rgba(168, 85, 247, 0.3)',
                        paddingBottom: isPlaceholder ? 0 : '2px',
                        transition: 'border-color 0.3s',
                    }}
                >
                    {isPlaceholder ? t.projects.inDev : t.projects.viewLive}
                    {!isPlaceholder && <ArrowUpRight size={18} />}
                </motion.a>
            </div>

            {/* Image */}
            <motion.div
                className="project-image-container"
                style={{
                    y: yDisplace,
                    skewY,
                    order: index % 2 === 0 ? 2 : 1,
                }}
            >
                {img ? (
                    <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.5 }}
                        src={img}
                        alt={title}
                        className="project-image"
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.06), rgba(236, 72, 153, 0.04))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '5rem',
                                fontWeight: '900',
                                opacity: 0.06,
                                color: 'var(--primary)',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                        >
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
            link: 'https://hostinec-web.vercel.app',
            tech: ['React', 'Vite', 'Design'],
            img: hostinecImg,
            isPlaceholder: false,
        },
        {
            link: 'https://www.kheadspatherapy.cz',
            tech: ['React', 'Framer', 'UX'],
            img: spaImg,
            isPlaceholder: false,
        },
        {
            link: '',
            tech: ['Next.js', 'Supabase', 'TS'],
            img: null,
            isPlaceholder: true,
        },
    ];

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
    const skewY = useTransform(skewVelocity, [-1000, 1000], [-4, 4]);

    return (
        <section id="projects" style={{ padding: '120px 0', overflow: 'hidden' }}>
            <div className="container">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-label"
                    style={{ display: 'inline-flex' }}
                >
                    {t.projects.label}
                </motion.span>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '80px' }}
                >
                    <h2
                        className="text-gradient"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            lineHeight: 1.0,
                        }}
                    >
                        {t.projects.title}
                    </h2>
                </motion.div>

                <div>
                    {t.projects.items.map((item, i) => (
                        <ProjectItem
                            key={i}
                            {...item}
                            {...staticData[i]}
                            index={i}
                            t={t}
                            skewY={skewY}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
