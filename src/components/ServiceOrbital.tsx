"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/data/services";

const RADIUS_X = 41;
const RADIUS_Y = 33;
const START = -Math.PI / 2;

const round = (n: number) => Number(n.toFixed(3));

const NODES = services.map((s, i) => {
  const a = START + (i / services.length) * Math.PI * 2;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  // Nodes toward the top of the ellipse read as further away.
  const far = (-sin + 1) / 2;

  return {
    id: s.id,
    title: s.title,
    x: round(50 + cos * RADIUS_X),
    y: round(50 + sin * RADIUS_Y),
    depth: round(1 - far * 0.16),
    dim: round(1 - far * 0.2),
    rightSide: cos >= -0.08,
  };
});

export default function ServiceOrbital() {
  const [activeId, setActiveId] = useState(services[1].id);
  const activeIndex = services.findIndex((s) => s.id === activeId);
  const active = services[activeIndex] ?? services[0];

  // The orbit plane answers to the selection. Only the rings turn, never the
  // labels, so nothing ends up set at an angle.
  const ringTilt = round((activeIndex - 4) * 1.5);

  return (
    <div className="grid gap-16 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-center xl:gap-8">
      <div className="order-2 xl:order-1 xl:pr-10">
        <div className="min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--mnv-lavender-light)]">
                <span className="numeral">{active.index}</span>
                <span className="inline-block h-px w-6 bg-current opacity-50" aria-hidden="true" />
                <span>{active.title}</span>
              </p>

              <h3 className="mt-6 text-[clamp(1.9rem,2.9vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
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
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 5h13M10.5 1 14.5 5l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="order-1 xl:order-2">
        <div className="relative mx-auto aspect-square w-full max-w-[36rem] xl:max-w-[41rem]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g
              style={{
                transform: `rotate(${ringTilt}deg)`,
                transformOrigin: "50% 50%",
                transition: "transform 620ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <ellipse
                cx="50"
                cy="50"
                rx={RADIUS_X}
                ry={RADIUS_Y}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.16"
              />
              <ellipse
                cx="50"
                cy="50"
                rx={RADIUS_X * 1.17}
                ry={RADIUS_Y * 1.17}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.1"
              />
              <ellipse
                cx="50"
                cy="50"
                rx={RADIUS_X * 0.6}
                ry={RADIUS_Y * 0.6}
                fill="none"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="0.1"
              />
            </g>

            {NODES.map((n) => {
              const on = n.id === activeId;
              return (
                <line
                  key={n.id}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke={on ? "#d9cfe8" : "rgba(255,255,255,0.13)"}
                  strokeWidth={on ? 0.3 : 0.08}
                  style={{ transition: "stroke 380ms ease, stroke-width 380ms ease" }}
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex size-[5.75rem] items-center justify-center rounded-full text-white xl:size-[6.5rem]"
              style={{
                background:
                  "radial-gradient(130% 130% at 32% 24%, #9a77c9 0%, #653f96 46%, #3a2159 100%)",
                boxShadow:
                  "0 0 68px -10px rgba(161,145,178,0.55), inset 0 1px 1px rgba(255,255,255,0.35)",
              }}
            >
              <span className="text-[0.8125rem] font-semibold tracking-[0.18em]">MNV</span>
            </div>
          </div>

          {NODES.map((n) => {
            const on = n.id === activeId;
            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActiveId(n.id)}
                onFocus={() => setActiveId(n.id)}
                onClick={() => setActiveId(n.id)}
                aria-pressed={on}
                className="absolute z-20 rounded-full"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: `translate(-50%, -50%) scale(${on ? n.depth * 1.12 : n.depth})`,
                  opacity: on ? 1 : n.dim * 0.74,
                  transition:
                    "transform 420ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease",
                }}
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: on ? 14 : 9,
                    height: on ? 14 : 9,
                    background: on ? "#ffffff" : "rgba(214,204,228,0.72)",
                    boxShadow: on
                      ? "0 0 0 6px rgba(199,188,212,0.16), 0 0 26px 2px rgba(216,206,233,0.75)"
                      : "none",
                    transition:
                      "width 380ms ease, height 380ms ease, background 380ms ease, box-shadow 380ms ease",
                  }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.8125rem] font-medium xl:text-[0.875rem] ${
                    n.rightSide ? "left-full ml-4" : "right-full mr-4"
                  }`}
                  style={{
                    color: on ? "#ffffff" : "rgba(255,255,255,0.55)",
                    transition: "color 380ms ease",
                  }}
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
