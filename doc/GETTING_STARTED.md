# Getting started

## Prerequisites

- Node.js `>=22.22` (declared in `package.json`).
- npm.
- A local `.env` only if you need production-like builds or contact-form testing. Development runs without one.

## Install and run

```powershell
npm install
npm run dev
```

Useful commands:

| Command                   | Purpose                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run dev`             | React Router/Vite development server.                                                          |
| `npm run validate:env`    | Fail fast on missing or placeholder production configuration.                                  |
| `npm run generate:icons`  | Rebuild `public/icons.svg` from the installed lucide icon paths.                               |
| `npm run generate:static` | Generate `public/404.html` from the shared metadata source.                                    |
| `npm run sync:site-url`   | Regenerate `public/sitemap.xml` and `public/robots.txt` from `VITE_SITE_URL`.                  |
| `npm run typecheck`       | Run React Router type generation and TypeScript with no emit.                                  |
| `npm run lint`            | ESLint with TypeScript, React hooks and JSX accessibility rules.                               |
| `npm run format:check`    | Prettier check without writing files.                                                          |
| `npm test`                | Vitest smoke tests for navigation and route metadata/headings.                                 |
| `npm run build`           | Validate config, generate shared assets, build, harden output and sync host/compression files. |
| `npm run preview`         | Preview `build/client` with Vite.                                                              |
| `npm run typegen`         | Generate React Router route types only.                                                        |

`npm run lint`, `npm run format:check`, `npm test`, `npm run typecheck` and `npm run build` are the required checks before handing work back. `npm run lint:fix` and `npm run format` write changes and should only be used intentionally.

## Environment variables

Copy `.env.example` to `.env` for local production-like builds:

```powershell
Copy-Item .env.example .env
```

Then replace every placeholder. The validator enforces these rules:

| Variable                    | Rule                                                                                                                                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`             | Required, `https`, origin only (no path/query/fragment), no reserved example/local host. An `.onrender.com` value builds with a warning but is not acceptable for public launch. |
| `VITE_FORM_PROVIDER`        | Must be `web3forms`; no other provider is implemented.                                                                                                                           |
| `VITE_FORM_ENDPOINT`        | Must be exactly `https://api.web3forms.com/submit`.                                                                                                                              |
| `VITE_FORM_ACCESS_KEY`      | Required valid UUID for the destination inbox.                                                                                                                                   |
| `VITE_FORM_CAPTCHA_SITEKEY` | Optional; if set, must be a valid UUID. Defaults to Web3Forms’ public free-plan hCaptcha site key.                                                                               |

All `VITE_*` values are embedded in the public browser bundle. They are public configuration, not server secrets. The build scripts read the real process environment first and `.env` second.

Current deployment value to be replaced before launch: `VITE_SITE_URL=https://creaova.onrender.com`. Local development and production are documented; no staging environment is defined.

## Build pipeline

`npm run build` runs in six stages:

1. `prebuild`: validate env, generate the shared icon sprite, sync `VITE_SITE_URL`, and generate the static 404 from `config/site.json`.
2. `react-router build`: prerenders every route because `react-router.config.ts` sets `ssr: false` and `prerender: true`.
3. `postbuild` CSS injection: adds the single extracted `root-*.css` link to every prerendered HTML file. It is injected outside React to avoid hydration mismatch on direct hash deep links.
4. `postbuild` fallback pass: copies the shared head metadata into `build/client/__spa-fallback.html`.
5. `postbuild` security pass: adds a per-page hash-based CSP meta tag, writes `build/client/_headers` and `host-config.json` from `config/security-headers.json`, syncs the generated `render.yaml` header block, and rejects forbidden third-party asset hosts.
6. `postbuild` compression: writes `.gz` and `.br` variants for compressible text assets.

Output is `build/client/`:

- eight public routes: `/`, `/services`, `/portfolio`, `/about`, `/careers`, `/contact`, `/privacy`, `/terms`;
- `404.html`;
- `__spa-fallback.html`;
- one extracted stylesheet;
- `icons.svg`, `_headers` and `host-config.json`;
- `.gz` and `.br` variants for text assets.

The CSS filename and inline-script hashes change per build. Do not record them as permanent facts. Run `npm run check:host-config` after a build to confirm the committed host block is current.

## Previewing nested routes

`npm run preview` uses Vite’s preview server and can fall back to the homepage HTML for nested route paths. For route-level verification, serve `build/client/` with a directory-index-aware static server so `/careers/` resolves to `build/client/careers/index.html`.

## Verification checklist

Before reporting UI or content work as complete:

- `npm run lint`, `npm run format:check`, `npm test`, `npm run typecheck` and `npm run build` pass.
- `npm run build` uses the intentional preview `VITE_SITE_URL`; the final domain is supplied by the owner.
- Generated `render.yaml` headers match `npm run check:host-config`; `_headers`, `host-config.json`, `icons.svg`, the static 404, SPA fallback metadata and compressed variants are present.
- No horizontal overflow at 1440, 1024, 768 and 390 px.
- Header shows one centred group of six links; desktop right slot is empty; mobile drawer opens/closes with focus return and `Esc`.
- Active navigation marker is correct on `/services#all-services`, `/services#process`, `/portfolio#projects` and `/careers`.
- Careers content and the real `creaova.co@gmail.com` apply link render correctly.
- Console is clean apart from the known hCaptcha third-party language notice on `/contact`.
- Contact form success/error states are announced; provider delivery still requires an owner-side round-trip test.
- Text contrast and clarity are checked **against the actual section background**: 4.5:1 for body/metadata, 3:1 for large headings. Eyebrows such as "Built for confidence" must pass on their own ground — use `--color-primary-text` (`#a94a00`) on light surfaces, never plain `#fd6e00`; `#fd6e00` is acceptable on the ink panel (`#241000`). No word relies on a filled chip to rescue contrast.
- Check at 390 px and at 200% zoom; wrapped text, badges, tags, form feedback and focus rings must remain legible on light, subtle and dark grounds.

## Working with the owner’s changes

The working tree contains pre-existing tracked modifications and untracked files. Treat them as owner work. Do not clean, stash, reset, commit or push as part of documentation or UI work. The approved pre-production fixes intentionally touched `app/components/ProjectCard.tsx` for responsive images, dead-code cleanup and the shared sprite, so it is no longer treated as untouchable.
