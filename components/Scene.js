"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import IntroPlanet from "./IntroPlanet";
import PhotoGalaxy from "./PhotoGalaxy";
import CameraRig from "./CameraRig";

export default function Scene() {
  const controlsRef = useRef();

  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 50 }}
      className="!absolute inset-0"
      dpr={[1, 1.75]}
    >
      <color attach="background" args={["#04030a"]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7dd3fc" />
      <pointLight position={[-6, -2, -4]} intensity={0.6} color="#fbbf24" />

      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={3}
        saturation={0}
        fade
        speed={0.6}
      />

      <IntroPlanet />
      <PhotoGalaxy />
      <CameraRig controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4}
        maxDistance={40}
        enabled={false}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.4}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
