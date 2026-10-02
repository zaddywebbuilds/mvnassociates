import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Reveal";

const PANELS = [
  {
    index: "01",
    title: "Partner-led thinking",
    body: "Senior expertise remains close to the engagement, helping businesses access experienced thinking without unnecessary layers.",
    offset: "lg:translate-y-0",
  },
  {
    index: "02",
    title: "One connected advisory team",
    body: "Tax, accounting, finance, HR and business advisory expertise come together around the needs of the client.",
    offset: "lg:translate-y-10",
  },
  {
    index: "03",
    title: "Built around your business",
    body: "Our approach is shaped around each organisation rather than forcing clients into one-size-fits-all solutions.",
    offset: "lg:translate-y-4",
  },
  {
    index: "04",
    title: "UAE expertise, broader perspective",
    body: "Local regulatory understanding is combined with commercial experience across different business environments.",
    offset: "lg:translate-y-16",
  },
];

export default function WhyMNV() {
  return (
    <section id="why-mnv" className="section-y bg-white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:pt-6">
            <SectionHeading
              eyebrow="Why MNV"
              lines={["Advice grounded in experience.", "Built around your business."]}
              intro="MNV combines specialist expertise with a practical, partner-led approach designed around the realities businesses face in the UAE."
            />
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <figure className="relative aspect-[3/4] w-full overflow-hidden rounded-sm sm:aspect-[4/3] lg:aspect-[3/4]">
              <Image
                src="/images/dubai-coast.jpg"
                alt="Aerial view of the Dubai coastline and its waterfront architecture"
                fill
                sizes="(max-width: 1023px) 100vw, 38vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(83,50,120,0) 45%, rgba(53,26,82,0.42) 100%)",
                }}
              />
            </figure>
          </Reveal>
        </div>

        {/* Architectural planes, set at different heights rather than aligned as cards */}
        <ul className="mt-20 grid gap-px sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:gap-0">
          {PANELS.map((panel, i) => (
            <li key={panel.index} className={`list-none ${panel.offset}`}>
              <Reveal delay={i * 0.09} className="h-full">
                <article className="group relative flex h-full flex-col border border-[var(--mnv-border)] bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-out lg:-ml-px lg:min-h-[23rem] lg:p-8 lg:hover:-translate-y-2 lg:hover:border-[var(--mnv-lavender)] lg:hover:shadow-[0_28px_60px_-32px_rgba(53,26,82,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-0 bg-[var(--mnv-purple)] transition-[width] duration-700 ease-out group-hover:w-full"
                  />
                  <span className="numeral text-[0.75rem] tracking-[0.18em] text-[var(--mnv-lavender)]">
                    {panel.index}
                  </span>
                  <h3 className="mt-6 text-[1.1875rem] font-medium leading-snug tracking-[-0.015em] text-[var(--mnv-ink)]">
                    {panel.title}
                  </h3>
                  <p className="body-text mt-4 text-[0.9375rem]">{panel.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
