/**
 * Generate the two static error documents from one shared metadata source.
 *
 * `public/404.html` is the host-level 404. `build/client/__spa-fallback.html`
 * is React Router's SPA fallback; its body is framework-owned, so only its head
 * metadata is patched after the build.
 *
 * Usage:
 *   node scripts/generate-static-pages.mjs           # write public/404.html
 *   node scripts/generate-static-pages.mjs --spa     # patch the built SPA fallback
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = JSON.parse(readFileSync(join(root, "config", "site.json"), "utf8"));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sharedHead() {
  const { notFound, assetVersion, themeColor, socialName, ogImage } = site;

  return `  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="${escapeHtml(themeColor)}" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <title>${escapeHtml(notFound.title)}</title>
  <meta name="description" content="${escapeHtml(notFound.description)}" />
  <meta name="robots" content="${escapeHtml(notFound.robots)}" />
  <meta property="og:site_name" content="${escapeHtml(socialName)}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(notFound.title)}" />
  <meta property="og:description" content="${escapeHtml(notFound.description)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}?v=${escapeHtml(assetVersion)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(notFound.title)}" />
  <meta name="twitter:description" content="${escapeHtml(notFound.description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}?v=${escapeHtml(assetVersion)}" />
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=${escapeHtml(assetVersion)}" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${escapeHtml(assetVersion)}" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preload" href="/fonts/robotoslab-latin.woff2?v=${escapeHtml(assetVersion)}" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/roboto-latin.woff2?v=${escapeHtml(assetVersion)}" as="font" type="font/woff2" crossorigin />`;
}

const static404 = `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead()}
  <style>
    /* A built HTML file with a hashed stylesheet cannot be linked by hand, so
       this one document carries its own tokens: the same self-hosted faces and
       the same paper / ink / hairline palette as the app. */
    @font-face {
      font-family: "Roboto Slab";
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: url("/fonts/robotoslab-latin.woff2?v=${site.assetVersion}") format("woff2");
    }
    @font-face {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: url("/fonts/roboto-latin.woff2?v=${site.assetVersion}") format("woff2");
    }

    :root { color-scheme: light; }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: clamp(1.5rem, 5vw, 4rem);
      background: #FFF8F2;
      color: #241000;
      font-family: "Roboto", system-ui, -apple-system, "Segoe UI", sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    main { width: 100%; max-width: 68ch; }
    .code {
      margin: 0;
      font-family: "Roboto Slab", Georgia, "Times New Roman", serif;
      font-size: clamp(4.5rem, 18vw, 9rem);
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.04em;
    }
    h1 {
      margin: 1.5rem 0 0;
      font-family: "Roboto Slab", Georgia, "Times New Roman", serif;
      font-size: clamp(1.75rem, 5vw, 2.75rem);
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: -0.02em;
      text-wrap: balance;
    }
    p.copy {
      margin: 1rem 0 0;
      max-width: 52ch;
      color: #5A3418;
      font-size: 1rem;
    }
    a.home {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      margin-top: 2rem;
      padding: 0 1.25rem;
      border-radius: 0.5rem;
      background: #241000;
      color: #FFF8F2;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 200ms ease-out, color 200ms ease-out;
    }
    a.home:hover { background: #A94A00; color: #FFF8F2; }
    a.home:focus-visible { outline: 2px solid #FD6E00; outline-offset: 2px; }
    hr { border: 0; border-top: 1px solid #EFD9C2; margin: 2.5rem 0 0; }
  </style>
</head>
<body>
  <main>
    <p class="code">404</p>
    <h1>We couldn’t find that page.</h1>
    <p class="copy">The link may be out of date, or the page may have moved. Head back to the homepage and start from there.</p>
    <a class="home" href="/">Back to homepage</a>
    <hr />
  </main>
</body>
</html>
`;

function patchSpaFallback() {
  const path = join(root, "build", "client", "__spa-fallback.html");
  let html = readFileSync(path, "utf8");
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<meta charSet="utf-8"[^>]*>/gi, "");
  html = html.replace(/<meta name="viewport"[^>]*>/gi, "");
  html = html.replace(/<meta name="theme-color"[^>]*>/gi, "");
  html = html.replace(/<meta name="referrer"[^>]*>/gi, "");
  html = html.replace(/<meta name="description"[^>]*>/gi, "");
  html = html.replace(/<meta name="robots"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:(?:site_name|type|title|description|image)"[^>]*>/gi, "");
  html = html.replace(/<meta name="twitter:(?:card|title|description|image)"[^>]*>/gi, "");
  html = html.replace(/<link rel="(?:icon|apple-touch-icon|manifest)"[^>]*>/gi, "");
  html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*>/gi, "");

  const headIndex = html.search(/<head[^>]*>/i);
  if (headIndex === -1) throw new Error("SPA fallback has no <head> element.");
  const insertAt = html.indexOf(">", headIndex) + 1;
  html = `${html.slice(0, insertAt)}\n${sharedHead()}${html.slice(insertAt)}`;

  writeFileSync(path, html, "utf8");
  console.log("[generate-static-pages] patched SPA fallback metadata.");
}

if (process.argv.includes("--spa")) {
  patchSpaFallback();
} else {
  writeFileSync(join(root, "public", "404.html"), static404, "utf8");
  console.log("[generate-static-pages] wrote public/404.html.");
}
