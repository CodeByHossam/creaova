import { ArrowUpRight } from "lucide-react";

import type { Project } from "~/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-card border border-dark-line bg-dark-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 hover:shadow-lg hover:shadow-black/20">
      <div
        className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-lg p-5"
        style={{ backgroundColor: project.accent }}
      >
        {/* Slowed down image zoom to 500ms for a smooth cinematic feel */}
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />

        <div className="relative flex items-start justify-between">
          <span className="rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink transition-colors duration-300 ease-out group-hover:bg-on-dark">
            Concept
          </span>
          {/* Added subtle movement to the top-right arrow on hover */}
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-on-dark transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <span className="relative self-start rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink transition-colors duration-300 ease-out group-hover:bg-on-dark">
          {project.year}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-on-dark">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-on-dark-muted">{project.category}</p>
        </div>
        <span className="font-mono text-meta uppercase tracking-wider text-on-dark-muted">
          {project.type === "Web project" ? "Web" : "App"}
        </span>
      </div>

      <p className="mt-3 flex min-h-[4.5rem] items-start text-sm leading-6 text-on-dark-muted">
        {project.description}
      </p>

      <div className="mt-5 flex min-h-[3.5rem] flex-wrap content-start gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-dark-line bg-on-dark/5 px-2.5 py-1 text-xs font-medium text-on-dark-muted transition-colors duration-300 ease-out group-hover:border-on-dark/20 group-hover:bg-on-dark/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
