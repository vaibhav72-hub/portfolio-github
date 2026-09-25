import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export type AiStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

const getColorsForStatus = (status: AiStatus) => {
  switch (status) {
    case 'listening':
      return new THREE.Color(0x10B981); // Emerald
    case 'thinking':
      return new THREE.Color(0xF59E0B); // Amber
    case 'speaking':
      return new THREE.Color(0x8B5CF6); // Violet
    case 'idle':
    default:
      return new THREE.Color(0x06B6D4); // Cyan
  }
};

interface ParticleSphereProps {
  status: AiStatus;
}

const ParticleSphere: React.FC<ParticleSphereProps> = ({ status }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  
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
    const baseColor = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = posVectors[i].distanceTo(posVectors[j]);
        if (dist < maxDistance) {
          linePos.push(
            posVectors[i].x, posVectors[i].y, posVectors[i].z,
            posVectors[j].x, posVectors[j].y, posVectors[j].z
          );
          
          const alpha = 1.0 - (dist / maxDistance);
          lineCol.push(baseColor.r, baseColor.g, baseColor.b, alpha);
          lineCol.push(baseColor.r, baseColor.g, baseColor.b, alpha);
        }
      }
    }

    return { 
      positions, 
      linePositions: new Float32Array(linePos),
      lineColors: new Float32Array(lineCol)
    };
  }, []);

  const targetColor = useMemo(() => getColorsForStatus(status), [status]);

  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation
      let rotSpeedY = 0.1;
      let rotSpeedX = 0.05;
      let pulseIntensity = 0.02;
      let pulseSpeed = 2;

      // Dynamic behavior based on status
      if (status === 'listening') {
        pulseIntensity = 0.05;
        pulseSpeed = 4;
      } else if (status === 'thinking') {
        rotSpeedY = 0.8;
        rotSpeedX = 0.4;
        pulseIntensity = 0.01;
      } else if (status === 'speaking') {
        pulseIntensity = 0.08;
        pulseSpeed = 8;
        rotSpeedY = 0.2;
      }

      groupRef.current.rotation.y += state.clock.getDelta() * rotSpeedY;
      groupRef.current.rotation.x += state.clock.getDelta() * rotSpeedX;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * pulseIntensity;
      groupRef.current.scale.set(scale, scale, scale);

      // Smooth color transition
      if (materialRef.current) {
        materialRef.current.color.lerp(targetColor, 0.05);
      }
      if (linesMaterialRef.current) {
         linesMaterialRef.current.color.lerp(targetColor, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
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
        <pointsMaterial ref={materialRef} size={0.06} color="#06B6D4" transparent opacity={0.8} />
      </points>

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
        <lineBasicMaterial ref={linesMaterialRef} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#000000" transparent opacity={0.8} depthWrite={false} />
      </Sphere>
    </group>
  );
};

interface AiCore3DProps {
  status?: AiStatus;
}

const AiCore3D: React.FC<AiCore3DProps> = ({ status = 'idle' }) => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleSphere status={status} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={status === 'thinking' ? 2.0 : 0.5} />
      </Canvas>
    </div>
  );
};

export default AiCore3D;
