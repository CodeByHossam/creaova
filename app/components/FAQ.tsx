import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";

const questions = [
  {
    question: "How long will it take?",
    answer:
      "It depends on scope. We agree timelines with you in the written proposal before any work begins.",
  },
  {
    question: "What will it cost?",
    answer:
      "Fees are set in the written proposal, not on this site. Tell us what you're building and we'll come back with a sensible scope.",
  },
  {
    question: "Do you work with our existing brand?",
    answer:
      "Yes. We can work from your current brand direction, or help refine it before the build if the direction is unclear.",
  },
  {
    question: "What if we need changes later?",
    answer:
      "Changes are scoped and agreed before work starts. We also stay available after launch for fixes and the next improvement.",
  },
  {
    question: "Who owns the code?",
    answer:
      "Ownership is set out in the signed agreement. We build with maintainable code and hand over what that agreement specifies.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send a short brief or book a call. If we're a fit, we'll send a written proposal with timeline, scope, and fixed pricing.",
  },
] as const;

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-line bg-bg py-12 sm:py-16 md:py-20 lg:scroll-mt-20"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            bold
            align="left"
            eyebrow="Common questions"
            title="The answers before you ask."
            lede="The questions founders usually ask before they share a brief."
          />
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {questions.map(({ question, answer }) => (
              <div key={question} className="rounded-card border border-line bg-white p-5 sm:p-6">
                <dt className="font-sans text-base font-semibold text-ink">{question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
