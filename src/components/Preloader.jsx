import React, { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';

function replace(str, i, c) {
    return str.substring(0, i) + c + str.substring(i + 1);
}

function useScramble(target, startDelay = 0) {
    const [text, setText] = useState(() => target.replace(/\S/g, '_'));
    const [done, setDone] = useState(false);

    useEffect(() => {
        const chars = [...target];
        const ids = [];

        const t = setTimeout(() => {
            chars.forEach((char, i) => {
                if (char === ' ') { setText(p => replace(p, i, ' ')); return; }
                let iter = 0;
                const max = 6 + i * 2;
                const id = setInterval(() => {
                    iter++;
                    if (iter >= max) {
                        clearInterval(id);
                        setText(p => replace(p, i, char));
                        if (i === chars.length - 1) setDone(true);
                    } else {
                        setText(p => replace(p, i, POOL[Math.floor(Math.random() * POOL.length)]));
                    }
                }, 38);
                ids.push(id);
            });
        }, startDelay * 1000);

        return () => { clearTimeout(t); ids.forEach(clearInterval); };
    }, [target, startDelay]);

    return { text, done };
}

const Preloader = forwardRef(({ onComplete }, ref) => {
    const line1 = useScramble('MATĚJ', 0.1);
    const line2 = useScramble('MACHOVSKÝ', 0.3);
    const [showBar, setShowBar] = useState(false);

    useEffect(() => {
        if (!line1.done || !line2.done) return;
        const t1 = setTimeout(() => setShowBar(true), 80);
        const t2 = setTimeout(() => onComplete(), 680);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [line1.done, line2.done, onComplete]);

    return (
        <motion.div
            ref={ref}
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] } }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#0D0D0F',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Faint grid lines — decorative */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
                    'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(200,255,0,0.55)',
                        marginBottom: '20px',
                    }}
                >
                    PORTFOLIO — 2026
                </motion.p>

                {/* Scrambling name */}
                <div
                    style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                        letterSpacing: '0.04em',
                        lineHeight: 0.88,
                        color: '#EFEFED',
                        userSelect: 'none',
                    }}
                >
                    <div>{line1.text}</div>
                    <div>{line2.text}</div>
                </div>

                {/* Accent sweep line */}
                <div style={{ position: 'relative', height: '2px', marginTop: '16px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={showBar ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#C8FF00',
                            transformOrigin: 'left',
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
});

export default Preloader;
