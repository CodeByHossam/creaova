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
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
      <span className="font-mono text-xl font-medium text-primary-text">
        {number}
      </span>
      <h3 className="mt-4 flex min-h-[3.25rem] items-start font-sans text-xl font-medium leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}
