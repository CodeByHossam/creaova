import type { Config } from "@react-router/dev/config";

/**
 * Creaova — static site configuration.
 *
 * `ssr: false`  — no runtime server. Matches the frontend-only constraint.
 * `prerender: true` — emits a real HTML file per route at build time, so every
 *   page ships with its own <title>, meta description, canonical and JSON-LD
 *   already in the markup. This is what makes the multi-page refactor pay off
 *   for SEO (see plans/MULTIPAGE_UI_PLAN.md §4.1).
 *
 * Because there is no runtime server, routes must NOT export `action` or
 * `headers` — React Router fails the build if they do.
 *
 * Output: build/client/  — one directory per route, each with its own index.html.
 */
export default {
  ssr: false,
  prerender: true,
} satisfies Config;
