"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GalaxyParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const colorCyan = new THREE.Color("#00F5FF");
    const colorPurple = new THREE.Color("#7B61FF");
    const colorAccent = new THREE.Color("#00FFA3");

    for (let i = 0; i < count; i++) {
      // Create a spiral galaxy shape
      const distance = Math.random() * 8;
      const spinAngle = distance * 2.5;
      const branchAngle = ((i % 3) * 2 * Math.PI) / 3; // 3 branches

      const x = Math.cos(spinAngle + branchAngle) * distance + (Math.random() - 0.5) * 0.4 * distance;
      const y = (Math.random() - 0.5) * 0.2 * distance;
      const z = Math.sin(spinAngle + branchAngle) * distance + (Math.random() - 0.5) * 0.4 * distance;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color interpolation based on distance
      let mixedColor = colorCyan.clone();
      if (i % 3 === 0) {
        mixedColor.lerp(colorPurple, distance / 8);
      } else if (i % 3 === 1) {
        mixedColor.lerp(colorAccent, distance / 8);
      } else {
        mixedColor = colorPurple.clone().lerp(new THREE.Color("#050816"), distance / 10);
      }

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    // Base rotation
    pointsRef.current.rotation.y = time * 0.05;
    
    // Add subtle tilt based on mouse movement
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      mouse.y * 0.1,
      0.05
    );
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      mouse.x * 0.1,
      0.05
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-20 bg-[#050816] pointer-events-none">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <GalaxyParticles />
      </Canvas>
    </div>
  );
}
