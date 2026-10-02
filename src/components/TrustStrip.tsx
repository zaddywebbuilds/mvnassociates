import { MaskedHeading, Reveal } from "./Reveal";

const PILLARS = [
  "Tax expertise",
  "Financial clarity",
  "Operational support",
  "Strategic guidance",
];

export default function TrustStrip() {
  return (
    <section className="border-t border-[var(--mnv-border)] bg-white py-[clamp(3.5rem,7vw,6rem)]">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <MaskedHeading
          lines={["Built for the realities of", "doing business in the UAE."]}
          className="subhead text-balance text-[var(--mnv-ink)] lg:col-span-6"
        />

        <Reveal delay={0.1} className="lg:col-span-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-4">
            {PILLARS.map((pillar, i) => (
              <li key={pillar} className="flex items-center gap-5">
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="inline-block size-1 rounded-full bg-[var(--mnv-lavender)]"
                  />
                ) : null}
                <span className="text-[0.9375rem] text-[var(--mnv-ink)]">{pillar}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
