import { Link } from "react-router";
import { ArrowRight, Cloud, Code, Handshake, ShieldCheck, Smartphone, Zap } from "lucide-react";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { DisciplineCard } from "~/components/DisciplineCard";
import { FAQ } from "~/components/FAQ";
import { HomeProjectCard } from "~/components/HomeProjectCard";
import { ProofPanel } from "~/components/ProofPanel";
import { ProcessCard } from "~/components/ProcessCard";
import { ConfidenceCard } from "~/components/ConfidenceCard";
import { StudioVsFreelancer } from "~/components/StudioVsFreelancer";
import { SectionHeading } from "~/components/SectionHeading";
import { SpriteIcon } from "~/components/SpriteIcon";
import { TextLink } from "~/components/TextLink";
import { primaryCta } from "~/data/constants";
import { pageMeta } from "~/data/pageMeta";
import { projects, tabletHomeProject } from "~/data/projects";
import { services } from "~/data/services";

export function meta() {
  const title = "Creaova Digital Solutions [ CDS ] — UAE Web Design & Development Studio";
  const description =
    "Creaova is a UAE studio building websites and apps that make your business easier to choose — with one team, visible decisions and support after launch.";
  return pageMeta({ path: "/", title, description });
}

/**
 * The homepage in the locked "Editorial Studio" system: a pain-led editorial
 * hero, outcome-led sections with one shared card language, a process-proof
 * panel, an FAQ and a closing conversation band. No invented proof and no
 * technology ticker.
 */

const disciplines = [
  {
    label: "Web design",
    title: "A site built to turn visitors into enquiries.",
    text: "Clear journeys, considered interfaces and a structure that helps people decide what to do next.",
    tag: "Clarity first",
    actionLabel: "See web design",
    to: "/services#web-design",
  },
  {
    label: "Mobile apps",
    title: "Useful products people keep using.",
    text: "We shape the core flow, then build an app that makes the important action feel effortless.",
    tag: "Useful first",
    actionLabel: "See mobile apps",
    to: "/services#mobile-apps",
  },
  {
    label: "Web development",
    title: "A site that won't need rebuilding when you grow.",
    text: "Secure, maintainable and easy to find — with the foundations in place for the next change.",
    tag: "Built to grow",
    actionLabel: "See web development",
    to: "/services#web-development",
  },
] as const;

// lucide icons replace the old ⌘/▯/ϟ glyphs (plan M4).
const disciplineIcons = [Code, Smartphone, Cloud] as const;

const confidenceItems = [
  {
    title: "Still here after launch.",
    text: "Fixes, guidance and the next improvement come from the same team that built it.",
    meta: "Partnership",
    details: ["One team", "Ongoing support"],
    icon: Handshake,
  },
  {
    title: "Fewer surprises later.",
    text: "Clear structure and careful checks keep the site secure and cheaper to change.",
    meta: "Reliability",
    details: ["Clean builds", "Safer data"],
    icon: ShieldCheck,
  },
  {
    title: "Built so people can find you.",
    text: "Fast pages and clear journeys help visitors take the next step.",
    meta: "Growth",
    details: ["Easy to find", "Easy to use"],
    icon: Zap,
  },
] as const;

