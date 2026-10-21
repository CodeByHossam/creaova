import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";

const reviewPlaceholders = [
  [
    "Clear from the first conversation.",
    "Illustrative review content reserved for verified client feedback.",
  ],
  [
    "Thoughtful work, delivered without the theatre.",
    "Illustrative review content reserved for verified client feedback.",
  ],
  [
    "A digital foundation the team can keep building on.",
    "Illustrative review content reserved for verified client feedback.",
  ],
] as const;

/**
 * Home testimonial band — honest placeholders only (plan C2): no invented
 * names, companies, photos, or star ratings. The old five-star row implied a
 * verified 5/5 score that does not exist, so it was removed; the editorial
 * quote mark carries the decoration instead. Tokens only: the old orange
 * (#F97316) on white sat at 2.8:1 (plan C1) — accent text is now
 * `text-primary-text` (5.2:1).
 */
export function ReviewsBand() {
  return (
    <section id="testimonials" className="border-t border-line bg-bg py-20 lg:py-28 lg:-scroll-mt-10">
      <Container>
        <SectionHeading
          eyebrow="Client perspective"
          title="Good work should make the next step clearer."
          lede="Verified client reviews will be published here as approved. For now, this section preserves the reference experience without presenting invented endorsements as real."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {reviewPlaceholders.map(([quote, note]) => (
            <article
              key={quote}
              className="flex flex-col rounded-card border border-line bg-surface p-8"
            >
              <span
                aria-hidden="true"
                className="block font-display text-4xl leading-none text-primary-text"
              >
                “
              </span>
              {/* min-h keeps the quote to a 2-line box at every width: the
                  quotes wrap differently on mobile, which otherwise left the
                  first card 29px shorter than its siblings. */}
              <p className="mt-4 flex min-h-[3.5rem] items-start text-lg font-medium leading-relaxed text-ink">
                {quote}
              </p>
              <p className="mt-auto border-t border-line pt-4 text-meta leading-relaxed text-muted">
                {note}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
