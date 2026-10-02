"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import OrbitalRing from "./OrbitalRing";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = ["Advisory built for", "businesses moving"];

const MARKERS = [
  { value: "10+", label: "Years of experience" },
  { value: "100+", label: "Clients served" },
  { value: "UAE", label: "Advisory expertise" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="grain relative isolate overflow-hidden bg-white pt-[76px]">
      {/* Light wash behind the object, so the glass has something to sit in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 95% at 78% 42%, #f3eef9 0%, #faf8fc 42%, #ffffff 72%)",
        }}
      />

      {/* The Orbital Ring, cropped by the viewport edge so it reads as an installation */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
        className="pointer-events-none absolute -z-[5]
          left-1/2 top-[58%] h-[112vw] w-[112vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.55]
          md:left-auto md:right-[-16%] md:top-1/2 md:h-[86vw] md:w-[86vw] md:translate-x-0 md:opacity-100
          lg:right-[-12%] lg:h-[66vw] lg:w-[66vw]
          xl:right-[-8%] xl:h-[57vw] xl:w-[57vw] xl:max-h-[820px] xl:max-w-[820px]"
      >
        <OrbitalRing tone="light" complete={false} className="h-full w-full" />
      </motion.div>

      <div className="shell relative z-10 flex min-h-[calc(94svh-76px)] flex-col justify-center py-12 md:py-14">
        <div className="max-w-[40rem] lg:max-w-[53%]">
          <motion.p {...rise(0.1)} className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-7 bg-current opacity-50" aria-hidden="true" />
            MNV Associates
          </motion.p>

          <h1 className="mt-7 text-[clamp(2.3rem,4.6vw,4.25rem)] font-medium leading-[1.0] tracking-[-0.035em] text-[var(--mnv-ink)]">
            {HEADLINE.map((line, i) => (
              <span className="line-mask" key={line}>
                <motion.span
                  initial={reduce ? { y: 0 } : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="line-mask">
              <motion.span
                initial={reduce ? { y: 0 } : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.36, ease: EASE }}
                className="relative inline-block"
              >
                forward
                <span className="text-[var(--mnv-purple)]">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(0.42)}
            className="mt-8 text-[0.8125rem] font-medium tracking-[0.16em] text-[var(--mnv-purple)]"
          >
            TAX. FINANCE. OPERATIONS. STRATEGY.
          </motion.p>

          <motion.p {...rise(0.46)} className="lede mt-5 max-w-[48ch]">
            MNV Associates helps businesses across the UAE navigate complexity,
            strengthen operations and make confident decisions at every stage of
            growth.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#contact">Talk to an advisor</MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              Explore our services
            </MagneticButton>
          </motion.div>

          <motion.div {...rise(0.68)} className="mt-11 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--mnv-lavender)]" aria-hidden="true" />
            <p className="signature text-[0.9375rem] text-[var(--mnv-lavender)]">
              unlock your growth
            </p>
          </motion.div>
        </div>

        {/* Architectural markers rather than stat cards */}
        <motion.ul
          {...rise(0.8)}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--mnv-border)] pt-6 lg:mt-14 lg:max-w-[53%]"
        >
          {MARKERS.map((m) => (
            <li key={m.label} className="flex items-baseline gap-3">
              <span
                className="mt-0 inline-block size-[5px] shrink-0 translate-y-[-3px] rounded-full bg-[var(--mnv-purple)]"
                aria-hidden="true"
              />
              <span className="numeral text-[1.375rem] text-[var(--mnv-ink)]">
                {m.value}
              </span>
              <span className="text-[0.8125rem] text-[var(--mnv-muted)]">{m.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Foreground hairline passing in front of the headline, the depth cue */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <circle
          cx="1080"
          cy="430"
          r="430"
          fill="none"
          stroke="#a191b2"
          strokeWidth="1"
          opacity="0.38"
        />
      </svg>
    </section>
  );
}
