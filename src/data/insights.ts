import { asset } from "@/lib/asset";

export type Insight = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const featuredInsight: Insight = {
  id: "corporate-tax-growing-business",
  category: "Corporate Tax",
  title: "Corporate Tax in the UAE: what growing businesses need to get right",
  excerpt:
    "Registration thresholds, group structures and record keeping all shape a company's corporate tax position. Getting the foundations right early avoids costly adjustments later.",
  image: asset("/images/insight-terrace.webp"),
  imageAlt:
    "A person looking out across the Dubai skyline from a curved high rise terrace at dusk",
  href: "#insights",
};

export const insights: Insight[] = [
  {
    id: "financial-setup-day-one",
    category: "Business Setup",
    title: "Why Dubai startups need professional financial setup from day one",
    excerpt:
      "The structure chosen at incorporation shapes tax treatment, reporting duties and funding options for years afterwards.",
    image: asset("/images/insight-growth.webp"),
    imageAlt: "Curved marble steps and planting beside a still reflecting pool",
    href: "#insights",
  },
  {
    id: "cfo-services-demand",
    category: "CFO Advisory",
    title: "Why CFO services are in high demand among startups and SMEs",
    excerpt:
      "Growing companies need senior financial judgement long before they can justify a permanent CFO on the payroll.",
    image: asset("/images/insight-interior.webp"),
    imageAlt:
      "A lounge interior with floor to ceiling windows framing the Burj Khalifa at sunset",
    href: "#insights",
  },
];
