import Image from "next/image";
import { featuredInsight, insights } from "@/data/insights";
import { EdgeLight } from "./env/Ambient";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Reveal";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-out group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M1 5h13M10.5 1 14.5 5l-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Insights() {
  return (
    <section
      id="insights"
      className="on-light section-y relative isolate"
      style={{
        background:
          "linear-gradient(184deg, #f7f4fa 0%, #ffffff 42%, #f3eef8 100%)",
      }}
    >
      <EdgeLight className="top-0" />
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Insights"
              lines={[
                "Perspective for",
                <span key="next" className="accent">
                  what&apos;s next.
                </span>,
              ]}
            />
          </div>
          <p className="lede max-w-[48ch] lg:col-span-5 lg:col-start-8 lg:pb-2">
            Practical thinking on tax, finance, compliance and the issues shaping
            businesses across the UAE.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Featured story */}
          <Reveal className="lg:col-span-7">
            <a href={featuredInsight.href} className="group block">
              <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[var(--mnv-pale)]">
                <Image
                  src={featuredInsight.image}
                  alt={featuredInsight.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 56vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </figure>
              <p className="eyebrow mt-7">{featuredInsight.category}</p>
              <h3 className="headline mt-4 max-w-[20ch] text-[clamp(1.5rem,2.4vw,2.1rem)] text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--accent-eyebrow)]">
                {featuredInsight.title}
              </h3>
              <p className="body-text mt-4 max-w-[54ch]">{featuredInsight.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-[var(--accent-eyebrow)]">
                Read the article
                <Arrow />
              </span>
            </a>
          </Reveal>

          {/* Supporting stories */}
          <div className="flex flex-col lg:col-span-5">
            {insights.map((item, i) => (
              <Reveal key={item.id} delay={0.1 + i * 0.08}>
                <a
                  href={item.href}
                  className={`group flex gap-6 border-[var(--rule)] py-8 first:pt-0 ${
                    i === 0 ? "border-b" : ""
                  }`}
                >
                  <figure className="relative aspect-square w-[6.5rem] shrink-0 overflow-hidden rounded-sm bg-[var(--mnv-pale)] sm:w-[9rem]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 104px, 144px"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </figure>
                  <div className="flex-1">
                    <p className="eyebrow">{item.category}</p>
                    <h3 className="mt-3 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em] text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--accent-eyebrow)] sm:text-[1.1875rem]">
                      {item.title}
                    </h3>
                    <p className="body-text mt-3 hidden text-[0.9375rem] sm:block">
                      {item.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--accent-eyebrow)]">
                      Read
                      <Arrow />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <a
                href="#insights"
                className="group mt-4 inline-flex items-center gap-2.5 border-t border-[var(--rule)] pt-8 text-[0.9375rem] font-medium text-[var(--fg)] transition-colors duration-300 hover:text-[var(--accent-eyebrow)]"
              >
                View all insights
                <Arrow />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
