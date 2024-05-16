"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Texts from "@/components/models/Texts";
import { Physics, Debug } from "@react-three/cannon";

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
        <ambientLight />

        <Physics gravity={[0, 1, 0]}>
          <Debug color="black" scale={1.1}>
            <Texts />
          </Debug>
        </Physics>
        <OrbitControls />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
