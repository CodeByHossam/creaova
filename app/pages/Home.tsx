import { Link } from "react-router";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code,
  Settings2,
  Smartphone,
  Target,
} from "lucide-react";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ReviewsBand } from "~/components/ReviewsBand";
import { SectionHeading } from "~/components/SectionHeading";
import { primaryCta, site } from "~/data/constants";
import { projects } from "~/data/projects";
import { services } from "~/data/services";

export function meta() {
  return [
    { title: "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio" },
    {
      name: "description",
      content: "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch.",
    },
    { property: "og:title", content: "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio" },
    {
      property: "og:description",
      content: "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch.",
    },
    { property: "og:url", content: "https://creaova.example.com/" },
    { name: "twitter:title", content: "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio" },
    { name: "twitter:description", content: "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch." },
    { tagName: "link", rel: "canonical", href: "https://creaova.example.com/" },
  ];
}

/**
 * The homepage in the "Editorial Studio" system (plan Phase 3):
 * one honest single-column hero (no mock dashboards, no invented metrics),
 * numbered sections 01-04 via SectionHeading, one shared card language, and a
 * static strip of technologies the studio actually ships with.
 *
 * Load-bearing markup: every id/element pair below (#services article,
 * #work a, #process article) is keyed by the staggered entry animation in
 * globals.css — keep the tags when editing.
 */

const disciplines = [
  [
    "Front-End Precision",
    "Digital experience & web architecture",
    "High-conversion bespoke web platforms on modern infrastructure — fast to load, secure, and built to be found on search.",
    "Next.js SSR",
  ],
  [
    "Mobile Engineering",
    "Mobile app ecosystems",
    "Native-feeling product experiences crafted for fluid gestures, accessibility, and the everyday moments that matter.",
    "React Native",
  ],
  [
    "Scale & Velocity",
    "Cloud & conversion optimization",
    "Elastic foundations, measurable experiments, and dependable systems that keep performing as the business grows.",
    "AWS Multi-Region",
  ],
] as const;

// lucide icons replace the old ⌘/▯/ϟ glyphs (plan M4).
const disciplineIcons = [Code, Smartphone, Cloud] as const;

const steps = [
  [
    "01",
    "Understand your requirements",
    "We listen first — your business, your customers, and the outcome you need — so the work starts from your goals.",
  ],
  [
    "02",
    "Shape the right solution",
    "We turn those requirements into a clear structure and a visual direction that you review and approve step by step.",
  ],
  [
    "03",
    "Build with care",
    "We make it real with clean, professional code — secure, fast, accessible, and built to be found on search engines.",
  ],
  [
    "04",
    "Support you after launch",
    "We stay close after go-live with reliable follow-up and support, so the site keeps performing as your business grows.",
  ],
] as const;

const confidenceItems = [
  {
    title: "A partner, not a vendor",
    text: "We stay close after launch and keep supporting the work, so the site keeps serving you long after go-live.",
    meta: "01 / Partnership",
    icon: Target,
  },
  {
    title: "Secure & professional",
    text: "Clean, well-structured code and considered security practices give you a foundation you can rely on.",
    meta: "02 / Trust",
    icon: Accessibility,
  },
  {
    title: "Fast & easy to find",
    text: "Strong performance and search foundations mean the site loads quickly and reaches the people who matter to you.",
    meta: "03 / Performance",
    icon: Settings2,
  },
] as const;

// Truthful, non-numeric facts only (plan C2): heritage and engagement pace —
// the old 99.8% NPS / 4.2x ROI / 120+ products row was invented. The old "What
// we build" column was also dropped (user request): the services index card in
// the hero already names the three disciplines, so the row repeated them.
const heroFacts = [
  ["Established in", site.footer.location],
  ["How we start", "Start in days, not months"],
] as const;

// The hero index card (chosen "Editorial Index" hero): the three real service
// rows, derived from the Services page data — number + title + anchor id — so
// the card cannot drift from what the site actually offers. Hover: number -> burnt
// orange, label shift, arrow reveal.
const heroIndex = services.map((service) => [
  service.number,
  service.title,
  `/services#${service.id}`,
]);

