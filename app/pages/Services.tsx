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

// "How we work together" content for the Engagement section. The shape
// matches `processSteps` so both sections can share one card grammar.
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
] as const;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

/**
 * Two deliberate card grammars live on this page:
 *   1. `ServiceCard` — image-led offerings, each with one real link to Contact.
 *   2. `ProcessCard` — quiet notes, used by Engagement and Our approach.
 * Both share the Home card shell: `rounded-card border-line bg-surface p-5`,
 * mono 0.12em meta and the 20px / 600 title tier. Card-level hover is reserved
 * for the image cards' actual link; editorial cards stay static so nothing
 * looks clickable when it is not.
 */
export default function Services() {
  return (
    <>
      {/* ==================================================================== */}
      {/* HERO                                                                 */}
      {/* ==================================================================== */}
      <section
        id="all-services"
        className="scroll-mt-0 bg-bg py-10 sm:py-12 lg:py-12 xl:py-14"
      >
        <Container>
          {/* Compact header — the Home hero rhythm, so cards come up fast. */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge>High-performance disciplines</Badge>
            <h1 className="mt-5 sm:mt-6 text-display font-semibold text-ink">
              Web. Product. Mobile.
            </h1>
            <p className="mt-3 sm:mt-4 font-mono text-sm tracking-[0.12em] text-muted">
              Secure, fast, search-friendly builds, with real support after launch.
            </p>
            <p className="mx-auto mt-5 sm:mt-6 max-w-2xl text-lede text-muted">
              Design and engineering under one roof — secure, fast,
              search-friendly builds, with real support after launch.
            </p>
          </div>

          {/* Services grid — the one and only rendering of ServiceCard.
              The `id="services"` lives here so #services links still work now
              that the separate section is gone. `scroll-mt-0` cancels the global
              target margin so the container's `scroll-padding-top` alone lands
              the cards just under the sticky header — no negative offsets.
              `mt-8` keeps them close; `sm:mt-10` opens up on tablet. */}
          <div id="services" className="mx-auto mt-8 max-w-5xl scroll-mt-0 sm:mt-10">
            {/* Keeps the heading outline intact: the cards below are h3s, so the
                first service group needs its own h2 between the page h1 and them. */}
            <h2 className="sr-only">Web design, web development and mobile apps</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <ServiceCard key={service.id} service={service} Icon={Icon} />
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================== */}
      {/* 02 — ENGAGEMENT                                                      */}
      {/* ==================================================================== */}
      <section className="bg-surface-subtle">
        <div className="bg-ink">
          <Container className="py-8 sm:py-10 lg:py-12">
            <SectionHeading
              dark
              bold
              align="left"
              eyebrow="Working together"
              title="A partnership, one clear step at a time."
            />
          </Container>
        </div>
        <Container className="py-10 sm:py-12 lg:py-16">
          {/* Engagement notes reuse the ProcessCard grammar: the Home p-5 shell,
              the 20px / 600 editorial title tier and no whole-card hover. */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {engagement.map(([title, text]) => (
              <ProcessCard key={title} title={title} text={text} />
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================== */}
      {/* 03 — PROCESS / OUR APPROACH                                          */}
      {/* ==================================================================== */}
      <section
        id="process"
        className="scroll-mt-0 bg-bg py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <SectionHeading
            bold
            eyebrow="Our approach"
            title="Our four-step process."
            lede="From first conversation, through launch, to the follow-up that comes after — a predictable path you can follow step by step."
          />
          {/* Same editorial grammar as Engagement; the sequence is carried by
              the order of the steps, not by a different card treatment. */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {processSteps.map(([title, text]) => (
              <ProcessCard key={title} title={title} text={text} />
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
