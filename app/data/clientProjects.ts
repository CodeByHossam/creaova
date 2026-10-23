/**
 * Central portfolio data — the single source of truth for Creaova's live work.
 *
 * Add or update a project here and the /portfolio grid, the Live Demo button,
 * the status pill and the developer signature all update together.
 *
 * `demoUrl: null` means the build is not publicly hosted yet. The card renders
 * a disabled "Live demo soon" control instead of a dead link, so a placeholder
 * can never pretend to be a working demo.
 *
 * To publish a project, replace `null` with its URL (for example
 * `https://my-project.onrender.com`) — nothing else needs to change.
 */

export type ClientProjectKind = "Web app" | "Website" | "API" | "Game";

export type ClientProjectStatus = "live" | "in-development";

export type ClientProject = {
  /** URL-safe id, also used as the React key. */
  slug: string;
  title: string;
  /** Two-letter monogram used by the cover when no screenshot exists. */
  initials: string;
  kind: ClientProjectKind;
  category: string;
  description: string;
  stack: string[];
  year: string;
  /** Light accent used behind the monogram on the dark card. */
  accent: string;
  status: ClientProjectStatus;
  /**
   * Public demo URL. `null` renders a disabled "Live demo soon" state.
   * Prefer the running product; for API-only work link the API docs.
   */
  demoUrl: string | null;
  /** Label for the demo action (e.g. "API docs"). */
  demoLabel: string;
  /** Optional API base URL shown as a secondary detail. */
  apiUrl?: string;
  /** Optional screenshot; the monogram cover is used while absent. */
  image?: string;
};

