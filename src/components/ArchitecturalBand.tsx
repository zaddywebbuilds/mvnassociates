"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

/**
 * A full bleed breath between the purple statement and Why MNV. No headline:
 * the page has been talking, and this is the moment it stops.
 */
export default function ArchitecturalBand() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[var(--mnv-ink)]">
      <div className="relative h-[clamp(20rem,54vw,42rem)] w-full">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { scale: 1 } : { scale: 1.07 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={asset("/images/band.webp")}
            alt="A circular sculpture on a waterfront terrace overlooking the Dubai skyline at dawn"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(23,19,28,0.55) 0%, rgba(23,19,28,0) 100%)",
          }}
        />

        <div className="shell absolute inset-x-0 bottom-0 pb-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            Dubai, United Arab Emirates
          </p>
        </div>
      </div>
    </section>
  );
}
