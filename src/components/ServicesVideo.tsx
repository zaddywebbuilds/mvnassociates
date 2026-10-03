"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { usePrefersReducedMotion } from "@/hooks/useMotionPreferences";

/**
 * The orbital installation, presented as a surface: a framed panel with its own
 * edge light, rather than footage washed into the background.
 */
export default function ServicesVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
    } else {
      void video.play().catch(() => {});
    }
  }, [reduceMotion]);

  return (
    <figure className="relative">
      <div
        className="relative overflow-hidden rounded-sm border border-white/12"
        style={{
          boxShadow:
            "0 44px 90px -40px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.09)",
        }}
      >
        <video
          ref={ref}
          className="block aspect-video w-full object-cover"
          poster={asset("/video/services-orbital-poster.webp")}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={asset("/video/services-orbital.webm")} type="video/webm" />
          <source src={asset("/video/services-orbital.mp4")} type="video/mp4" />
        </video>

        {/* Light catching the top lip of the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(199,188,212,0.5) 42%, transparent 100%)",
          }}
        />
      </div>
    </figure>
  );
}
