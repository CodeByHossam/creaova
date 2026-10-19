import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

/** The complete public sitemap. Every entry is prerendered to static HTML. */
export default [
  layout("layout/MainLayout.tsx", [
    index("pages/Home.tsx"),
    route("services", "pages/Services.tsx"),
    route("portfolio", "pages/Portfolio.tsx"),
    route("about", "pages/About.tsx"),
    route("contact", "pages/Contact.tsx"),
    route("privacy", "pages/Privacy.tsx"),
    route("terms", "pages/Terms.tsx"),
    route("*", "pages/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
