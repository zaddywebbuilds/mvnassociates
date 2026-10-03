import MagneticButton from "./MagneticButton";
import { MaskedHeading, Reveal } from "./Reveal";

export default function StatementSection() {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-[var(--mnv-purple)] section-y">
      {/* A single enormous ring, mostly outside the frame. Restraint is the point. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-[28%] top-1/2 h-[150vh] w-[150vh] -translate-y-1/2 opacity-[0.16] sm:-left-[18%]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeWidth="0.35" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="#ffffff" strokeWidth="0.2" />
      </svg>

      <div className="shell relative">
        <div className="ml-auto max-w-[46rem] lg:w-[62%]">
          <MaskedHeading
            lines={["Your business doesn't need", "more complexity."]}
            className="display text-white/55"
          />
          <MaskedHeading
            lines={[
              <span key="clarity">
                It needs <span className="accent">clarity.</span>
              </span>,
            ]}
            className="display mt-3 text-[clamp(3rem,7.4vw,7rem)] text-white"
            delay={0.14}
          />

          <Reveal delay={0.22}>
            <p className="lede mt-9 max-w-[52ch]">
              Whether you are establishing a business, responding to regulatory
              change or preparing for the next stage of growth, MNV brings the
              expertise together to help you move with confidence.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-11">
              <MagneticButton href="#why-mnv" variant="onDark">
                Discover MNV
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
