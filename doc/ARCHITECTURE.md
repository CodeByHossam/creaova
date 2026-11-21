# Architecture

## Stack

| Layer                     | Current choice                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Framework                 | React 19 with React Router 8.4.0 framework mode                                                            |
| Language                  | TypeScript 5                                                                                               |
| Build tool                | Vite 8 via React Router                                                                                    |
| Styling                   | Tailwind CSS 4 with custom `@theme` tokens                                                                 |
| Icons                     | `lucide-react`; repeated card icon uses a generated SVG sprite, brand marks are inlined in `BrandIcon.tsx` |
| Form                      | Web3Forms via fetch, with `@hcaptcha/react-hcaptcha`                                                       |
| Hosting                   | Static bundle for the owner’s official host; generated header manifest applies to that host                |
| Backend / database / auth | None                                                                                                       |
| Tests                     | Vitest smoke tests; ESLint and Prettier enforce code style                                                 |

## Configuration

- `config/routes.json` is the single route manifest; `app/routes.ts` derives the React Router config from it.
- `config/security-headers.json` is the single CSP/header source for `_headers`, `host-config.json` and the generated `render.yaml` block.
- `config/site.json` holds shared metadata used by app routes, the static 404 and the SPA fallback.
- `react-router.config.ts` sets `ssr: false` and `prerender: true`; routes must not export `action` or `headers`.
- `vite.config.ts` registers Tailwind first, then React Router, and aliases `~` to `app/`.
- `package.json` owns scripts; `eslint.config.js`, `.prettierrc.json` and `vitest.config.ts` own quality tooling.
- `.env.example` documents the public `VITE_*` configuration names.

## Folder map

| Path                        | Purpose                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `app/pages/`                | Route-level pages: Home, Services, Portfolio, About, Careers, Contact, Privacy, Terms, NotFound.                 |
| `app/components/`           | Shared navigation, buttons, cards, form, footer, headings, `LegalPage`, `SpriteIcon` and layout primitives.      |
| `app/layout/MainLayout.tsx` | Sticky header, `<main id="main">`, footer and hash-scroll behaviour.                                             |
| `app/data/`                 | Site constants, env access, shared page metadata, services, portfolio data and the tablet-only concept entry.    |
| `app/hooks/`                | `useHydratedLocationHash()` for hash-aware navigation after hydration.                                           |
| `app/utils/`                | Navigation rule, responsive image props and breakpoint constants.                                                |
| `app/styles/globals.css`    | Variable font faces, design tokens, base styles, utilities and reduced-motion rules.                             |
| `app/assets/`               | Source brand artwork: logo lockup and icon mark.                                                                 |
| `app/root.tsx`              | HTML shell, site-level metadata defaults, JSON-LD, skip link, error boundary.                                    |
| `config/`                   | Route, header/CSP and shared site metadata manifests.                                                            |
| `public/`                   | Static assets, generated `sitemap.xml`/`robots.txt`/`404.html`, sprite, self-hosted fonts and images.            |
| `scripts/`                  | Env validation, asset/static generation, site-URL sync, CSS injection, header hardening, host sync, compression. |
| `tests/`                    | Vitest navigation and route smoke tests.                                                                         |
| `build/client/`             | Generated static output; not a source directory.                                                                 |

## Routes and prerendered output

| Route        | Page                      | Built file                                      |
| ------------ | ------------------------- | ----------------------------------------------- |
| `/`          | `app/pages/Home.tsx`      | `build/client/index.html`                       |
| `/services`  | `app/pages/Services.tsx`  | `build/client/services/index.html`              |
| `/portfolio` | `app/pages/Portfolio.tsx` | `build/client/portfolio/index.html`             |
| `/about`     | `app/pages/About.tsx`     | `build/client/about/index.html`                 |
| `/careers`   | `app/pages/Careers.tsx`   | `build/client/careers/index.html`               |
| `/contact`   | `app/pages/Contact.tsx`   | `build/client/contact/index.html`               |
| `/privacy`   | `app/pages/Privacy.tsx`   | `build/client/privacy/index.html`               |
| `/terms`     | `app/pages/Terms.tsx`     | `build/client/terms/index.html`                 |
| `*`          | `app/pages/NotFound.tsx`  | `build/client/404.html` + `__spa-fallback.html` |

