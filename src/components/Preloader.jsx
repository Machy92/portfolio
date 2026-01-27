import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

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

        // Simulate code scrolling
        const codeTimer = setInterval(() => {
            setCurrentLine(prev => (prev + 1) % codeSnippets.length);
        }, 300);

        return () => {
            clearInterval(timer);
            clearInterval(codeTimer);
        };
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
                backgroundColor: '#050505',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                fontFamily: '"Courier New", Courier, monospace',
                overflow: 'hidden'
            }}
        >
            {/* Background Code Overlay */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                opacity: 0.1,
                fontSize: '0.8rem',
                pointerEvents: 'none',
                textAlign: 'left'
            }}>
                {codeSnippets.map((line, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: i === currentLine ? 1 : 0.3 }}
                        style={{ marginBottom: '5px' }}
                    >
                        {`> ${line}`}
                    </motion.div>
                ))}
            </div>

            {/* Main Counter */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <motion.span
                    style={{
                        fontSize: 'clamp(4rem, 10vw, 8rem)',
                        fontWeight: '900',
                        display: 'block',
                        lineHeight: 1,
                        marginBottom: '20px'
                    }}
                >
                    {count}%
                </motion.span>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={currentLine} // Re-animate on change
                    style={{
                        fontSize: '1rem',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                >
                    {count < 100 ? "Validating Assets..." : "System Ready"}
                </motion.div>
            </div>

            {/* Progress Bar */}
            <div style={{
                position: 'absolute',
                bottom: '15%',
                width: '300px',
                height: '2px',
                background: '#333',
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: '#fff',
                        width: `${count}%`,
                        boxShadow: '0 0 20px rgba(255,255,255,0.8)'
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
