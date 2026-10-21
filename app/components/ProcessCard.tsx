export function ProcessCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="flex min-h-56 flex-col rounded-card border border-line bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-sm">
      <span className="font-mono text-meta text-muted">{number}</span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}