Every public route calls `app/data/pageMeta.ts` from its `meta()` export, so title, description, canonical URL and social image tags cannot drift between routes. `app/root.tsx` deliberately has no global canonical link.

## Shared shell and data flow

1. `app/root.tsx` renders the document shell, default metadata, escaped JSON-LD and the skip link.
2. `MainLayout.tsx` renders `Navbar`, `<main id="main">` and `Footer`.
3. `Navbar.tsx` and `MobileNav.tsx` read `site.nav` and use `getActiveNavHref()` with the hydrated hash so one nav item is current per landmark.
4. `MainLayout.tsx` scrolls to hash targets after paint, using `scroll-padding-top` and respecting `prefers-reduced-motion`.
5. `app/data/env.ts` exposes public env values. `absoluteUrl()` and `pageMeta()` build canonical and social URLs from `site.url` and `config/site.json`.
6. `scripts/sync-site-url.mjs` mirrors `VITE_SITE_URL` into `public/sitemap.xml` and `public/robots.txt`; `scripts/generate-static-pages.mjs` keeps `public/404.html` and the built SPA fallback on the same metadata.

## Contact form flow

`ContactForm.tsx` is the only dynamic behaviour:

- Native validation plus client checks; required name, email, service and message; optional project-stage selector.
- Hidden `company` field and Web3Forms `botcheck` honeypot.
- hCaptcha token sent as `h-captcha-response`; the provider-side check is authoritative and owner-confirmed.
- `access_key` is appended to `FormData` in the POST body, never the URL.
- POST goes to `https://api.web3forms.com/submit` with `referrerPolicy: no-referrer`; success requires both HTTP success and an explicit boolean `data.success === true` response check.
- In-flight submissions are aborted on unmount or resubmit; development diagnostics add context without leaking details to users.
- Success and error states use `role="status"` / `role="alert"` and offer the direct email fallback on error.

Provider-side enforcement and delivery are still owner actions; see [SECURITY.md](./SECURITY.md).

## Build scripts

| Script                              | Responsibility                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `scripts/env.mjs`                   | Reads process env first, then `.env`.                                                             |
| `scripts/validate-env.mjs`          | Blocks placeholder or unsafe production config before build.                                      |
| `scripts/generate-icon-sprite.mjs`  | Generates the shared SVG sprite for repeated card icons.                                          |
| `scripts/generate-static-pages.mjs` | Generates the static 404 and patches SPA fallback metadata from `config/site.json`.               |
| `scripts/sync-site-url.mjs`         | Regenerates sitemap and robots with the canonical origin.                                         |
| `scripts/inject-static-css.mjs`     | Injects the one extracted stylesheet into all prerendered HTML files.                             |
| `scripts/apply-security.mjs`        | Adds per-page CSP hashes, writes `_headers`/`host-config.json` and rejects forbidden asset hosts. |
| `scripts/sync-host-config.mjs`      | Syncs or checks the generated header block in `render.yaml`.                                      |
| `scripts/compress-assets.mjs`       | Writes gzip and Brotli variants of compressible text assets.                                      |

## Assets

- Variable fonts are self-hosted from `public/fonts/` with licences; no runtime requests to third-party font hosts. Archived families are not referenced, and critical faces are preloaded with metric-matched fallbacks.
- Project screenshots are responsive WebP variants under `public/images/projects-images/`; original PNGs are not served. A real OG image ships at `public/images/og-image.png`.
- The repeated card arrow is served from `public/icons.svg`; one-off lucide icons remain inline.
- The logo lockup ships with the “CREAOVA” wordmark baked into the image; the icon mark is used for favicon/app icons. Shipped raster, font, sprite and social URLs carry `?v=<ASSET_VERSION>`.
- No standalone mockup page is published under `public/`.

## Deployment topology

The owner is moving the site from Render to official web hosting. `build/client/` is the deployable static bundle, and `config/security-headers.json` is the source of truth for the generated `_headers`, `host-config.json` and `render.yaml` header block. The new server/CDN must apply the generated security headers, MIME rules and immutable cache rules; any CDN in front must not strip them. `VITE_SITE_URL` stays at the current preview origin until the owner supplies the official domain.

Content changes are deployed by building and publishing a new static bundle; there is no runtime CMS or database.
