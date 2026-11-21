import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";

const commitments = [
  {
    title: "Written scope first",
    text: "You approve scope, deliverables and fees in a signed proposal before work begins.",
  },
  {
    title: "Direct contact",
    text: "You speak with the people doing the work, not an account layer.",
  },
  {
    title: "Business hours",
    text: "Sun–Thu, 9am–6pm GST. Direct line and WhatsApp.",
  },
] as const;

export function ProofPanel() {
  return (
    <section className="border-t border-line bg-bg py-12 sm:py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            bold
            align="left"
            eyebrow="Proof you can check"
            title="No borrowed proof. Just commitments we can show."
            lede="We do not publish invented testimonials or performance numbers. These are the parts of our process you can verify before you commit."
          />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {commitments.map(({ title, text }, index) => (
              <li key={title} className="rounded-card border border-line bg-surface p-5 sm:p-6">
                <p className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary-text">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-sans text-h3 font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
