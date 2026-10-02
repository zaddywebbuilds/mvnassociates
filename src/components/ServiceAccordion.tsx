"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { services } from "@/data/services";

export default function ServiceAccordion() {
  const [openId, setOpenId] = useState<string | null>(services[1].id);
  const reduce = useReducedMotion();

  return (
    <ul className="border-t border-[var(--mnv-border)]">
      {services.map((service) => {
        const open = openId === service.id;
        const panelId = `service-panel-${service.id}`;
        const buttonId = `service-button-${service.id}`;

        return (
          <li key={service.id} className="border-b border-[var(--mnv-border)]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : service.id)}
                className="flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="numeral text-[0.75rem] tracking-[0.16em] text-[var(--mnv-lavender)]">
                  {service.index}
                </span>
                <span className="flex-1 text-[1.125rem] font-medium text-[var(--mnv-ink)]">
                  {service.title}
                </span>
                <span
                  aria-hidden="true"
                  className="relative size-4 shrink-0 text-[var(--mnv-purple)]"
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span
                    className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-400 ease-out"
                    style={{ transform: open ? "scaleY(0)" : "scaleY(1)" }}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 pl-10 pr-4">
                    <p className="body-text max-w-[46ch]">{service.description}</p>
                    <a
                      href={service.href}
                      className="group mt-5 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-[var(--mnv-purple)]"
                    >
                      Explore {service.title}
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
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
