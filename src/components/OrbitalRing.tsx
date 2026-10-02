"use client";

import dynamic from "next/dynamic";
import React, { useRef, useSyncExternalStore } from "react";
import type { Quality, RingTone } from "./three/OrbitalRingScene";
import {
  useInViewport,
  useMediaQuery,
  usePrefersReducedMotion,
} from "@/hooks/useMotionPreferences";

const OrbitalRingScene = dynamic(() => import("./three/OrbitalRingScene"), {
  ssr: false,
});

const QUALITY: Record<"high" | "medium" | "low", Quality> = {
  high: { dpr: 1.5, samples: 6, resolution: 256, segments: 200, nodes: true },
  medium: { dpr: 1.25, samples: 4, resolution: 160, segments: 150, nodes: true },
  low: { dpr: 1, samples: 2, resolution: 96, segments: 100, nodes: false },
};

type Support = { webgl: boolean; modest: boolean };

let cachedSupport: Support | null = null;

function detectSupport(): Support {
  if (cachedSupport) return cachedSupport;

  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    webgl = false;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const modest =
    (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
    (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

  cachedSupport = { webgl, modest };
  return cachedSupport;
}

const noopSubscribe = () => () => {};

/** Server renders the drawn fallback; the client swaps in WebGL once it knows it can. */
function useSupport(): Support | null {
  return useSyncExternalStore<Support | null>(
    noopSubscribe,
    detectSupport,
    () => null
  );
}

type Props = {
  tone?: RingTone;
  complete?: boolean;
  className?: string;
};

/**
 * The MNV Orbital Ring. Renders WebGL where it is supported and worthwhile,
 * and a drawn equivalent everywhere else so the composition never breaks.
 */
export default function OrbitalRing({
  tone = "light",
  complete = false,
  className,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(hostRef, "250px");
  const reducedMotion = usePrefersReducedMotion();
  const isSmall = useMediaQuery("(max-width: 767px)");
  const isMedium = useMediaQuery("(max-width: 1279px)");

  const support = useSupport();

  const fallback = <OrbitalRingFallback tone={tone} complete={complete} />;

  const tier = isSmall || support?.modest ? "low" : isMedium ? "medium" : "high";

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {support === null || !support.webgl ? (
        fallback
      ) : (
        <SceneBoundary fallback={fallback}>
          <OrbitalRingScene
            tone={tone}
            complete={complete}
            quality={QUALITY[tier]}
            animate={!reducedMotion}
            active={inView}
          />
        </SceneBoundary>
      )}
    </div>
  );
}

class SceneBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function OrbitalRingFallback({
  tone,
  complete,
}: {
  tone: RingTone;
  complete: boolean;
}) {
  const stroke = tone === "dark" ? "#a191b2" : "#533278";
  const soft = tone === "dark" ? "#6a528c" : "#a191b2";
  const id = complete ? "ring-complete" : "ring-open";

  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.95" />
          <stop offset="55%" stopColor={soft} stopOpacity="0.55" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g transform="translate(200 200)">
        <circle
          r="138"
          fill="none"
          stroke={`url(#${id}-grad)`}
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={complete ? undefined : "640 240"}
          transform="rotate(-24)"
        />
        <circle r="97" fill="none" stroke={stroke} strokeWidth="2" opacity="0.65" />
        <circle r="178" fill="none" stroke={soft} strokeWidth="0.75" opacity="0.5" />
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2 + 0.2;
          // Rounded so server and client render byte-identical coordinates.
          return (
            <circle
              key={i}
              cx={(Math.cos(a) * 178).toFixed(2)}
              cy={(Math.sin(a) * 178).toFixed(2)}
              r="3.2"
              fill={stroke}
              opacity="0.8"
            />
          );
        })}
      </g>
    </svg>
  );
}
