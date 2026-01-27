import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: '800',
                color: 'var(--primary)',
                cursor: 'pointer',
                border: '1px solid var(--primary)',
                background: 'rgba(0,0,0,0.5)'
            }}
        >
            {language === 'en' ? 'CZ' : 'EN'}
        </motion.button>
    );
};

export default LanguageSwitcher;
