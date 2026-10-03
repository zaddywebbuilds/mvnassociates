"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import {
  useInViewport,
  usePrefersReducedMotion,
} from "@/hooks/useMotionPreferences";

/**
 * The orbital installation, presented as a surface: a framed panel with its own
 * edge light, rather than footage washed into the background.
 *
 * Nothing is fetched until the section is close to the viewport. This clip sits
 * well below the fold, so loading it eagerly spent ~630KB of the page's budget
 * before a visitor had any chance of seeing it.
 */
export default function ServicesVideo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInViewport(hostRef, "500px");
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;

    if (reduceMotion) {
      video.pause();
      return;
    }
    video.load();
    void video.play().catch(() => {});
  }, [near, reduceMotion]);

  return (
    <figure ref={hostRef} className="relative">
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
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          {/* Sources are withheld until the section is near, so the browser has
              nothing to fetch before then. The poster stands in meanwhile. */}
          {near && !reduceMotion ? (
            <>
              <source src={asset("/video/services-orbital.webm")} type="video/webm" />
              <source src={asset("/video/services-orbital.mp4")} type="video/mp4" />
            </>
          ) : null}
        </video>

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
