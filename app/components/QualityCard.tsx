export function QualityCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5 md:p-6">
      <span className="font-mono text-base font-medium text-primary-text">{number}</span>
      <h3 className="mt-3 text-base font-medium leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}