export function ConfidenceCard({
  title,
  text,
  meta,
  Icon,
}: {
  title: string;
  text: string;
  meta: string;
  Icon: any;
}) {
  // "04.1 / Partnership" -> two fixed lines, so every card's header breaks
  // identically regardless of how much room the row has.
  const [number, label] = meta.split(" / ");

  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-line bg-surface p-5">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink">
            <Icon
              aria-hidden="true"
              className="size-[18px] text-on-dark"
              strokeWidth={1.8}
            />
          </span>
          <span className="min-w-0 font-mono text-meta uppercase leading-tight tracking-[0.12em] text-muted">
            <span className="block tabular-nums">{number} /</span>
            <span className="block">{label}</span>
          </span>
        </div>
        <h3 className="mt-6 font-sans text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      </div>
      <div aria-hidden="true" className="pt-6">
        <span className="block h-px w-10 bg-primary" />
      </div>
    </article>
  );
}