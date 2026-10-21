import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProjectCard } from "~/components/ProjectCard";
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
      <section className="bg-dark py-16 sm:py-20 lg:py-28">
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
          <div id="work" className="mt-14 mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
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
