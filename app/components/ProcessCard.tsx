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
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5">
      <span className="font-mono text-meta font-medium uppercase tracking-[0.12em] text-primary-text">
        {number}
      </span>
      <h3 className="mt-3 flex min-h-[3.25rem] items-start font-sans text-h3 font-semibold leading-snug text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </article>
  );
}