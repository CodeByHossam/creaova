import { Container } from "~/components/Container";

const reviewPlaceholders = [
  ["Clear from the first conversation.", "Illustrative review content reserved for verified client feedback."],
  ["Thoughtful work, delivered without the theatre.", "Illustrative review content reserved for verified client feedback."],
  ["A digital foundation the team can keep building on.", "Illustrative review content reserved for verified client feedback."],
] as const;

export function ReviewsBand() {
  return (
    <section id="testimonials" className="border-t border-neutral-200 bg-[#FAFAFA] py-20 lg:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">Client perspective</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">Good work should make the next step clearer.</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">Verified client reviews will be published here as approved. For now, this section preserves the reference experience without presenting invented endorsements as real.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {reviewPlaceholders.map(([quote, note]) => (
            <article key={quote} className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_10px_30px_-4px_rgb(0_0_0_/_4%),0_2px_6px_-1px_rgb(0_0_0_/_2%)]">
              <div className="flex gap-1 text-[#F97316]" aria-label="Review placeholder">★★★★★</div>
              <span className="mt-5 block text-4xl leading-none text-[#F97316]" aria-hidden="true">“</span>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-[#111111]">{quote}</p>
              <p className="mt-6 border-t border-neutral-100 pt-4 text-xs leading-relaxed text-neutral-500">{note}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
