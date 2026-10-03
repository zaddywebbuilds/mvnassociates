"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "@/data/services";
import {
  useInViewport,
  useMediaQuery,
  usePrefersReducedMotion,
} from "@/hooks/useMotionPreferences";

const ServiceOrbitalScene = dynamic(
  () => import("./three/ServiceOrbitalScene"),
  { ssr: false }
);

const RADIUS_X = 40;
const RADIUS_Y = 31;
const START = -Math.PI / 2;
const round = (n: number) => Number(n.toFixed(3));

const NODES = services.map((s, i) => {
  const a = START + (i / services.length) * Math.PI * 2;
  const cos = Math.cos(a);
  return {
    id: s.id,
    title: s.title,
    x: round(50 + cos * RADIUS_X),
    y: round(50 + Math.sin(a) * RADIUS_Y),
    rightSide: cos >= -0.08,
  };
});

export default function ServiceOrbital() {
  const [activeIndex, setActiveIndex] = useState(1);
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(hostRef, "200px");
  const reduceMotion = usePrefersReducedMotion();
  const isSmall = useMediaQuery("(max-width: 1023px)");

  const active = services[activeIndex];

  return (
    <div className="grid gap-14 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-center xl:gap-10">
      <div className="order-2 xl:order-1 xl:pr-8">
        <div className="min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--mnv-lavender-light)]">
                <span className="numeral">{active.index}</span>
                <span className="inline-block h-px w-6 bg-current opacity-50" aria-hidden="true" />
                <span>{active.title}</span>
              </p>

              <h3 className="mt-6 text-[clamp(1.8rem,2.9vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
                {active.summary}
              </h3>

              <p className="mt-5 max-w-[40ch] text-[1.0625rem] leading-[1.65] text-white/62">
                {active.description}
              </p>

              <a
                href={active.href}
                className="group mt-8 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-white"
              >
                Explore {active.title}
                <svg width="15" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 5h13M10.5 1 14.5 5l-4 4" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="order-1 xl:order-2">
        <div ref={hostRef} className="relative mx-auto aspect-square w-full max-w-[34rem] xl:max-w-[39rem]">
          {/* The object. Decorative: every name and number lives in the buttons
              layered over it, so nothing here is the only copy of anything. */}
          <div className="absolute inset-0" aria-hidden="true">
            {!isSmall && (
            <ServiceOrbitalScene
              activeIndex={activeIndex}
              count={services.length}
              quality={isSmall ? { dpr: 1, segments: 60 } : { dpr: 1.5, segments: 110 }}
              animate={!reduceMotion}
              active={inView}
            />
            )}
          </div>

          {NODES.map((n, i) => {
            const on = i === activeIndex;
            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                aria-pressed={on}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span
                  className="block size-[7px] rounded-full transition-all duration-300"
                  style={{
                    background: on ? "#ffffff" : "rgba(214,204,228,0.55)",
                    boxShadow: on ? "0 0 0 5px rgba(199,188,212,0.14)" : "none",
                  }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.8125rem] font-medium transition-colors duration-300 xl:text-[0.875rem] ${
                    n.rightSide ? "left-full ml-3.5" : "right-full mr-3.5"
                  }`}
                  style={{ color: on ? "#ffffff" : "rgba(255,255,255,0.5)" }}
                >
                  {n.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
