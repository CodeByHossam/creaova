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
    <article className="group flex h-full min-w-0 flex-col rounded-card border border-line bg-surface p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-sm sm:p-5 lg:p-5 2xl:p-6">
      {/* Icon */}
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink text-on-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
        <Icon
          aria-hidden="true"
          className="size-[18px]"
          strokeWidth={1.8}
        />
      </span>

      {/* Label */}
      <span className="mt-4 block font-mono text-meta uppercase tracking-[0.12em] text-primary-text">
        {label}
      </span>

      {/* Title */}
      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink sm:text-xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {text}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-5">
        <span className="inline-block max-w-full rounded-md border border-line bg-surface-subtle px-2 py-1 text-xs font-semibold text-ink transition-colors duration-300 group-hover:border-ink/20 group-hover:bg-surface">
          {tag}
        </span>

        <Link
          to={to}
          className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-primary-text"
        >
          Explore

          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}