"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { useGalaxyStore } from "../lib/store";

export default function IntroPlanet() {
  const stage = useGalaxyStore((s) => s.stage);
  const setStage = useGalaxyStore((s) => s.setStage);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  // Drives both the "waiting to be touched" idle state and the burst-outward
  // transition into the galaxy. Feel free to swap this for GSAP timelines if
  // you want finer scrubbing control over the burst.
  const { scale, opacity } = useSpring({
    scale:
      stage === "intro" ? (hovered ? 1.08 : 1) : stage === "transition" ? 6 : 0.35,
    opacity: stage === "galaxy" ? 0 : 1,
    config:
      stage === "transition"
        ? { tension: 120, friction: 16 }
        : { tension: 200, friction: 20 },
  });

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const handleClick = () => {
    if (stage !== "intro") return;
    setStage("transition");
    // Give the burst animation time to play before revealing the galaxy.
    setTimeout(() => setStage("galaxy"), 1100);
  };

  return (
    <animated.group
      ref={groupRef}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => stage === "intro" && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <animated.meshStandardMaterial
          color="#7dd3fc"
          emissive="#38bdf8"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Saturn-style rings */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[2.1, 3.2, 80]} />
        <animated.meshBasicMaterial
          color="#fbbf24"
          side={THREE.DoubleSide}
          transparent
          opacity={opacity.to((o) => o * 0.7)}
        />
      </mesh>
    </animated.group>
  );
}
