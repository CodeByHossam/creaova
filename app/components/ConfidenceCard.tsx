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
  return (
    <article className="rounded-card border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-ink text-on-dark">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
        <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">{meta}</span>
      </div>
      <h3 className="mt-6 text-lg font-medium text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      <div aria-hidden="true" className="mt-6 h-px w-10 bg-primary" />
    </article>
  );
}
