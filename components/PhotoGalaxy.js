"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { useGalaxyStore } from "../lib/store";
import { GALAXY_PHOTOS } from "../lib/photos";
import Photo from "./Photo";

export default function PhotoGalaxy() {
  const stage = useGalaxyStore((s) => s.stage);
  const groupRef = useRef();

  const { opacity } = useSpring({
    opacity: stage === "galaxy" ? 1 : 0,
    config: { tension: 80, friction: 20 },
  });

  // Endless slow rotation of the whole ring/galaxy.
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
  });

  if (stage === "intro") return null;

  return (
    <animated.group ref={groupRef} visible={stage !== "intro"}>
      <Suspense fallback={null}>
        {GALAXY_PHOTOS.map((p, i) => (
          <Photo key={p.id} data={p} index={i} />
        ))}
      </Suspense>

      {/* Small glowing orb at the center, replacing the intro planet */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#fde68a"
          emissive="#fbbf24"
          emissiveIntensity={2}
        />
      </mesh>
    </animated.group>
  );
}
