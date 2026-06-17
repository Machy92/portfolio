import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['hero', 'about', 'services', 'projects', 'contact'];
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 200) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { href: '#about', label: t.nav.about, id: 'about' },
        { href: '#services', label: t.nav.services, id: 'services' },
        { href: '#projects', label: t.nav.projects, id: 'projects' },
        { href: '#contact', label: t.nav.contact, id: 'contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 24px',
                height: 'var(--nav-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(9, 9, 11, 0.88)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
                transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
            }}
        >
            {/* Logo */}
            <a href="#hero" style={{ textDecoration: 'none' }}>
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        letterSpacing: '-0.5px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        cursor: 'pointer',
                    }}
                >
                    M.M
                </motion.span>
            </a>

            {/* Desktop Nav */}
            <div
                className="desktop-nav"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
                {navLinks.map(({ href, label, id }) => {
                    const isActive = activeSection === id;
                    return (
                        <a key={href} href={href} style={{ textDecoration: 'none' }}>
                            <motion.span
                                whileHover={{ color: 'var(--text-main)' }}
                                style={{
                                    display: 'inline-block',
                                    padding: '7px 16px',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? '600' : '400',
                                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                    background: isActive ? 'var(--glass-bg)' : 'transparent',
                                    border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
                                    transition: 'all 0.25s',
                                    cursor: 'pointer',
                                }}
                            >
                                {label}
                            </motion.span>
                        </a>
                    );
                })}

                <motion.button
                    onClick={toggleLanguage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        marginLeft: '12px',
                        padding: '7px 18px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '30px',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '1.5px',
                        transition: 'border-color 0.25s, background 0.25s',
                    }}
                >
                    {language === 'en' ? 'CS' : 'EN'}
                </motion.button>
            </div>

            {/* Mobile Hamburger */}
            <div className="mobile-nav" style={{ display: 'none' }}>
                <motion.button
                    onClick={() => setMenuOpen(!menuOpen)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: 'var(--nav-height)',
                            left: 0,
                            right: 0,
                            background: 'rgba(9, 9, 11, 0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderBottom: '1px solid var(--glass-border)',
                            padding: '16px 24px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                    >
                        {navLinks.map(({ href, label }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    padding: '13px 16px',
                                    fontSize: '1rem',
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    borderRadius: '10px',
                                    transition: 'background 0.2s',
                                    fontWeight: '500',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                {label}
                            </a>
                        ))}
                        <button
                            onClick={() => { toggleLanguage(); setMenuOpen(false); }}
                            style={{
                                marginTop: '8px',
                                padding: '13px 16px',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '10px',
                                color: 'var(--primary)',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                textAlign: 'left',
                                letterSpacing: '1px',
                            }}
                        >
                            {language === 'en' ? '🇨🇿  Česky' : '🇬🇧  English'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
