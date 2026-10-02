export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  href: string;
};

export const services: Service[] = [
  {
    id: "business-setup",
    index: "01",
    title: "Business Setup",
    summary: "Structure and foundations",
    description:
      "Establish the right structure and foundations for operating successfully in the UAE.",
    href: "#contact",
  },
  {
    id: "corporate-tax",
    index: "02",
    title: "Corporate Tax",
    summary: "Planning and compliance",
    description:
      "Navigate UAE corporate tax requirements with clarity, planning and confidence.",
    href: "#contact",
  },
  {
    id: "vat",
    index: "03",
    title: "VAT",
    summary: "Registration and reporting",
    description:
      "Manage registration, reporting and ongoing VAT obligations efficiently.",
    href: "#contact",
  },
  {
    id: "transfer-pricing",
    index: "04",
    title: "Transfer Pricing",
    summary: "Policy and documentation",
    description:
      "Build defensible transfer pricing policies and documentation aligned with regulatory requirements.",
    href: "#contact",
  },
  {
    id: "accounting",
    index: "05",
    title: "Accounting",
    summary: "Accurate financial information",
    description:
      "Maintain accurate, timely financial information that supports better decision-making.",
    href: "#contact",
  },
  {
    id: "cfo-advisory",
    index: "06",
    title: "CFO Advisory",
    summary: "Senior financial insight",
    description:
      "Access senior financial insight without the overhead of a full-time CFO.",
    href: "#contact",
  },
  {
    id: "compliance",
    index: "07",
    title: "Compliance",
    summary: "Structured regulatory support",
    description:
      "Stay ahead of regulatory requirements with structured, practical support.",
    href: "#contact",
  },
  {
    id: "hr-advisory",
    index: "08",
    title: "HR Advisory",
    summary: "People and workforce practices",
    description:
      "Build stronger people processes, policies and workforce practices.",
    href: "#contact",
  },
  {
    id: "business-advisory",
    index: "09",
    title: "Business Advisory",
    summary: "Decisions and growth",
    description:
      "Turn business challenges into structured decisions and practical growth opportunities.",
    href: "#contact",
  },
];
