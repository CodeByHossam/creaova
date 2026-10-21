import { ArrowUpRight, Code, Palette, Smartphone } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { SectionHeading } from "~/components/SectionHeading";
import { processSteps, services } from "~/data/services";

export function meta() {
  return [
    { title: "Services | Creaova Digital Solutions" },
    { name: "description", content: "Creaova's web design, development and mobile app services — secure, fast, search-friendly builds with a clear process and support after launch." },
  ];
}

const serviceIcons = [Palette, Code, Smartphone] as const;

const engagement = [
  ["We understand your requirements", "We start by listening — your business, your customers, and the outcome you need — so every decision stays grounded."],
  ["A partner, not a vendor", "Direct communication and clear priorities let you review and approve each step of the work with real confidence."],
  ["Support after launch", "We stay involved after go-live with genuine follow-up — fixes, guidance, and the next useful improvement for you."],
];

export default function Services() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      {/* Reduced bottom padding and constrained height so content below is closer */}
      <section className="bg-bg pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge>High-performance disciplines</Badge>
            <h1 className="text-display font-semibold text-ink text-4xl sm:text-5xl lg:text-6xl">
              Engineered for impact.
              <br />
              Built for the next stage.
            </h1>
            <p className="mx-auto max-w-2xl text-lede text-muted">
              Strategy, interface design and engineering in one place — digital
              foundations that are secure, fast, friendly to search engines, and
              supported after launch.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------------------------- 01 Services -------------------------- */}
      <section id="services" className="bg-bg pb-20 lg:pb-28">
        <Container>
          {/* Changed to a split layout: Title on left, description on right. Saves massive vertical space. */}
          <div className="flex flex-col gap-4 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-mono text-sm uppercase tracking-[0.18em] text-primary-text mb-2 block">
                01 — Services
              </span>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">What we build.</h2>
            </div>
            <p className="max-w-md text-sm text-muted leading-relaxed">
              We design and engineer digital products that are built to scale, perform flawlessly, and drive your business forward.
            </p>
          </div>

          {/* Reduced mt-12 to mt-8 so cards appear faster when scrolling */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition duration-200 ease-out hover:-translate-y-1 hover:border-ink"
                >
                  {/* Reduced image aspect ratio slightly to save vertical space (from 16/9 to 4/3 or similar, keeping 16/9 but with less card padding) */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover grayscale-[20%] transition-transform duration-200 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <span className="absolute bottom-4 left-5 grid size-12 place-items-center rounded-lg bg-ink text-on-dark transition duration-200 ease-out group-hover:bg-primary group-hover:text-on-primary">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                    </span>
                  </div>
                  
                  {/* Tightened inner card padding: changed p-6 to p-5 */}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
                      {service.number} / {service.title}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-ink">{service.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
                      {service.summary}
                    </p>
                    <p className="mt-2 flex min-h-[5.75rem] items-start text-sm leading-relaxed text-muted">
                      {service.details}
                    </p>
                    <div className="mt-auto border-t border-line pt-4">
                      <Link
                        to="/contact"
                        className="flex items-center justify-between text-sm font-semibold text-ink transition duration-200 ease-out group-hover:text-primary-text"
                      >
                        Discuss
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* -------------------------- 02 Engagement -------------------------- */}
      <section className="border-y border-line bg-surface-subtle py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            number="02"
            eyebrow="Working together"
            title="A partnership, one clear step at a time."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {engagement.map(([title, text], index) => (
              <article
                key={title}
                className="rounded-card border border-line bg-surface p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-ink"
              >
                <span className="font-mono text-xl font-medium text-primary-text">
                  0{index + 1}
                </span>
                <h3 className="mt-4 flex min-h-[3.25rem] items-start text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------- 03 Process --------------------------- */}
      <section id="process" className="bg-bg py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            number="03"
            eyebrow="How we execute"
            title="Our four-step process."
            lede="From first conversation, through launch, to the follow-up that comes after — a predictable path you can follow step by step."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([number, title, text], index) => (
              <article
                key={number}
                className="flex min-h-56 flex-col rounded-card border border-line bg-surface p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-ink"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xl font-medium text-primary-text">
                    {number}
                  </span>
                  <span className="rounded-md border border-line bg-surface-subtle px-2.5 py-1 font-mono text-meta uppercase tracking-wider text-ink">
                    {index === 0 ? "Discover" : index === 1 ? "Shape" : index === 2 ? "Build" : "Support"}
                  </span>
                </div>
                <h3 className="mt-4 flex min-h-[3.25rem] items-start text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}