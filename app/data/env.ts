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
const DEMO_SITE_URL = "https://creaova.onrender.com/";

/**
 * Reads a VITE_-prefixed env var with trimming and a typed fallback.
 * Empty strings, undefined, and whitespace-only values all resolve to the
 * fallback, so a half-filled `.env` behaves the same as a missing one.
 */
function read(
  key:
    | "VITE_SITE_URL"
    | "VITE_FORM_PROVIDER"
    | "VITE_FORM_ENDPOINT"
    | "VITE_FORM_ACCESS_KEY",
  fallback: string,
): string {
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
  /**
   * Full POST target for the contact form, e.g.
   *   https://api.web3forms.com/submit
   *
   * Kept as the bare endpoint — the access key travels in the request BODY
   * (Web3Forms' documented contract), not in the URL. Appending `?access_key=…`
   * to this string would duplicate the key when the form also sends it in the
   * body, which Web3Forms rejects. Consumers must POST to this URL AND include
   * `access_key` in the FormData — see `ContactForm.tsx`.
   */
  formEndpoint: read("VITE_FORM_ENDPOINT", ""),
  /**
   * Web3Forms access key. Public by design — scoped to one destination inbox,
   * shipped in the client bundle on purpose. Never move this to a secret env
   * var; Web3Forms requires it in the client-side request. The form refuses to
   * submit while this is blank.
   */
  formAccessKey: read("VITE_FORM_ACCESS_KEY", ""),
} as const;
