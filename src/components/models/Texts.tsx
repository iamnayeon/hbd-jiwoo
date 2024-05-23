import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
const Texts = () => {
  const gltf = useGLTF("/assets/models/jiwoobd.glb");

  const three = useThree();

  const number2 = gltf.nodes["2"] as THREE.Mesh;
  const number6 = gltf.nodes["6"] as THREE.Mesh;
  const number2RBRef = useRef<RapierRigidBody>(null);
  const number6RBRef = useRef<RapierRigidBody>(null);

  const elapsed = React.useRef(0);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    elapsed.current += delta;
  });

  useEffect(() => {
    const deviceorientationHandler = (e) => {
      const rotateDegrees = e.alpha; // alpha: rotation around z-axis
      const leftToRight = e.gamma ?? 0; // gamma: left to right
      const frontToBack = e.beta ?? 0; // beta: front b

      const left = leftToRight < 1;
      const right = leftToRight > 1;

      if (number2RBRef.current) {
        number2RBRef.current.applyImpulse(
          {
            x: left ? -0.5 : right ? 0.5 : 0,
            y: 0,
            z: 0,
          },
          true,
        );
      }
      if (number6RBRef.current) {
        number6RBRef.current.applyImpulse(
          {
            x: left ? -0.5 : right ? 0.5 : 0,
            y: 0,
            z: 0,
          },
          true,
        );
      }

      //
    };

    window.addEventListener("deviceorientation", deviceorientationHandler);

    return () => {
      window.removeEventListener("deviceorientation", deviceorientationHandler);
    };
  }, []);
  return (
    <>
      {/* BACK */}
      <RigidBody
        rotation={[0, 0, Math.PI * 0.5]}
        position={[0, 0, -three.viewport.width * 0.5]}
        scale={three.viewport.height}
      >
        <mesh>
          <planeGeometry />
        </mesh>
      </RigidBody>

      {/* LEFT */}
      <RigidBody
        rotation={[0, Math.PI * 0.5, 0]}
        position={[-three.viewport.width * 0.5, 0, 0]}
        scale={[three.viewport.width, three.viewport.height, 1]}
      >
        <mesh>
          <planeGeometry />
        </mesh>
      </RigidBody>

      {/* RIGHT */}
      <RigidBody
        rotation={[0, Math.PI * 0.5, 0]}
        position={[three.viewport.width * 0.5, 0, 0]}
        scale={[three.viewport.width, three.viewport.height, 1]}
      >
        <mesh>
          <planeGeometry />
        </mesh>
      </RigidBody>

      {/* TOP */}
      <RigidBody
        rotation={[Math.PI * 0.5, 0, 0]}
        position={[0, three.viewport.height * 0.5 - 0.1, 0]}
        scale={three.viewport.width}
      >
        <mesh>
          <planeGeometry />
        </mesh>
      </RigidBody>
      {/* BOTTOM */}
      <RigidBody
        rotation={[Math.PI * 0.5, 0, 0]}
        position={[0, -three.viewport.height * 0.5, 0]}
        scale={three.viewport.width}
      >
        <mesh>
          <planeGeometry />
        </mesh>
      </RigidBody>
      <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} colliders={"cuboid"} ref={number2RBRef}>
        {/* @ts-ignore */}
        <mesh {...number2} />
      </RigidBody>
      <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} colliders="cuboid" ref={number6RBRef}>
        {/* @ts-ignore */}
        <mesh {...number6} />
      </RigidBody>
    </>
  );
};

export default Texts;
