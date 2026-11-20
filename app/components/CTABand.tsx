import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { primaryCta } from "~/data/constants";

/**
 * Closing band — one ink panel shared by the whole message, separated by a
 * hairline edge so it reads as its own beat rather than a continuation of the
 * section above. The action lives here, moved out of the footer, so the closing
 * statement carries the enquiry next to the copy. It is the only
 * "Start a project" on About/Services/Portfolio; Home repeats that label in its
 * hero, while About's hero uses "Discuss a project" and a quiet concept link.
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
          Let’s build something reliable.
        </h2>
        <p className="mt-8 max-w-xl text-lede text-on-dark-muted">
          Tell us what you are looking to launch — one short form, a direct
          reply, and clear next steps.
        </p>
        <div className="mt-8">
          <Button to={primaryCta.to} variant="light" size="md">
            {primaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}