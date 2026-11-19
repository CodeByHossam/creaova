import { Link } from "react-router";

import type { Project } from "~/data/projects";

export function HomeProjectCard({ project }: { project: Project }) {
  return (
    <li className="h-full">
      <article className="h-full">
        <Link
          to="/portfolio"
          className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-muted focus-visible:-translate-y-0.5 focus-visible:border-muted active:translate-y-px"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {project.image ? (
              <img
                src={project.image}
                alt={`Preview of the ${project.title} concept`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full rounded-lg object-cover transition-[filter] duration-500 ease-out group-hover:brightness-105 group-focus-within:brightness-105"
              />
            ) : null}
            <span className="absolute bottom-2 left-2 rounded-md border border-line bg-surface-subtle px-2.5 py-1 font-mono text-meta font-medium uppercase leading-none tracking-[0.12em] text-ink">
              {project.category}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="font-sans text-h3 font-medium text-ink">
              {project.title}
            </h3>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-center rounded-md border border-line bg-surface-subtle px-2 py-0.5 font-mono text-xs font-medium uppercase leading-none tracking-[0.12em] text-primary-text">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              Concept
            </span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-meta uppercase tracking-[0.12em] text-muted">
            <span>{project.type}</span>
            <span aria-hidden="true" className="tracking-normal text-muted/60">
              ·
            </span>
            <span>{project.year}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </Link>
      </article>
    </li>
  );
}