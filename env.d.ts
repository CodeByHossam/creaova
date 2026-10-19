/// <reference types="vite/client" />

/**
 * Vite exposes only `VITE_`-prefixed variables, and inlines them into the client
 * bundle at build time. Anything declared here is therefore PUBLIC.
 */
interface ImportMetaEnv {
  /** Canonical site origin, e.g. `https://creaova.ae` (no trailing slash). */
  readonly VITE_SITE_URL: string;
  /** Contact form provider id. Locked to `web3forms`. */
  readonly VITE_FORM_PROVIDER: string;
  /** Form provider endpoint, including the (public) access key. */
  readonly VITE_FORM_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
