import type { CSSProperties } from "react";
import MagneticButton from "./MagneticButton";
import OrbitalRing from "./OrbitalRing";

const MARKERS = [
  { value: "10+", label: "Years of\nexperience" },
  { value: "100+", label: "Clients\nserved" },
  { value: "UAE", label: "Advisory\nexpertise" },
];

/** Entrance timing is expressed in CSS custom properties, not a JS timeline. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const lineDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-white pt-[76px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(118% 92% at 74% 44%, #f0e9f8 0%, #f9f7fc 44%, #ffffff 74%)",
        }}
      />

      {/* The object sits close enough to be cropped by the viewport, and large
          enough to occupy roughly half the composition. */}
      <div
        className="pointer-events-none absolute -z-[5]
          left-1/2 top-[60%] h-[118vw] w-[118vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.5]
          md:left-auto md:right-[-18%] md:top-1/2 md:h-[92vw] md:w-[92vw] md:translate-x-0 md:opacity-100
          lg:right-[-12%] lg:h-[78vw] lg:w-[78vw]
          xl:right-[-7%] xl:h-[71vw] xl:w-[71vw] xl:max-h-[1000px] xl:max-w-[1000px]"
      >
        <OrbitalRing tone="light" complete={false} className="h-full w-full" />
      </div>

      <div className="shell relative z-10 flex min-h-[calc(94svh-76px)] flex-col justify-center py-12 md:py-14">
        <div className="max-w-[40rem] lg:max-w-[56%]">
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

          <p className="lede rise mt-5 max-w-[46ch]" style={delay(500)}>
            MNV Associates helps businesses across the UAE navigate complexity,
            strengthen operations and make confident decisions at every stage of
            growth.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={delay(580)}
          >
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

      {/* The third depth plane. A segment of ring sitting close to the camera,
          thrown out of focus, so the composition reads as space rather than
          as layers stacked on a flat page. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        className="fade-in pointer-events-none absolute z-20 hidden
          lg:block lg:-right-[16%] lg:-bottom-[52%] lg:h-[82vw] lg:w-[82vw]"
        style={{ ...delay(900), overflow: "visible", filter: "blur(14px)" }}
      >
        <circle
          cx="500"
          cy="500"
          r="430"
          fill="none"
          stroke="var(--mnv-purple)"
          strokeWidth="44"
          strokeLinecap="round"
          strokeDasharray="470 2232"
          strokeDashoffset="-1470"
          opacity="0.42"
        />
      </svg>
    </section>
  );
}
