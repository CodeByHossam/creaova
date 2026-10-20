export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "web-design",
    number: "01",
    title: "Web design",
    summary: "Clear, considered interfaces for brands that want to be taken seriously.",
    details: "We turn a rough idea or an outdated site into a focused digital experience — covering content, user journeys, responsive interfaces and a design system.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "web-development",
    number: "02",
    title: "Web development",
    summary: "Fast, secure and search-friendly websites that are easy to maintain.",
    details: "We build in React and TypeScript with clean, secure code and strong performance and SEO foundations, so the site is easy to find and ready to grow.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "mobile-apps",
    number: "03",
    title: "Mobile app development",
    summary: "Useful mobile products that make the important action feel effortless.",
    details: "We shape the product, map the core flows, and turn the essential experience into a dependable cross-platform app — then stay involved through release and beyond.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
  },
];

export const processSteps = [
  ["01", "Understand your requirements", "We start by listening — your business, your customers, and the outcome you need. No template, no assumptions."],
  ["02", "Shape the right solution", "We reduce the problem to a clear structure, useful content, and a visual direction you review and approve step by step."],
  ["03", "Build with care", "We make the experience real — secure, fast, accessible and search-friendly — with clean, professional code built to last."],
  ["04", "Launch and support you", "We test the details, handle the release, and stay close after launch with follow-up and support you can rely on."],
] as const;
