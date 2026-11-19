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
import { SectionHeading } from "~/components/SectionHeading";
import { TextLink } from "~/components/TextLink";
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
 * The homepage in the locked "Editorial Studio" system: an honest editorial
 * hero, four numbered sections (01–04) with one shared card language, and a
 * closing conversation band. No invented proof and no technology ticker.
 */

const disciplines = [
  {
    label: "Front-End Precision",
    title: "Digital experience & web architecture",
    text: "Conversion-focused web platforms on modern infrastructure — fast to load, secure, and built to be found on search.",
    tag: "Next.js SSR",
    actionLabel: "See web design",
    to: "/services#web-design",
  },
  {
    label: "Mobile Engineering",
    title: "Mobile app ecosystems",
    text: "Native-feeling product experiences crafted for fluid gestures, accessibility, and the everyday moments that matter.",
    tag: "React Native",
    actionLabel: "See mobile apps",
    to: "/services#mobile-apps",
  },
  {
    label: "Scale & Velocity",
    title: "Cloud & conversion optimization",
    text: "Elastic foundations, measurable experiments, and dependable systems that keep performing as the business grows.",
    tag: "AWS Multi-Region",
    actionLabel: "See web development",
    to: "/services#web-development",
  },
] as const;

// lucide icons replace the old ⌘/▯/ϟ glyphs (plan M4).
const disciplineIcons = [Code, Smartphone, Cloud] as const;

const confidenceItems = [
  {
    title: "A partner, not a vendor",
    text: "We stay close after launch and keep supporting the work, so the site keeps serving you long after go-live.",
    meta: "04.1 / Partnership",
    icon: Target,
  },
  {
    title: "Secure & professional",
    text: "Clean, well-structured code and considered security practices give you a foundation you can rely on.",
    meta: "04.2 / Trust",
    icon: Accessibility,
  },
  {
    title: "Fast & easy to find",
    text: "Strong performance and search foundations mean the site loads quickly and reaches the people who matter to you.",
    meta: "04.3 / Performance",
    icon: Settings2,
  },
] as const;

