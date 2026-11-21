/**
 * Generate the one external SVG sprite used by frequently repeated icons.
 *
 * Rendering the icons from lucide-react keeps the paths in sync with the
 * installed version. Only icons used in repeating cards belong here; one-off
 * icons stay inline so each page does not pay for an unused sprite symbol.
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArrowUpRight } from "lucide-react";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const icons = { "arrow-up-right": ArrowUpRight };

function symbolBody(icon) {
  const markup = renderToStaticMarkup(createElement(icon));
  const body = markup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
  if (!body) throw new Error("lucide icon did not render an <svg> element.");
  return body;
}

const symbols = Object.entries(icons)
  .map(([id, icon]) => `    <symbol id="${id}" viewBox="0 0 24 24">${symbolBody(icon)}</symbol>`)
  .join("\n");

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
${symbols}
  </defs>
</svg>
`;

writeFileSync(join(root, "public", "icons.svg"), sprite, "utf8");
console.log(
  `[generate-icon-sprite] wrote ${Object.keys(icons).length} symbol(s) to public/icons.svg.`,
);
