import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { primaryCta } from "~/data/constants";

/**
 * Closing band — one ink panel shared by the whole message, separated by a
 * hairline edge so it reads as its own beat rather than a continuation of the
 * section above. The action lives here, moved out of the footer, so the closing
 * statement carries the enquiry next to the copy. The label is intentionally
 * lower-commitment than "Start a project": the visitor is being asked for a
 * clear outline, not a signed contract.
 */
export function CTABand() {
  return (
    <section id="quote" className="border-t border-dark-line bg-dark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <p className="inline-flex items-center gap-2.5 font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          Start a conversation
        </p>
        <h2 className="mt-3 max-w-2xl text-h2 font-semibold text-on-dark">
          Get a clear plan before you commit to anything.
        </h2>
        <p className="mt-8 max-w-xl text-lede text-on-dark-muted">
          Tell us what you&apos;re trying to launch or fix. We&apos;ll come back with the questions
          that matter, a sensible scope, and an honest answer on fit.
        </p>
        <div className="mt-8">
          <Button to={primaryCta.to} variant="light" size="md">
            Get your project outline
          </Button>
        </div>
        <p className="mt-5 max-w-xl font-mono text-meta uppercase tracking-[0.12em] text-on-dark-muted">
          No obligation. One short form. A real reply, not a sales sequence.
        </p>
      </Container>
    </section>
  );
}
