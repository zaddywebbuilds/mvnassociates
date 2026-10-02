import ArchitecturalBand from "@/components/ArchitecturalBand";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Services from "@/components/Services";
import StatementSection from "@/components/StatementSection";
import StatsStory from "@/components/StatsStory";
import TrustStrip from "@/components/TrustStrip";
import WhyMNV from "@/components/WhyMNV";
import { services } from "@/data/services";

/** Only facts supplied in the brief. No addresses, ratings or credentials invented. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MNV Associates",
  description:
    "MNV Associates provides tax, accounting, CFO, compliance, HR and business advisory solutions for organisations across Dubai and the UAE.",
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  knowsAbout: services.map((s) => s.title),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <StatementSection />
        <ArchitecturalBand />
        <WhyMNV />
        <StatsStory />
        <Insights />
        <ContactCTA />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
    </>
  );
}
