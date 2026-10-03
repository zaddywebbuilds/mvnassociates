"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

export type RingTone = "light" | "dark";

export type Quality = {
  dpr: number;
  samples: number;
  resolution: number;
  segments: number;
  nodes: boolean;
};

type SceneProps = {
  tone: RingTone;
  /** Hero reads as an open, unfinished circle. The closing section completes it. */
  complete: boolean;
  quality: Quality;
  animate: boolean;
  active: boolean;
};

const BASE_TILT = -0.46;
const BASE_YAW = 0.34;

const PALETTE = {
  light: {
    glass: "#e3d8f2",
    metal: "#5e3a8c",
    metalness: 0.62,
    roughness: 0.22,
    hairline: "#a191b2",
    node: "#5c3a85",
    backdrop: "#efe8f8",
    backdropIntensity: 1.0,
    key: "#ffffff",
    keyIntensity: 3.2,
    fillLeft: "#cdbfe3",
    fillRight: "#8f6bbd",
    rim: "#ffffff",
    glassOpacity: 0.93,
    envIntensity: 2.9,
  },
  dark: {
    glass: "#b9a6d4",
    metal: "#9d7fc6",
    metalness: 0.6,
    roughness: 0.3,
    hairline: "#b5a4c8",
    node: "#d2c6e2",
    backdrop: "#4a2f70",
    backdropIntensity: 0.85,
    key: "#efe8fa",
    keyIntensity: 1.9,
    fillLeft: "#6b4594",
    fillRight: "#c7bcd4",
    rim: "#e4dcf2",
    glassOpacity: 0.82,
    envIntensity: 2.0,
  },
} as const;

function Ring({ tone, complete, quality, animate }: Omit<SceneProps, "active">) {
  const tiltGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const c = PALETTE[tone];

  // An open arc in the hero, a closed circle at the close of the page.
  const arc = complete ? Math.PI * 2 : Math.PI * 1.58;

  useFrame((state, delta) => {
    const tilt = tiltGroup.current;
    const spin = spinGroup.current;
    if (!tilt || !spin) return;

    if (animate) {
      // Slow, continuous drift. Never fast enough to read as "spinning".
      spin.rotation.z += delta * 0.045;

      // Pointer response capped at roughly three degrees.
      const targetX = BASE_TILT + state.pointer.y * 0.055;
      const targetY = BASE_YAW + state.pointer.x * 0.06;
      tilt.rotation.x = THREE.MathUtils.lerp(tilt.rotation.x, targetX, 0.035);
      tilt.rotation.y = THREE.MathUtils.lerp(tilt.rotation.y, targetY, 0.035);

      // Barely perceptible breathing keeps the object feeling alive.
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.45) * 0.006;
      tilt.scale.setScalar(breathe);
    } else {
      tilt.rotation.x = BASE_TILT;
      tilt.rotation.y = BASE_YAW;
    }
  });

  return (
    <group ref={tiltGroup} rotation={[BASE_TILT, BASE_YAW, 0]}>
      <group ref={spinGroup}>
        {/* Primary band. Polished rather than mirrored, so it catches light instead of
            reflecting an empty scene back as black. */}
        <mesh rotation={[0, 0, complete ? 0 : -0.42]}>
          <torusGeometry args={[2.3, 0.21, 32, quality.segments, arc]} />
          <meshPhysicalMaterial
            color={c.glass}
            metalness={0.12}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.03}
            envMapIntensity={c.envIntensity}
            transparent
            opacity={c.glassOpacity}
          />
        </mesh>

        {/* Purple band crossing the primary plane. Rings at different attitudes are
            what make this read as a built object rather than a drawn circle. */}
        <mesh rotation={[0.74, 0.14, 0.26]}>
          <torusGeometry
            args={[2.26, 0.052, 18, Math.round(quality.segments * 0.8), complete ? Math.PI * 2 : Math.PI * 1.45]}
          />
          <meshStandardMaterial
            color={c.metal}
            metalness={c.metalness}
            roughness={c.roughness + 0.08}
            envMapIntensity={1.7}
          />
        </mesh>

        {/* Third plane, shallower still */}
        <mesh rotation={[-0.34, 0.52, 0.15]}>
          <torusGeometry args={[1.92, 0.028, 14, 160]} />
          <meshPhysicalMaterial
            color={c.glass}
            metalness={0.16}
            roughness={0.08}
            clearcoat={1}
            envMapIntensity={c.envIntensity * 0.8}
            transparent
            opacity={c.glassOpacity * 0.6}
          />
        </mesh>

        {/* Inner core ring */}
        <mesh rotation={[0.3, -0.4, 0]}>
          <torusGeometry args={[1.32, 0.03, 14, 150]} />
          <meshStandardMaterial
            color={c.metal}
            metalness={c.metalness}
            roughness={c.roughness + 0.08}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Architectural hairline, drawn like a drafting circle */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[3.02, 0.0045, 8, 180]} />
          <meshBasicMaterial color={c.hairline} transparent opacity={tone === "dark" ? 0.4 : 0.5} />
        </mesh>

        {/* Nine nodes: one for each advisory discipline orbiting the centre */}
        {quality.nodes &&
          Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2 + 0.2;
            return (
              <mesh key={i} position={[Math.cos(a) * 3.02, Math.sin(a) * 3.02, -0.05]}>
                <sphereGeometry args={[0.042, 16, 16]} />
                <meshStandardMaterial
                  color={c.node}
                  metalness={c.metalness}
                  roughness={c.roughness}
                  envMapIntensity={1.4}
                />
              </mesh>
            );
          })}
      </group>
    </group>
  );
}

