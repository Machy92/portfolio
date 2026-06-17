import React from 'react';
import { m } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socials = [
    { Icon: Github,    label: 'GitHub',    href: 'https://github.com/Machy92' },
    { Icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/mat%C4%9Bj-machovsk%C3%BD-9731663a9/' },
    { Icon: Mail,      label: 'Email',     href: 'mailto:machy.machy92@gmail.com' },
    { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/Machyx42012' },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="section">
            <div className="container">

                <div className="section-header">
                    <span className="section-index">05</span>
                    <span className="section-label-text">{t.contact.title}</span>
                </div>

                <m.div {...fadeUp(0)}>
                    <h2 style={{
                        fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                        marginBottom: '20px',
                        maxWidth: '700px',
                    }}>
                        {t.contact.title}
                    </h2>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-muted)',
                        marginBottom: '56px',
                        maxWidth: '460px',
                        lineHeight: 1.7,
                    }}>
                        {t.contact.desc}
                    </p>
                </m.div>

                <m.a
                    {...fadeUp(0.15)}
                    href="mailto:machy.machy92@gmail.com"
                    className="contact-email"
                >
                    machy.machy92
                    <br />
                    @gmail.com
                </m.a>

                <m.div
                    {...fadeUp(0.25)}
                    style={{
                        marginTop: '56px',
                        paddingTop: '40px',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: '32px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    {socials.map(({ Icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            <Icon size={13} />
                            {label}
                        </a>
                    ))}
                </m.div>

                <footer style={{
                    marginTop: '64px',
                    paddingTop: '28px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        color: 'var(--text-subtle)',
                        letterSpacing: '0.08em',
                    }}>
                        © {new Date().getFullYear()} Matěj Machovský
                    </span>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        color: 'var(--text-subtle)',
                        letterSpacing: '0.08em',
                    }}>
                        {t.contact.footer}
                    </span>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
