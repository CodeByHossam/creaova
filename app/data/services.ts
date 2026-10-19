export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  deliverables: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: "web-design",
    number: "01",
    title: "Web design",
    summary: "Clear, considered interfaces for brands that want to be taken seriously.",
    details: "We turn a rough idea, an outdated site, or a new business into a focused digital experience with a strong visual point of view.",
    deliverables: ["Content direction", "User journeys", "Responsive interface design", "Design system"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "web-development",
    number: "02",
    title: "Web development",
    summary: "Fast, accessible websites that are easy to use and easy to maintain.",
    details: "From a polished marketing site to a more involved product interface, we build the front end with performance and clarity in mind.",
    deliverables: ["React and TypeScript", "CMS-ready structure", "SEO foundations", "Performance-minded builds"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "mobile-apps",
    number: "03",
    title: "Mobile app development",
    summary: "Useful mobile products that make the important action feel effortless.",
    details: "We help shape the product, map the core flows, and turn the essential experience into a dependable mobile app.",
    deliverables: ["Product discovery", "Interaction design", "Cross-platform development", "Release preparation"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
  },
];

export const processSteps = [
  ["01", "Listen", "We start with the business, the audience, and the outcome—not a template."],
  ["02", "Shape", "We reduce the problem to a clear structure, useful content, and a visual direction."],
  ["03", "Build", "We make the experience real, responsive, accessible, and ready to launch."],
  ["04", "Refine", "We test the details, remove friction, and hand over something you can own."],
] as const;
