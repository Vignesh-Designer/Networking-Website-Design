import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Torus, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollY: number;
}

export const Scene = ({ scrollY }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Rotation based on scroll
    const rotation = scrollY * 0.002;
    groupRef.current.rotation.y = rotation;
    groupRef.current.rotation.x = rotation * 0.5;

    // Floating movement
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time) * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      
      <group ref={groupRef}>
        {/* Central Core */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere ref={sphereRef} args={[1, 64, 64]}>
            <MeshDistortMaterial
              color="#00ffcc"
              speed={3}
              distort={0.4}
              radius={1}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        {/* Outer Ring */}
        <Torus ref={torusRef} args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshWobbleMaterial color="#ffffff" speed={1} factor={0.1} transparent opacity={0.3} />
        </Torus>

        {/* Floating Particles/Nodes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
    </>
  );
};
