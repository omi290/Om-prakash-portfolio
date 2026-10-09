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
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
      </mesh>

      {/* Second ring — bottom-left, even further back */}
      <mesh ref={ring2} position={[-6, -3, -12]}>
        <torusGeometry args={[3.5, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>

      {/* Wireframe icosahedron — subtle, far background */}
      <mesh ref={icoRef} position={[7, -4, -15]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Very faint grid — deep background, perspective floor */}
      <gridHelper args={[60, 60, '#ffffff', '#ffffff']} position={[0, -12, -10]}>
        <meshBasicMaterial transparent opacity={0.02} depthWrite={false} />
      </gridHelper>
    </group>
  );
};
