import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Background = () => {
  const { scrollYProgress } = useScroll();

  // Create an interactive animated gradient layout based on scroll
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ['radial-gradient(ellipse at 50% 0%, #1e0000, #080000 70%)', 'radial-gradient(ellipse at 50% 100%, #1e0000, #080000 70%)']
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background,
        isolation: 'isolate'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, #ff0000 1px, transparent 1px), linear-gradient(to bottom, #ff0000 1px, transparent 1px)'
        }}
      />
    </motion.div>
  );
};

export default Background;
