import { Ambient, EdgeLight, LightSpill } from "./env/Ambient";
import SectionHeading from "./SectionHeading";
import ServiceAccordion from "./ServiceAccordion";
import ServiceOrbital from "./ServiceOrbital";

export default function Services() {
  return (
    <section
      id="services"
      className="grain section-y relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(118% 86% at 68% 44%, #3a2358 0%, #241739 46%, #150f21 100%)",
      }}
    >
      <EdgeLight className="top-0" />
      <Ambient plate="glow" className="inset-x-0 top-0 h-[46%]" opacity={0.34} />
      <LightSpill className="right-[-14%] top-[12%] h-[70%] w-[64%]" color="rgba(150,112,201,0.4)" />
      {/* The ring carried through as an oversized outline, cropped by the section. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-[22%] -top-[32%] h-[120vh] w-[120vh] opacity-[0.1]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="31" fill="none" stroke="#ffffff" strokeWidth="0.18" />
      </svg>

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our expertise"
              lines={[
                "Expertise around",
                <span key="accent">
                  every side of <span className="accent">your business.</span>
                </span>,
              ]}
              className="text-white"
            />
          </div>
          <p className="lede max-w-[50ch] lg:col-span-5 lg:pb-3">
            From regulatory compliance to financial leadership, MNV brings
            specialist expertise together around one objective: helping your
            business move forward with confidence.
          </p>
        </div>

        <div className="mt-14 lg:mt-18">
          <div className="hidden lg:block">
            <ServiceOrbital />
          </div>

          {/* All nine, in HTML. The installation carries the look; the names,
              numbering and descriptions have to stay readable and keyboard
              reachable, so they live here rather than inside the footage. */}
          <div className="lg:mt-16">
            <ServiceAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
