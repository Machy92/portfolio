import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, School, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpg';

const AboutCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className="glass"
        style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.3s', cursor: 'default' }}
        whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 243, 255, 0.1)' }}
    >
        <div style={{ background: 'var(--glass-highlight)', padding: '15px', borderRadius: '50%', marginBottom: '20px', color: 'var(--primary)' }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </motion.div>
);

const TimelineItem = ({ year, title, desc, side }) => (
    <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: side === 'left' ? 'row-reverse' : 'row', alignItems: 'center', margin: '40px 0', width: '100%' }}
    >
        <div style={{ width: '45%', textAlign: side === 'left' ? 'right' : 'left' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--secondary)' }}>{year}</span>
            <h4 style={{ fontSize: '1.4rem', margin: '5px 0' }}>{title}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
        </div>
        <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '15px', height: '15px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></div>
        </div>
        <div style={{ width: '45%' }}></div>
    </motion.div>
);

const About = () => {
    const { t } = useLanguage();

    // Mapping icons to the translated data structure
    const icons = [User, MapPin, School, Code];

    return (
        <section id="about" style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-gradient"
                    style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center', fontWeight: '800' }}
                >
                    {t.about.title}
                </motion.h2>

                {/* Profile Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid var(--primary)',
                            boxShadow: '0 0 30px var(--primary)',
                            marginBottom: '30px'
                        }}
                    >
                        <img src={profileImg} alt="Matěj Machovský" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '100px' }}>
                    {t.about.cards.map((item, index) => (
                        <AboutCard key={index} {...item} icon={icons[index]} delay={index * 0.1} />
                    ))}
                </div>

                <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '50px' }}>{t.about.journeyTitle}</h3>
                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }}></div>

                    {t.about.timeline.map((item, index) => (
                        <TimelineItem key={index} {...item} side={index % 2 === 0 ? 'left' : 'right'} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;
