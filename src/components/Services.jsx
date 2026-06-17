import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Palette, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = [Monitor, Palette, Zap];

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -8, borderColor: 'rgba(168, 85, 247, 0.28)' }}
        className="glass"
        style={{
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s, border-color 0.3s',
        }}
    >
        <div
            style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.14), rgba(236, 72, 153, 0.08))',
                padding: '14px',
                borderRadius: '14px',
                marginBottom: '22px',
                color: 'var(--primary)',
                width: 'fit-content',
                display: 'flex',
            }}
        >
            <Icon size={26} />
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.925rem' }}>{desc}</p>
    </motion.div>
);

const Services = () => {
    const { t } = useLanguage();

    return (
        <section id="services" style={{ padding: '120px 0' }}>
            <div className="container">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-label"
                    style={{ display: 'inline-flex' }}
                >
                    {t.services.label}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gradient"
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                        marginBottom: '56px',
                        fontWeight: '700',
                        lineHeight: 1.1,
                    }}
                >
                    {t.services.title}
                </motion.h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {t.services.cards.map((s, i) => (
                        <ServiceCard key={i} {...s} icon={icons[i]} delay={i * 0.12} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
