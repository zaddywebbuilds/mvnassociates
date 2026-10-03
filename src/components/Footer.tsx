import { services } from "@/data/services";

const COMPANY = [
  { label: "About", href: "#why-mnv" },
  { label: "Insights", href: "#insights" },
  { label: "Careers", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative isolate bg-[var(--mnv-base-deep)] pb-10 pt-[clamp(3.5rem,7vw,6rem)] text-white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <span className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true">
                <circle
                  cx="10"
                  cy="10"
                  r="8.4"
                  fill="none"
                  stroke="#c7bcd4"
                  strokeWidth="1.6"
                  strokeDasharray="40 13"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="10" r="2.5" fill="#c7bcd4" />
              </svg>
              <span className="text-[1.0625rem] font-semibold tracking-[0.14em]">
                MNV ASSOCIATES
              </span>
            </span>
            <p className="body-text mt-6 max-w-[34ch] text-[0.9375rem]">
              Tax, advisory and business solutions for organisations across the
              UAE.
            </p>
            <p className="signature mt-8 text-[0.9375rem] text-[var(--mnv-lavender)]">
              unlock your growth
            </p>
          </div>

          <nav aria-label="Services" className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Services
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    className="text-[0.9375rem] text-white/72 transition-colors duration-300 hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-4">
            <nav aria-label="Company">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Company
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {COMPANY.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[0.9375rem] text-white/72 transition-colors duration-300 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Contact
              </h2>
              <address className="mt-6 not-italic text-[0.9375rem] text-white/72">
                Dubai, United Arab Emirates
              </address>
              <a
                href="#contact"
                className="mt-5 inline-block text-[0.9375rem] text-white/72 transition-colors duration-300 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-white/45">
            © {new Date().getFullYear()} MNV Associates
          </p>
          <ul className="flex gap-7">
            <li>
              <a
                href="#contact"
                className="text-[0.8125rem] text-white/45 transition-colors duration-300 hover:text-white/80"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[0.8125rem] text-white/45 transition-colors duration-300 hover:text-white/80"
              >
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
