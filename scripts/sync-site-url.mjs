/**
 * Propagate the canonical origin into the static files that cannot read env
 * vars.
 *
 * Why this exists: `public/` files are copied verbatim at build time, so they
 * cannot import `site.url` from `app/data/constants.ts`. That left three files
 * holding their own copy of the domain:
 *
 *   - public/sitemap.xml        every <loc> the search engine reads
 *   - public/robots.txt         the sitemap pointer
 *   - public/email-signature.html  the logo URL pasted into your mail client
 *
 * Hand-editing those on every domain change is exactly how a site ends up
 * shipping a sitemap full of the old domain. This script regenerates all three
 * from `VITE_SITE_URL`, and `npm run build` runs it first.
 *
 * Usage: node scripts/sync-site-url.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

/** The routes that ship. Keep in step with app/routes.ts. */
const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

/** The reserved demo origin. Must never reach a live sitemap. */
const DEMO_ORIGIN = "https://creaova.example.com";

function readSiteUrl() {
  const envPath = join(root, ".env");
  let source = "";
  try {
    source = readFileSync(envPath, "utf8");
  } catch {
    console.warn("[sync-site-url] no .env found — falling back to the demo origin.");
    return DEMO_ORIGIN;
  }

  const match = source.match(/^\s*VITE_SITE_URL\s*=\s*(.+)$/m);
  if (!match) {
    console.warn("[sync-site-url] VITE_SITE_URL is not set in .env.");
    return DEMO_ORIGIN;
  }

  return match[1].trim().replace(/\/+$/, "");
}

const origin = readSiteUrl();

if (origin === DEMO_ORIGIN) {
  console.warn(
    "[sync-site-url] VITE_SITE_URL is still the reserved demo origin — the " +
      "generated sitemap points at a domain that cannot resolve.",
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${origin}${route.path === "/" ? "/" : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

// The email signature is a hand-written template with the origin as a token,
// so it is regenerated rather than patched — no leftover domain can survive.
const signaturePath = join(publicDir, "email-signature.html");
const template = readFileSync(join(root, "scripts", "email-signature.template.html"), "utf8");
writeFileSync(signaturePath, template.replaceAll("{{SITE_URL}}", origin), "utf8");

console.log(`[sync-site-url] origin set to ${origin}`);
