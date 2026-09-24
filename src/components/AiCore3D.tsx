import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const count = 150; // number of nodes
  const maxDistance = 0.8; // line connection distance

  const { positions, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const posVectors = [];
    
    // Generate nodes on sphere
    for (let i = 0; i < count; i++) {
      const r = 2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      posVectors.push(new THREE.Vector3(x, y, z));
    }
    
    // Generate lines
    const linePos = [];
    const lineCol = [];
    const color = new THREE.Color(0x06B6D4); // Cyan

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = posVectors[i].distanceTo(posVectors[j]);
        if (dist < maxDistance) {
          linePos.push(
            posVectors[i].x, posVectors[i].y, posVectors[i].z,
            posVectors[j].x, posVectors[j].y, posVectors[j].z
          );
          
          // Fade alpha based on distance
          const alpha = 1.0 - (dist / maxDistance);
          lineCol.push(color.r, color.g, color.b, alpha);
          lineCol.push(color.r, color.g, color.b, alpha);
        }
      }
    }

    return { 
      positions, 
      linePositions: new Float32Array(linePos),
      lineColors: new Float32Array(lineCol)
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      
      // Gentle pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#06B6D4" transparent opacity={0.8} />
      </points>

      {/* Connecting Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 4}
            array={lineColors}
            itemSize={4}
            args={[lineColors, 4]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Inner Energy Core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
};

const AiCore3D: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleSphere />
        {/* Adds interactive rotation when dragged */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default AiCore3D;
