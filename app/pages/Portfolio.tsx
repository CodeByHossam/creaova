import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { ProjectCard } from "~/components/ProjectCard";
import { SectionHeading } from "~/components/SectionHeading";
import { TextLink } from "~/components/TextLink";
import { clientProjects } from "~/data/clientProjects";
import { absoluteUrl } from "~/data/constants";

const pageTitle = "Portfolio | Concept builds by Creaova Digital Solutions";
const pageDescription =
  "Explore concept products, APIs, and websites built by Creaova Digital Solutions — from clinic operations and learning platforms to engineering tools and browser games.";

const FEATURED_PROJECT_COUNT = 3;
const featuredProjects = clientProjects.slice(0, FEATURED_PROJECT_COUNT);
const remainingProjects = clientProjects.slice(FEATURED_PROJECT_COUNT);

// Keep the existing category strings as labels; no new categories are invented.
// A single grid plus a category filter carries the classification without
// giving every one-card category its own mostly-empty three-column section.
const categories = Array.from(
  new Set(remainingProjects.map((project) => project.category)),
);

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
 * project there produces a card, its status pill and its demo action. The first
 * three entries are featured; the rest keep their existing category strings as
 * filter labels over one continuous grid. Every project is a concept, never
 * shipped client work. The page follows the Home rhythm — a light hero, then
 * the dark work band — so the 60/30/10 balance is legible here too instead of
 * running dark top to footer.
 */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const visibleProjects = activeCategory
    ? remainingProjects.filter((project) => project.category === activeCategory)
    : remainingProjects;

  const filterButtonClass = (active: boolean) =>
    `min-h-11 shrink-0 rounded-control border px-3.5 py-2 font-mono text-meta font-medium uppercase tracking-[0.12em] transition-colors duration-150 ease-out ${
      active
        ? "border-primary bg-primary text-ink"
        : "border-dark-line text-on-dark-muted hover:border-on-dark-muted hover:text-on-dark"
    }`;

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
              Products, APIs, and websites built as concepts.
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
            eyebrow="Selected work"
            title="Concept builds, shown end to end."
            lede="A closer look at what each concept explores, and the thinking behind it."
          />

          <div id="work" className="mt-10 sm:mt-12">
            <h3 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark">
              Featured builds
            </h3>
            <ul className="mt-4 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} headingTag="h4" />
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-dark-line pt-10 sm:mt-14">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <h3 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark">
                  All concept builds
                </h3>
                <p
                  aria-live="polite"
                  className="font-mono text-meta uppercase tracking-[0.12em] text-on-dark-muted"
                >
                  {visibleProjects.length} of {remainingProjects.length} builds
                </p>
              </div>

              <div
                role="group"
                aria-label="Filter concept builds by category"
                className="filter-scroll -mx-1 mt-5 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
              >
                <button
                  type="button"
                  aria-pressed={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                  className={filterButtonClass(activeCategory === null)}
                >
                  All builds
                </button>
                {categories.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveCategory(active ? null : category)}
                      className={filterButtonClass(active)}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <ul className="mt-6 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProjects.map((project) => (
                  <li key={project.slug} className="h-full">
                    <ProjectCard project={project} headingTag="h4" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
