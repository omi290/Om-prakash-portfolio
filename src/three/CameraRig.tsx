import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CameraRig = () => {
  const { camera, pointer } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame((state) => {
    // Subtle idle floating
    const time = state.clock.getElapsedTime();
    const idleX = Math.sin(time * 0.5) * 0.2;
    const idleY = Math.cos(time * 0.3) * 0.2;

    // Pointer-based parallax
    const targetX = (pointer.x * 2) + idleX;
    const targetY = (pointer.y * 2) + idleY;
    const targetZ = 5 + Math.sin(time * 0.2) * 0.5;

    // Smooth damp camera position
    vec.current.set(targetX, targetY, targetZ);
    camera.position.lerp(vec.current, 0.05);
    
    // Look at center slightly offset
    camera.lookAt(0, 0, 0);
  });

  return null;
};
