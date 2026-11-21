import type { LucideIcon } from "lucide-react";

export function ConfidenceCard({
  title,
  text,
  meta,
  details,
  Icon,
}: {
  title: string;
  text: string;
  meta: string;
  /** Two short, factual benefits shown on every breakpoint. */
  details: readonly string[];
  Icon: LucideIcon;
}) {
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-5 lg:p-6 xl:p-8">
      <div className="flex items-center gap-3 lg:gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink lg:size-11">
          <Icon aria-hidden="true" className="size-5 text-on-dark" strokeWidth={1.8} />
        </span>
        <span className="min-w-0 font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.16em] text-muted">
          {meta}
        </span>
      </div>

      <h3 className="mt-6 font-sans text-h3 font-semibold leading-tight text-ink lg:mt-7 lg:min-h-[4.75rem]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted lg:mt-4">{text}</p>

      {/* The spare height on desktop is absorbed here, so the two points keep
          a shared baseline just above the divider across all three cards. */}
      <ul className="mt-6 flex flex-1 flex-col justify-end gap-2 border-t border-line pt-5 lg:mt-7 xl:mt-8">
        {details.map((detail) => (
          <li key={detail} className="flex items-start gap-2.5 text-sm leading-snug text-ink/80">
            <span
              aria-hidden="true"
              className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="pt-6 lg:pt-7">
        <span className="block h-px w-10 bg-primary" />
      </div>
    </article>
  );
}
