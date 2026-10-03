import { services } from "@/data/services";
import ServicesVideo from "./ServicesVideo";

/** The service the written panel describes alongside the installation. */
const FEATURED = services[1];

export default function ServiceOrbital() {
  return (
    <div className="grid gap-14 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-center xl:gap-14">
      <div className="order-2 xl:order-1 xl:pr-6">
        <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--mnv-lavender-light)]">
          <span className="numeral">{FEATURED.index}</span>
          <span className="inline-block h-px w-6 bg-current opacity-50" aria-hidden="true" />
          <span>{FEATURED.title}</span>
        </p>

        <h3 className="mt-6 text-[clamp(1.9rem,2.9vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
          {FEATURED.summary}
        </h3>

        <p className="mt-5 max-w-[40ch] text-[1.0625rem] leading-[1.65] text-white/62">
          {FEATURED.description}
        </p>

        <a
          href={FEATURED.href}
          className="group mt-8 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-white"
        >
          Explore {FEATURED.title}
          <svg
            width="15"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M1 5h13M10.5 1 14.5 5l-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="order-1 xl:order-2">
        <ServicesVideo />
      </div>
    </div>
  );
}
