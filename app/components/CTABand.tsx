import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { primaryCta } from "~/data/constants";

/**
 * The one conversion band above the footer (plan H7 + the approved
 * "slim single-CTA band" decision).
 *
 * It used to carry a second email/scope form that duplicated Contact's page —
 * plus #111111/#F97316 raw hex, shadow-2xl, and an 11px trust strip of
 * promises we cannot verify. Now it is chip + heading + one link to the real
 * form, entirely on tokens.
 */
export function CTABand() {
  return (
    <section id="quote" className="border-t border-line bg-bg py-20 lg:py-28">
      <Container className="max-w-5xl">
        <div className="rounded-card border border-dark-line bg-dark px-8 py-12 text-center sm:px-14 sm:py-14">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex justify-center">
              <Badge dark>Start a conversation</Badge>
            </div>
            <h2 className="text-h2 font-semibold text-on-dark">
              Let’s build something you can rely on.
            </h2>
            <p className="text-base leading-relaxed text-on-dark-muted">
              Tell us what you are looking to launch — one short form, a direct
              reply, and clear next steps.
            </p>
            <div className="pt-2">
              <Button to={primaryCta.to} variant="light" size="lg">
                {primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
