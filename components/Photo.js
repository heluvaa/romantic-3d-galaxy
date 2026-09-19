"use client";

import { useState } from "react";
import { useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useGalaxyStore } from "../lib/store";

export default function Photo({ data, index }) {
  const texture = useTexture(data.url);
  const [hovered, setHovered] = useState(false);
  const selectedPhoto = useGalaxyStore((s) => s.selectedPhoto);
  const selectPhoto = useGalaxyStore((s) => s.selectPhoto);

  const isSelected = selectedPhoto === index;
  const isDimmed = selectedPhoto !== null && !isSelected;

  const { scale, opacity } = useSpring({
    scale: hovered && selectedPhoto === null ? 1.3 : isSelected ? 1.6 : 1,
    opacity: isDimmed ? 0.12 : 1,
    config: { tension: 210, friction: 22 },
  });

  return (
    <animated.group
      position={data.position}
      rotation={[0, data.rotationY, 0]}
      scale={scale}
    >
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          if (selectedPhoto === null) setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          selectPhoto(index);
        }}
      >
        <planeGeometry args={[1.6, 1.6]} />
        <animated.meshBasicMaterial
          map={texture}
          transparent
          opacity={opacity}
          toneMapped={false}
        />
      </mesh>
    </animated.group>
  );
}
