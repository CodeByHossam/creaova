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
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink text-on-dark">
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </span>
        <span className="font-mono text-meta uppercase tracking-[0.12em] text-muted">{meta}</span>
      </div>
      <h3 className="mt-6 font-sans text-lg font-medium leading-snug text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      <div aria-hidden="true" className="mt-6 h-px w-10 bg-primary" />
    </article>
  );
}
