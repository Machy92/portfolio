import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SERVICE_NUMS = ['01', '02', '03', '04'];

const Services = () => {
    const { t } = useLanguage();

    return (
        <section id="services" className="section">
            <div className="container">

                <div className="section-header">
                    <span className="section-index">02</span>
                    <span className="section-label-text">{t.services.title}</span>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', marginBottom: '56px' }}
                >
                    {t.services.title}
                </motion.h2>

                <div className="service-rows">
                    {t.services.cards.map((service, i) => (
                        <motion.div
                            key={i}
                            className="service-row"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <span style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.62rem',
                                color: 'var(--text-subtle)',
                                letterSpacing: '0.06em',
                            }}>
                                {SERVICE_NUMS[i]}
                            </span>

                            <h3
                                className="service-name"
                                style={{
                                    fontFamily: 'Bebas Neue, sans-serif',
                                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                    fontWeight: 400,
                                    letterSpacing: '0.03em',
                                    lineHeight: 1,
                                }}
                            >
                                {service.title}
                            </h3>

                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.65,
                            }}>
                                {service.desc}
                            </p>

                            <ArrowUpRight
                                size={18}
                                className="service-arrow"
                                style={{ color: 'var(--text-subtle)', flexShrink: 0 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
