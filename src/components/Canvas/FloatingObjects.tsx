"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingMesh({
  geometry,
  color,
  position,
  scale,
  speed,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.15 * speed;
    meshRef.current.rotation.y = time * 0.2 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={[scale, scale, scale]}
      >
        <primitive object={geometry} />
        {/* Glassmorphic material with transmission */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function CanvasElements() {
  const torusGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.35, 16, 64), []);
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const torusKnotGeometry = useMemo(() => new THREE.TorusKnotGeometry(0.7, 0.25, 128, 16), []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7B61FF" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00F5FF" />

      {/* Floating Cyan Torus */}
      <FloatingMesh
        geometry={torusGeometry}
        color="#00F5FF"
        position={[-3.5, 1.5, -2]}
        scale={0.8}
        speed={1}
      />

      {/* Floating Purple Sphere */}
      <FloatingMesh
        geometry={sphereGeometry}
        color="#7B61FF"
        position={[4, -1, -1.5]}
        scale={0.7}
        speed={1.2}
      />

      {/* Floating Accent Torus Knot */}
      <FloatingMesh
        geometry={torusKnotGeometry}
        color="#00FFA3"
        position={[-2.5, -2, -1]}
        scale={0.75}
        speed={0.8}
      />

      {/* Another Sphere (Cyan) */}
      <FloatingMesh
        geometry={sphereGeometry}
        color="#00F5FF"
        position={[3, 2, -2.5]}
        scale={0.5}
        speed={1.4}
      />
    </>
  );
}

// Custom hook to compile geometry only once
import { useMemo } from "react";

export default function FloatingObjects() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CanvasElements />
      </Canvas>
    </div>
  );
}
