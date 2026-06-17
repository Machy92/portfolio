import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Background = () => {
    const { scrollYProgress } = useScroll();
    const orb1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-160px']);
    const orb2Y = useTransform(scrollYProgress, [0, 1], ['0px', '160px']);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'var(--bg-color)',
                overflow: 'hidden',
            }}
        >
            {/* Top-left purple orb */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-5%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.10) 0%, transparent 70%)',
                    y: orb1Y,
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Bottom-right pink orb */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
                    y: orb2Y,
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Center mid-page accent orb */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default Background;
