import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import DebrisField from './DebrisField';
import { useScrollContext } from './SmoothScroll';
import * as THREE from 'three';

const EffectsContent = () => {
  const { lenis } = useScrollContext();
  const aberrationRef = useRef();

  useFrame(() => {
    if (lenis && aberrationRef.current) {
      // Get absolute velocity (0 to ~20+ depending on scroll speed)
      const vel = Math.abs(lenis.velocity || 0);
      // Map velocity to aberration offset (warp effect)
      const targetOffset = THREE.MathUtils.lerp(0.002, 0.05, vel * 0.05); // Max 0.05 offset

      // Smoothly interpolate current offset to target
      const current = aberrationRef.current.offset.x; // Accessing vector component
      const next = THREE.MathUtils.lerp(current, targetOffset, 0.1);

      aberrationRef.current.offset.set(next, next);
    }
  });

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <ChromaticAberration ref={aberrationRef} offset={[0.002, 0.002]} />
    </EffectComposer>
  );
};

const Background = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'var(--bg-color)' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030014']} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />

        <Suspense fallback={null}>
          <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={50} size={3} speed={0.4} opacity={0.7} scale={[20, 10, 10]} color="#00f3ff" />

          <Physics gravity={[0, 0, 0]} step={1 / 60}>
            <DebrisField />
          </Physics>

          <EffectsContent />
        </Suspense>
      </Canvas>

      {/* Gradient Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent 0%, var(--bg-color) 100%)', opacity: 0.3, pointerEvents: 'none' }} />
    </div>
  );
};

export default Background;
