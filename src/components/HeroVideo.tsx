"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { usePrefersReducedMotion } from "@/hooks/useMotionPreferences";

/**
 * The Orbital Ring as a built object. Decorative: the headline beside it carries
 * all the meaning, so it is hidden from assistive tech and never focusable.
 *
 * The clip is a palindrome, forward then reversed, so the orbit loops without a
 * visible cut back to the opening angle.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
    } else {
      // Autoplay can still be refused; the poster frame stands in if so.
      void video.play().catch(() => {});
    }
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={asset("/video/hero-ring-poster.webp")}
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={asset("/video/hero-ring.webm")} type="video/webm" />
      <source src={asset("/video/hero-ring.mp4")} type="video/mp4" />
    </video>
  );
}
