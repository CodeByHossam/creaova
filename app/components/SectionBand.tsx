import type { ReactNode } from "react";

import { Container } from "~/components/Container";

/**
 * The ink chapter band that opens a Home section.
 *
 * Mockup 01 is one orange hue family: 60% #FFF8F2 canvas, 30% #241000 ink,
 * 10% #FD6E00 accent. A compact full-width ink band at the top of a section
 * supplies the ~30% dark block and makes the light → dark → light boundary
 * legible without a hairline. The lede and cards stay on the light ground
 * beneath, supplying the 60% canvas — keeping the ratio inside the section.
 *
 * The band and the content below it both use Container, so a section title's
 * left edge lines up exactly with the first card in that section.
 */
export function SectionBand({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Optional right-aligned action, e.g. "View portfolio" on the work band. */
  action?: ReactNode;
}) {
  return (
    <div className="bg-dark">
      <Container className="py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="w-full max-w-2xl">
            {eyebrow ? (
              <p className="inline-flex flex-wrap items-center gap-2 font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark-muted">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-primary" />
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 text-h2 font-medium text-on-dark">{title}</h2>
          </div>
          {action ? <div className="shrink-0 pb-1">{action}</div> : null}
        </div>
      </Container>
    </div>
  );
}
