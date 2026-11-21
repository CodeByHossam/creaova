import type { ReactNode } from "react";

import { Container } from "~/components/Container";
import { LEGAL_EFFECTIVE_DATE } from "~/data/legal";

export type LegalSection = { title: string; body: ReactNode | string[] };

function LegalBodyContent({ body }: { body: LegalSection["body"] }) {
  if (Array.isArray(body)) {
    return (
      <>
        {body.map((paragraph, index) => (
          <p key={`${index}-${String(paragraph).slice(0, 24)}`}>{paragraph}</p>
        ))}
      </>
    );
  }
  return <>{body}</>;
}

/**
 * Shared layout for Privacy and Terms: the same ink band, effective date and
 * dividing-rule rhythm, with only the copy supplied by the page.
 */
export function LegalPage({
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-ink">
        <Container className="py-10 sm:py-12 lg:py-14">
          <div className="max-w-3xl">
            <p className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark-muted">
              {eyebrow}
            </p>
            <h1 className="mt-5 sm:mt-6 text-display font-semibold text-on-dark">{title}</h1>
            <p className="mt-5 sm:mt-6 max-w-2xl text-lede text-on-dark-muted">{lede}</p>
            <p className="mt-3 text-sm text-on-dark-muted">Effective {LEGAL_EFFECTIVE_DATE}.</p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-line pt-7">
              <span aria-hidden="true" className="block size-1.5 rounded-full bg-primary" />
              <h2 className="mt-3 font-sans text-h3 font-semibold text-ink">{section.title}</h2>
              <div className="mt-2 text-sm leading-relaxed text-muted [&>p+p]:mt-3">
                <LegalBodyContent body={section.body} />
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
