import { Link } from "react-router";

import type { Project } from "~/data/projects";

export function HomeProjectCard({ project }: { project: Project }) {
  return (
    <li className="h-full">
      <article className="h-full">
        <Link
          to="/portfolio"
          className="group flex h-full flex-col rounded-card border border-dark-line bg-dark-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 focus-visible:-translate-y-1 focus-visible:border-on-dark/30"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full rounded-lg object-cover transition-[filter] duration-500 ease-out group-hover:brightness-105 group-focus-within:brightness-105"
              />
            ) : null}
            <span className="absolute bottom-2 left-2 rounded-full border border-on-dark/20 bg-ink/90 px-2.5 py-1 font-mono text-xs font-medium uppercase leading-none tracking-[0.12em] text-on-dark">
              Concept
            </span>
          </div>
          <h3 className="mt-5 text-xl font-medium text-on-dark">{project.title}</h3>
          <p className="mt-2 text-sm leading-6 text-on-dark-muted">
            {project.description}
          </p>
        </Link>
      </article>
    </li>
  );
}
