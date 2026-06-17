import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, School, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.JPG';

const icons = [User, MapPin, School, Code];

const AboutCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.28)' }}
        className="glass"
        style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            transition: 'border-color 0.3s, transform 0.3s',
        }}
    >
        <div
            style={{
                background: 'var(--glass-highlight)',
                padding: '10px',
                borderRadius: '10px',
                color: 'var(--primary)',
                flexShrink: 0,
                display: 'flex',
            }}
        >
            <Icon size={18} />
        </div>
        <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>{title}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55 }}>{desc}</p>
        </div>
    </motion.div>
);

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" style={{ padding: '120px 0' }}>
            <div className="container">

                {/* ── Top: Split layout ── */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '80px',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Left: text + cards */}
                    <div style={{ flex: '1', minWidth: '280px' }}>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            {t.about.label}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gradient"
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                fontWeight: '700',
                                marginBottom: '20px',
                                lineHeight: 1.1,
                            }}
                        >
                            {t.about.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.05rem',
                                lineHeight: 1.75,
                                marginBottom: '36px',
                                maxWidth: '520px',
                            }}
                        >
                            {t.about.bio}
                        </motion.p>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '12px',
                            }}
                        >
                            {t.about.cards.map((item, i) => (
                                <AboutCard key={i} {...item} icon={icons[i]} delay={i * 0.07} />
                            ))}
                        </div>
                    </div>

                    {/* Right: profile photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{ position: 'relative', flexShrink: 0, width: '300px' }}
                    >
                        {/* Glow halo */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '-24px',
                                borderRadius: '32px',
                                background:
                                    'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.22), transparent 70%)',
                                zIndex: 0,
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Photo */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '3 / 4',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                zIndex: 1,
                            }}
                        >
                            <img
                                src={profileImg}
                                alt="Matěj Machovský"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: '85% 20%',
                                    display: 'block',
                                }}
                            />
                        </div>

                        {/* Floating stat chip */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55 }}
                            className="glass"
                            style={{
                                position: 'absolute',
                                bottom: '-18px',
                                left: '-18px',
                                padding: '14px 18px',
                                zIndex: 2,
                                borderRadius: '14px',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '1.6rem',
                                    fontWeight: '800',
                                    color: 'var(--primary)',
                                    lineHeight: 1,
                                    fontFamily: 'Space Grotesk, sans-serif',
                                }}
                            >
                                6+
                            </div>
                            <div
                                style={{
                                    fontSize: '0.7rem',
                                    color: 'var(--text-secondary)',
                                    marginTop: '4px',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {t.about.yearsLabel}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Timeline ── */}
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                        marginTop: '110px',
                        marginBottom: '56px',
                        fontWeight: '700',
                    }}
                >
                    {t.about.journeyTitle}
                </motion.h3>

                <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
                    {/* Vertical line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            background: 'var(--glass-border)',
                            transform: 'translateX(-50%)',
                        }}
                    />

                    {t.about.timeline.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: isLeft ? 'row-reverse' : 'row',
                                    alignItems: 'center',
                                    margin: '28px 0',
                                }}
                            >
                                <div
                                    style={{
                                        width: '45%',
                                        textAlign: isLeft ? 'right' : 'left',
                                        padding: isLeft ? '0 28px 0 0' : '0 0 0 28px',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: 'var(--primary)',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {item.year}
                                    </span>
                                    <h4
                                        style={{
                                            fontSize: '1rem',
                                            margin: '5px 0 4px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {item.title}
                                    </h4>
                                    <p
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Dot */}
                                <div
                                    style={{
                                        width: '10%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            background: 'var(--primary)',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                                            border: '2px solid var(--bg-color)',
                                        }}
                                    />
                                </div>

                                <div style={{ width: '45%' }} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
