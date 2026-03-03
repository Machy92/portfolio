import React, { useEffect, useState, forwardRef, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Generate random points on a sphere for a "data nodes" look
const count = 4000;
const points = new Float32Array(count * 3);
const r = 2.0;
for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const sinPhi = Math.sin(phi);
    points[i * 3] = r * Math.sin(theta) * sinPhi;
    points[i * 3 + 1] = r * Math.cos(phi);
    points[i * 3 + 2] = r * Math.cos(theta) * sinPhi;
}

const TechGlobe = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4; // Left to right rotation
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0]}>
            {/* Core dark sphere */}
            <Sphere args={[1.95, 64, 64]}>
                <meshBasicMaterial color="#050000" />
            </Sphere>

            {/* Glowing inner wireframe */}
            <Sphere args={[1.98, 32, 32]}>
                <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </Sphere>

            {/* Detailed outer geometry (Icosahedron) */}
            <mesh>
                <icosahedronGeometry args={[2.0, 5]} />
                <meshBasicMaterial color="#ff2222" wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Data particles on the surface */}
            <Points positions={points}>
                <PointMaterial transparent color="#ff5555" size={0.02} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
            </Points>

            {/* Outer atmosphere glow */}
            <Sphere args={[2.2, 32, 32]}>
                <meshStandardMaterial color="#ff0000" transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
            </Sphere>
        </group>
    );
};

const OrbitRings = () => {
    const ringsRef = useRef();
    const dataPacketsRef = useRef();

    useFrame((state, delta) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.x += delta * 0.2;
            ringsRef.current.rotation.y -= delta * 0.15;
            ringsRef.current.children[0].rotation.x += delta * 0.5;
            ringsRef.current.children[1].rotation.y -= delta * 0.3;
            ringsRef.current.children[2].rotation.z += delta * 0.4;
        }
        if (dataPacketsRef.current) {
            dataPacketsRef.current.rotation.y += delta * 1.5;
            dataPacketsRef.current.rotation.z += delta * 0.5;
        }
    });

    return (
        <group>
            {/* Spinning Rings */}
            <group ref={ringsRef}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.5, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#ff5555" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh rotation={[0, Math.PI / 3, 0]}>
                    <torusGeometry args={[2.9, 0.005, 16, 100]} />
                    <meshBasicMaterial color="#ff0000" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
                    <torusGeometry args={[3.2, 0.02, 16, 50]} />
                    <meshBasicMaterial color="#ff2222" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
                </mesh>
            </group>

            {/* Orbiting Data Packets */}
            <group ref={dataPacketsRef}>
                <mesh position={[2.6, 0, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[-2.8, 1, 0]}>
                    <sphereGeometry args={[0.03, 16, 16]} />
                    <meshBasicMaterial color="#ffaaaa" />
                </mesh>
                <mesh position={[0, -2.7, 1.5]}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#ff0000" />
                </mesh>
            </group>
        </group>
    );
};

const words = [
    "INITIALIZING...",
    "LOADING ASSETS...",
    "DECRYPTING DATA...",
    "ESTABLISHING LINK...",
    "RENDERING 3D ENGINE...",
    "CALCULATING PHYSICS...",
    "ACCESS GRANTED"
];

const Preloader = forwardRef(({ onComplete }, ref) => {
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
            ref={ref}
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
            {/* Center 3D Globe */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50vh', maxWidth: '800px' }}>
                {/* Increased camera distance / fov to fit the rings */}
                <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#ff0000" />
                    <TechGlobe />
                    <OrbitRings />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Code/Status Text */}
            <div className="preloader-text" style={{
                marginTop: '40px',
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                height: '20px',
                textAlign: 'center',
                padding: '0 10px'
            }}>
                {currentWord}
            </div>

            {/* Bottom Percentage */}
            <div style={{
                position: 'absolute',
                bottom: 'calc(10% + 15px)',
                right: '10%',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'bold',
                fontSize: '2rem',
                color: '#fff'
            }}>
                {count}%
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
                        background: '#ff0000',
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
});

export default Preloader;
