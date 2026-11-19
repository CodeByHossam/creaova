/**
 * Post-build stylesheet pass.
 *
 * React Router's `<Links />` component renders the extracted global CSS link
 * into React-managed `<head>`. On a direct fragment deep link, React 19 sees a
 * head-order difference and discards the head with hydration error #418. This
 * static site has only one stylesheet, so we keep it out of the hydrated tree
 * and add it to every prerendered HTML file here instead. React leaves static
 * stylesheet links alone when it clears the head, so CSS still loads normally.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "build", "client");
const assetsDir = join(clientDir, "assets");

const cssAssets = (await readdir(assetsDir))
  .filter((name) => /^root-.*\.css$/.test(name))
  .sort();

if (cssAssets.length !== 1) {
  throw new Error(
    `Expected exactly one extracted root CSS asset, found ${cssAssets.length}: ${cssAssets.join(", ")}`,
  );
}

const stylesheet = `<link rel="stylesheet" href="/assets/${cssAssets[0]}"/>`;
const htmlFiles = [];
for (const entry of await readdir(clientDir, { withFileTypes: true })) {
  if (entry.isFile() && extname(entry.name).toLowerCase() === ".html") {
    htmlFiles.push(join(clientDir, entry.name));
  }
}
for (const entry of await readdir(clientDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "assets") continue;
  const dir = join(clientDir, entry.name);
  for (const file of await readdir(dir, { withFileTypes: true })) {
    if (file.isFile() && extname(file.name).toLowerCase() === ".html") {
      htmlFiles.push(join(dir, file.name));
    }
  }
}

if (htmlFiles.length === 0) {
  throw new Error("No prerendered HTML files found; refusing to emit a stylesheet pass.");
}

for (const file of htmlFiles) {
  const original = await readFile(file, "utf8");
  if (original.includes(cssAssets[0])) continue;

  const marker = "</head>";
  if (!original.includes(marker)) {
    throw new Error(`Could not find a </head> element in ${relative(clientDir, file)}.`);
  }

  await writeFile(file, original.replace(marker, `${stylesheet}${marker}`), "utf8");
}

console.log(`[inject-static-css] linked ${cssAssets[0]} in ${htmlFiles.length} page(s).`);
