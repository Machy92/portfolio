import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Palette, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{
            scale: 1.05,
            rotateY: 10,
            boxShadow: '0 20px 40px rgba(0, 243, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)'
        }}
        className="glass"
        style={{
            padding: '40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
        }}
    >
        <div style={{
            background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
            padding: '20px',
            borderRadius: '50%',
            marginBottom: '20px',
            color: '#fff'
        }}>
            <Icon size={40} />
        </div>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
    </motion.div>
);

const Services = () => {
    const { t } = useLanguage();
    const icons = [Monitor, Palette, Zap];

    return (
        <section id="services" style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-gradient"
                    style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '60px', fontWeight: '800' }}
                >
                    {t.services.title}
                </motion.h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {t.services.cards.map((s, i) => (
                        <ServiceCard key={i} {...s} icon={icons[i]} delay={i * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
