import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function DisciplineCard({
  Icon,
  label,
  title,
  text,
  tag,
  to = "/services",
  actionLabel = "Explore",
}: {
  Icon: any;
  label: string;
  title: string;
  text: string;
  tag: string;
  to?: string;
  actionLabel?: string;
}) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-card border border-line bg-surface p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink text-on-dark">
        <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
      </span>

      <span className="mt-4 block font-mono text-meta uppercase tracking-[0.12em] text-primary-text">
        {label}
      </span>

      <h3 className="mt-2 font-sans text-h3 font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>

      <div className="mt-auto pt-5">
        <span className="inline-block max-w-full rounded-md border border-line bg-surface-subtle px-2 py-1 font-mono text-meta text-ink">
          {tag}
        </span>

        <Link
          to={to}
          className="group/link mt-4 flex min-h-11 items-center justify-between border-t border-line pt-3 text-sm font-semibold text-ink transition-all duration-200 ease-out hover:text-primary-text focus-visible:text-primary-text active:translate-y-px"
        >
          {actionLabel}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-focus/link:-translate-y-0.5 group-focus/link:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}