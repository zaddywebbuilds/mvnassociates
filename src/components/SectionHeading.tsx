import type { ReactNode } from "react";
import { MaskedHeading, Reveal } from "./Reveal";

export default function SectionHeading({
  eyebrow,
  lines,
  intro,
  className = "",
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  lines: ReactNode[];
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-7 bg-current opacity-50" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <MaskedHeading as={as} lines={lines} className="headline max-w-[22ch] text-balance" />

      {intro ? (
        <Reveal delay={0.12}>
          <p className={`lede mt-7 max-w-[56ch] ${align === "center" ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
