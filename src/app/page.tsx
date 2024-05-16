"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div style={{ width: "100svw", height: "100svh" }}>
      <Canvas
        camera={
          {
            // fov: 70,
            // near: 0.01,
            // position: [0, 0, 1],
          }
        }
        flat
        gl={{
          antialias: true,
        }}
      >
        <ambientLight />
        <mesh>
          <meshNormalMaterial />
          <boxGeometry />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