// The studio's full working toolset — front end, back end, data, infrastructure
// and tooling — shown as a continuously scrolling ticker in the technology band.
const stack = [
  "React",
  "TypeScript",
  "JavaScript",
  "React Native",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Redux Toolkit",
  "RTK Query",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "REST APIs",
  "AWS",
  "Docker",
  "Git",
  "GitHub",
  "Vite",
  "Vitest",
  "Jest",
  "JWT",
  "Cloudinary",
  "Amazon S3",
  "Amazon RDS",
  "Stripe",
  "Postman",
  "npm",
] as const;

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      {/* "Editorial Index" hero: statement column on the left, an index of the
          three real services on the right. The card is separated by tone (warm
          surface-subtle, no border/shadow) rather than by a UI box; rows link
          to the real Services anchors. Hover: number -> burnt orange, label
          shifts, arrow reveals. */}
      <section className="bg-bg">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Badge>Digital experience architecture</Badge>
              <h1 className="mt-7 text-display font-semibold leading-none text-ink">
                We build <span className="text-primary-text">websites</span> that build your business
              </h1>
              {/* Brand tagline as live DOM text (brackets via HTML entities).
                  text-primary-text = the burnt orange allowed as text on light
                  surfaces (#C2410C, 5.2:1) — raw orange-500 fails AA there. */}
              <p className="mt-5 font-mono text-sm tracking-widest text-muted md:text-base">
                Creativity meets innovation
              </p>
              <p className="mt-8 max-w-2xl text-lede text-muted">{site.footer.brandLine}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to={primaryCta.to} size="lg">
                  {primaryCta.label}
                </Button>
                <Button to="/portfolio" variant="secondary" size="lg">
                  View our work
                </Button>
              </div>
              <dl className="mt-14 grid max-w-xl grid-cols-1 gap-x-10 gap-y-7 border-t border-line pt-8 sm:grid-cols-2">
                {heroFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                      {label}
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <nav aria-label="Services index" className="rounded-card bg-surface-subtle p-8 sm:p-10">
              <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                Index — what we build
              </p>
              <div className="mt-5">
                {heroIndex.map(([number, label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex items-baseline gap-4 border-t border-line py-5 first:border-t-0"
                  >
                    <span className="font-mono text-meta text-muted transition-colors duration-500 ease-in-out group-hover:text-primary-text">
                      {number}
                    </span>
                    <span className="font-display text-xl font-semibold text-ink transition-transform duration-500 ease-in-out group-hover:translate-x-1.5">
                      {label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto size-4 self-center -translate-x-2 text-primary-text opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-6 font-mono text-meta uppercase tracking-[0.18em]">
                <span className="text-muted">A UAE studio</span>
                <Link
                  to="/services"
                  className="text-primary-text transition-colors duration-200 ease-out hover:text-primary-text-hover"
                >
                  All services
                </Link>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      {/* ---------------------------- Technology --------------------------- */}
      {/* Continuously scrolling "news ticker" band: the whole toolset moves
          right-to-left and loops seamlessly. The list is rendered twice — the
          second copy is aria-hidden so a screen reader hears it once — and the
          CSS translate moves exactly -50%, so the loop has no visible jump.
          Hovering pauses it, and reduced-motion stops the animation entirely. */}
      <section
        aria-label="Technologies we build with"
        className="border-y border-line bg-surface"
      >
        <div className="flex items-center gap-6 py-5 sm:gap-10">
          <p className="ml-4 shrink-0 font-mono text-meta uppercase tracking-[0.18em] text-muted sm:ml-8">
            Built with
          </p>
          <div className="marquee-viewport relative min-w-0 flex-1">
            <div className="marquee-track flex w-max items-center">
              <ul className="flex items-center">
                {stack.map((item) => (
                  <li
                    key={item}
                    className="flex shrink-0 items-center gap-8 pr-8 text-sm font-semibold whitespace-nowrap text-ink"
                  >
                    {item}
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-primary-text/40"
                    />
                  </li>
                ))}
              </ul>
              <ul aria-hidden="true" className="flex items-center">
                {stack.map((item) => (
                  <li
                    key={item}
                    className="flex shrink-0 items-center gap-8 pr-8 text-sm font-semibold whitespace-nowrap text-ink"
                  >
                    {item}
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-primary-text/40"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- 01 Services -------------------------- */}
      <section id="services" className="bg-bg py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="left"
            number="01"
            eyebrow="Services"
            title="Engineered for impact. Built for the next stage."
            lede="Design, engineering and ongoing support in one place — a secure, fast, search-friendly foundation your business can grow on."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {disciplines.map(([label, title, text, tag], index) => {
              const Icon = disciplineIcons[index];
              return (
                <article
                  key={title}
                  className="group flex flex-col rounded-card border border-line bg-surface p-7 transition-[border-color,transform] duration-500 ease-in-out hover:-translate-y-1 hover:border-ink"
                >
                  <span className="grid size-12 place-items-center rounded-lg bg-ink text-on-dark transition-colors duration-500 ease-in-out group-hover:bg-primary group-hover:text-on-primary">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="mt-6 block font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
                    {label}
                  </span>
                  {/* min-h reserves two title lines so a wrapping title cannot
                      push its own body text out of line with its siblings. */}
                  <h3 className="mt-2.5 flex min-h-[3.25rem] items-start text-xl font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 flex min-h-[3.75rem] items-start text-sm leading-relaxed text-muted">
                    {text}
                  </p>
                  {/* Tag + link pinned to the bottom so all three cards end
                      together no matter how the copy wraps. */}
                  <div className="mt-auto pt-7">
                    <span className="inline-block rounded-md border border-line bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-ink">
                      {tag}
                    </span>
                    <Link
                      to="/services"
                      className="mt-4 flex items-center justify-between border-t border-line pt-5 text-sm font-semibold text-ink transition-colors duration-400 ease-in-out group-hover:text-primary-text"
                    >
                      Explore
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------ 02 Work ---------------------------- */}
      <section id="work" className="bg-dark py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              dark
              number="02"
              eyebrow="Selected concepts"
              title="Clear thinking, made tangible."
              lede="Explore concept directions that show how we think about product clarity, visual systems, and digital trust."
            />
            <Link
              to="/portfolio"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-on-dark-muted transition-colors duration-200 ease-out hover:text-on-dark"
            >
              View portfolio
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                to="/portfolio"
                className="group rounded-card border border-dark-line bg-dark-surface p-5 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-on-dark/30"
              >
                <div
                  className="flex aspect-[4/3] items-end rounded-lg bg-cover bg-center p-4"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 35%), rgb(255 255 255 / 5%)), url(${project.image})`,
                    backgroundColor: project.accent,
                  }}
                >
                  <span className="rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink">
                    Concept project
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-on-dark">{project.title}</h3>
                {/* min-h keeps each description to a 2-line box — without it a
                    wrapping description pushed one card in the row taller. */}
                <p className="mt-2 flex min-h-[3rem] items-start text-sm leading-6 text-on-dark-muted">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------- 03 Process --------------------------- */}
      <section id="process" className="bg-bg py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            number="03"
            eyebrow="How we work"
            title="A practical engine for good work."
            lede="A clear, step-by-step sequence — from understanding your requirements, to launch, to the follow-up that comes after it."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <article
                key={number}
                className="flex min-h-56 flex-col rounded-card border border-line bg-surface p-6 transition-[border-color,transform] duration-500 ease-in-out hover:-translate-y-1 hover:border-ink"
              >
                <span className="font-mono text-xl font-medium text-primary-text">{number}</span>
                {/* min-h reserves two title lines: "Understand your requirements"
                    wraps, its siblings do not, and without this the first card's
                    body sat 28px lower than the rest. */}
                <h3 className="mt-5 flex min-h-[3.25rem] items-start text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------- 04 Confidence -------------------------- */}
      <section id="confidence" className="border-t border-line bg-surface-subtle py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                number="04"
                eyebrow="Built for confidence"
                title="A stronger digital foundation starts with clarity."
                lede="We work as a partner, not a vendor: direct communication, decisions you can see at every step, and work grounded in what your customers actually need."
              />
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-500 ease-in-out hover:text-primary-text"
              >
                How we work
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {confidenceItems.map(({ title, text, meta, icon: Icon }) => (
                <article
                  key={title}
                  className="group rounded-card border border-line bg-surface p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-ink"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-lg bg-ink text-on-dark transition-colors duration-200 ease-out group-hover:bg-primary group-hover:text-on-primary">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                      {meta}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                  <div
                    aria-hidden="true"
                    className="mt-6 h-px w-10 bg-primary transition-[width] duration-300 ease-out group-hover:w-full"
                  />
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ReviewsBand />
      <CTABand />
    </>
  );
}
