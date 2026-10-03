"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/useMotionPreferences";

type Variant = "primary" | "onDark" | "ghost" | "ghostOnDark";

const STYLES: Record<Variant, string> = {
  primary:
    "bg-[var(--mnv-purple)] text-white hover:bg-[var(--mnv-purple-deep)] px-7 py-4",
  onDark:
    "bg-white text-[var(--mnv-ink)] hover:bg-[var(--mnv-lavender-light)] px-7 py-4",
  ghost:
    "text-[var(--fg)] hover:text-[var(--accent-eyebrow)] border border-[var(--rule)] hover:border-[var(--mnv-lavender)] px-7 py-4",
  ghostOnDark:
    "text-white/85 hover:text-white border border-white/20 hover:border-white/45 px-7 py-4",
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const magnetic = canHover && !reduce;

  function handleMove(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Capped at four pixels. Enough to feel responsive, never enough to feel gimmicky.
    const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 8;
    const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8;
    x.set(Math.max(-4, Math.min(4, dx)));
    y.set(Math.max(-4, Math.min(4, dy)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={magnetic ? { x: sx, y: sy } : undefined}
      className={`group inline-flex items-center gap-3 rounded-sm text-[0.9375rem] font-medium transition-colors duration-300 ${STYLES[variant]} ${className}`}
    >
      <span>{children}</span>
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        <path
          d="M1 5h13M10.5 1 14.5 5l-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}
