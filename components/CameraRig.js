"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGalaxyStore } from "../lib/store";
import { GALAXY_PHOTOS } from "../lib/photos";

const INTRO_POS = new THREE.Vector3(0, 1.5, 7);
const TRANSITION_POS = new THREE.Vector3(0, 1, 4);
const GALAXY_POS = new THREE.Vector3(0, 8, 18);
const ORIGIN = new THREE.Vector3(0, 0, 0);

export default function CameraRig({ controlsRef }) {
  const { camera } = useThree();
  const stage = useGalaxyStore((s) => s.stage);
  const selectedPhoto = useGalaxyStore((s) => s.selectedPhoto);

  const fallbackLook = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // Frame-rate independent smoothing factor.
    const lerpAmt = 1 - Math.pow(0.001, delta);

    let targetPos = INTRO_POS;
    let targetLook = ORIGIN;
    let controlsEnabled = false;

    if (stage === "transition") {
      targetPos = TRANSITION_POS;
      targetLook = ORIGIN;
    } else if (stage === "galaxy") {
      if (selectedPhoto !== null) {
        const p = GALAXY_PHOTOS[selectedPhoto];
        const photoPos = new THREE.Vector3(...p.position);
        const dirFromCenter = photoPos.clone().normalize();
        targetPos = photoPos.clone().add(dirFromCenter.multiplyScalar(2.4));
        targetLook = photoPos;
        controlsEnabled = false;
      } else {
        targetPos = GALAXY_POS;
        targetLook = ORIGIN;
        controlsEnabled = true;
      }
    }

    camera.position.lerp(targetPos, lerpAmt);

    if (controlsRef.current) {
      controlsRef.current.enabled = controlsEnabled;
      controlsRef.current.target.lerp(targetLook, lerpAmt);
      controlsRef.current.update();
    } else {
      fallbackLook.current.lerp(targetLook, lerpAmt);
      camera.lookAt(fallbackLook.current);
    }
  });

  return null;
}
