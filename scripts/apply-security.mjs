/**
 * Post-build security pass.
 *
 * React Router prerenders the site to static HTML. This script:
 *
 *   1. Computes a SHA-256 hash for every inline script in every prerendered
 *      page and injects a page-specific CSP <meta> tag. That lets the static
 *      build enforce a strict script policy without weakening it to
 *      'unsafe-inline' and without a per-request server nonce.
 *   2. Emits `_headers` and `host-config.json` from `config/security-headers.json`
 *      so every host gets the same policy. `frame-ancestors` is header-only.
 *   3. Fails the build if a known third-party asset host or an unsigned inline
 *      script slips back in.
 *
 * Run from `postbuild`; `npm run build` invokes it automatically.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "build", "client");
const manifest = JSON.parse(readFileSync(join(root, "config", "security-headers.json"), "utf8"));

const TEXT_EXTENSIONS = new Set([".html", ".css", ".js", ".json", ".xml", ".txt", ".webmanifest"]);
const FORBIDDEN_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "images.unsplash.com"];
const HASH_PLACEHOLDER = manifest.csp.inlineHashesPlaceholder;

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
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function csp(hashes, { headerOnly }) {
  const hashSources = Array.from(hashes, (hash) => `'sha256-${hash}'`).join(" ");

  return manifest.csp.directives
    .filter((directive) => headerOnly || !directive.headerOnly)
    .map((directive) => {
      const sources = directive.sources
        .map((source) => (source === HASH_PLACEHOLDER ? hashSources : source))
        .filter(Boolean);
      return sources.length === 0 ? directive.name : `${directive.name} ${sources.join(" ")}`;
    })
    .join("; ");
}

function extractInlineScriptHashes(html) {
  const hashes = new Set();
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptRe)) {
    if (/\bsrc\s*=/i.test(match[1])) continue;
    if (!match[2].trim()) continue;
    hashes.add(sha256(match[2]));
  }

  return hashes;
}

function renderHeadersFile(headerCsp) {
  const blocks = [];

  for (const rule of manifest.headerRules) {
    const headers = [...rule.headers];
    if (rule.path === "/*") {
      headers.unshift({ name: "Content-Security-Policy", value: headerCsp });
    }
    blocks.push([rule.path, ...headers.map(({ name, value }) => `  ${name}: ${value}`)].join("\n"));
  }

  return `${blocks.join("\n\n")}\n`;
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

  const meta = `<meta http-equiv="Content-Security-Policy" content="${escapeAttribute(
    csp(hashes, { headerOnly: false }),
  )}" />`;
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

const headerCsp = csp(allHashes, { headerOnly: true });
await writeFile(join(clientDir, "_headers"), renderHeadersFile(headerCsp), "utf8");
await writeFile(
  join(clientDir, "host-config.json"),
  `${JSON.stringify({ csp: headerCsp, headerRules: manifest.headerRules }, null, 2)}\n`,
  "utf8",
);

console.log(
  `[apply-security] hardened ${injected} page(s) with ${allHashes.size} inline-script hash(es); wrote _headers and host-config.json.`,
);
