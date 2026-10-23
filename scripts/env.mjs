/**
 * Small, dependency-free env reader shared by the build scripts.
 *
 * Precedence: real process environment first, then `.env`. This mirrors Vite's
 * behavior closely enough for build-time validation while keeping CI/Render
 * variables authoritative.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env");

let fileEnv = null;

function loadFileEnv() {
  if (fileEnv) return fileEnv;
  fileEnv = {};

  if (!existsSync(envPath)) return fileEnv;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const value = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
    fileEnv[match[1]] = value;
  }

  return fileEnv;
}

export function readEnv(name) {
  const fromProcess = process.env[name];
  if (typeof fromProcess === "string" && fromProcess.trim()) {
    return fromProcess.trim().replace(/^(['"])(.*)\1$/, "$2");
  }

  return loadFileEnv()[name]?.trim() ?? "";
}