// The hero index card is an outcomes panel, not a service menu. Each row is
// derived from the shared Services data so the promise and its one-line
// mechanism cannot drift from what the site actually offers.
const heroIndex = services.map((service) => ({
  title: service.indexTitle,
  summary: service.indexSummary,
  label: service.indexLabel,
  to: `/services#${service.id}`,
}));

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      {/* "Editorial Index" hero: statement column on the left, a dark index of
          the three real services on the right. The panel is separated by tone
          (ink, no border or shadow) rather than by a UI box; rows link to the
          real Services anchors. This is an index, not one of the page's cards:
          display-face row labels, a hairline between rows and an arrow reveal
          on hover/focus. On lg the rows share the panel's leftover height so
          the footer stays grounded; on phones they stay compact. */}
      <section
        id="home"
        className="flex min-h-[calc(100vh-4rem)] flex-col bg-bg sm:min-h-[calc(100vh-4.5rem)] md:min-h-0 lg:min-h-[calc(100vh-5rem)] lg:flex-row lg:items-center"
      >
        {/* Laptop/desktop (lg+): the section is a flex row with items-center,
            so the whole hero block is centred in the viewport and the top and
            bottom whitespace stay balanced. Mobile/tablet keep natural flow. */}
        <Container className="flex w-full flex-1 flex-col pt-8 pb-12 sm:pt-12 sm:pb-12 md:pt-8 md:pb-10 lg:pt-12 lg:pb-12">
          {/* At lg+ both columns share one row. The wider statement column
              gives the orange clause room to sit on one line; the copy is
              centred against the panel, with the badge and note aligned to
              its top and bottom edges. */}
          <div className="hero-enter grid items-center gap-10 sm:gap-12 md:gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-10 xl:gap-12">
            <div className="relative flex flex-col">
              <div>
                <Badge>SECURE, HIGH-PERFORMANCE WEB-APP</Badge>
              </div>
              {/* The copy is centred in the space above the risk-reversal line;
                  that line sits at the bottom of the column, level with the
                  dark panel's footer. */}
              <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-center">
                <h1 className="mt-5 sm:mt-5 lg:mt-6 text-display font-semibold text-ink leading-tight">
                  Your <span className="text-primary-text lg:whitespace-nowrap">website</span>{" "}
                  should be
                  <br className="hidden lg:block" /> winning more enquiries.
                </h1>
                <p className="mt-6 sm:mt-8 lg:mt-7 xl:mt-8 max-w-[65ch] text-lede text-muted">
                  Built for speed, clarity, and the exact moment a visitor decides to trust you.
                  We're a UAE studio that takes your project from first conversation to after launch
                  — with visible decisions and no disappearing act.
                </p>
                <div className="mt-6 sm:mt-6 lg:mt-7 xl:mt-8 flex flex-wrap items-center gap-3">
                  <Button to={primaryCta.to} size="lg" className="w-full sm:w-auto">
                    {primaryCta.label}
                  </Button>
                  <Button
                    to="/portfolio"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    See the thinking
                  </Button>
                </div>
              </div>
              <p className="mt-3 lg:mt-2 xl:mt-3 font-mono text-meta uppercase tracking-[0.12em] text-muted">
                No obligation. One short form. A real reply, not a sales sequence.
              </p>
            </div>

            <nav
              aria-label="Ways Creaova helps"
              className="flex flex-col rounded-xl bg-ink px-6 py-4 sm:px-10 sm:py-5 lg:self-stretch lg:px-12 lg:py-2"
            >
              <p className="font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Three ways we help
              </p>
              <div className="mt-4 flex flex-1 flex-col sm:mt-5 lg:mt-2 xl:mt-3">
                {heroIndex.map(({ title, summary, label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex flex-1 items-center justify-between gap-3 border-t border-dark-line py-1.5 first:border-t-0 sm:gap-4"
                  >
                    <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-within:translate-x-1 sm:group-hover:translate-x-1.5 sm:group-focus-within:translate-x-1.5">
                      <span className="block font-display text-base font-medium text-balance text-on-dark sm:text-xl">
                        {title}
                      </span>
                      <span className="mt-1.5 block font-mono text-meta uppercase tracking-[0.12em] text-on-dark-muted sm:mt-2">
                        {summary}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-primary sm:mt-1.5">
                        {label} →
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 -translate-x-2 text-primary opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2 border-t border-dark-line pt-4 font-mono text-meta uppercase tracking-[0.18em] lg:pt-2">
                <span className="text-on-dark-muted">Not sure which you need?</span>
                <TextLink
                  to="/contact"
                  tone="dark"
                  className="min-h-11 gap-2 font-mono text-meta uppercase tracking-[0.18em]"
                >
                  Talk it through
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 text-primary transition-transform duration-200 ease-out group-hover:translate-x-0.75 group-focus-within:translate-x-0.75"
                  />
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
            {/* Match the grid's max-w-6xl shell so the header and cards share
                one left edge at every width (the grid used to indent at xl). */}
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                dark
                bold
                align="left"
                eyebrow="Services"
                title="Web, mobile, and the support behind them."
                lede="Design, engineering and ongoing support in one place, with clear decisions at every step."
              />
            </div>
          </Container>
        </div>
        <Container className="py-10 sm:py-12 lg:py-16">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 tablet-center-odd [--odd-card-gap:0.625rem] md:[--odd-card-gap:0.75rem]">
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

      {/* ------------------- Studio vs freelancer ------------------------- */}
      <StudioVsFreelancer />

      {/* ------------------------------ 02 Work ---------------------------- */}
      <section id="work" className="bg-dark py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          {/* Same max-w-6xl shell as the work grid below: header and cards
              now share an exact left edge at xl and up. */}
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <SectionHeading
                align="left"
                dark
                bold
                eyebrow="Selected work"
                title="See how we think before you decide who to trust."
                lede="These are concept builds — illustrative work that shows our process, decisions and craft. They are not client case studies."
              />
              <TextLink
                to="/portfolio"
                tone="dark"
                className="min-h-11 shrink-0 gap-1.5 text-sm font-semibold"
              >
                View portfolio
                <SpriteIcon
                  name="arrow-up-right"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                />
              </TextLink>
            </div>
          </div>

          <ul className="mt-12 mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <HomeProjectCard key={project.slug} project={project} />
            ))}
            <HomeProjectCard project={tabletHomeProject} className="hidden sm:block lg:hidden" />
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
            eyebrow="Built for quality"
            title="Careful, clear, and built to hold up."
            lede="We focus on the details that matter — secure foundations, maintainable code, clear timelines, and long-term value without unnecessary cost."
          />
          <ul className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5 xl:gap-6 xl:grid-cols-4">
            {[
              [
                "Secure by design",
                "Thoughtful security practices from day one — clear structure, safe forms, and a stable foundation you can rely on.",
              ],
              [
                "Easy to maintain",
                "Readable, maintainable code that keeps future changes simple and cost-effective.",
              ],
              [
                "Fast and findable",
                "Built for speed and discoverability, so people can find you and get where they need to go.",
              ],
              [
                "Clear timelines",
                "Priorities, handoff and support are agreed up front, so everyone knows what happens next.",
              ],
            ].map(([title, text]) => (
              <li key={title} className="h-full">
                <ProcessCard title={title} text={text} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* -------------------------- 04 Confidence -------------------------- */}
      <section className="border-t border-line bg-surface-subtle py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-6 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div className="flex h-full flex-col rounded-card bg-ink px-6 py-5 sm:px-8">
              <SectionHeading
                dark
                bold
                align="left"
                eyebrow="Built for confidence"
                title={
                  <span className="block text-balance">
                    A stronger digital foundation starts with clarity.
                  </span>
                }
                lede="From the first conversation to long after launch, we build digital experiences around your business goals."
              />
              <TextLink
                to="/about"
                tone="dark"
                className="mt-auto min-h-11 gap-2 text-sm font-semibold"
              >
                How we work
                <SpriteIcon
                  name="arrow-up-right"
                  className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                />
              </TextLink>
            </div>
            <ul className="grid h-full grid-cols-1 gap-4 lg:col-span-3 lg:grid-cols-3 lg:gap-6">
              {confidenceItems.map(({ title, text, meta, details, icon: Icon }) => (
                <li key={title} className="h-full">
                  <ConfidenceCard
                    title={title}
                    text={text}
                    meta={meta}
                    details={details}
                    Icon={Icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProofPanel />
      <FAQ />
      <CTABand />
    </>
  );
}
