"use client";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Texts from "@/components/models/Texts";

import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

export default function Home() {
  return (
    <div style={{ width: "100svw", height: "100svh" }}>
      <Canvas
        camera={{
          fov: 70,
          near: 0.01,
          position: [0, 0, 3],
        }}
        flat
        gl={{
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, 1, 0]}>
            <Texts />
          </Physics>
          <OrbitControls />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