const heroFacts = [
  ["Established in", site.footer.location],
  ["After launch", "We stay involved"],
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

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      {/* "Editorial Index" hero: statement column on the left, an index of the
          three real services on the right. The card is separated by tone (warm
          surface-subtle, no border/shadow) rather than by a UI box; rows link
          to the real Services anchors. This is an index panel, not one of the
          page's cards: same 12px corner radius, but no border and the hero's
          display face for its row labels. Hover: number -> burnt orange, label
          shifts, arrow reveals. */}
      <section id="home" className="bg-bg">
        <Container className="py-10 sm:py-12 lg:py-12 xl:py-14">
          <div className="grid items-center gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">
            <div>
              <Badge>Digital experience architecture</Badge>
              <h1 className="mt-5 sm:mt-6 text-display font-semibold text-ink">
                We build <span className="text-primary-text">websites</span>{" "}
                that build your business
              </h1>
              <p className="mt-3 sm:mt-4 font-mono text-sm tracking-[0.12em] text-muted">
                {site.tagline}
              </p>
              <p className="mt-5 sm:mt-6 max-w-2xl text-lede text-muted">
                {site.footer.brandLine}
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row">
                <Button to={primaryCta.to} size="lg">
                  {primaryCta.label}
                </Button>
                <Button to="/portfolio" variant="secondary" size="lg">
                  View our work
                </Button>
              </div>
              <dl className="mt-6 sm:mt-7 lg:mt-8 grid max-w-xl grid-cols-1 gap-x-10 gap-y-6 sm:gap-y-7 border-t border-line pt-5 sm:pt-6 sm:grid-cols-2">
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
              className="rounded-xl bg-ink p-5 sm:p-6 md:p-8 lg:p-10"
            >
              <p className="font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Index — what we build
              </p>
              <div className="mt-4 sm:mt-5">
                {heroIndex.map(([number, label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex items-baseline gap-3 sm:gap-4 border-t border-dark-line py-4 sm:py-5 first:border-t-0"
                  >
                    <span className="font-mono text-meta text-on-dark-muted transition duration-200 ease-out group-hover:text-primary group-focus-within:text-primary">
                      {number}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-medium text-on-dark transition duration-200 ease-out group-hover:translate-x-1 group-focus-within:translate-x-1 sm:group-hover:translate-x-1.5 sm:group-focus-within:translate-x-1.5">
                      {label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto size-4 self-center -translate-x-2 text-primary opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-dark-line pt-5 sm:pt-6 font-mono text-meta uppercase tracking-[0.18em]">
                <span className="text-on-dark-muted">A UAE studio</span>
                <TextLink
                  to="/services"
                  tone="dark"
                  className="min-h-11 font-mono text-meta uppercase tracking-[0.18em]"
                >
                  All services
                </TextLink>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      {/* ---------------------------- 01 Services -------------------------- */}
      <section id="services" className="bg-bg">
        <div className="bg-ink">
          <Container className="py-8 sm:py-10 lg:py-12">
            <SectionHeading
              dark
              bold
              align="left"
              number="01"
              eyebrow="Services"
              title="Web, mobile, and the support behind them."
              lede="Design, engineering and ongoing support in one place, with clear decisions at every step."
            />
          </Container>
        </div>
        <Container className="py-10 sm:py-12 lg:py-16">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
            {disciplines.map((discipline, index) => {
              const Icon = disciplineIcons[index];
              return (
                <li key={discipline.title} className="h-full">
                  <DisciplineCard
                    Icon={Icon}
                    label={discipline.label}
                    title={discipline.title}
                    text={discipline.text}
                    tag={discipline.tag}
                    actionLabel={discipline.actionLabel}
                    to={discipline.to}
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ------------------------------ 02 Work ---------------------------- */}
      <section id="work" className="bg-dark py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              dark
              bold
              number="02"
              eyebrow="Selected work"
              title="Concept builds, shown end to end."
              lede="A closer look at what each concept explores, and the thinking behind it."
            />
            <TextLink
              to="/portfolio"
              tone="dark"
              className="min-h-11 shrink-0 gap-1.5 text-sm font-semibold"
            >
              View portfolio
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
              />
            </TextLink>
          </div>

          <ul className="mt-12 mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <HomeProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------------------------- 03 Quality -------------------------- */}
      <section
        id="process"
        className="bg-bg py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 scroll-mt-16 lg:scroll-mt-20"
      >
        <Container>
          <SectionHeading
            bold
            number="03"
            eyebrow="Built for quality"
            title="Secure, clean, and delivered on time."
            lede="We focus on the details that matter — secure foundations, clean code, efficient delivery, and long-term value without unnecessary cost."
          />
          <ul className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5 xl:gap-6 xl:grid-cols-4">
            {[
              ["03.1", "Secure by design", "Thoughtful security practices from day one — clean structure, safe forms, and a stable foundation you can rely on."],
              ["03.2", "Clean, professional code", "Readable, maintainable code that scales with your business and keeps future updates simple and cost-effective."],
              ["03.3", "Optimized performance & SEO-friendly", "Built for speed and discoverability — optimized performance and SEO best practices to help your site rank and load fast."],
              ["03.4", "On-time, reliable delivery", "Clear timelines, direct communication, and a smooth handoff — with support ready when you need it."],
            ].map(([number, title, text]) => (
              <li key={number} className="h-full">
                <QualityCard number={number} title={title} text={text} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* -------------------------- 04 Confidence -------------------------- */}
      <section className="border-t border-line bg-surface-subtle py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-6 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div className="flex h-full flex-col rounded-card bg-ink px-6 py-5 sm:px-8">
              <SectionHeading
                dark
                bold
                align="left"
                number="04"
                eyebrow="Built for confidence"
                title="A stronger digital foundation starts with clarity."
                lede="We stay with you after launch: direct communication, decisions you can see at every step, and work grounded in what your customers actually need."
              />
              <TextLink
                to="/about"
                tone="dark"
                className="mt-auto min-h-11 gap-2 text-sm font-semibold"
              >
                How we work
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                />
              </TextLink>
            </div>
            <ul className="grid h-full grid-cols-1 gap-4 lg:col-span-3 lg:grid-cols-3 lg:gap-6">
              {confidenceItems.map(({ title, text, meta, icon: Icon }) => (
                <li key={title} className="h-full">
                  <ConfidenceCard title={title} text={text} meta={meta} Icon={Icon} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}