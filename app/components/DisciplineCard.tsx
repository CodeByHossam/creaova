import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function DisciplineCard({
  Icon,
  label,
  title,
  text,
  tag,
  to = "/services",
}: {
  Icon: any;
  label: string;
  title: string;
  text: string;
  tag: string;
  to?: string;
}) {
  return (
    <article className="group flex flex-col rounded-card border border-line bg-surface p-7 transition duration-200 ease-out hover:-translate-y-1 hover:border-ink">
      <span className="grid size-12 place-items-center rounded-lg bg-ink text-on-dark transition duration-200 ease-out group-hover:bg-primary group-hover:text-on-primary">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </span>
      <span className="mt-6 block font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
        {label}
      </span>
      <h3 className="mt-2.5 flex min-h-[3.25rem] items-start text-xl font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-3 flex min-h-[3.75rem] items-start text-sm leading-relaxed text-muted">
        {text}
      </p>
      <div className="mt-auto pt-7">
        <span className="inline-block rounded-md border border-line bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-ink">
          {tag}
        </span>
        <Link
          to={to}
          className="mt-4 flex items-center justify-between border-t border-line pt-5 text-sm font-semibold text-ink transition duration-200 ease-out group-hover:text-primary-text"
        >
          Explore
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
