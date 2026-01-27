import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" style={{ padding: '100px 0', textAlign: 'center', marginBottom: '50px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '30px', fontWeight: '800' }}>{t.contact.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '50px', fontSize: '1.2rem' }}>
                        {t.contact.desc}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                        {[
                            { Icon: Mail, link: "mailto:machy.machy92@gmail.com", label: "Email" },
                            { Icon: Github, link: "https://github.com/Machy92", label: "GitHub" },
                            { Icon: Linkedin, link: "https://www.linkedin.com/in/mat%C4%9Bj-machovsk%C3%BD-9731663a9/", label: "LinkedIn" },
                            { Icon: Instagram, link: "https://instagram.com/Machyx42012", label: "Instagram" }
                        ].map(({ Icon, link, label }, index) => (
                            <motion.a
                                key={index}
                                href={link}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -10, scale: 1.2, color: 'var(--primary)' }}
                                style={{ color: 'var(--text-main)', transition: 'color 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                            >
                                <div className="glass" style={{ padding: '20px', borderRadius: '50%' }}>
                                    <Icon size={32} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            <footer style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', marginTop: '50px', position: 'absolute', bottom: 0, width: '100%' }}>
                <p>&copy; {new Date().getFullYear()} Matěj Machovský. {t.contact.footer}</p>
            </footer>
        </section>
    );
};

export default Contact;
