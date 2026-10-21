import { Code, Palette, Smartphone } from "lucide-react";

import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProcessCard } from "~/components/ProcessCard";
import { SectionHeading } from "~/components/SectionHeading";
import { ServiceCard } from "~/components/ServiceCard";
import { processSteps, services } from "~/data/services";
import { absoluteUrl } from "~/data/constants";

/* -------------------------------------------------------------------------- */
/*                                    META                                    */
/* -------------------------------------------------------------------------- */
export function meta() {
  return [
    { title: "Services | Creaova Digital Solutions" },
    {
      name: "description",
      content:
        "Creaova's web design, development and mobile app services — secure, fast, search-friendly builds with a clear process and support after launch.",
    },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/services") },
  ];
}

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

// Icons mapped by index to `services` — order must match the data array.
const serviceIcons = [Palette, Code, Smartphone] as const;

// "How we work together" content for the Engagement section.
const engagement = [
  [
    "We understand your requirements",
    "We start by listening — your business, your customers, and the outcome you need — so every decision stays grounded.",
  ],
  [
    "A partner, not a vendor",
    "Direct communication and clear priorities let you review and approve each step of the work with real confidence.",
  ],
  [
    "Support after launch",
    "We stay involved after go-live with genuine follow-up — fixes, guidance, and the next useful improvement for you.",
  ],
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
export default function Services() {
  return (
    <>
      {/* ==================================================================== */}
      {/* HERO                                                                 */}
      {/* ==================================================================== */}
      {/* The ONLY place services are rendered — the old duplicate section was
          removed. Cards sit right under a smaller title so users see what
          you build on first paint, with no scroll required. */}
      <section
        id="services_hero"
        className="bg-bg pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14 lg:-scroll-mt-8 xl:-scroll-mt-10"
      >
        <Container>
          {/* Compact header — tighter vertical rhythm so cards come up fast. */}
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Badge>High-performance disciplines</Badge>

            {/* Title reduced a little more: switched from `text-display`
                to explicit sizes so it's clearly smaller but still the
                dominant heading. `leading-tight` keeps it from sprawling. */}
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Web. Product. Mobile.
            </h1>

            <p className="mx-auto max-w-2xl text-lede text-muted">
              Design and engineering under one roof — secure, fast,
              search-friendly builds, with real support after launch.
            </p>
          </div>

          {/* Services grid — the one and only rendering of ServiceCard.
              The `id="services"` lives here so #services links still work
              now that the separate section is gone.
              - Negative scroll margin pulls the anchor target up so the
                cards sit higher when navigated to.
              - `mt-8` keeps them close to the header; slight downscale on
                mobile/tablet, full size on lg. */}
          <div
            id="services"
            className="mx-auto mt-8 max-w-5xl scroll-mt-[-4rem] sm:mt-10"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  // `origin-top` anchors the scale so layout stays tight;
                  // scale resets on lg where the cards render full-size.
                  <div
                    key={service.id}
                    className="origin-top scale-95 lg:scale-100"
                  >
                    <ServiceCard service={service} Icon={Icon} />
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================== */}
      {/* 02 — ENGAGEMENT                                                      */}
      {/* ==================================================================== */}
      <section className="border-y border-line bg-surface-subtle py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            number="02"
            eyebrow="Working together"
            title="A partnership, one clear step at a time."
          />
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {engagement.map(([title, text], index) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-card border border-line bg-surface p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-ink"
              >
                <span className="font-mono text-xl font-medium text-primary-text">
                  0{index + 1}
                </span>
                <h3 className="mt-4 flex min-h-[3.25rem] items-start text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================== */}
      {/* 03 — PROCESS / OUR APPROACH                                          */}
      {/* ==================================================================== */}
      <section
        id="process"
        className="bg-bg py-16 sm:py-20 lg:py-24 lg:-scroll-mt-8 xl:-scroll-mt-12"
      >
        <Container>
          <SectionHeading
            number="03"
            eyebrow="Our approach"
            title="Our four-step process."
            lede="From first conversation, through launch, to the follow-up that comes after — a predictable path you can follow step by step."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {processSteps.map(([number, title, text]) => (
              <ProcessCard
                key={number}
                number={number}
                title={title}
                text={text}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================== */}
      {/* CTA                                                                  */}
      {/* ==================================================================== */}
      <CTABand />
    </>
  );
}
