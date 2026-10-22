/// <reference types="vite/client" />
//  the upper line just to load the defualt vite/client types which includes both ImportMeta and ImportMetaEnv

/**
 * Vite exposes only `VITE_`-prefixed variables, and inlines them into the client
 * bundle at build time. Anything declared here is therefore PUBLIC.
 */

/** Custom type for `import.meta.env` to extend Vite's built-in `ImportMetaEnv`. */
interface ImportMetaEnv {
  /** Canonical site origin, e.g. `https://creaova.ae` (no trailing slash). */
  readonly VITE_SITE_URL: string;
  /** Contact form provider id. Locked to `web3forms`. */
  readonly VITE_FORM_PROVIDER: string;
  /** Form provider endpoint, including the (public) access key. */
  readonly VITE_FORM_ENDPOINT: string;
}
/** Re-point `import.meta.env` to our merged `ImportMetaEnv` type. */
// Think: "import.meta has a property env, and its type is ImportMetaEnv."

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// The whole point of the file is merging into Vite's existing types. Vite already declares:

// interface ImportMetaEnv { /* empty */ } build it by vite
// interface ImportMeta { readonly env: ImportMetaEnv } build it by vite

// .d.ts files are global by default
// When you put an interface in a .d.ts file (without any import or export statements at the top), TypeScript treats it as a global declaration. It automatically applies to your entire project.
/**
 * HOW THIS FILE WORKS
 * -------------------
 * 1. `/// <reference types="vite/client" />`
 *    Triple-slash directive that loads Vite's built-in client types first.
 *    Vite already ships declarations for `ImportMeta` and `ImportMetaEnv`,
 *    so this line makes those existing types available for us to extend below.
 *
 * 2. `interface ImportMetaEnv { ... }`
 *    Vite's default `ImportMetaEnv` is essentially empty. By re-declaring an
 *    interface with the SAME name, TypeScript performs **declaration merging**:
 *    it combines our keys with Vite's existing ones instead of replacing them.
 *    Result: `import.meta.env` now knows about our `VITE_*` variables.
 *    - `readonly` => these values are baked in at build time and cannot be
 *      reassigned at runtime.
 *    - Only `VITE_`-prefixed vars are exposed to the client, and they are
 *      inlined into the bundle => treat them as PUBLIC (no secrets here).
 *
 * 3. `interface ImportMeta { readonly env: ImportMetaEnv; }`
 *    Re-points `import.meta.env` to our merged `ImportMetaEnv` type. This gives
 *    full autocomplete and type checking:
 *      import.meta.env.VITE_SITE_URL   // ✅ typed as string
 *      import.meta.env.SOMETHING_ELSE  // ❌ error: unknown property
 *
 * WHY `interface` AND NOT `type`?
 *    This file relies on declaration merging with types already declared by
 *    `vite/client`. `interface` supports merging; `type` does not — using `type`
 *    here would throw a "Duplicate identifier" error. Rule of thumb:
 *      - Augmenting existing/library/global types  => use `interface`
 *      - Defining your own standalone types         => `type` is fine
 */
