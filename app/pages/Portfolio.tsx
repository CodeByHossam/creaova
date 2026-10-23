import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProjectCard } from "~/components/ProjectCard";
import { clientProjects, liveProjectCount } from "~/data/clientProjects";
import { absoluteUrl } from "~/data/constants";

const pageTitle = "Portfolio | Live builds by Creaova Digital Solutions";
const pageDescription =
  "Explore live products, APIs, and websites engineered by Creaova Digital Solutions — from clinic operations and learning platforms to engineering tools and browser games.";

export function meta() {
  return [
    { title: pageTitle },
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: absoluteUrl("/portfolio") },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/portfolio") },
  ];
}

/**
 * The portfolio is now driven entirely by `app/data/clientProjects.ts`:
 * adding a project there produces a card, its status pill, its Live Demo
 * action, and its signed developer mark. Projects without a public URL show a
 * disabled "Live demo soon" control rather than a broken link.
 */
export default function Portfolio() {
  return (
    <>
      <section
        id="projects"
        className="bg-dark py-12 sm:py-16 lg:py-20 lg:-scroll-mt-12 xl:-scroll-mt-14"
      >
        <Container>
          <div className="max-w-2xl">
            <Badge dark>Selected builds</Badge>
            <h1 className="mt-6 text-display font-semibold text-on-dark">
              Work that ships — and keeps running.
            </h1>
            <p className="mt-6 max-w-xl text-lede text-on-dark-muted">
              A selection of products, APIs, and websites engineered by Creaova.
              Every card shows its real status; where a public demo exists, the
              card links straight to the running build.
            </p>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-dark-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Builds
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-on-dark">
                {clientProjects.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Live now
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-on-dark">
                {liveProjectCount}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="font-mono text-meta uppercase tracking-[0.18em] text-on-dark-muted">
                Disciplines
              </dt>
              <dd className="mt-1 text-sm font-semibold text-on-dark">
                Web apps · APIs · Games
              </dd>
            </div>
          </dl>

          <div
            id="work"
            className="mt-14 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clientProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="light" to="/contact">
              Discuss a product direction
            </Button>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
