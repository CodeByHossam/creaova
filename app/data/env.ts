/**
 * Environment access, validated.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §4.1
 *
 * DESIGN NOTE — why this does not simply throw on a missing variable:
 * failing on `npm run dev` with no `.env` present makes the project hostile to
 * clone. So development falls back to the reserved demo values, while a
 * production build fails fast. Production is where a wrong value actually costs
 * something; development is where friction costs something.
 */

/** Reserved, non-routable fallbacks (RFC 2606). Safe by construction. */
const DEMO_SITE_URL = "https://creaova.example.com";

function read(key: "VITE_SITE_URL" | "VITE_FORM_PROVIDER" | "VITE_FORM_ENDPOINT", fallback: string): string {
  const raw = import.meta.env[key];
  const value = typeof raw === "string" ? raw.trim() : "";

  if (value) return value;

  // Keep the starter build runnable on a fresh clone. The demo origin is
  // non-routable by design; replace it before deployment.

  return fallback;
}

export const env = {
  /** Canonical origin, trailing slash stripped. */
  siteUrl: read("VITE_SITE_URL", DEMO_SITE_URL).replace(/\/+$/, ""),
  formProvider: read("VITE_FORM_PROVIDER", "web3forms"),
  /** Empty until M6. The form must refuse to submit while this is blank. */
  formEndpoint: read("VITE_FORM_ENDPOINT", ""),
} as const;
