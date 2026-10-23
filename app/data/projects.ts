export type ProjectType = "Web project" | "App project";

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

export const projects: Project[] = [
  { slug: "northstar", title: "Northstar Advisory", type: "Web project", category: "Strategy / Web", description: "A confident digital home for a consultancy with complex ideas to explain.", tags: ["Strategy", "Web design", "Development"], year: "2025", accent: "#e9d8c1", image: "/images/projects/northstar.webp", isConcept: true },
  { slug: "field-notes", title: "Field Notes", type: "App project", category: "Wellness / Mobile", description: "A calmer way to capture small habits and notice what is working.", tags: ["Product design", "Mobile", "Prototype"], year: "2025", accent: "#c5d8d0", image: "/images/projects/field-notes.webp", isConcept: true },
  { slug: "souk", title: "Souk Supply", type: "Web project", category: "Commerce / Web", description: "A warm, editorial storefront for independent makers in the region.", tags: ["Commerce", "Art direction", "Web"], year: "2024", accent: "#d9c9e5", image: "/images/projects/souk-supply.webp", isConcept: true },
  { slug: "orbit", title: "Orbit Finance", type: "App project", category: "Finance / Mobile", description: "A focused mobile experience for understanding money at a glance.", tags: ["Finance", "UX strategy", "Mobile"], year: "2024", accent: "#d2d9e7", image: "/images/projects/orbit-finance.webp", isConcept: true },
  { slug: "studio-17", title: "Studio 17", type: "Web project", category: "Architecture / Web", description: "A visual portfolio that lets the work breathe and the thinking show.", tags: ["Architecture", "Portfolio", "Web"], year: "2024", accent: "#e5dfca", image: "/images/projects/studio-17.webp", isConcept: true },
  { slug: "common-ground", title: "Common Ground", type: "App project", category: "Community / Mobile", description: "A simple starting point for finding local events and shared interests.", tags: ["Community", "Research", "Mobile"], year: "2023", accent: "#e8cfc7", image: "/images/projects/common-ground.webp", isConcept: true },
]; 
