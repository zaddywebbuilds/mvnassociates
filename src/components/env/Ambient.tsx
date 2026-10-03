import Image from "next/image";
import { asset } from "@/lib/asset";

type Plate = "terrace" | "glow" | "marble";

const PLATE_FEATHER =
  "radial-gradient(118% 96% at 50% 50%, #000 34%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0) 100%)";

/**
 * A pool of light in the page's environment.
 *
 * The plates are heavily blurred crops of the brand renders, composited with
 * `screen` over the dark base: their shadows contribute nothing and only the
 * highlights carry through, so the result reads as light falling into a room
 * rather than as a photograph sitting behind the text.
 */
export function Ambient({
  plate = "terrace",
  className = "",
  opacity = 0.5,
  blend = "screen",
}: {
  plate?: Plate;
  className?: string;
  opacity?: number;
  blend?: "screen" | "lighten" | "soft-light";
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={{
        opacity,
        mixBlendMode: blend,
        // Always feathered. A plate with a hard edge reads as a pasted rectangle
        // and undoes the whole point of a continuous environment.
        maskImage: PLATE_FEATHER,
        WebkitMaskImage: PLATE_FEATHER,
      }}
    >
      <Image
        src={asset(`/images/env/env-${plate}.webp`)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Soft light bleeding across a section boundary, so zones run into each other
 * instead of stacking as rectangles.
 */
export function LightSpill({
  className = "",
  color = "rgba(140, 104, 189, 0.5)",
  size = "68% 58%",
  at = "50% 50%",
}: {
  className?: string;
  color?: string;
  size?: string;
  at?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(${size} at ${at}, ${color} 0%, rgba(0,0,0,0) 72%)`,
      }}
    />
  );
}

/** A hairline of light along a section edge, the way light catches a stone lip. */
export function EdgeLight({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-px ${className}`}
      style={{
        background:
          "linear-gradient(to right, transparent 0%, rgba(199,188,212,0.42) 28%, rgba(199,188,212,0.5) 52%, transparent 100%)",
      }}
    />
  );
}
