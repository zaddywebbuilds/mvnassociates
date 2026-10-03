import Image from "next/image";
import { asset } from "@/lib/asset";
import MagneticButton from "./MagneticButton";
import { EdgeLight } from "./env/Ambient";
import { MaskedHeading, Reveal } from "./Reveal";

export default function StatementSection() {
  return (
    <section className="grain relative isolate flex min-h-[74svh] items-center overflow-hidden py-[clamp(3rem,6vw,5.5rem)]">
      <Image
        src={asset("/images/statement-hall.webp")}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/*
       * The type sits on the crystal side, which is the darker half and so the
       * better ground for white. What it needs is calm rather than contrast, so
       * the scrim settles the detail on the left and releases toward the arch.
       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            // Heavier low on the left, where the small copy sits.
            "linear-gradient(to top, rgba(36,18,58,0.72) 0%, rgba(36,18,58,0) 52%)",
            "linear-gradient(100deg, rgba(40,20,64,0.84) 0%, rgba(40,20,64,0.74) 28%, rgba(43,22,68,0.44) 54%, rgba(45,24,70,0.14) 76%, rgba(45,24,70,0.04) 100%)",
          ].join(", "),
        }}
      />

      <EdgeLight className="top-0" />

      <div className="shell relative w-full">
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <MaskedHeading
            lines={["Your business doesn't need", "more complexity."]}
            className="display text-white/70"
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
            <p className="lede mt-9 max-w-[46ch] text-white/80">
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

      <EdgeLight className="bottom-0" />
    </section>
  );
}
