/**
 * Post-build security pass.
 *
 * React Router prerenders the site to static HTML. This script:
 *
 *   1. Computes a SHA-256 hash for every inline script in every prerendered
 *      page and injects a page-specific CSP <meta> tag. That lets the static
 *      build enforce a strict script policy without weakening it to
 *      'unsafe-inline' and without a per-request server nonce.
 *   2. Emits a `_headers` file with the full header set (including
 *      `frame-ancestors`, which browsers ignore in <meta>) for hosts that read
 *      `_headers` (Cloudflare Pages, Netlify, etc.). Render uses the equivalent
 *      header rules in render.yaml.
 *   3. Fails the build if a known third-party asset host or an unsigned inline
 *      script slips back in.
 *
 * Run from `postbuild`; `npm run build` invokes it automatically.
 */

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "build", "client");

const TEXT_EXTENSIONS = new Set([".html", ".css", ".js", ".json", ".xml", ".txt", ".webmanifest"]);
const FORBIDDEN_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "images.unsplash.com"];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function sha256(content) {
  return createHash("sha256").update(content, "utf8").digest("base64");
}

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function csp(hashes, includeFrameAncestors) {
  const hashList = Array.from(hashes ?? []);
  const scriptSources = [
    "'self'",
    ...hashList.map((hash) => `'sha256-${hash}'`),
    "https://hcaptcha.com",
    "https://*.hcaptcha.com",
  ];

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com",
    "img-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com",
    "font-src 'self'",
    "connect-src 'self' https://api.web3forms.com https://hcaptcha.com https://*.hcaptcha.com",
    "frame-src https://hcaptcha.com https://*.hcaptcha.com",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "form-action 'self' https://api.web3forms.com",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ];

  if (includeFrameAncestors) directives.push("frame-ancestors 'none'");

  return directives.join("; ");
}

function extractInlineScriptHashes(html) {
  const hashes = new Set();
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptRe)) {
    const attributes = match[1];
    const body = match[2];
    if (/\bsrc\s*=/i.test(attributes)) continue;
    if (!body.trim()) continue;
    hashes.add(sha256(body));
  }

  return hashes;
}

const files = await walk(clientDir);
const htmlFiles = files.filter((file) => extname(file).toLowerCase() === ".html");

if (htmlFiles.length === 0) {
  throw new Error("No HTML files found in build/client; refusing to emit a security pass.");
}

const allHashes = new Set();
let injected = 0;

for (const file of htmlFiles) {
  const original = await readFile(file, "utf8");
  const hashes = extractInlineScriptHashes(original);
  for (const hash of hashes) allHashes.add(hash);

  const meta = `<meta http-equiv="Content-Security-Policy" content="${escapeAttribute(csp(hashes, false))}" />`;
  let hardened = original.replace(
    /<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>\s*/gi,
    "",
  );

  const replaced = hardened.replace(/<head(\s[^>]*)?>/i, (head) => `${head}\n    ${meta}`);
  if (replaced === hardened) {
    throw new Error(`Could not find a <head> element to harden in ${relative(clientDir, file)}.`);
  }

  hardened = replaced;
  if (!hardened.includes('http-equiv="Content-Security-Policy"')) {
    throw new Error(`CSP meta tag missing after hardening ${relative(clientDir, file)}.`);
  }

  await writeFile(file, hardened, "utf8");
  injected += 1;
}

if (allHashes.size === 0) {
  throw new Error("No inline scripts were found; the CSP hash pass did not run as expected.");
}

for (const file of files) {
  if (!TEXT_EXTENSIONS.has(extname(file).toLowerCase())) continue;
  const content = await readFile(file, "utf8");
  const hit = FORBIDDEN_HOSTS.find((host) => content.includes(host));
  if (hit) {
    throw new Error(`Third-party asset host ${hit} remains in ${relative(clientDir, file)}.`);
  }
}

const headers = [
  "/*",
  `  Content-Security-Policy: ${csp(allHashes, true)}`,
  "  X-Frame-Options: DENY",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "  Cross-Origin-Opener-Policy: same-origin",
  "  X-Permitted-Cross-Domain-Policies: none",
  "  Strict-Transport-Security: max-age=31536000",
  "  Cache-Control: public, max-age=0, must-revalidate",
  "",
  "/site.webmanifest",
  "  Content-Type: application/manifest+json",
  "  Cache-Control: public, max-age=3600",
  "",
  "/assets/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/fonts/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/images/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/favicon.png*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/apple-touch-icon.png*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/icon-*.png*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
  "/logo*.png*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
].join("\n");

await writeFile(join(clientDir, "_headers"), headers, "utf8");

console.log(
  `[apply-security] hardened ${injected} page(s) with ${allHashes.size} inline-script hash(es); wrote _headers.`,
);
