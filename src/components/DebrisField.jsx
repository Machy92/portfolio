/* eslint-disable react-hooks/purity */
import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox, useSphere } from '@react-three/cannon';
import * as THREE from 'three';

const MouseRepulsor = () => {
    const { viewport, mouse } = useThree();
    const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2], position: [0, 0, 0] }));

    useFrame((state) => {
        // Convert 2D mouse to 3D position at z=0 plane
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;
        api.position.set(x, y, 0);
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial visible={false} />
        </mesh>
    );
};

const Shard = ({ position, color }) => {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position,
        args: [0.5, 0.5, 0.5],
        linearDamping: 0.5,
        angularDamping: 0.5,
    }));

    const scale = useMemo(() => Math.random() * 0.5 + 0.2, []);

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <octahedronGeometry args={[scale, 0]} />
            <meshStandardMaterial
                color={color}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.8}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const DebrisField = () => {
    // Generate random positions
    const shards = useMemo(() => {
        const items = [];
        for (let i = 0; i < 20; i++) {
            const x = (Math.random() - 0.5) * 20; // Spread x
            const y = (Math.random() - 0.5) * 20; // Spread y
            const z = (Math.random() - 0.5) * 10; // Spread z
            const color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
            items.push({ position: [x, y, z], color });
        }
        return items;
    }, []);

    return (
        <>
            {/* Invisible repulsor ball at mouse cursor */}
            <MouseRepulsor />

            {/* Floating debris */}
            {shards.map((props, i) => (
                <Shard key={i} {...props} />
            ))}
        </>
    );
};

export default DebrisField;
