import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProcessCard } from "~/components/ProcessCard";
import { SectionHeading } from "~/components/SectionHeading";
import { TextLink } from "~/components/TextLink";
import { absoluteUrl, primaryCta } from "~/data/constants";
import { projects } from "~/data/projects";

export function meta() {
  return [
    { title: "About | Creaova Digital Solutions" },
    { name: "description", content: "Meet Creaova, an established UAE digital studio pairing strategy, design and engineering with a clear process and support after launch." },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/about") },
  ];
}

const principles = [
  ["Clarity over noise.", "A beautiful interface is useful when people understand what to do next, without having to think about it at all."],
  ["Quality over shortcuts.", "Professional, well-structured code keeps the work secure, fast, and maintainable long after launch."],
  ["Partnership over theatre.", "We stay close after go-live, supporting the work and planning the next useful step with you as the business grows."],
] as const;

const workingModel = [
  ["Listen first", "We ask the questions that clarify the business, the audience, and the outcome you need before any work begins."],
  ["Make decisions visible", "You see the work take shape step by step, with clear priorities and a direction you can review and approve."],
  ["Stay with you after launch", "Follow-up does not end at go-live: we remain the team you can call for support and the next improvement."],
] as const;

export default function About() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="bg-bg py-10 sm:py-12 lg:py-14 xl:py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Badge>About Creaova</Badge>
            <h1 className="mt-5 sm:mt-6 text-display font-semibold text-ink">
              We build digital experiences that earn trust and make ambitious
              businesses easier to choose.
            </h1>
            <p className="mt-3 sm:mt-4 font-mono text-sm tracking-[0.12em] text-muted">
              Strategy, interface design and engineering.
            </p>
            <p className="mx-auto mt-5 sm:mt-6 max-w-[var(--measure)] text-lede text-muted">
              Creaova Digital Solutions{" "}
              <span className="font-mono tracking-[0.18em] text-primary-text">[CDS]</span>{" "}
              is an established digital studio in the UAE. We pair strategy,
              interface design and engineering to deliver secure, high-performing
              products, and stay with you as a partner after launch.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <Button to={primaryCta.to} variant="primary" size="lg">
                Discuss a project
              </Button>
              <TextLink
                to="/portfolio#projects"
                className="min-h-11 text-sm font-semibold underline-offset-4 hover:underline"
              >
                See concept work
              </TextLink>
            </div>

            <figure className="mx-auto mt-10 w-full max-w-3xl sm:mt-12 lg:mt-14">
              <div className="relative aspect-video overflow-hidden rounded-hero border border-line bg-surface">
                <img
                  src={projects[0].image}
                  alt={`Preview of the ${projects[0].title} concept interface`}
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover object-top"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-subtle px-2.5 py-1 font-mono text-meta font-medium uppercase leading-none tracking-[0.12em] text-primary-text">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                  Concept
                </span>
              </div>
              <figcaption className="mt-3 font-mono text-meta uppercase tracking-[0.12em] text-muted">
                {projects[0].title} · Concept build
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* --------------------------- 01 Principles ------------------------- */}
      <section className="border-t border-line bg-bg py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          {/* The three sections share one two-column spine: heading left,
              content right. The lede gives the left rail its own weight so it
              does not read as a label floating beside a taller list. */}
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div>
              <SectionHeading
                bold
                align="left"
                eyebrow="What guides us"
                title="A focused studio for meaningful digital work."
              />
              {/* A serif statement carries the left rail's weight; the small
                  mono lede was too slight against three titled body rows. */}
              <div className="mt-6 sm:mt-8">
                <p className="font-display text-2xl leading-snug text-ink">
                  Three commitments shape the work, from first conversation to
                  support after launch.
                </p>
                <p className="mt-4 max-w-[var(--measure)] text-sm leading-relaxed text-muted">
                  They keep decisions clear, the build resilient, and the
                  handover calm.
                </p>
              </div>
              {/* Keep the index with the intro. Bottom-aligning it left a
                  large empty pocket once the hairlines were removed. */}
              <p className="mt-6 font-mono text-meta uppercase tracking-[0.18em] text-muted">
                Clarity · Quality · Partnership
              </p>
            </div>
            <div className="border-t border-line">
              {principles.map(([title, text]) => (
                <article
                  key={title}
                  className="grid gap-2 border-b border-line py-4 sm:py-5"
                >
                  <div>
                    <h3 className="font-sans text-h3 font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[var(--measure)] text-sm leading-relaxed text-muted">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------- 02 Working model ----------------------- */}
      <section className="bg-bg py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <Container>
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <SectionHeading
              bold
              align="left"
              eyebrow="Our working model"
              title="Small enough to stay close. Structured enough to move."
            />
            <p className="max-w-[var(--measure)] text-lede text-muted lg:pb-1">
              A clear sequence, with decisions you can see and approve at every
              step.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 md:mt-12 lg:grid-cols-3 lg:gap-5">
            {workingModel.map(([title, text]) => (
              <ProcessCard key={title} title={title} text={text} />
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------- 03 Point of view ---------------------- */}
      <section className="border-t border-line bg-surface-subtle py-14 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <Container>
          {/* The inset ink panel is this band's figure: one clear destination
              for the eye. Stretching it to the prose column's height closes the
              bottom-right gap that a short, top-aligned quote left behind. */}
          <div className="grid grid-cols-1 items-stretch gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div>
              <SectionHeading
                align="left"
                bold
                eyebrow="Our point of view"
                title="No inflated claims. Just careful making and clear next steps."
              />
              <div className="mt-8 space-y-6 text-lede text-muted sm:mt-10">
                <p className="max-w-[var(--measure)]">
                  We keep the process direct, the collaboration thoughtful, and the
                  output honest. Your satisfaction with the result is the measure
                  that matters.
                </p>
                <p className="max-w-[var(--measure)]">
                  From the first conversation to delivery, we work as a partner:
                  understanding your requirements step by step, making the decisions
                  visible, and delivering secure, search-friendly work that is ready
                  to grow.
                </p>
              </div>
            </div>

            <figure className="flex h-full flex-col justify-center rounded-panel border border-dark-line bg-ink p-7 sm:p-9 lg:p-10">
              <p className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary">
                In short
              </p>
              <span
                aria-hidden="true"
                className="mt-3 select-none font-display text-6xl leading-none text-dark-line"
              >
                “
              </span>
              <blockquote className="mt-2 font-display text-h2 font-medium leading-snug text-on-dark">
                Every decision should make the experience more coherent for the
                people using it.
              </blockquote>
              <figcaption className="mt-8 border-t border-dark-line pt-5 font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Our point of view — Creaova
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
