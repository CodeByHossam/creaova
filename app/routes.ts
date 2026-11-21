import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

import routeManifest from "../config/routes.json";

/** The complete public sitemap. Every entry is prerendered to static HTML. */
const routes = routeManifest.map((entry) =>
  entry.kind === "index"
    ? index(entry.file)
    : route(entry.path === "*" ? "*" : entry.path.slice(1), entry.file),
);

export default [layout("layout/MainLayout.tsx", routes)] satisfies RouteConfig;
