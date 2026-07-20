"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

function GlobeCore() {
  const globeRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate dots on a sphere using Fibonacci sphere algorithm
  const dots = useMemo(() => {
    const pointsCount = 450;
    const radius = 2.0;
    const temp = [];
    
    for (let i = 0; i < pointsCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / pointsCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  // Generate glowing arc lines representing data streams/connections
  const arcs = useMemo(() => {
    const arcList = [];
    const count = 8;
    const radius = 2.0;
    
    for (let i = 0; i < count; i++) {
      // Pick two random positions on the sphere
      const p1 = dots[Math.floor(Math.random() * dots.length)].clone();
      const p2 = dots[Math.floor(Math.random() * dots.length)].clone();
      
      // Calculate mid-point and pull it outward to create an arc
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(radius + dist * 0.4); // height based on distance
      
      // Generate curve points
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(30);
      
      arcList.push({
        points,
        color: i % 2 === 0 ? "#00F5FF" : "#7B61FF",
      });
    }
    return arcList;
  }, [dots]);

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.getElapsedTime();
    globeRef.current.rotation.y = time * 0.12;
    globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
  });

  return (
    <group ref={globeRef}>
      {/* Semi-transparent inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#050816"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe wrapper for grid lines */}
      <mesh>
        <sphereGeometry args={[2.01, 16, 16]} />
        <meshBasicMaterial
          color="#7B61FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Dotted sphere grid */}
      {dots.map((pos, idx) => {
        const isHovered = hoveredIndex === idx;
        return (
          <mesh
            key={idx}
            position={pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIndex(idx);
            }}
            onPointerOut={() => setHoveredIndex(null)}
          >
            <sphereGeometry args={[isHovered ? 0.05 : 0.025, 8, 8]} />
            <meshBasicMaterial
              color={isHovered ? "#00FFA3" : idx % 7 === 0 ? "#7B61FF" : "#00F5FF"}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* Holographic Arc Connections */}
      {arcs.map((arc, idx) => (
        <Line
          key={idx}
          points={arc.points}
          color={arc.color}
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <GlobeCore />
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          enablePan={false}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
