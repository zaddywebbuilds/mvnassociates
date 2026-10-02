import SectionHeading from "./SectionHeading";
import { MaskedHeading, Reveal } from "./Reveal";

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
    <section className="section-y bg-[var(--mnv-pale)]">
      <div className="shell">
        <SectionHeading
          eyebrow="By the numbers"
          lines={["Scale that stays close", "to the client."]}
          className="max-w-[40rem]"
        />

        <div className="mt-16 border-t border-[var(--mnv-border)] lg:mt-24">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-4 border-b border-[var(--mnv-border)] py-10 sm:items-center sm:gap-10 lg:py-14 ${
                i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              <MaskedHeading
                as="p"
                lines={[stat.value]}
                className="numeral shrink-0 text-[clamp(4rem,12vw,10.5rem)] leading-[0.8] text-[#d7cce5] sm:w-[38%]"
              />

              <Reveal delay={0.1} className="sm:flex-1">
                <div
                  className={
                    i % 2 === 1 ? "sm:text-right" : undefined
                  }
                >
                  <h3 className="subhead text-[var(--mnv-ink)]">{stat.label}</h3>
                  <p
                    className={`body-text mt-3 max-w-[38ch] text-[0.9375rem] ${
                      i % 2 === 1 ? "sm:ml-auto" : ""
                    }`}
                  >
                    {stat.note}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
