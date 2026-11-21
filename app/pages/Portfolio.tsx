import { useState } from "react";

import { ConceptCaseStudy } from "~/components/ConceptCaseStudy";
import { Container } from "~/components/Container";
import { CTABand } from "~/components/CTABand";
import { FAQ } from "~/components/FAQ";
import { ProjectCard } from "~/components/ProjectCard";
import { SectionHeading } from "~/components/SectionHeading";
import { SpriteIcon } from "~/components/SpriteIcon";
import { TextLink } from "~/components/TextLink";
import { clientProjects } from "~/data/clientProjects";
import { pageMeta } from "~/data/pageMeta";
import { tabletOnlyProject } from "~/data/projects";

const pageTitle = "Portfolio | Concept builds by Creaova Digital Solutions";
const pageDescription =
  "See how Creaova thinks through concept products, APIs and websites — from clinic operations and learning platforms to engineering tools and browser games.";

const FEATURED_PROJECT_COUNT = 3;
const featuredProjects = clientProjects.slice(0, FEATURED_PROJECT_COUNT);
const remainingProjects = clientProjects.slice(FEATURED_PROJECT_COUNT);

const categories = Array.from(new Set(remainingProjects.map((project) => project.category)));

export function meta() {
  return pageMeta({
    path: "/portfolio",
    title: pageTitle,
    description: pageDescription,
  });
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const visibleProjects = activeCategory
    ? remainingProjects.filter((project) => project.category === activeCategory)
    : remainingProjects;

  const filterButtonClass =
    "min-h-11 shrink-0 cursor-pointer rounded-control border border-dark-line px-3.5 py-2 font-mono text-meta font-medium uppercase tracking-[0.12em] text-on-dark-muted transition-colors duration-150 ease-out hover:border-on-dark-muted hover:text-on-dark aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-ink";

  return (
    <>
      {/* Unified dark work band — merged hero context directly into the top of the dark section */}
      <section
        id="projects"
        className="bg-dark py-12 sm:py-16 lg:py-20 lg:-scroll-mt-12 xl:-scroll-mt-14"
      >
        <Container>
          <SectionHeading
            as="h1"
            align="left"
            dark
            bold
            eyebrow="Selected work"
            title="See how we think before you decide who to trust."
            lede="These are concept builds — illustrative work that shows our process, decisions and craft. They are not client case studies."
          />

          {/* Added context text moved from the old hero section */}
          <p className="mt-5 sm:mt-6 max-w-2xl text-lede text-on-dark-muted">
            Every card is a concept build; where a public demo exists, the card links straight to
            it.
          </p>

          <div id="work" className="mt-10 sm:mt-12">
            <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark">
              Featured builds
            </h2>
            <ul className="mt-4 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} headingTag="h3" />
                </li>
              ))}
              <li className="hidden h-full sm:block lg:hidden">
                <ProjectCard project={tabletOnlyProject} headingTag="h3" />
              </li>
            </ul>

            <div className="mt-12 border-t border-dark-line pt-10 sm:mt-14">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark">
                  All concept builds
                </h2>
                <p
                  aria-live="polite"
                  className="font-mono text-meta uppercase tracking-[0.12em] text-on-dark-muted"
                >
                  {visibleProjects.length} of {remainingProjects.length} builds
                </p>
              </div>

              <div
                role="group"
                aria-label="Explore concepts by industry"
                className="filter-scroll -mx-1 mt-5 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
              >
                <button
                  type="button"
                  aria-pressed={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                  className={filterButtonClass}
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
                      className={filterButtonClass}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <ul className="mt-6 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProjects.map((project) => (
                  <li key={project.slug} className="h-full">
                    <ProjectCard project={project} headingTag="h3" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <TextLink to="/contact" tone="dark" className="min-h-11 gap-2 text-sm font-semibold">
              Discuss a direction
              <SpriteIcon
                name="arrow-up-right"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
              />
            </TextLink>
          </div>
        </Container>
      </section>

      <ConceptCaseStudy />
      <FAQ />
      <CTABand />
    </>
  );
}
