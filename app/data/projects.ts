import {
  getClientProjectBySlug,
  type ClientProject,
  type ClientProjectKind,
} from "./clientProjects";

export type ProjectType = "Web project" | "App project" | "API project";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  category: string;
  description: string;
  tags: string[];
  year: string;
  accent: string;
  image: string;
  isConcept: true;
};

const KIND_TO_TYPE: Record<ClientProjectKind, ProjectType> = {
  Web_app: "Web project",
  Website: "Web project",
  API: "API project",
  Game: "App project",
  Mobile_app: "App project",
};

/** The three concepts shown in Home's "Selected work" area. */
const HOME_PROJECT_SLUGS = ["mentora", "dental-clinic", "little-rainbow-nursery"] as const;

/** Real concept build used only to balance the tablet grids. */
const TABLET_PROJECT_SLUG = "work-note";

/** Adapt the canonical portfolio record to the lighter Home card view model. */
export function toProject(project: ClientProject): Project {
  return {
    slug: project.slug,
    title: project.title,
    type: KIND_TO_TYPE[project.kind],
    category: project.category,
    description: project.description,
    tags: project.stack,
    year: project.year,
    accent: project.accent,
    image: project.image ?? "",
    isConcept: true,
  };
}

export const projects: Project[] = HOME_PROJECT_SLUGS.map((slug) =>
  toProject(getClientProjectBySlug(slug)),
);

/** The same canonical record is shared by both tablet-only card slots. */
export const tabletOnlyProject: ClientProject = getClientProjectBySlug(TABLET_PROJECT_SLUG);

export const tabletHomeProject: Project = toProject(tabletOnlyProject);
