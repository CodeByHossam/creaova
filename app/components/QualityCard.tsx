export function QualityCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-sm md:p-6">
      <span className="font-mono text-base font-medium text-primary-text">{number}</span>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}