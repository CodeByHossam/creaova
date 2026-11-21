import { Container } from "~/components/Container";

const goodFit = [
  "Established businesses replacing an underperforming site.",
  "Teams that want one accountable studio, not three separate contacts.",
  "Products that still need a partner after launch.",
] as const;

const notAFit = [
  "One-page brochures where the direction is already fixed.",
  "Same-day turnarounds.",
  "Projects where the lowest price is the only priority.",
] as const;

export function FitPanel() {
  return (
    <section className="border-t border-line bg-surface-subtle py-12 sm:py-16 md:py-20">
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-display text-h2 font-semibold text-ink">A good fit</h2>
            <ul className="mt-6 space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-h2 font-semibold text-ink">Not a fit</h2>
            <ul className="mt-6 space-y-4">
              {notAFit.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-muted"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
