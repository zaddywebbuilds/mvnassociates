"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/data/services";

const RADIUS_X = 41;
const RADIUS_Y = 33;
const START = -Math.PI / 2;

type Node = {
  id: string;
  title: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rightSide: boolean;
};

const NODES: Node[] = services.map((s, i) => {
  const a = START + (i / services.length) * Math.PI * 2;
  const cos = Math.cos(a);
  const sin = Math.sin(a);

  // Nodes toward the top of the ellipse read as further away.
  const far = (-sin + 1) / 2;

  // Rounded so server and client render byte-identical coordinates.
  const round = (n: number) => Number(n.toFixed(3));

  return {
    id: s.id,
    title: s.title,
    x: round(50 + cos * RADIUS_X),
    y: round(50 + sin * RADIUS_Y),
    scale: round(1.06 - far * 0.2),
    opacity: round(1 - far * 0.22),
    rightSide: cos >= -0.08,
  };
});

export default function ServiceOrbital() {
  const [activeId, setActiveId] = useState(services[1].id);
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:items-center xl:gap-10">
      {/* Detail panel */}
      <div className="order-2 xl:order-1 xl:pr-8">
        <div className="min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="numeral text-[0.8125rem] tracking-[0.18em] text-[var(--mnv-lavender)]">
                {services.find((s) => s.id === active.id)?.index}
              </p>
              <h3 className="subhead mt-4 text-[var(--mnv-ink)]">{active.title}</h3>
              <p className="body-text mt-4 max-w-[42ch]">{active.description}</p>
              <a
                href={active.href}
                className="group mt-7 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-[var(--mnv-purple)]"
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

      {/* Orbital diagram */}
      <div className="order-1 xl:order-2">
        <div className="relative mx-auto aspect-square w-full max-w-[34rem] xl:max-w-[38rem]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <ellipse
              cx="50"
              cy="50"
              rx={RADIUS_X}
              ry={RADIUS_Y}
              fill="none"
              stroke="#d8cee3"
              strokeWidth="0.18"
            />
            <ellipse
              cx="50"
              cy="50"
              rx={RADIUS_X * 0.62}
              ry={RADIUS_Y * 0.62}
              fill="none"
              stroke="#e4dced"
              strokeWidth="0.14"
            />
            {NODES.map((n) => {
              const on = n.id === activeId;
              return (
                <line
                  key={n.id}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke={on ? "#533278" : "#ddd3e8"}
                  strokeWidth={on ? 0.28 : 0.12}
                  style={{ transition: "stroke 360ms ease, stroke-width 360ms ease" }}
                />
              );
            })}
          </svg>

          {/* Centre mark */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex size-[5.5rem] items-center justify-center rounded-full text-white xl:size-[6.25rem]"
              style={{
                background:
                  "radial-gradient(130% 130% at 32% 24%, #7a52a6 0%, #533278 48%, #3b2259 100%)",
                boxShadow:
                  "0 18px 50px -18px rgba(83,50,120,0.6), inset 0 1px 1px rgba(255,255,255,0.3)",
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
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: `translate(-50%, -50%) scale(${on ? n.scale * 1.08 : n.scale})`,
                  opacity: on ? 1 : n.opacity * (activeId ? 0.72 : 1),
                  transition:
                    "transform 420ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease",
                }}
              >
                <span
                  className="block size-[11px] rounded-full ring-offset-2"
                  style={{
                    background: on ? "#533278" : "#b7a8c6",
                    boxShadow: on
                      ? "0 0 0 5px rgba(83,50,120,0.14), 0 6px 18px -6px rgba(83,50,120,0.7)"
                      : "none",
                    transition: "background 360ms ease, box-shadow 360ms ease",
                  }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.8125rem] font-medium xl:text-[0.875rem] ${
                    n.rightSide ? "left-full ml-3.5" : "right-full mr-3.5"
                  }`}
                  style={{
                    color: on ? "#17131c" : "#6d6673",
                    transition: "color 360ms ease",
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
