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
import { DisciplineCard } from "~/components/DisciplineCard";
import { HomeProjectCard } from "~/components/HomeProjectCard";
import { QualityCard } from "~/components/QualityCard";
import { ConfidenceCard } from "~/components/ConfidenceCard";
import { ReviewsBand } from "~/components/ReviewsBand";
import { SectionHeading } from "~/components/SectionHeading";
import { primaryCta, site, absoluteUrl } from "~/data/constants";
import { projects } from "~/data/projects";
import { services } from "~/data/services";

export function meta() {
  return [
    {
      title:
        "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio",
    },
    {
      name: "description",
      content:
        "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch.",
    },
    {
      property: "og:title",
      content:
        "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio",
    },
    {
      property: "og:description",
      content:
        "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch.",
    },
    { property: "og:url", content: absoluteUrl("/") },
    {
      name: "twitter:title",
      content:
        "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio",
    },
    {
      name: "twitter:description",
      content:
        "Creaova Digital Solutions [ CDS ] — an established UAE digital studio building secure, fast, search-friendly websites and apps, with support after launch.",
    },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/") },
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
      <section id="home" className="bg-bg lg:-scroll-mt-10 xl:-scroll-mt-18">
        <Container className="py-12 sm:py-16 md:py-18 lg:py-22 xl:py-24">
          <div className="grid items-center gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">
            <div>
              <Badge>Digital experience architecture</Badge>
              <h1 className="mt-6 sm:mt-7 text-display font-semibold leading-none text-ink">
                We build <span className="text-primary-text">websites</span>{" "}
                that build your business
              </h1>
              <p className="mt-4 sm:mt-5 font-mono text-sm tracking-widest text-muted md:text-base">
                Creativity meets innovation
              </p>
              <p className="mt-6 sm:mt-8 max-w-2xl text-lede text-muted">
                {site.footer.brandLine}
              </p>
              <div className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to={primaryCta.to} size="lg">
                  {primaryCta.label}
                </Button>
                <Button to="/portfolio" variant="secondary" size="lg">
                  View our work
                </Button>
              </div>
              <dl className="mt-10 sm:mt-14 grid max-w-xl grid-cols-1 gap-x-10 gap-y-6 sm:gap-y-7 border-t border-line pt-6 sm:pt-8 sm:grid-cols-2">
                {heroFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                      {label}
                    </dt>
                    <dd className="mt-1.5 sm:mt-2 text-base font-semibold text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <nav
              aria-label="Services index"
              className="rounded-card bg-surface-subtle p-5 sm:p-6 md:p-8 lg:p-10"
            >
              <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                Index — what we build
              </p>
              <div className="mt-4 sm:mt-5">
                {heroIndex.map(([number, label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex items-baseline gap-3 sm:gap-4 border-t border-line py-4 sm:py-5 first:border-t-0"
                  >
                    <span className="font-mono text-meta text-muted transition duration-200 ease-out group-hover:text-primary-text">
                      {number}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-semibold text-ink transition duration-200 ease-out group-hover:translate-x-1 sm:group-hover:translate-x-1.5">
                      {label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto size-4 self-center -translate-x-2 text-primary-text opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-line pt-5 sm:pt-6 font-mono text-meta uppercase tracking-[0.18em]">
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
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-4 sm:py-5">
          <p className="ml-3 sm:ml-4 md:ml-6 lg:ml-8 shrink-0 font-mono text-meta uppercase tracking-[0.18em] text-muted">
            Built with
          </p>
          <div className="marquee-viewport relative min-w-0 flex-1">
            <div className="marquee-track flex w-max items-center">
              <ul className="flex items-center">
                {stack.map((item) => (
                  <li
                    key={item}
                    className="flex shrink-0 items-center gap-6 sm:gap-7 md:gap-8 pr-6 sm:pr-7 md:pr-8 text-sm font-semibold whitespace-nowrap text-ink"
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
                    className="flex shrink-0 items-center gap-6 sm:gap-7 md:gap-8 pr-6 sm:pr-7 md:pr-8 text-sm font-semibold whitespace-nowrap text-ink"
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
      <section
        id="services"
        className="bg-bg pt-12 pb-14 sm:pt-16 sm:pb-18 md:pt-20 md:pb-22 lg:pt-24 lg:pb-24 xl:pt-28 xl:pb-28"
      >
        <Container>
          <SectionHeading
            align="left"
            number="01"
            eyebrow="Services"
            title="Engineered for impact. Built for the next stage."
            lede="Design, engineering and ongoing support in one place — a secure, fast, search-friendly foundation your business can grow on."
          />
          <div className="mt-6 mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:mt-12">
            {disciplines.map(([label, title, text, tag], index) => {
              const Icon = disciplineIcons[index];
              return (
                <DisciplineCard
                  key={title}
                  Icon={Icon}
                  label={label}
                  title={title}
                  text={text}
                  tag={tag}
                />
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
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-on-dark-muted transition-colors duration-300 ease-out hover:text-on-dark"
            >
              View portfolio
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* 
      FIXED: 
      1. Changed xl:grid-cols-3 to lg:grid-cols-3 (forces 3 columns on laptops).
      2. Added max-w-6xl mx-auto to keep the 3 cards from stretching too wide on huge screens.
    */}
          <div className="mt-12 mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <HomeProjectCard key={project.slug} project={project} />
            ))}
          </div>

        </Container>
      </section>

      {/* ---------------------------- 03 Process --------------------------- */}
      <section
        id="process"
        className="bg-bg py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 scroll-mt-16 lg:scroll-mt-20"
      >
        <Container>
          <SectionHeading
            number="03"
            eyebrow="Built for quality"
            title="Secure, clean, and delivered on time."
            lede="We focus on the details that matter — secure foundations, clean code, efficient delivery, and long-term value without unnecessary cost."
          />
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5 xl:gap-6 xl:grid-cols-4">
            {[
              ["01", "Secure by design", "Thoughtful security practices from day one — clean structure, safe forms, and a stable foundation you can rely on."],
              ["02", "Clean, professional code", "Readable, maintainable code that scales with your business and keeps future updates simple and cost-effective."],
              ["03", "Optimized performance & SEO-friendly", "Built for speed and discoverability — optimized performance and SEO best practices to help your site rank and load fast."],
              ["04", "On-time, reliable delivery", "Clear timelines, direct communication, and a smooth handoff — with support ready when you need it."],
            ].map(([number, title, text]) => (
              <QualityCard key={number} number={number} title={title} text={text} />
            ))}
          </div>
        </Container>
      </section>



      {/* -------------------------- 04 Confidence -------------------------- */}
      <section
        
        className="border-t border-line bg-surface-subtle py-16 sm:py-20 lg:py-28 "
      >
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
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition duration-200 ease-out hover:text-primary-text"
              >
                How we work
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
              {confidenceItems.map(({ title, text, meta, icon: Icon }) => (
                <ConfidenceCard key={title} title={title} text={text} meta={meta} Icon={Icon} />
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
