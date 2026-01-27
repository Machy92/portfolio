import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const words = [
    "INITIALIZING...",
    "LOADING ASSETS...",
    "DECRYPTING DATA...",
    "ESTABLISHING LINK...",
    "RENDERING 3D ENGINE...",
    "CALCULATING PHYSICS...",
    "ACCESS GRANTED"
];

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [currentWord, setCurrentWord] = useState("");

    // Simulate code stream
    useEffect(() => {
        const interval = setInterval(() => {
            const randomHex = Math.random().toString(16).substr(2, 8).toUpperCase();
            setCurrentWord(`0x${randomHex} // ${words[Math.floor(Math.random() * words.length)]}`);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const duration = 2500;
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#000',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                overflow: 'hidden'
            }}
        >
            {/* Center Counter */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end' }}>
                <span
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 10rem)',
                        lineHeight: 0.8,
                        fontWeight: '900',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-5px'
                    }}
                >
                    {count}
                </span>
                <span style={{ fontSize: '2rem', marginBottom: '1.5vw', fontWeight: 'bold' }}>%</span>
            </div>

            {/* Code/Status Text */}
            <div style={{
                marginTop: '20px',
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                height: '20px'
            }}>
                {currentWord}
            </div>

            {/* Progress Bar Line */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: '80%',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#fff',
                        transformOrigin: 'left'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: count / 100 }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                />
            </div>

            {/* Background Grid/Noise (Optional decorative elements) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
};

export default Preloader;
