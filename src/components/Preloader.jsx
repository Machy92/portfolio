import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds total loading time
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Wait a bit before triggering exit
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
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' // Fallback for specific font
            }}
        >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.span
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        fontSize: 'clamp(5rem, 15vw, 10rem)',
                        display: 'block',
                        lineHeight: 1,
                        fontWeight: '900',
                        fontVariantNumeric: 'tabular-nums' // Monospaced numbers prevent jitter
                    }}
                >
                    {count}%
                </motion.span>
            </div>

            {/* Optional: Add a subtle progress bar or additional text */}
        </motion.div>
    );
};

export default Preloader;
