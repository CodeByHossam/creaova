import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import * as About from "~/pages/About";
import * as Careers from "~/pages/Careers";
import * as Contact from "~/pages/Contact";
import * as Home from "~/pages/Home";
import * as NotFound from "~/pages/NotFound";
import * as Portfolio from "~/pages/Portfolio";
import * as Privacy from "~/pages/Privacy";
import * as Services from "~/pages/Services";
import * as Terms from "~/pages/Terms";

import routeManifest from "../config/routes.json";

type RouteModule = { meta?: () => unknown };

const modules: Record<string, RouteModule> = {
  "pages/Home.tsx": Home,
  "pages/Services.tsx": Services,
  "pages/Portfolio.tsx": Portfolio,
  "pages/About.tsx": About,
  "pages/Careers.tsx": Careers,
  "pages/Contact.tsx": Contact,
  "pages/Privacy.tsx": Privacy,
  "pages/Terms.tsx": Terms,
  "pages/NotFound.tsx": NotFound,
};

function metaTags(module: RouteModule): Record<string, unknown>[] {
  if (typeof module.meta !== "function") throw new Error("Route has no meta() export.");
  const tags = module.meta();
  if (!Array.isArray(tags)) throw new Error("meta() did not return an array.");
  return tags as Record<string, unknown>[];
}

function hasTag(tags: Record<string, unknown>[], key: string, value?: unknown) {
  return tags.some((tag) => key in tag && (value === undefined || tag[key] === value));
}

describe("public routes", () => {
  it.each(routeManifest)("exports complete metadata for $path", (route) => {
    const module = modules[route.file];
    expect(module, `No test module mapped for ${route.file}`).toBeDefined();

    const tags = metaTags(module);
    expect(hasTag(tags, "title")).toBe(true);
    expect(hasTag(tags, "name", "description")).toBe(true);
    expect(hasTag(tags, "property", "og:image")).toBe(true);
    expect(hasTag(tags, "name", "twitter:image")).toBe(true);

    if (route.sitemap) {
      expect(hasTag(tags, "rel", "canonical")).toBe(true);
      expect(hasTag(tags, "property", "og:url")).toBe(true);
    }
  });

  it.each(routeManifest)("renders exactly one h1 source for $file", (route) => {
    const source = readFileSync(new URL(`../app/${route.file}`, import.meta.url), "utf8");
    let sources = [source];

    if (/<LegalPage\b/.test(source)) {
      sources = [
        ...sources,
        readFileSync(new URL("../app/components/LegalPage.tsx", import.meta.url), "utf8"),
      ];
    }

    const countH1 = (text: string) =>
      (text.match(/<h1\b/g) ?? []).length + (text.match(/as="h1"/g) ?? []).length;

    expect(sources.reduce((total, text) => total + countH1(text), 0)).toBe(1);
  });
});
