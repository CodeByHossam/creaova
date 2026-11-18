import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProjectCard } from "~/components/ProjectCard";
import { clientProjects } from "~/data/clientProjects";
import { absoluteUrl } from "~/data/constants";

const pageTitle = "Portfolio | Concept builds by Creaova Digital Solutions";
const pageDescription =
  "Explore concept products, APIs, and websites built by Creaova Digital Solutions — from clinic operations and learning platforms to engineering tools and browser games.";

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
          <div className="max-w-3xl">
            <Badge dark>Selected builds</Badge>
            <h1 className="mt-6 text-display font-medium text-on-dark">
              Concept work, explored end to end.
            </h1>
            <p className="mt-6 max-w-2xl text-lede text-on-dark-muted">
              A selection of products, APIs, and websites Creaova has built as
              concepts. Every card is a concept build; where a public demo exists,
              the card links straight to it.
            </p>
          </div>

          <ul
            id="work"
            className="mt-14 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clientProjects.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

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
