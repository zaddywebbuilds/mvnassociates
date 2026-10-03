import { Ambient, LightSpill } from "./env/Ambient";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Reveal";

const STATS = [
  {
    value: "10+",
    label: "Years of experience",
    note: "Advising businesses through successive regulatory shifts across the UAE.",
  },
  {
    value: "100+",
    label: "Clients served",
    note: "From new market entrants to established regional operators.",
  },
  {
    value: "9",
    label: "Core advisory solutions",
    note: "Delivered by one team rather than separate, disconnected practices.",
  },
  {
    value: "1",
    label: "Connected advisory team",
    note: "A single point of accountability across every discipline.",
  },
];

export default function StatsStory() {
  return (
    <section className="relative isolate overflow-hidden pb-[clamp(3.5rem,7vw,6rem)] pt-[var(--section-y)]">
      <Ambient plate="marble" className="inset-x-0 top-0 h-full" opacity={0.18} />

      <div className="shell relative">
        <SectionHeading
          eyebrow="By the numbers"
          lines={[
            "Scale that stays",
            <span key="close">
              close <span className="accent">to the client.</span>
            </span>,
          ]}
          className="max-w-[42rem]"
        />
      </div>

      {/* Each figure gets its own pool of light, so no moment is left sitting in
          dead space while the next one scrolls up. */}
      <div className="relative mt-14 lg:mt-16">
        {STATS.map((stat, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={stat.label} className="relative">
              <LightSpill
                className={`top-[-10%] h-[120%] w-[62%] ${flip ? "right-[-14%]" : "left-[-14%]"}`}
                color="rgba(141, 103, 196, 0.42)"
              />

              <div className="shell relative grid min-h-[42vh] items-center gap-y-5 border-t border-[var(--rule)] py-10 lg:min-h-[46vh] lg:grid-cols-12 lg:gap-x-10 lg:py-12">
                <div
                  className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : "lg:order-1"}`}
                >
                  <p
                    className={`numeral numeral-material select-none text-[clamp(5.5rem,16vw,13.5rem)] leading-[0.78] ${
                      flip ? "bleed-right text-right" : "bleed-left"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>

                <Reveal
                  delay={0.06}
                  className={`lg:col-span-5 ${
                    flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
                  }`}
                >
                  <div className={flip ? "lg:text-right" : undefined}>
                    <p
                      className={`numeral mb-5 text-[0.75rem] tracking-[0.2em] text-[var(--mnv-lavender)] ${
                        flip ? "lg:text-right" : ""
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--fg)]">
                      {stat.label}
                    </h3>
                    <p
                      className={`body-text mt-4 max-w-[34ch] text-[0.9375rem] ${
                        flip ? "lg:ml-auto" : ""
                      }`}
                    >
                      {stat.note}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
