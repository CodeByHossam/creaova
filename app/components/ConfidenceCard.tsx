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
    <article className="group rounded-card border border-line bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-ink text-on-dark transition-all duration-300 ease-out group-hover:bg-primary group-hover:text-on-primary">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
        <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">{meta}</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      <div aria-hidden="true" className="mt-6 h-px w-10 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
    </article>
  );
}
