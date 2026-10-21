import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { SectionHeading } from "~/components/SectionHeading";

export function meta() {
  return [
    { title: "About | Creaova Digital Solutions" },
    { name: "description", content: "Meet Creaova, an established UAE digital studio pairing strategy, design and engineering — with a clear process and support after launch." },
  ];
}

const principles = [
  ["01", "Clarity over noise.", "A beautiful interface is useful when people understand what to do next, without having to think about it at all."],
  ["02", "Quality over shortcuts.", "Professional, well-structured code keeps the work secure, fast, and maintainable long after launch."],
  ["03", "Partnership over theatre.", "We stay close after go-live — following up, supporting the work, and planning the next useful step together with you as the business grows."],
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
      <section className="bg-bg py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Badge>About Creaova</Badge>
            <h1 className="text-display font-semibold text-ink">
              We build digital experiences that earn trust — and make ambitious
              businesses easier to choose.
            </h1>
            <p className="mx-auto max-w-2xl text-lede text-muted">
              Creaova Digital Solutions{" "}
              <span className="font-mono tracking-[0.18em] text-primary-text">[CDS]</span>{" "}
              is an established digital studio in the
              UAE, where creativity meets innovation — pairing strategy, interface
              design, and engineering to deliver secure, high-performing products,
              and staying with you as a partner long after launch.
            </p>
          </div>
        </Container>
      </section>

      {/* --------------------------- 01 Principles ------------------------- */}
      <section className="border-y border-line bg-surface-subtle py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SectionHeading
              align="left"
              number="01"
              eyebrow="What guides us"
              title="A focused studio for meaningful digital work."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map(([number, title, text]) => (
                <article
                  key={number}
                  className="rounded-card border border-line bg-surface p-6 transition-[border-color,transform] duration-500 ease-in-out hover:-translate-y-1 hover:border-ink"
                >
                  <span className="font-mono text-xl font-medium text-primary-text">
                    {number}
                  </span>
                  <h3 className="mt-6 flex min-h-[3.25rem] items-start text-xl font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-4 flex min-h-[5.5rem] items-start text-sm leading-relaxed text-muted">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------- 02 Working model ----------------------- */}
      <section className="bg-bg py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            number="02"
            eyebrow="Our working model"
            title="Small enough to stay close. Structured enough to move."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {workingModel.map(([title, text], index) => (
              <article
                key={title}
                className="rounded-card border border-line bg-surface p-7 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-ink"
              >
                <span className="font-mono text-xl font-medium text-primary-text">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------- 03 Point of view ---------------------- */}
      <section className="bg-dark py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              align="left"
              dark
              number="03"
              eyebrow="Our point of view"
              title="No inflated claims. Just careful making and clear next steps."
            />
            <div className="space-y-6 text-base leading-relaxed text-on-dark-muted">
              <p>
                We keep the process direct, the collaboration thoughtful, and the
                output honest. Every decision should make the experience more coherent
                for the people using it — and your satisfaction with the result is
                the measure that matters.
              </p>
              <p>
                From the first conversation to long after launch, we work as a
                partner: understanding your requirements step by step, delivering
                secure and search-friendly work, and following up so it keeps
                performing as your business grows.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
