import { Button } from "~/components/Button";
import { SpriteIcon } from "~/components/SpriteIcon";
import type { ClientProject } from "~/data/clientProjects";
import { responsiveImageProps } from "~/utils/image";

/**
 * A concept-build card on /portfolio.
 *
 * Every card renders a "View concept demo" / "View concept API" action when a
 * public demo exists, or a disabled "Demo soon" state when it does not — never
 * a dead link. The cover falls back to a typographic monogram until a
 * screenshot is added, so the grid stays consistent while projects are being
 * documented. Every project is a concept, never shipped client work.
 *
 * Screenshots are 16:9 (1376x768) and fill the rounded cover edge to edge, so
 * there is no letterboxed panel or shadow behind them. Category sits in a
 * corner chip; the Concept badge sits beside the title.
 */
type CardHeadingTag = "h3" | "h4";

export function ProjectCard({
  project,
  headingTag = "h3",
}: {
  project: ClientProject;
  /** Grouped cards use h4 beneath their category's h3. */
  headingTag?: CardHeadingTag;
}) {
  const Heading = headingTag;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-dark-line bg-dark-surface p-5">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {project.image ? (
          <img
            {...responsiveImageProps(project.image)}
            alt={`Preview of the ${project.title} concept — ${project.category}`}
            className="absolute inset-0 size-full rounded-lg object-cover"
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
                  "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-ink) 16%, transparent) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute -right-4 -bottom-10 font-display text-[10rem] font-semibold leading-none tracking-tighter text-ink/10"
            >
              {project.initials}
            </span>
          </>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {/* Card titles sit under the page's h2, matching Home's work cards. */}
            <Heading className="font-sans text-h3 font-semibold leading-snug text-on-dark">
              {project.title}
            </Heading>
            <span className="inline-flex shrink-0 items-center gap-1 self-center rounded-md border border-dark-line bg-dark-surface px-1.5 py-0.5 font-mono text-[0.5rem] font-medium uppercase leading-none tracking-[0.12em] text-on-dark-muted">
              <span aria-hidden="true" className="size-1 rounded-full bg-primary" />
              Concept
            </span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-meta uppercase tracking-[0.12em] text-on-dark-muted">
            <span>{project.kind}</span>
            <span aria-hidden="true" className="tracking-normal text-on-dark/40">
              ·
            </span>
            <span>{project.year}</span>
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{project.description}</p>

      <div className="mt-auto pt-6">
        <Button
          href={project.demoUrl ?? undefined}
          external={Boolean(project.demoUrl)}
          variant="light"
          disabled={!project.demoUrl}
          className="w-full justify-center sm:w-auto"
        >
          {project.demoUrl ? project.demoLabel : "Demo soon"}
          {project.demoUrl ? (
            <>
              <SpriteIcon name="arrow-up-right" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          ) : null}
        </Button>
      </div>
    </article>
  );
}
