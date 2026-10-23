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
  { slug: "mentora", title: "Mentora Learning", type: "Web project", category: "EdTech / Platform", description: "A learning management platform with course delivery, live Zoom sessions, Stripe and PayPal payments, instructor payouts, and role-based dashboards.", tags: ["EdTech", "LMS", "Payments"], year: "2026", accent: "#d2d9e7", image: "/images/projects-images/mentora/mentora-home.png", isConcept: true },
  { slug: "dental-clinic", title: "Dental Clinic", type: "Web project", category: "Healthcare / Operations", description: "A full-stack clinic management platform spanning appointments, patient records, treatment plans, billing, inventory, and analytics with granular role-based access.", tags: ["Healthcare", "Clinic", "Dashboard"], year: "2026", accent: "#c5d8d0", image: "/images/projects-images/dental-clinic/dental-clinic-home.png", isConcept: true },
  { slug: "little-rainbow-nursery", title: "Little Rainbow Nursery", type: "Web project", category: "Education / Nursery", description: "A warm, playful nursery website with programme sections, a gallery, parent testimonials, and a clear enquiry journey for families.", tags: ["Education", "Website", "Brand"], year: "2026", accent: "#f3d9c4", image: "/images/projects-images/little-rainbow-nursery/little-rainbow-home.png", isConcept: true },
]; 
