import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socials = [
    { Icon: Mail, link: 'mailto:machy.machy92@gmail.com', label: 'Email' },
    { Icon: Github, link: 'https://github.com/Machy92', label: 'GitHub' },
    { Icon: Linkedin, link: 'https://www.linkedin.com/in/mat%C4%9Bj-machovsk%C3%BD-9731663a9/', label: 'LinkedIn' },
    { Icon: Instagram, link: 'https://instagram.com/Machyx42012', label: 'Instagram' },
];

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" style={{ padding: '120px 0 0', textAlign: 'center' }}>
            <div className="container">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-label"
                    style={{ display: 'inline-flex', marginBottom: '24px' }}
                >
                    {t.contact.label}
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <h2
                        className="text-gradient"
                        style={{
                            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                            marginBottom: '18px',
                            fontWeight: '800',
                            letterSpacing: '-2px',
                            lineHeight: 1.05,
                        }}
                    >
                        {t.contact.title}
                    </h2>

                    <p
                        style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '56px',
                            fontSize: '1.05rem',
                            maxWidth: '480px',
                            margin: '0 auto 56px',
                            lineHeight: 1.6,
                        }}
                    >
                        {t.contact.desc}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '14px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {socials.map(({ Icon, link, label }, index) => (
                            <motion.a
                                key={index}
                                href={link}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.35)' }}
                                whileTap={{ scale: 0.96 }}
                                className="glass"
                                style={{
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    padding: '16px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'border-color 0.3s, transform 0.3s',
                                    borderRadius: '14px',
                                }}
                            >
                                <Icon size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.925rem', fontWeight: '500' }}>{label}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            <footer
                style={{
                    textAlign: 'center',
                    padding: '28px 24px',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    borderTop: '1px solid var(--glass-border)',
                    marginTop: '80px',
                }}
            >
                <p>&copy; {new Date().getFullYear()} Matěj Machovský. {t.contact.footer}</p>
            </footer>
        </section>
    );
};

export default Contact;
