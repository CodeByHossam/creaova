/**
 * Environment access.
 *
 * Values are inlined by Vite at build time, so every `VITE_*` value is public.
 * Do not put provider secrets here. The build-time checks in
 * `scripts/validate-env.mjs` reject placeholder or missing production values
 * before a deploy can ship them.
 *
 * Development deliberately keeps working without a `.env`: it falls back to
 * RFC 2606 example origins and disables the form. A production build must pass
 * the validator, so the fallbacks can never reach a live sitemap or bundle.
 */

/** Reserved, non-routable fallbacks (RFC 2606). Safe by construction. */
const DEMO_SITE_URL = "https://example.com";

/**
 * Web3Forms' public hCaptcha site key for free plans. This is a site key, not
 * a secret. Paid plans can override it with VITE_FORM_CAPTCHA_SITEKEY.
 */
const WEB3FORMS_HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

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
    | "VITE_FORM_ACCESS_KEY"
    | "VITE_FORM_CAPTCHA_SITEKEY",
  fallback: string,
): string {
  const raw = import.meta.env[key];
  const value = typeof raw === "string" ? raw.trim() : "";

  if (value) return value;

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
   * (Web3Forms' documented contract), not in the URL. Appending
   * `?access_key=…` to this string would duplicate the key when the form also
   * sends it in the body, which Web3Forms rejects. Consumers must POST to this
   * URL AND include `access_key` in the FormData — see `ContactForm.tsx`.
   */
  formEndpoint: read("VITE_FORM_ENDPOINT", ""),
  /**
   * Web3Forms access key. Public by design — scoped to one destination inbox,
   * shipped in the client bundle on purpose. Never move this to a secret env
   * var; Web3Forms requires it in the client-side request. The form refuses to
   * submit while this is blank.
   */
  formAccessKey: read("VITE_FORM_ACCESS_KEY", ""),
  /**
   * hCaptcha site key used by the contact form. Public by design. The free
   * Web3Forms plan uses the provider's shared site key; paid plans can supply
   * their own.
   */
  formCaptchaSiteKey: read("VITE_FORM_CAPTCHA_SITEKEY", WEB3FORMS_HCAPTCHA_SITEKEY),
} as const;
