import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  time: number;
  factor: number;
  speed: number;
  x: number;
  y: number;
  z: number;
}

export const Particles = ({ count = 400 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo<ParticleData[]>(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        time: Math.random() * 100,
        factor: 20 + Math.random() * 80,
        // Increased speed slightly as requested
        speed: 0.01 + Math.random() / 200,
        x: Math.random() * 30 - 15,
        // Much larger Y spread since camera moves down the page
        y: Math.random() * 60 - 40, 
        z: Math.random() * 30 - 15,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      const t = (p.time += p.speed / 2);

      dummy.position.set(
        p.x + Math.cos((t / 10) * p.factor) + (Math.sin(t) * p.factor) / 10,
        p.y + Math.sin((t / 10) * p.factor) + (Math.cos(t * 2) * p.factor) / 10,
        p.z + Math.cos((t / 10) * p.factor) + (Math.sin(t * 3) * p.factor) / 10
      );

      // Vary scale more to create depth
      const s = (Math.cos(t) + 1) * 0.02 + 0.01;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      {/* Increased opacity from 0.2 to 0.35 for better visibility without distracting */}
      <meshBasicMaterial color="#ffffff" transparent opacity={0.35} depthWrite={false} />
    </instancedMesh>
  );
};
