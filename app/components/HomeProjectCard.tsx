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
        className="flex aspect-video items-end rounded-lg bg-cover bg-center p-4 overflow-hidden relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 35%), rgb(255 255 255 / 5%)), url(${project.image})`,
          backgroundColor: project.accent,
        }}
      >
        <span className="relative rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink">
          Concept project
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