import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
const Texts = () => {
  const gltf = useGLTF("/assets/models/jiwoobd.glb");
  const box = useGLTF("/assets/models/box.glb");
  const [number2Ref, number2Api] = useBox(() => ({
    mass: 0,
    linearDamping: 0.75,
    angularDamping: 0.15,
    friction: 0.2,
    position: [0, 0, 0],
    rotation: [Math.PI * 0.5, 0, 0],
    // onReady: (api) => {
    //   api.applyForce(0, 1, 0);
    // },
  }));
  const [number6Ref] = useBox(() => ({
    // mass: 0,
    linearDamping: 0.75,
    angularDamping: 0.15,
    friction: 0.2,
    position: [0.5, 0, 0],
    rotation: [Math.PI * 0.5, 0, 0],
  }));
  const three = useThree();

  const number2 = gltf.nodes["2"] as THREE.Mesh;
  const number6 = gltf.nodes["6"] as THREE.Mesh;

  const elapsed = React.useRef(0);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    elapsed.current += delta;

    //  number2Api.applyImpulse([0, 10, 0], [0, 0, 0]);
  });

  useEffect(() => {
    //number2Api.applyForce([0, 10, 0], [0, 0, 0]);
  }, []);

  const [staticTopPlane] = usePlane(() => ({
    type: "Static",
    rotation: [Math.PI * 0.5, 0, 0],
    position: [0, three.viewport.height * 0.5, 0],
    scale: [three.viewport.width, 1, 1],
  }));

  const [staticLeftPlane] = usePlane(() => ({
    type: "Static",
    rotation: [0, Math.PI * 0.5, 0],
    position: [three.viewport.width * -0.5, three.viewport.height * 0.5, 0],
    scale: [three.viewport.width, 1, 1],
  }));

  const [staticRightPlane] = usePlane(() => ({
    type: "Static",
    rotation: [0, Math.PI * 0.5, 0],
    position: [three.viewport.width, three.viewport.height * 0.5, 0],
    scale: [three.viewport.width, 1, 1],
  }));
  return (
    <>
      <mesh
        ref={staticTopPlane}
        // position={[0, three.viewport.height * 0.5, 0]}
        // rotation={[Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry />
      </mesh>
      <mesh
        ref={staticLeftPlane}

        // position={[0, three.viewport.height * 0.5, 0]}
        // rotation={[Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry />
      </mesh>
      {/* <mesh
        ref={staticRightPlane}

        // position={[0, three.viewport.height * 0.5, 0]}
        // rotation={[Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry />
      </mesh> */}
      <mesh
        scale={three.viewport.width}
        position={[0, three.viewport.height * -0.5, 0]}
        rotation={[Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry />
        <meshNormalMaterial />
      </mesh>
      {/* @ts-ignore */}
      <mesh {...number2} ref={number2Ref} />
      {/* @ts-ignore */}
      <mesh {...number6} ref={number6Ref} />
    </>
  );
};

export default Texts;
