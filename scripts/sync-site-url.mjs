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
 * An optional email-signature template may also exist under scripts/. When it
 * does, the generated signature is written to scripts/ (not public/): it is a
 * tool for the mailbox owner, not a public web page.
 *
 * Usage: node scripts/sync-site-url.mjs
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readEnv } from "./env.mjs";

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

const origin = readSiteUrl();

if (origin.endsWith(".onrender.com")) {
  console.warn(
    "[sync-site-url] VITE_SITE_URL uses onrender.com. Generated canonical files " +
      "will match the deployment, but a custom domain is required before launch.",
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

const templatePath = join(root, "scripts", "email-signature.template.html");
if (existsSync(templatePath)) {
  const signaturePath = join(root, "scripts", "email-signature.generated.html");
  const template = readFileSync(templatePath, "utf8");
  writeFileSync(signaturePath, template.replaceAll("{{SITE_URL}}", origin), "utf8");
  console.log(
    "[sync-site-url] generated scripts/email-signature.generated.html (not published).",
  );
}

console.log(`[sync-site-url] origin set to ${origin}`);