export const clientProjects: ClientProject[] = [
  {
    slug: "book-store-api",
    title: "Book Store API",
    initials: "BS",
    kind: "API",
    category: "Commerce / REST API",
    description:
      "A production-ready bookstore API with JWT authentication, role-based access, author and book CRUD, image uploads, and email-based password recovery.",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Joi"],
    year: "2026",
    accent: "#e9d8c1",
    status: "live",
    demoUrl: "https://book-store-api-6pr7.onrender.com/docs",
    demoLabel: "API docs",
    apiUrl: "https://book-store-api-6pr7.onrender.com",
    image: "/images/projects-images/book-store-api/book-store-api-01.png",
  },
  {
    slug: "dental-clinic",
    title: "Dental Clinic",
    initials: "DC",
    kind: "Web app",
    category: "Healthcare / Operations",
    description:
      "A full-stack clinic management platform spanning appointments, patient records, treatment plans, billing, inventory, and analytics with granular role-based access.",
    stack: ["React", "Express", "MongoDB", "Redux Toolkit", "Tailwind"],
    year: "2026",
    accent: "#c5d8d0",
    status: "live",
    demoUrl: "https://dental-clinic-app-vgt3.onrender.com",
    demoLabel: "Live demo",
    apiUrl: "https://dental-clinic-backend-enzv.onrender.com/api",
    image: "/images/projects-images/dental-clinic/dental-clinic-01.png",
  },
  {
    slug: "mentora",
    title: "Mentora Learning",
    initials: "ML",
    kind: "Web app",
    category: "EdTech / Platform",
    description:
      "A learning management platform with course delivery, live Zoom sessions, Stripe and PayPal payments, instructor payouts, and role-based dashboards.",
    stack: ["React", "Express", "MongoDB", "Stripe", "PayPal"],
    year: "2026",
    accent: "#d2d9e7",
    status: "live",
    demoUrl: "https://mentora-courses-app.onrender.com/",
    demoLabel: "Live demo",
    apiUrl: "https://mentora-api-rqbb.onrender.com/api",
    image: "/images/projects-images/mentora/mentora-01.png",
  },
  {
    slug: "flamingo",
    title: "Il Flamingo",
    initials: "IF",
    kind: "Website",
    category: "Hospitality / Restaurant",
    description:
      "A bilingual Italian restaurant site with an animated menu, gallery, scroll storytelling, and a PHP-backed reservation enquiry flow.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP", "AOS"],
    year: "2026",
    accent: "#e8cfc7",
    status: "live",
    demoUrl: "https://il-flamingo.onrender.com/",
    demoLabel: "Live demo",
    image: "/images/projects-images/flamingo/flamingo-01.png",
  },
  {
    slug: "flower-shop",
    title: "Flower Shop",
    initials: "FS",
    kind: "Website",
    category: "Commerce / Storefront",
    description:
      "An editorial flower storefront with a persistent cart, quantity controls, a 3D butterfly hero, and scroll-driven product storytelling.",
    stack: ["React", "Vite", "Tailwind", "Three.js", "GSAP"],
    year: "2026",
    accent: "#e5dfca",
    status: "live",
    demoUrl: "https://flowershop-qjcl.onrender.com/",
    demoLabel: "Live demo",
    image: "/images/projects-images/flower-shop/flower-shop-01.png",
  },
  {
    slug: "irrigation-net",
    title: "Irrigation Net",
    initials: "IN",
    kind: "Website",
    category: "Engineering / Tools",
    description:
      "An engineering toolkit for irrigation design, with Hazen-Williams pressure-loss analysis, flow and pipe sizing, and valve selection calculators.",
    stack: ["HTML5", "CSS3", "JavaScript", "Engineering math"],
    year: "2026",
    accent: "#cfe0c4",
    status: "live",
    demoUrl: "https://irrigation-net.onrender.com/",
    demoLabel: "Live demo",
    image: "/images/projects-images/irrigation-net/irrigation-net-01.png",
  },
  {
    slug: "little-rainbow-nursery",
    title: "Little Rainbow Nursery",
    initials: "LR",
    kind: "Website",
    category: "Education / Nursery",
    description:
      "A warm, playful nursery website with programme sections, a gallery, parent testimonials, and a clear enquiry journey for families.",
    stack: ["React", "Vite", "Tailwind", "AOS"],
    year: "2026",
    accent: "#f3d9c4",
    status: "live",
    demoUrl: "https://little-rainbow-nursery.onrender.com/",
    demoLabel: "Live demo",
    image: "/images/projects-images/little-rainbow-nursery/little-rainbow-nursery-01.png",
  },
  {
    slug: "penguino",
    title: "Penguino",
    initials: "PG",
    kind: "Game",
    category: "Game / Browser",
    description:
      "A ten-level side-scrolling platformer built in Phaser 3, with hand-authored Tiled maps, a multi-phase boss fight, and runtime-synthesised audio.",
    stack: ["Phaser 3", "TypeScript", "Vite", "Tiled"],
    year: "2026",
    accent: "#cfe0e8",
    status: "live",
    demoUrl: "https://penguino-9cwy.onrender.com/",
    demoLabel: "Play demo",
    image: "/images/projects-images/penguino/penguino-01.png",
  },
  {
    slug: "work-note",
    title: "Work Note",
    initials: "WN",
    kind: "Web app",
    category: "Productivity / Internal tool",
    description:
      "A MERN workspace that replaces paper work notes with searchable, editable digital records, organised around the way a team actually works.",
    stack: ["React", "Express", "MongoDB", "Redux Toolkit"],
    year: "2026",
    accent: "#d8d2e8",
    status: "live",
    demoUrl: "https://work-note-app.onrender.com/",
    demoLabel: "Live demo",
    image: "/images/projects-images/work-note/work-note-01.png",
  },
  {
    slug: "bomber-man-game",
    title: "Bomber Man Game",
    initials: "BM",
    kind: "Game",
    category: "Game / Browser",
    description:
      "A 2D platformer built with Phaser where you collect stars, avoid bombs, and race against the clock through dynamically generated levels.",
    stack: ["Phaser 3", "JavaScript", "HTML5", "CSS3"],
    year: "2026",
    accent: "#f0c98c",
    status: "live",
    demoUrl: "https://bomber-man-game.onrender.com/",
    demoLabel: "Play demo",
    image: "/images/projects-images/bomber-man-game/bomber-man-level1.png",
  },
];

/** Number of projects with a working public demo — used by the portfolio hero. */
export const liveProjectCount = clientProjects.filter(
  (project) => project.demoUrl !== null,
).length;
