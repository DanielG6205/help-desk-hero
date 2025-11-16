"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh } from "three";

type WireMode = "material" | "edges";

type Props = {
  url: string;
  speed?: number; // radians per second
  rotateX?: number;
  rotateY?: number;
  scale?: number | [number, number, number];
  color?: string | number; // line / wireframe color
  mode?: WireMode; // "material" (simple) or "edges" (clean edges)
  edgeThreshold?: number; // only for edges mode: angle (deg) to keep edge
  keepOriginal?: boolean; // show original mesh under lines
};

export default function SpinningModelWire({
  url,
  speed = 0.75,
  rotateX = 0,
  rotateY = 0,
  scale = 1,
  color = "#2B6EF2", // app blue fallback
  mode = "edges",
  edgeThreshold = 40,
  keepOriginal = false,
}: Props) {
  const group = useRef<Group | null>(null);
  const { scene } = useGLTF(url);

  // Normalize color to a THREE.Color
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineColor = useMemo(() => new THREE.Color(color as any), [color]);

  // Clone scene so we don't mutate source (especially if cached)
  const processed = useMemo(() => {
    const root = scene.clone(true);

    if (mode === "material") {
      root.traverse((obj) => {
        if ((obj as Mesh).isMesh) {
          const mesh = obj as Mesh;
          // Force a basic material (optional) OR reuse existing and set wireframe
          // Replacing with MeshBasicMaterial avoids lighting variation.
          mesh.material = new THREE.MeshBasicMaterial({
            color: lineColor,
            wireframe: true,
            transparent: true,
            opacity: 1,
          });
        }
      });
      return { main: root, edgesGroup: null };
    }

    // mode === "edges"
    const edgesGroup = new THREE.Group();
    root.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        const mesh = obj as Mesh;
        if (!mesh.geometry) return;
        // Build edges geometry (the threshold filters shallow angles)
        const g = new THREE.EdgesGeometry(mesh.geometry, edgeThreshold);
        const material = new THREE.LineBasicMaterial({ color: lineColor });
        const lines = new THREE.LineSegments(g, material);
        // Match transforms of original mesh
        lines.position.copy(mesh.position);
        lines.rotation.copy(mesh.rotation);
        lines.quaternion.copy(mesh.quaternion);
        lines.scale.copy(mesh.scale);
        edgesGroup.add(lines);
        if (!keepOriginal) {
          mesh.visible = false; // hide original surface
        } else {
          // If keeping original, make it fully transparent or dark
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
          });
        }
      }
    });
    root.add(edgesGroup);
    return { main: root, edgesGroup };
  }, [scene, mode, edgeThreshold, keepOriginal, lineColor]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += speed * delta;
  });

  return (
    <group ref={group} rotation={[rotateX, rotateY, 0]} scale={scale}>
      <primitive object={processed.main} />
    </group>
  );
}
