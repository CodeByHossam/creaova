/// <reference types="vite/client" />

/**
 * Vite exposes only `VITE_`-prefixed variables, and inlines them into the
 * client bundle at build time. Anything declared here is therefore PUBLIC.
 * Provider secrets belong in the provider dashboard or a server-side runtime,
 * never in this file or a `VITE_*` variable.
 */

interface ImportMetaEnv {
  /** Canonical site origin, e.g. `https://creaova.ae` (no trailing slash). */
  readonly VITE_SITE_URL: string;
  /** Contact form provider id. Currently only `web3forms` is supported. */
  readonly VITE_FORM_PROVIDER: string;
  /** Form provider POST endpoint, without the access key in the query string. */
  readonly VITE_FORM_ENDPOINT: string;
  /** Public Web3Forms access key (not a secret; scoped to one inbox). */
  readonly VITE_FORM_ACCESS_KEY: string;
  /** Public hCaptcha site key. Optional; free Web3Forms plans use a shared key. */
  readonly VITE_FORM_CAPTCHA_SITEKEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
