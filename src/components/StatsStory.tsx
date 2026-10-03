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
    <section className="relative isolate overflow-hidden pb-[clamp(4rem,9vw,8rem)] pt-[var(--section-y)]">
      <Ambient plate="marble" className="inset-x-0 bottom-0 h-[72%]" opacity={0.42} />
      <LightSpill className="left-[-8%] bottom-[6%] h-[52%] w-[52%]" color="rgba(120,86,172,0.32)" />
      <LightSpill className="right-[-10%] top-[8%] h-[58%] w-[56%]" color="rgba(138,100,190,0.3)" />
      <div className="shell">
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

      {/* Four moments rather than four metrics. The numeral holds while its own
          block scrolls past, so each one gets the viewport to itself. */}
      <div className="mt-20 lg:mt-28">
        {STATS.map((stat, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={stat.label}
              className="shell grid min-h-[58vh] items-center gap-y-6 lg:min-h-[72vh] lg:grid-cols-12 lg:gap-x-10"
            >
              <div
                className={`lg:col-span-7 ${
                  flip ? "lg:order-2 lg:col-start-6" : "lg:order-1"
                }`}
              >
                <div className="lg:sticky lg:top-[26vh]">
                  <p
                    className={`numeral select-none text-[clamp(5.5rem,17vw,14.5rem)] leading-[0.76] text-white/[0.17] ${
                      flip ? "bleed-right text-right" : "bleed-left"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>

              <Reveal
                delay={0.08}
                className={`lg:col-span-5 ${
                  flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
                }`}
              >
                <div className={flip ? "lg:text-right" : undefined}>
                  <span
                    aria-hidden="true"
                    className={`mb-6 block h-px w-14 bg-[var(--mnv-lavender)] ${
                      flip ? "lg:ml-auto" : ""
                    }`}
                  />
                  <h3 className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--fg)]">
                    {stat.label}
                  </h3>
                  <p
                    className={`body-text mt-4 max-w-[36ch] text-[0.9375rem] ${
                      flip ? "lg:ml-auto" : ""
                    }`}
                  >
                    {stat.note}
                  </p>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
