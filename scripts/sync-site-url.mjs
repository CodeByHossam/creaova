/**
 * Propagate the canonical origin into the static files that cannot read env
 * vars.
 *
 * `public/` files are copied verbatim at build time, so they cannot import
 * `site.url` from `app/data/constants.ts`. These files hold their own copy of
 * the domain:
 *
 *   - public/sitemap.xml   every <loc> the search engine reads
 *   - public/robots.txt    the sitemap pointer
 *
 * The shipped route list comes from `config/routes.json`, the same manifest
 * that builds `app/routes.ts`. Adding a route cannot silently omit it here.
 *
 * Usage: node scripts/sync-site-url.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readEnv } from "./env.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const routes = JSON.parse(readFileSync(join(root, "config", "routes.json"), "utf8"));

function readSiteUrl() {
  const value = readEnv("VITE_SITE_URL");
  if (!value) {
    throw new Error("VITE_SITE_URL is not set. Refusing to generate a sitemap with a demo origin.");
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("VITE_SITE_URL is not a valid URL.");
  }

  if (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("VITE_SITE_URL must be an https origin with no path, query, or fragment.");
  }

  return url.origin;
}

function sitemapRoutes(routeList) {
  return routeList
    .filter((route) => route.sitemap !== false)
    .map((route) => {
      if (!route.path?.startsWith("/") || !route.changefreq || !route.priority) {
        throw new Error("Every sitemap route needs a path, changefreq and priority.");
      }
      return route;
    });
}

const origin = readSiteUrl();

if (origin.endsWith(".onrender.com")) {
  console.warn(
    "[sync-site-url] VITE_SITE_URL uses a temporary platform host. Generated " +
      "canonical files match the deployment, but a custom domain is required before launch.",
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes(routes)
  .map(
    (route) => `  <url>
    <loc>${origin}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

console.log(`[sync-site-url] origin set to ${origin}`);
