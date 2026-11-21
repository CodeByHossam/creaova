/**
 * Keep the committed host header block in step with the generated build output.
 *
 * `config/security-headers.json` is the single source of truth. After a build,
 * `scripts/apply-security.mjs` writes build/client/host-config.json with the
 * exact CSP (including the union of inline-script hashes) and every header rule.
 * This script renders that data into the marked block in render.yaml.
 *
 * Usage:
 *   node scripts/sync-host-config.mjs          # write render.yaml
 *   node scripts/sync-host-config.mjs --check  # fail if render.yaml is stale
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const renderPath = join(root, "render.yaml");
const hostConfigPath = join(root, "build", "client", "host-config.json");
const BEGIN = "      # BEGIN GENERATED HEADERS";
const END = "      # END GENERATED HEADERS";

function yamlString(value) {
  return JSON.stringify(value);
}

function renderHeaderBlock({ csp, headerRules }) {
  const lines = [BEGIN];

  for (const rule of headerRules) {
    lines.push(`      - path: ${yamlString(rule.path)}`);
    if (rule.path === "/*") {
      lines.push("        name: Content-Security-Policy");
      lines.push(`        value: ${yamlString(csp)}`);
    }
    for (const header of rule.headers) {
      lines.push(`        name: ${yamlString(header.name)}`);
      lines.push(`        value: ${yamlString(header.value)}`);
    }
  }

  lines.push(END);
  return lines.join("\n");
}

function replaceGeneratedBlock(source, replacement) {
  const beginIndex = source.indexOf(BEGIN);
  const endIndex = source.indexOf(END);

  if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
    throw new Error("render.yaml is missing the generated header block markers.");
  }

  return `${source.slice(0, beginIndex)}${replacement}${source.slice(endIndex + END.length)}`;
}

const hostConfig = JSON.parse(readFileSync(hostConfigPath, "utf8"));
const expected = renderHeaderBlock(hostConfig);
const current = readFileSync(renderPath, "utf8");

if (process.argv.includes("--check")) {
  if (current !== replaceGeneratedBlock(current, expected)) {
    throw new Error("render.yaml headers are stale. Run `npm run sync:host-config` and rebuild.");
  }
  console.log("[sync-host-config] render.yaml matches the generated header manifest.");
} else {
  writeFileSync(renderPath, replaceGeneratedBlock(current, expected), "utf8");
  console.log("[sync-host-config] updated the generated header block in render.yaml.");
}
