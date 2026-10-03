"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why MNV", href: "#why-mnv" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
        <circle
          cx="10"
          cy="10"
          r="8.4"
          fill="none"
          stroke={onDark ? "#c7bcd4" : "#533278"}
          strokeWidth="1.6"
          strokeDasharray="40 13"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="2.5" fill={onDark ? "#c7bcd4" : "#533278"} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.95rem] font-semibold tracking-[0.14em] ${
            onDark ? "text-white" : "text-[var(--fg)]"
          }`}
        >
          MNV
        </span>
        <span
          className={`mt-[3px] text-[0.5rem] font-medium tracking-[0.28em] ${
            onDark ? "text-white/55" : "text-[var(--fg-soft)]"
          }`}
        >
          ASSOCIATES
        </span>
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-[var(--mnv-purple)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[rgba(18,12,26,0.74)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between">
          <a href="#main" aria-label="MNV Associates, back to top">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[0.9rem] font-medium text-[var(--fg)] transition-colors duration-300 hover:text-[var(--accent-eyebrow)]"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--accent-eyebrow)] transition-[width] duration-400 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="#contact" className="!px-5 !py-3 !text-[0.875rem]">
              Talk to an advisor
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex items-center gap-2.5 px-2 py-3 text-[0.8rem] font-medium tracking-[0.08em] text-[var(--fg)] lg:hidden"
          >
            MENU
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] lg:hidden"
            style={{
              background:
                "radial-gradient(120% 80% at 70% 10%, #2e1c48 0%, #17101f 54%, #0d0914 100%)",
            }}
          >
            <div className="shell flex h-[76px] items-center justify-between">
              <Wordmark />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 text-[0.8rem] font-medium tracking-[0.08em] text-[var(--fg)]"
              >
                CLOSE
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M3 3l12 12M15 3L3 15"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="shell mt-10 flex flex-col">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[var(--rule)] py-6 text-[2rem] font-medium tracking-[-0.025em] text-[var(--fg)]"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10"
              >
                <MagneticButton href="#contact" onClick={() => setOpen(false)}>
                  Talk to an advisor
                </MagneticButton>
                <p className="signature lede mt-10 text-[var(--mnv-lavender)]">
                  unlock your growth
                </p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
