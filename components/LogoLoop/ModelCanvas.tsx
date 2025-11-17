"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import SpinningModel from "./SpinningModel";

export default function ModelCanvas() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 3] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Suspense fallback={null}>
        <SpinningModel
          url="/models/myModel.glb"
          speed={1.0}
          rotateY={Math.PI / 6}
          scale={1.2}
          color="var(--brand-blue)" // can pass a CSS variable or hex
          mode="edges" // or "material"
          edgeThreshold={30}
          keepOriginal={false}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
