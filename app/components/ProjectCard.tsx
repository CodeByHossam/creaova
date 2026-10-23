import { ArrowUpRight } from "lucide-react";

import { Button } from "~/components/Button";
import { DeveloperSignature } from "~/components/DeveloperSignature";
import type { ClientProject } from "~/data/clientProjects";

/**
 * A live-build card on /portfolio.
 *
 * Every card renders either a real Live Demo action (when `demoUrl` is set) or
 * a disabled "Live demo soon" state (when it is `null`) — never a dead link.
 * The cover falls back to a typographic monogram until a screenshot is added,
 * so the grid stays consistent while projects are being documented.
 */
export function ProjectCard({ project }: { project: ClientProject }) {
  const isLive = project.status === "live";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-dark-line bg-dark-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 hover:shadow-lg hover:shadow-black/20">
      <div
        className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-lg p-5"
        style={{ backgroundColor: project.accent }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <>
            {/* Typographic cover: dotted paper + oversized monogram. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgb(22 19 15 / 16%) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute -right-4 -bottom-10 font-display text-[10rem] font-semibold leading-none tracking-tighter text-ink/10 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              {project.initials}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15"
            />
          </>
        )}

        <div className="relative flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink transition-colors duration-300 ease-out group-hover:bg-on-dark">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                isLive ? "bg-success" : "bg-primary"
              }`}
            />
            {isLive ? "Live" : "In build"}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-ink/70 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <span className="relative self-start rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink transition-colors duration-300 ease-out group-hover:bg-on-dark">
          {project.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-on-dark">{project.title}</h2>
          <p className="mt-1 font-mono text-meta uppercase tracking-wider text-on-dark-muted">
            {project.kind} · {project.year}
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
            className="rounded-md border border-dark-line bg-on-dark/5 px-2.5 py-1 text-xs font-medium text-on-dark-muted transition-colors duration-300 ease-out group-hover:border-on-dark/20 group-hover:bg-on-dark/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {project.demoUrl ? (
          <Button
            variant="light"
            href={project.demoUrl}
            external
            className="w-full sm:w-auto"
          >
            {project.demoLabel}
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        ) : (
          <div>
            <Button variant="light" disabled className="w-full sm:w-auto">
              Live demo soon
            </Button>
            {project.apiUrl ? (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-on-dark-muted">
                API is live —{" "}
                <a
                  href={project.apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-on-dark"
                >
                  view endpoint
                </a>
              </p>
            ) : null}
          </div>
        )}

        <DeveloperSignature compact className="mt-5" />
      </div>
    </article>
  );
}
