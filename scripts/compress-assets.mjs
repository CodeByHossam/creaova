/**
 * Emit precompressed variants of text assets for hosts that serve them.
 *
 * The host still has to send Content-Encoding/Content-Type; the generated
 * header manifest documents caching, not encoding. Precompression removes the
 * per-request CPU cost without changing the source files or the browser
 * fallback path.
 */

import { brotliCompressSync, gzipSync } from "node:zlib";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "build", "client");
const COMPRESSIBLE = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

const files = (await walk(clientDir)).filter(
  (file) => COMPRESSIBLE.has(extname(file).toLowerCase()) && !/\.(?:gz|br)$/.test(file),
);

for (const file of files) {
  const source = await readFile(file);
  await writeFile(`${file}.gz`, gzipSync(source));
  await writeFile(`${file}.br`, brotliCompressSync(source));
}

console.log(`[compress-assets] wrote gzip and brotli variants for ${files.length} file(s).`);
