import type { CSSProperties } from "react";
import HeroVideo from "./HeroVideo";
import MagneticButton from "./MagneticButton";

const MARKERS = [
  { value: "10+", label: "Years of\nexperience" },
  { value: "100+", label: "Clients\nserved" },
  { value: "UAE", label: "Advisory\nexpertise" },
];

/** Entrance timing is expressed in CSS custom properties, not a JS timeline. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const lineDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const FEATHER = [
  "linear-gradient(to right, transparent 0%, #000 24%, #000 100%)",
  "linear-gradient(to bottom, transparent 0%, #000 13%, #000 87%, transparent 100%)",
].join(", ");

export default function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-white pt-[76px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(112% 90% at 72% 46%, #f3edfa 0%, #faf8fd 46%, #ffffff 76%)",
        }}
      />

      {/* The installation, running off the right edge of the screen. Its left
          edge is feathered so it reads as part of the page rather than as a
          rectangle dropped onto it. */}
      <div
        className="fade-in pointer-events-none absolute -z-[5] right-0 top-1/2 hidden
          aspect-video w-[64vw] -translate-y-1/2 md:block
          lg:w-[60vw] xl:w-[58vw] xl:max-w-[1000px]"
        style={{
          ...delay(260),
          // Feathered on all four sides so the footage dissolves into the page
          // instead of sitting on it as a rectangle.
          maskImage: FEATHER,
          WebkitMaskImage: FEATHER,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 34%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex min-h-[calc(94svh-76px)] flex-col justify-center py-12 md:py-14">
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <p className="eyebrow rise flex items-center gap-3" style={delay(100)}>
            <span className="inline-block h-px w-7 bg-current opacity-50" aria-hidden="true" />
            MNV Associates
          </p>

          <h1 className="hero-lines mt-7 text-[clamp(2.75rem,4.9vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[var(--mnv-ink)]">
            {["Advisory built for", "businesses moving"].map((line, i) => (
              <span className="line-mask" key={line}>
                <span style={lineDelay(200 + i * 80)}>{line}</span>
              </span>
            ))}
            <span className="line-mask">
              <span
                style={lineDelay(360)}
                className="accent pt-[0.06em] text-[1.78em] leading-[0.88] text-[var(--mnv-ink)]"
              >
                forward<span className="text-[var(--mnv-purple)]">.</span>
              </span>
            </span>
          </h1>

          <p
            className="rise mt-9 text-[0.8125rem] font-medium tracking-[0.16em] text-[var(--mnv-purple)]"
            style={delay(460)}
          >
            TAX. FINANCE. OPERATIONS. STRATEGY.
          </p>

          <p className="lede rise mt-5 max-w-[44ch]" style={delay(500)}>
            MNV Associates helps businesses across the UAE navigate complexity,
            strengthen operations and make confident decisions at every stage of
            growth.
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={delay(580)}>
            <MagneticButton href="#contact">Talk to an advisor</MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              Explore our services
            </MagneticButton>
          </div>
        </div>

        {/* Architectural labels rather than a row of stats */}
        <div
          className="rise mt-14 flex flex-wrap items-stretch gap-x-12 gap-y-6 lg:mt-20"
          style={delay(740)}
        >
          <div className="flex items-center gap-4 pr-10">
            <span className="h-px w-10 bg-[var(--mnv-lavender)]" aria-hidden="true" />
            <p className="signature text-[0.9375rem] text-[var(--mnv-lavender)]">
              unlock your growth
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-12 gap-y-6">
            {MARKERS.map((m) => (
              <li key={m.value} className="flex gap-4 border-l border-[var(--mnv-border)] pl-5">
                <span className="numeral text-[1.5rem] leading-none text-[var(--mnv-ink)]">
                  {m.value}
                </span>
                <span className="whitespace-pre-line text-[0.6875rem] uppercase leading-[1.5] tracking-[0.14em] text-[var(--mnv-muted)]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
