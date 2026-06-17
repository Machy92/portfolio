import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SECTIONS = ['hero', 'about', 'services', 'skills', 'projects', 'contact'];

const Navbar = () => {
    const { t, toggleLanguage, language } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('hero');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            let current = 'hero';
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) current = id;
            }
            setActive(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const links = [
        { href: '#about', label: t.nav.about, id: 'about' },
        { href: '#services', label: t.nav.services, id: 'services' },
        { href: '#projects', label: t.nav.projects, id: 'projects' },
        { href: '#contact', label: t.nav.contact, id: 'contact' },
    ];

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="navbar-inner">
                    <a href="#hero" className="nav-logo">M<span>.</span>M</a>

                    <div className="desktop-nav">
                        {links.map(link => (
                            <a
                                key={link.id}
                                href={link.href}
                                className={`nav-link${active === link.id ? ' active' : ''}`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button className="nav-lang-btn" onClick={toggleLanguage}>
                            {language === 'cs' ? 'EN' : 'CS'}
                        </button>
                    </div>

                    <button className="mobile-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <m.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        {links.map((link, i) => (
                            <m.a
                                key={link.id}
                                href={link.href}
                                className="mobile-menu-link"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </m.a>
                        ))}
                        <button
                            className="nav-lang-btn"
                            style={{ marginTop: '8px' }}
                            onClick={() => { toggleLanguage(); setMenuOpen(false); }}
                        >
                            {language === 'cs' ? 'EN' : 'CS'}
                        </button>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
