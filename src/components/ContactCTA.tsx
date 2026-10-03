import Image from "next/image";
import { asset } from "@/lib/asset";
import MagneticButton from "./MagneticButton";
import { EdgeLight } from "./env/Ambient";
import { MaskedHeading, Reveal } from "./Reveal";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden py-[clamp(3.5rem,7vw,6rem)]"
    >
      <Image
        src={asset("/images/cta-hall.webp")}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority={false}
        className="-z-20 object-cover"
      />

      {/*
       * Type sits on the layered side and the archway is left open on the right.
       * The image goes from dense to clear across its width, so the composition
       * does the closing line's work without the copy having to point at it.
       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(to top, rgba(18,11,30,0.72) 0%, rgba(18,11,30,0) 56%)",
            "linear-gradient(100deg, rgba(18,11,30,0.9) 0%, rgba(20,12,33,0.8) 30%, rgba(24,14,38,0.46) 56%, rgba(26,16,42,0.12) 80%, rgba(26,16,42,0) 100%)",
          ].join(", "),
        }}
      />

      <EdgeLight className="top-0" />

      <div className="shell relative w-full">
        <div className="max-w-[40rem] lg:max-w-[54%]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
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
            className="display mt-7 text-[clamp(2.6rem,6vw,5.5rem)] text-white"
          />

          <Reveal delay={0.16}>
            <p className="lede mt-7 max-w-[44ch] text-white/80">
              Whether you are solving today&apos;s challenge or preparing for
              tomorrow&apos;s opportunity, start the conversation with MNV.
            </p>
          </Reveal>

          {/* Action and signature share a baseline rather than stacking apart */}
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <MagneticButton href="#contact" variant="onDark">
                Talk to an advisor
              </MagneticButton>

              <span className="flex items-center gap-4">
                <span className="h-px w-10 bg-white/30" aria-hidden="true" />
                <span className="signature text-[0.9375rem] text-[var(--mnv-lavender-light)]">
                  unlock your growth
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
