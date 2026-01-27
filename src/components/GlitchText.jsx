/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const GlitchText = ({ text, as: Component = 'span', className, speed = 50, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && !isAnimating) {
            let iteration = 0;
            setIsAnimating(true);

            // Delay start if needed
            const startTimeout = setTimeout(() => {
                const interval = setInterval(() => {
                    setDisplayText(
                        text
                            .split("")
                            .map((char, index) => {
                                if (index < iteration) {
                                    return text[index];
                                }
                                return CHARS[Math.floor(Math.random() * CHARS.length)];
                            })
                            .join("")
                    );

                    if (iteration >= text.length) {
                        clearInterval(interval);
                        setIsAnimating(false);
                    }

                    iteration += 1 / 2; // Slower reveal for longer text
                }, speed);

                return () => clearInterval(interval);
            }, delay * 1000);

            return () => clearTimeout(startTimeout);
        }
    }, [isInView, text, speed, delay]); // Removed isAnimating to avoid loop, though logic checks !isAnimating

    return (
        <Component ref={ref} className={className}>
            {displayText || text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')}
        </Component>
    );
};

export default GlitchText;
