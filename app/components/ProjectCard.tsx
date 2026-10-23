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
 *
 * Screenshots are shown with `object-contain` on a 16:9 cover: every capture is
 * 1376×768, so the whole UI stays visible instead of being cropped. Status and
 * category sit in the corners as translucent chips so the screenshot reads
 * through them.
 */
export function ProjectCard({ project }: { project: ClientProject }) {
  const isLive = project.status === "live";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-dark-line bg-dark-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-on-dark/30 hover:shadow-lg hover:shadow-black/20">
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

        <span className="absolute bottom-2 left-2 rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-on-dark backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl font-semibold text-on-dark">{project.title}</h2>
            {project.demoUrl && isLive ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/status inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-emerald-300 transition-colors duration-200 hover:border-emerald-300/60 hover:bg-emerald-400/20"
                aria-label={`Visit ${project.title} live demo`}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
                />
                Live
                <ArrowUpRight aria-hidden="true" className="size-3 opacity-70 transition-transform duration-200 group-hover/status:-translate-y-0.5 group-hover/status:translate-x-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-on-dark/10 bg-on-dark/5 px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-on-dark-muted">
                <span aria-hidden="true" className={`size-1.5 rounded-full ${isLive ? "bg-emerald-400/60" : "bg-primary/70"}`} />
                {isLive ? "Live" : "In build"}
              </span>
            )}
          </div>
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
            href={project.demoUrl}
            external
            className="w-full justify-center sm:w-auto bg-emerald-400 text-ink shadow-sm transition-colors duration-200 hover:bg-emerald-300"
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
