"use client";

import Scene from "../components/Scene";
import Overlay from "../components/Overlay";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <Scene />
      <Overlay />
    </main>
  );
}
