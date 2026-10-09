import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingObjects = () => {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.03;
    }
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.15;
      ring1.current.rotation.y = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * -0.1;
      ring2.current.rotation.z = t * 0.08;
    }
    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.12;
      icoRef.current.rotation.x = t * 0.06;
    }
  });

  return (
    <group ref={group}>
      {/* Thin accent ring — top-right, pushed far back */}
      <mesh ref={ring1} position={[5, 2.5, -8]}>
        <torusGeometry args={[2.5, 0.008, 16, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>

      {/* Second ring — bottom-left, even further back */}
      <mesh ref={ring2} position={[-6, -3, -12]}>
        <torusGeometry args={[3.5, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      
      {/* Third ring - lower down for About/Skills sections */}
      <mesh position={[8, -15, -15]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[4, 0.008, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} />
      </mesh>

      {/* Wireframe icosahedron — subtle, far background */}
      <mesh ref={icoRef} position={[7, -4, -15]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>
      
      {/* Second icosahedron - lower down for Projects section */}
      <mesh position={[-8, -25, -20]} rotation={[0, Math.PI / 3, 0]}>
        <icosahedronGeometry args={[2, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Grid moved much lower to serve as a deep floor for the entire scroll */}
      <gridHelper args={[100, 100, '#ffffff', '#ffffff']} position={[0, -40, -10]}>
        <meshBasicMaterial transparent opacity={0.03} depthWrite={false} />
      </gridHelper>
    </group>
  );
};
