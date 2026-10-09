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

    // Scroll-based parallax
    // We map scroll position to camera Y position to move down through the 3D space
    const scrollY = window.scrollY;
    // Scale scroll value to a reasonable 3D space distance (e.g., 0.005)
    const scrollOffset = scrollY * 0.005;

    // Pointer-based parallax + scroll parallax
    const targetX = (pointer.x * 2) + idleX;
    // As we scroll down, we move the camera down (negative Y)
    const targetY = (pointer.y * 2) + idleY - scrollOffset;
    const targetZ = 5 + Math.sin(time * 0.2) * 0.5;

    // Smooth damp camera position
    vec.current.set(targetX, targetY, targetZ);
    camera.position.lerp(vec.current, 0.05);
    
    // Look slightly below the camera to give a feeling of looking forward/down
    camera.lookAt(0, -scrollOffset, 0);
  });

  return null;
};
