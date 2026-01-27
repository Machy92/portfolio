import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Center offset
            cursorY.set(e.clientY - 10);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleLinkHoverEvents = () => {
            document.querySelectorAll('a, button, .hover-trigger').forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovered(true));
                el.addEventListener('mouseleave', () => setIsHovered(false));
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Initial binding
        handleLinkHoverEvents();

        // Re-bind on mutation (simple/naive approach for dynamic content)
        const observer = new MutationObserver(handleLinkHoverEvents);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="custom-cursor"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: isClicked ? 0.8 : isHovered ? 2.5 : 1,
                    opacity: isHovered ? 0.5 : 1,
                    backgroundColor: isHovered ? 'var(--primary)' : 'transparent',
                    border: '2px solid var(--primary)',
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
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: 8, // Center relative to outer ring
                    y: 8
                }}
            />
        </>
    );
};

export default Cursor;
