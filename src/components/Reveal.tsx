"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useRevealOnce } from "@/hooks/useMotionPreferences";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial headline reveal. Each line rises out of its own mask, which reads
 * far more deliberate than fading a whole block at once.
 *
 * The observer watches the heading, never the lines: a line starts translated
 * fully outside its clipping parent, so an observer on the line itself would
 * see it as permanently out of view and the reveal would never start.
 */
export function MaskedHeading({
  lines,
  className = "",
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const revealed = useRevealOnce(ref);

  return (
    <Tag
      ref={ref}
      className={`reveal-lines ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {lines.map((content, i) => (
        <span className="line-mask" key={i}>
          <span
            className={lineClassName}
            style={{ ["--line-delay" as string]: `${delay * 1000 + i * 90}ms` }}
          >
            {content}
          </span>
        </span>
      ))}
    </Tag>
  );
}
