"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

export type Quality = { dpr: number; segments: number };

type Props = {
  /** Index of the service currently under the cursor or keyboard focus. */
  activeIndex: number;
  count: number;
  quality: Quality;
  animate: boolean;
  active: boolean;
};

const BASE_TILT = -0.3;
const ORBIT_TILTS: [number, number, number][] = [
  [1.32, 0.1, 0.12],
  [1.05, 0.62, -0.2],
  [1.5, -0.48, 0.3],
];

function Orbital({ activeIndex, count, quality, animate }: Omit<Props, "active">) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = tilt.current;
    const s = spin.current;
    if (!t || !s) return;

    // Turning to face the selected service is the whole reason this is live
    // rather than a recording: the object answers the choice being made.
    const facing = -(activeIndex / count) * Math.PI * 2;
    const idle = animate ? Math.sin(state.clock.elapsedTime * 0.18) * 0.04 : 0;
    s.rotation.y = THREE.MathUtils.lerp(s.rotation.y, facing + idle, animate ? 0.055 : 1);

    if (animate) {
      // Pointer response stays within a few degrees.
      t.rotation.x = THREE.MathUtils.lerp(t.rotation.x, BASE_TILT + state.pointer.y * 0.05, 0.04);
      t.rotation.z = THREE.MathUtils.lerp(t.rotation.z, state.pointer.x * 0.045, 0.04);
    } else {
      t.rotation.x = BASE_TILT;
      t.rotation.z = 0;
    }
  });

  return (
    <group ref={tilt} rotation={[BASE_TILT, 0, 0]}>
      <group ref={spin}>
        {/* The core. Polished rather than mirrored, so it catches light instead
            of reflecting an empty scene back as black. */}
        <mesh>
          <sphereGeometry args={[0.92, 64, 64]} />
          <meshPhysicalMaterial
            color="#6c4a9e"
            metalness={0.22}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={2.4}
            transmission={0.18}
            thickness={0.8}
            ior={1.44}
          />
        </mesh>

        {/* Orbit planes at different attitudes */}
        {ORBIT_TILTS.map((rot, i) => (
          <mesh key={i} rotation={rot}>
            <torusGeometry args={[2.1 + i * 0.18, 0.006, 8, quality.segments]} />
            <meshBasicMaterial color="#c0aedc" transparent opacity={0.3} />
          </mesh>
        ))}

      </group>
    </group>
  );
}

export default function ServiceOrbitalScene({
  activeIndex,
  count,
  quality,
  animate,
  active,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 36 }}
      dpr={[1, quality.dpr]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />

      <Environment resolution={128}>
        <Lightformer intensity={1.1} position={[0, 0, -10]} scale={[20, 20, 1]} color="#3a2458" />
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[7, 2.5, 1]} color="#ffffff" />
        <Lightformer intensity={1.8} position={[-5, 0, 2]} scale={[3, 6, 1]} color="#c9b8e4" />
        <Lightformer intensity={1.5} position={[5, -1, 2]} scale={[3, 6, 1]} color="#8f68c6" />
        <Lightformer form="ring" intensity={4} position={[-2, 2, 4]} scale={1.3} color="#ffffff" />
      </Environment>

      <Orbital activeIndex={activeIndex} count={count} quality={quality} animate={animate} />
    </Canvas>
  );
}
