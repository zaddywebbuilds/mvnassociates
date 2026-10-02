import MagneticButton from "./MagneticButton";
import OrbitalRing from "./OrbitalRing";
import { MaskedHeading, Reveal } from "./Reveal";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="on-dark grain relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(110% 80% at 50% 38%, #3f2360 0%, #2a1740 46%, #17131c 100%)",
      }}
    >
      {/* The ring returns, closed. Open in the hero, complete at the end. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[135vw] w-[135vw] -translate-x-1/2 -translate-y-1/2 opacity-80
          md:h-[95vw] md:w-[95vw]
          lg:h-[72vw] lg:w-[72vw] lg:max-h-[940px] lg:max-w-[940px]"
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
          lines={["What could your", "business unlock next?"]}
          className="display mt-8 max-w-[18ch] text-balance text-white"
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
