import { ArrowUpRight } from "lucide-react";

import { Button } from "~/components/Button";
import type { ClientProject } from "~/data/clientProjects";

/**
 * A concept-build card on /portfolio.
 *
 * Every card renders a "View concept demo" / "View concept API" action when a
 * public demo exists, or a disabled "Demo soon" state when it does not — never
 * a dead link. The cover falls back to a typographic monogram until a
 * screenshot is added, so the grid stays consistent while projects are being
 * documented. Every project is a concept, never shipped client work.
 *
 * Screenshots are 16:9 (1376×768) and fill the rounded cover edge to edge, so
 * there is no letterboxed panel or shadow behind them. Category sits in a
 * corner chip; the Concept badge sits beside the title.
 */
export function ProjectCard({ project }: { project: ClientProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-dark-line bg-dark-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 focus-within:-translate-y-1 focus-within:border-on-dark/30">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full rounded-lg object-cover transition-[filter] duration-500 ease-out group-hover:brightness-105 group-focus-within:brightness-105"
          />
        ) : (
          <>
            {/* Typographic cover: dotted paper + oversized monogram. */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundColor: project.accent,
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgb(22 19 15 / 16%) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute -right-4 -bottom-10 font-display text-[10rem] font-semibold leading-none tracking-tighter text-ink/10 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-within:-translate-y-1 group-focus-within:translate-x-1"
            >
              {project.initials}
            </span>
          </>
        )}

        <span className="absolute bottom-2 left-2 rounded-full border border-on-dark/20 bg-ink/90 px-2.5 py-1 font-mono text-xs font-medium uppercase leading-none tracking-[0.12em] text-on-dark">
          {project.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h2 className="text-xl font-medium leading-tight text-on-dark">
              {project.title}
            </h2>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-center rounded-full border border-on-dark/15 bg-on-dark/5 px-2 py-0.5 font-mono text-xs font-medium uppercase leading-none tracking-[0.12em] text-on-dark-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary/70" />
              Concept
            </span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-meta uppercase tracking-wider text-on-dark-muted">
            <span>{project.kind}</span>
            <span aria-hidden="true" className="tracking-normal text-on-dark/40">
              ·
            </span>
            <span>{project.year}</span>
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-on-dark-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap content-start gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-dark-line bg-on-dark/5 px-2.5 py-1 text-xs font-medium text-on-dark transition-colors duration-300 ease-out group-hover:border-on-dark/20 group-hover:bg-on-dark/10 group-focus-within:border-on-dark/20 group-focus-within:bg-on-dark/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {project.demoUrl ? (
          <Button
            href={project.demoUrl}
            external
            variant="light"
            className="w-full justify-center sm:w-auto"
          >
            {project.demoLabel}
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        ) : (
          <div>
            <Button
              disabled
              className="w-full justify-center sm:w-auto border border-on-dark/10 bg-on-dark/5 text-on-dark-muted"
            >
              Demo soon
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
