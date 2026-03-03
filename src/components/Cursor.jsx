import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Center offset
            cursorY.set(e.clientY - 10);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="custom-cursor"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    border: '2px solid var(--accent)',
                    backgroundColor: 'transparent'
                }}
            />

            {/* Center dot for precision */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '4px',
                    backgroundColor: 'var(--accent)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: cursorX,
                    translateY: cursorY,
                    x: 8, // Center relative to outer ring
                    y: 8
                }}
            />
        </>
    );
};

export default Cursor;
