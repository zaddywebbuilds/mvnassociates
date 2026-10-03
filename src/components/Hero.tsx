import type { CSSProperties } from "react";
import { Ambient, EdgeLight, LightSpill } from "./env/Ambient";
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
    <section className="grain relative isolate overflow-hidden pt-[76px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(104% 86% at 70% 44%, rgba(120, 82, 172, 0.34) 0%, rgba(26, 17, 40, 0) 62%)",
        }}
      />

      <Ambient plate="terrace" className="inset-x-0 bottom-0 -z-[9] h-[58%]" opacity={0.46} />
      <LightSpill className="-z-[8] left-[-12%] top-[18%] h-[62%] w-[62%]" />

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
              "linear-gradient(to right, rgba(20,14,29,0.72) 0%, rgba(20,14,29,0) 38%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex min-h-[calc(92svh-76px)] flex-col justify-center py-8 md:py-14">
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <p className="eyebrow rise flex items-center gap-3" style={delay(100)}>
            <span className="inline-block h-px w-7 bg-current opacity-50" aria-hidden="true" />
            MNV Associates
          </p>

          <h1 className="hero-lines mt-7 text-[clamp(2.35rem,4.9vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[var(--fg)]">
            {["Advisory built for", "businesses moving"].map((line, i) => (
              <span className="line-mask" key={line}>
                <span style={lineDelay(200 + i * 80)}>{line}</span>
              </span>
            ))}
            <span className="line-mask">
              <span
                style={lineDelay(360)}
                className="accent pt-[0.06em] text-[1.78em] leading-[0.88] text-[var(--fg)]"
              >
                forward<span className="text-[var(--accent-eyebrow)]">.</span>
              </span>
            </span>
          </h1>

          <p
            className="rise mt-6 text-[0.75rem] font-medium tracking-[0.16em] md:mt-9 md:text-[0.8125rem] text-[var(--accent-eyebrow)]"
            style={delay(460)}
          >
            TAX. FINANCE. OPERATIONS. STRATEGY.
          </p>

          <p className="lede rise mt-4 max-w-[44ch] text-[0.9375rem] md:mt-5 md:text-[1.0625rem]" style={delay(500)}>
            MNV Associates helps businesses across the UAE navigate complexity,
            strengthen operations and make confident decisions at every stage of
            growth.
          </p>

          <div className="rise mt-7 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4" style={delay(580)}>
            <MagneticButton href="#contact">Talk to an advisor</MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              Explore our services
            </MagneticButton>
          </div>
        </div>

        {/* Architectural labels rather than a row of stats */}
        <div
          className="rise mt-9 flex flex-wrap items-stretch gap-x-7 gap-y-4 md:gap-x-12 md:gap-y-6 lg:mt-16"
          style={delay(740)}
        >
          <div className="flex items-center gap-4 pr-10">
            <span className="h-px w-10 bg-[var(--mnv-lavender)]" aria-hidden="true" />
            <p className="signature text-[0.9375rem] text-[var(--mnv-lavender)]">
              unlock your growth
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-7 gap-y-4 md:gap-x-12 md:gap-y-6">
            {MARKERS.map((m) => (
              <li key={m.value} className="flex gap-4 border-l border-[var(--rule)] pl-5">
                <span className="numeral text-[1.25rem] leading-none text-[var(--fg)] md:text-[1.5rem]">
                  {m.value}
                </span>
                <span className="whitespace-pre-line text-[0.6875rem] uppercase leading-[1.5] tracking-[0.14em] text-[var(--fg-soft)]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <EdgeLight className="bottom-0" />
    </section>
  );
}
