import Image from "next/image";
import { asset } from "@/lib/asset";
import { Ambient, LightSpill } from "./env/Ambient";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Reveal";

const PANELS = [
  {
    index: "01",
    title: "Partner-led thinking",
    body: "Senior expertise remains close to the engagement, helping businesses access experienced thinking without unnecessary layers.",
    lift: "lg:translate-y-0",
  },
  {
    index: "02",
    title: "One connected advisory team",
    body: "Tax, accounting, finance, HR and business advisory expertise come together around the needs of the client.",
    lift: "lg:translate-y-14",
  },
  {
    index: "03",
    title: "Built around your business",
    body: "Our approach is shaped around each organisation rather than forcing clients into one-size-fits-all solutions.",
    lift: "lg:translate-y-5",
  },
  {
    index: "04",
    title: "UAE expertise, broader perspective",
    body: "Local regulatory understanding is combined with commercial experience across different business environments.",
    lift: "lg:translate-y-20",
  },
];

export default function WhyMNV() {
  return (
    <section id="why-mnv" className="section-y relative isolate overflow-hidden">
      <Ambient plate="marble" className="inset-x-0 top-[12%] h-[52%]" opacity={0.3} />
      <LightSpill className="left-[-16%] top-[30%] h-[66%] w-[58%]" color="rgba(126,92,174,0.34)" />
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 lg:pt-10">
            <SectionHeading
              eyebrow="Why MNV"
              lines={[
                "Advice grounded",
                "in experience.",
                <span key="built">
                  Built around <span className="accent">your business.</span>
                </span>,
              ]}
              intro="MNV combines specialist expertise with a practical, partner-led approach designed around the realities businesses face in the UAE."
            />
          </div>

          {/* The image runs off the edge of the screen rather than sitting inside
              the measure, which is what stops the section reading as a card. */}
          <Reveal delay={0.12} className="lg:col-span-6">
            <figure className="bleed-right relative aspect-[4/3] w-full overflow-hidden lg:aspect-[11/13]">
              <Image
                src={asset("/images/why-mnv.webp")}
                alt="A meeting lounge with floor to ceiling windows overlooking the Dubai skyline at sunset"
                fill
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(210deg, rgba(83,50,120,0) 52%, rgba(26,14,40,0.46) 100%)",
                }}
              />
            </figure>
          </Reveal>
        </div>

        {/* Architectural planes set at different heights and overlapping slightly,
            rather than four features aligned on a baseline. */}
        <ul className="mt-16 grid sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {PANELS.map((panel, i) => (
            <li key={panel.index} className={`list-none ${panel.lift}`}>
              <Reveal delay={i * 0.1} y={44 + i * 16} className="h-full">
                <article className="group relative flex h-full flex-col border border-[var(--rule)] bg-white/[0.045] px-7 pb-8 pt-7 backdrop-blur-[2px] transition-[transform,box-shadow,border-color] duration-500 ease-out lg:-ml-px lg:min-h-[21rem] lg:px-8 lg:hover:-translate-y-2 lg:hover:border-[var(--mnv-lavender)]/60 lg:hover:bg-white/[0.07] lg:hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,0.6)]">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-0 bg-[var(--mnv-purple)] transition-[width] duration-700 ease-out group-hover:w-full"
                  />
                  <span className="numeral block text-[clamp(2.75rem,4vw,3.75rem)] leading-none text-white/26 transition-colors duration-500 group-hover:text-[var(--mnv-lavender)]">
                    {panel.index}
                  </span>
                  <h3 className="mt-auto pt-10 text-[1.1875rem] font-medium leading-snug tracking-[-0.02em] text-[var(--fg)]">
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
