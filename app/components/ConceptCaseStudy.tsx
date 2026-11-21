import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";

const conceptStudies = [
  {
    title: "Book Store API",
    brief:
      "A bookstore needed the basics handled cleanly: accounts, catalogue, orders and image uploads.",
    decision: "Build an API-first foundation with role-based access and recoverable accounts.",
    build: "CRUD endpoints, JWT authentication, uploads and a documented demo.",
    changed: "The concept has a clear, testable backend another product could build on.",
  },
  {
    title: "Dental Clinic",
    brief: "A clinic needed appointments, records, billing and inventory in one place.",
    decision: "Model the workflow around roles so each team member sees only what they need.",
    build: "A full-stack app with dashboards, patient records and billing.",
    changed: "The concept shows one place for the clinic day to run.",
  },
  {
    title: "Mentora Learning",
    brief: "A learning platform needed courses, live sessions and payments to work together.",
    decision: "Separate course delivery, live sessions and payouts into clear roles.",
    build: "Role-based dashboards, Stripe and PayPal payments, and instructor payouts.",
    changed: "The concept connects teaching, payment and administration in one flow.",
  },
] as const;

const steps = [
  ["Brief", "brief"],
  ["Decision", "decision"],
  ["Build", "build"],
  ["What changed in the product", "changed"],
] as const;

export function ConceptCaseStudy() {
  return (
    <section className="border-t border-line bg-bg py-12 sm:py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            bold
            align="left"
            eyebrow="How we think"
            title="Brief → Decision → Build → What changed."
            lede="These are illustrative concept walkthroughs, not client case studies and not performance claims. They show the shape of our decisions."
          />
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {conceptStudies.map((study) => (
              <article
                key={study.title}
                className="rounded-card border border-line bg-surface p-5 sm:p-6"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{study.title}</h3>
                <dl className="mt-5 space-y-4">
                  {steps.map(([label, key]) => (
                    <div key={key}>
                      <dt className="font-mono text-meta uppercase tracking-[0.14em] text-primary-text">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted">{study[key]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
