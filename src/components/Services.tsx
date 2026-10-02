import SectionHeading from "./SectionHeading";
import ServiceAccordion from "./ServiceAccordion";
import ServiceOrbital from "./ServiceOrbital";

export default function Services() {
  return (
    <section id="services" className="section-y bg-[var(--mnv-pale)]">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our expertise"
              lines={["Expertise around every", "side of your business."]}
            />
          </div>
          <p className="lede max-w-[52ch] lg:col-span-5 lg:pb-2">
            From regulatory compliance to financial leadership, MNV brings
            specialist expertise together around one objective: helping your
            business move forward with confidence.
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="hidden lg:block">
            <ServiceOrbital />
          </div>
          <div className="lg:hidden">
            <ServiceAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
