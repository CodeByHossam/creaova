import { Link } from "react-router";

import { DeveloperSignature } from "~/components/DeveloperSignature";
import type { Project } from "~/data/projects";

export function HomeProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/portfolio"
      className="group flex h-full flex-col rounded-card border border-dark-line bg-dark-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 hover:shadow-lg hover:shadow-black/20"
    >
      <div
        className="relative aspect-video overflow-hidden rounded-lg"
        style={{ backgroundColor: project.accent }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-contain transition-[filter] duration-500 ease-out group-hover:brightness-105"
          />
        ) : null}
        <span className="absolute bottom-2 left-2 rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-on-dark backdrop-blur-md">
          Selected build
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-on-dark">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-dark-muted">
        {project.description}
      </p>
      <DeveloperSignature compact className="mt-auto pt-6" />
    </Link>
  );
}