export default function OrbitalRingScene({
  tone,
  complete,
  quality,
  animate,
  active,
}: SceneProps) {
  const c = PALETTE[tone];

  return (
    <Canvas
      camera={{ position: [0, 0, 8.6], fov: 34 }}
      dpr={[1, quality.dpr]}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={tone === "dark" ? 0.5 : 0.9} />
      <directionalLight position={[3, 5, 4]} intensity={tone === "dark" ? 1.1 : 1.8} />

      {/* Studio lighting rig. This is what keeps the glass from looking like plastic. */}
      <Environment resolution={192}>
        {/* Broad backdrop first. Without it the reflective surfaces mirror an empty
            scene and render black. */}
        <Lightformer
          intensity={c.backdropIntensity}
          position={[0, 0, -12]}
          scale={[26, 26, 1]}
          color={c.backdrop}
        />
        <Lightformer
          intensity={c.backdropIntensity * 0.7}
          position={[0, 0, 12]}
          scale={[26, 26, 1]}
          color={c.backdrop}
        />
        <Lightformer
          intensity={c.keyIntensity}
          position={[0, 4.5, 3]}
          scale={[9, 3, 1]}
          color={c.key}
        />
        <Lightformer
          intensity={1.5}
          position={[-5, 0.5, 2]}
          scale={[4, 7, 1]}
          color={c.fillLeft}
        />
        <Lightformer
          intensity={1.2}
          position={[5, -0.5, 1.5]}
          scale={[4, 7, 1]}
          color={c.fillRight}
        />
        <Lightformer
          intensity={0.9}
          position={[0, -4.5, 2]}
          scale={[9, 2, 1]}
          color={c.rim}
        />
        {/* Tight sources that leave a specular glint on the band */}
        <Lightformer form="ring" intensity={5} position={[-2.4, 2.6, 4]} scale={1.4} color={c.rim} />
        <Lightformer form="ring" intensity={3.2} position={[3, -1.6, 3.5]} scale={1} color={c.fillRight} />
      </Environment>

      <Ring tone={tone} complete={complete} quality={quality} animate={animate} />
    </Canvas>
  );
}
