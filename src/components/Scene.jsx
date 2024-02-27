import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Environment } from "./Environment";

const Scene = ({input}) => (
  <Canvas shadows camera={{ fov: 30, position: [-2, 2, 5] }}>
    <color attach="background" args={[0xA1ADBE]} />

    <group position={[0, 0, 0]}>
      <Suspense fallback={null}>
        <Model position={[0, 0, 0]} input={input} />
      </Suspense>
    </group>
    <Environment />
    <OrbitControls target={[0, 1, 0]} />
  </Canvas>
);

export default Scene;
