export type Service = {
  id: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  /** Outcome-led label used by the hero index panel. */
  indexTitle: string;
  /** One-line mechanism shown under the outcome in the hero index panel. */
  indexSummary: string;
  /** Short service name shown as the index row's action label. */
  indexLabel: string;
};

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web design",
    summary: "Clear, considered interfaces for brands that want to be taken seriously.",
    details:
      "We turn a rough idea or an outdated site into a focused experience — covering content, user journeys, responsive interfaces and a design system your team can use.",
    image: "/images/services/web-design.webp",
    indexTitle: "Websites that earn the enquiry",
    indexSummary: "Clear journeys, fast load, built to be found.",
    indexLabel: "Web design",
  },
  {
    id: "web-development",
    title: "Web development",
    summary: "Fast, secure and search-friendly websites that are easy to maintain.",
    details:
      "We build with dependable, maintainable code and strong performance and search foundations, so the site is easy to find and ready to grow.",
    image: "/images/services/web-development.webp",
    indexTitle: "Development that holds up",
    indexSummary: "Secure, maintainable, ready to grow.",
    indexLabel: "Web development",
  },
  {
    id: "mobile-apps",
    title: "Mobile app development",
    summary: "Useful mobile products that make the important action feel effortless.",
    details:
      "We shape the product, map the core flows, and turn the essential experience into a dependable cross-platform app — then stay involved through release and beyond.",
    image: "/images/services/mobile-apps.webp",
    indexTitle: "Mobile products people keep using",
    indexSummary: "Useful first. Native-feeling always.",
    indexLabel: "Mobile apps",
  },
];

export const processSteps = [
  [
    "Understand your requirements",
    "We start by listening — your business, your customers, and the outcome you need. No template, no assumptions.",
  ],
  [
    "Shape the right solution",
    "We reduce the problem to a clear structure, useful content, and a visual direction you review and approve step by step.",
  ],
  [
    "Build with care",
    "We make the experience real — secure, fast, accessible and easy to find — with maintainable code built to last.",
  ],
  [
    "Launch and support you",
    "We test the details, handle the release, and stay close after launch with follow-up and support you can rely on.",
  ],
] as const;
