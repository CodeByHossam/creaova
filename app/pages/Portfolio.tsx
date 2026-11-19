import { ArrowUpRight } from "lucide-react";

import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProjectCard } from "~/components/ProjectCard";
import { SectionHeading } from "~/components/SectionHeading";
import { TextLink } from "~/components/TextLink";
import { clientProjects } from "~/data/clientProjects";
import { absoluteUrl, site } from "~/data/constants";

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
 * The portfolio is driven entirely by `app/data/clientProjects.ts`: adding a
 * project there produces a card, its status pill and its demo action. Every
 * project is a concept, never shipped client work. The page follows the Home
 * rhythm — a light hero, then the dark work band — so the 60/30/10 balance is
 * legible here too instead of running dark from top to footer.
 */
export default function Portfolio() {
  return (
    <>
      {/* Light hero — the same compact hero band as Home and the other pages. */}
      <section className="bg-bg py-10 sm:py-12 lg:py-12 xl:py-14">
        <Container>
          <div className="max-w-4xl">
            <Badge>Selected builds</Badge>
            <h1 className="mt-5 sm:mt-6 text-display font-semibold text-ink">
              Concept work, explored end to end.
            </h1>
            <p className="mt-3 sm:mt-4 font-mono text-sm tracking-[0.12em] text-muted">
              {site.tagline}
            </p>
            <p className="mt-5 sm:mt-6 max-w-2xl text-lede text-muted">
              A selection of products, APIs, and websites Creaova has built as
              concepts. Every card is a concept build; where a public demo exists,
              the card links straight to it.
            </p>
          </div>
        </Container>
      </section>

      {/* Dark work band — Home's "02 Selected work" section language. */}
      <section
        id="projects"
        className="bg-dark py-12 sm:py-16 lg:py-20 lg:-scroll-mt-12 xl:-scroll-mt-14"
      >
        <Container>
          <SectionHeading
            align="left"
            dark
            bold
            number="02"
            eyebrow="Selected work"
            title="Concept builds, shown end to end."
            lede="A closer look at what each concept explores, and the thinking behind it."
          />

          <ul
            id="work"
            className="mt-10 sm:mt-12 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          >
            {clientProjects.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <TextLink
              to="/contact"
              tone="dark"
              className="min-h-11 gap-2 text-sm font-semibold"
            >
              Discuss a product direction
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
              />
            </TextLink>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
