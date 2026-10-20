import { ArrowUpRight } from "lucide-react";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { projects } from "~/data/projects";

export function meta() {
  return [
    { title: "Portfolio | Creaova Digital Solutions" },
    { name: "description", content: "Explore Creaova's concept work and the standards behind every build — secure, fast, search-friendly, and supported after launch." },
  ];
}

export default function Portfolio() {
  return (
    <>
      <section className="bg-dark py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Badge dark>Selected concepts</Badge>
            <h1 className="mt-6 text-display font-semibold text-on-dark">
              Ideas with enough detail to feel real.
            </h1>
            <p className="mt-6 max-w-xl text-lede text-on-dark-muted">
              Explore concept directions showing how strategy, interface design, and
              engineering come together — held to the same standards we bring to
              client work: secure, fast, accessible, and built to last. Every
              project here is clearly labelled as concept work.
            </p>
          </div>

          {/* id="work" + data-stagger: this grid's children are <article>, so it
              is animated by the `#work > *` rule in globals.css, not `#work a`. */}
          <div id="work" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-card border border-dark-line bg-dark-surface p-6 transition-[border-color,transform] duration-500 ease-in-out hover:-translate-y-1 hover:border-on-dark/30"
              >
                <div
                  className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-lg p-5"
                  style={{ backgroundColor: project.accent }}
                >
                  {/* Old treatment: mix-blend-multiply + opacity-70 over the accent
                      tint — measured muddy on photos (plan M5). Light opacity tint only. */}
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
                  <div className="relative flex items-start justify-between">
                    <span className="rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink">
                      Concept
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-on-dark" />
                  </div>
                  {/* Year chip mirrors the "Concept" pill: the underlying
                      gradient (from-black/35) measured ~1.3:1 for paper text
                      over the light pastel accents, so a solid ink chip gives
                      it a guaranteed AA backing. */}
                  <span className="relative self-start rounded-full bg-on-dark/90 px-3 py-1 font-mono text-meta uppercase tracking-wider text-ink">
                    {project.year}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-on-dark">{project.title}</h2>
                    <p className="mt-1 text-sm text-on-dark-muted">{project.category}</p>
                  </div>
                  <span className="font-mono text-meta uppercase tracking-wider text-on-dark-muted">
                    {project.type === "Web project" ? "Web" : "App"}
                  </span>
                </div>
                {/* min-h keeps every description to a 3-line box: at 2- and
                    3-column widths a longer description otherwise made one card
                    in a row taller than the others. */}
                <p className="mt-3 flex min-h-[4.5rem] items-start text-sm leading-6 text-on-dark-muted">
                  {project.description}
                </p>
                <div className="mt-5 flex min-h-[3.5rem] flex-wrap content-start gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-dark-line bg-on-dark/5 px-2.5 py-1 text-xs font-medium text-on-dark-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/contact">Discuss a product direction</Button>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
