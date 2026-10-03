import MagneticButton from "./MagneticButton";
import OrbitalRing from "./OrbitalRing";
import { MaskedHeading, Reveal } from "./Reveal";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="grain relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(118% 86% at 50% 72%, #3a2057 0%, #211334 44%, #120d1a 100%)",
      }}
    >
      {/* The ring returns, closed. Open in the hero, complete at the end. Most of
          it sits outside the frame, so the section reads as a fragment of
          something much larger. */}
      <div
        className="pointer-events-none absolute left-1/2 top-[76%] -z-10 h-[150vw] w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-90
          md:h-[112vw] md:w-[112vw]
          lg:top-[72%] lg:h-[84vw] lg:w-[84vw] lg:max-h-[1150px] lg:max-w-[1150px]"
      >
        <OrbitalRing tone="dark" complete className="h-full w-full" />
      </div>

      <div className="shell relative flex min-h-[86svh] flex-col items-center justify-center py-28 text-center">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-3">
            <span className="inline-block h-px w-7 bg-current opacity-50" aria-hidden="true" />
            Let&apos;s talk
          </p>
        </Reveal>

        <MaskedHeading
          lines={[
            "What could your",
            <span key="next">
              business unlock <span className="accent">next?</span>
            </span>,
          ]}
          className="display mt-8 max-w-[18ch] text-balance text-[clamp(2.8rem,7vw,6.5rem)] text-white"
        />

        <Reveal delay={0.16}>
          <p className="lede mx-auto mt-8 max-w-[50ch]">
            Whether you are solving today&apos;s challenge or preparing for
            tomorrow&apos;s opportunity, start the conversation with MNV.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-11">
            <MagneticButton href="#contact" variant="onDark">
              Talk to an advisor
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-16 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
            <p className="signature text-[0.9375rem] text-[var(--mnv-lavender-light)]">
              unlock your growth
            </p>
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
