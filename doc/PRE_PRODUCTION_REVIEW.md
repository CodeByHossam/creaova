# Pre-production remediation report — Creaova Digital Solutions

**Date:** 2026-11-21  
**Final report location:** `doc/PRE_PRODUCTION_REVIEW.md`  
**Verdict:** repository-side work is complete. Launch remains blocked only by external host/domain actions and final provider/host verification.  
**Git state:** all remediation changes are uncommitted and unpushed. No clean, stash, reset, commit or push was performed. Pre-existing owner work was preserved.

Secrets are intentionally omitted: the previously leaked Web3Forms access key, the business phone number and specific `.env` secret values appear as `[REDACTED]` throughout this report.

---

## Owner decisions applied

- **S2 / S3 — closed by owner decision.** The Web3Forms access key is public client configuration by design, so no rotation or source-history rewrite is required. Strict spam filtering and hCaptcha are already active in the provider dashboard. The repository keeps honeypots, client validation and provider-response checks as defence in depth.
- **S1 — pending external host.** The owner is moving to official web hosting, not Render. The generated `config/security-headers.json` source, `build/client/_headers` and `build/client/host-config.json` are retained. The new server/CDN must apply those rules and verify them over HTTP.
- **S5 — pending official domain.** `VITE_SITE_URL` remains `https://creaova.onrender.com` intentionally. Do not guess or update the canonical origin until the owner supplies the final domain.
- **P6 — repo work complete, host verification pending.** Gzip and Brotli variants are generated and wired into `postbuild`; the final CDN must be checked for correct `Content-Encoding`.
- **Visual direction — unchanged.** Mockup 01 remains locked: cream `#fff8f2`, espresso `#241000`, controlled orange, self-hosted Roboto Slab / Roboto / JetBrains Mono. No standalone mockup file exists in the repository, so the docs now name `doc/DESIGN_SYSTEM.md` and current source as the authority.
- **Navigation — unchanged.** Six text links, no header CTA; Careers remains a normal nav route.

---

## Finding disposition

### Security

| ID  | Status                   | Result                                                                                                                                                                                                                                     |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S1  | **Pending — owner/host** | Header generation is complete, but the live header check showed no CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `COOP` or `X-Permitted-Cross-Domain-Policies`. Apply generated rules on the official host and recheck. |
| S2  | Resolved by owner        | Access key `[REDACTED]` is public by design; no rotation required. The report redacts it.                                                                                                                                                  |
| S3  | Resolved by owner        | Web3Forms strict spam filter and hCaptcha are active. Client honeypots and validation remain.                                                                                                                                              |
| S4  | Fixed                    | `config/security-headers.json` is the single CSP/header source. `scripts/apply-security.mjs` emits per-page hashed CSP metas, `_headers` and `host-config.json`; `scripts/sync-host-config.mjs` mirrors the full set into `render.yaml`.   |
| S5  | **Pending — owner**      | Official domain not supplied. `VITE_SITE_URL` is intentionally unchanged; canonical/sitemap/robots/social URLs will be regenerated after the owner provides the domain.                                                                    |
| S6  | Fixed                    | Misleading “demo data” comments were removed from `app/data/constants.ts`; contact values are described accurately. Phone number is `[REDACTED]` here.                                                                                     |
| S7  | Fixed in repo            | Generated cache/MIME manifest now covers fonts, images, PNG/favicon rules, web manifest MIME and the versioned sprite. Host enforcement remains part of S1.                                                                                |
| S8  | Fixed                    | Security reporting was consolidated into `doc/SECURITY.md`; the stale root `SECURITY_REPORT.md` and duplicate `doc/SECURITY_REPORT.md` were removed, and the stale `.env` comment about a URL-based access key was cleaned.                |

### Performance and delivery

| ID  | Status                 | Result                                                                                                                                                                                             |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Fixed                  | One variable WOFF2 file per family/subset replaces duplicate per-weight copies; `@font-face` now uses weight ranges.                                                                               |
| P2  | Fixed                  | Critical font preloads and metric-matched fallback faces were added to the shared head and global CSS.                                                                                             |
| P3  | Fixed                  | 480/768/full WebP variants, `srcset`/`sizes`, intrinsic dimensions and corrected `fetchPriority` are in place for About LCP, project cards and service cards; the logo is no longer high priority. |
| P4  | Fixed                  | Unused Fraunces and Instrument Sans files were removed; active font licences remain under `public/fonts/licenses/`.                                                                                |
| P5  | Fixed                  | Versioned font, raster, sprite and social URLs plus a single generated header manifest cover immutable caching and MIME rules.                                                                     |
| P6  | **Pending host check** | `scripts/compress-assets.mjs` writes `.gz` and `.br` variants for 55 text assets from `postbuild`. Confirm the final CDN serves the correct `Content-Encoding` and does not strip headers.         |
| P7  | Fixed                  | `useHydratedLocationHash()` now uses `useSyncExternalStore`; the `MobileNav` media listener is scoped to the open state and cannot open on desktop.                                                |
| P8  | Fixed                  | A generated external SVG sprite serves the repeated `ArrowUpRight` icon; one-off lucide icons stay inline. `public/icons.svg` has an immutable cache rule.                                         |

### Code quality and correctness

| ID  | Status | Result                                                                                                                                                                                                   |
| --- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Fixed  | Portfolio `SectionHeading` renders `h1`; following headings were demoted to `h2`/`h3` with no skipped levels.                                                                                            |
| C2  | Fixed  | `app/data/pageMeta.ts` is used by all routed pages. The 404 and SPA fallback share title/description/OG/Twitter/robots metadata from `config/site.json`; a real `og-image.png` ships.                    |
| C3  | Fixed  | The tablet card now selects the real `Work Note` record from `clientProjects.ts` in `app/data/projects.ts`; duplicate inline objects and `conceptDemoCount` were removed.                                |
| C4  | Fixed  | Remaining `Icon: any` props now use `LucideIcon`.                                                                                                                                                        |
| C5  | Fixed  | Deleted unused `SectionBand.tsx` and `QualityCard.tsx`; removed unused `site.logo.alt`, `site.isPlaceholder`, `hasUnresolvedContactDetails`, dead comments and nonexistent plan/script references.       |
| C6  | Fixed  | Added ESLint 9 flat config with TypeScript, React hooks and JSX a11y rules, Prettier, and Vitest. ESLint is pinned to 9 because `eslint-plugin-jsx-a11y` conflicts with ESLint 10.                       |
| C7  | Fixed  | `ContactForm` aborts in-flight submissions on unmount/resubmit, validates the response explicitly, reports contextual development errors and cleans up correctly.                                        |
| C8  | Fixed  | Home quality cards use shared `ProcessCard`; contact service options derive from `services.ts`; CTAs use shared constants.                                                                               |
| C9  | Fixed  | Careers scroll-link wording, `Footer` heading level, dialog accessible name and consistent `rel="noopener noreferrer"` were corrected.                                                                   |
| C10 | Fixed  | `scripts/generate-static-pages.mjs` generates `public/404.html` and patches SPA fallback head metadata from `config/site.json`, with no duplicated head tags.                                            |
| C11 | Fixed  | Breakpoints centralised in `app/data/breakpoints.ts`; the arbitrary “top three” slice and flag params were addressed; the portfolio filter uses `aria-pressed`. Prettier was run across source and docs. |
| C12 | Fixed  | Extracted shared `app/components/LegalPage.tsx` and `app/data/legal.ts`; Privacy and Terms share the effective date from `config/site.json`.                                                             |

### Documentation and visual clarity

| ID  | Status  | Result                                                                                                                                                                                                                                                                     |
| --- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Fixed   | Removed references to nonexistent mockup and plan files. The eight-file `doc/` set is the authority; root `README.md` is marked superseded, and the historical root `design.md` and superseded root `PRODUCT.md` were removed.                                             |
| D2  | Fixed   | Root docs carry superseded notices and point to `doc/`. Current docs match source for fonts, routes, contact handling, header generation and deployment assumptions.                                                                                                       |
| D3  | Fixed   | `config/routes.json` is the single route manifest consumed by `app/routes.ts` and URL generation.                                                                                                                                                                          |
| D4  | Fixed   | External links use consistent `rel="noopener noreferrer"` where appropriate.                                                                                                                                                                                               |
| V1  | Checked | Contrast/clarity checklist added to `doc/GETTING_STARTED.md`. “Built for confidence” must be checked against its actual section ground; on light surfaces use accessible `--color-primary-text` / `#A94A00`, not plain `#fd6e00`. No filled chip is needed behind “earns”. |

---

## Verification

Final command pass after the documentation consolidation and formatting pass:

| Check                       | Result                                                                         |
| --------------------------- | ------------------------------------------------------------------------------ |
| `npm run format:check`      | Passed — all matched files use Prettier style.                                 |
| `npm run typecheck`         | Passed — React Router type generation and `tsc --noEmit`.                      |
| `npm run lint`              | Passed — zero warnings.                                                        |
| `npm test`                  | Passed — 2 test files, 22 tests.                                               |
| `npm run build`             | Passed — 10 hardened HTML files, 18 inline-script hashes, no unresolved fonts. |
| `npm run check:host-config` | Passed — generated `render.yaml` headers match `host-config.json`.             |
| `npm audit`                 | Passed — 0 vulnerabilities across production and development dependencies.     |

Additional build output confirmed:

- `build/client/_headers` and `build/client/host-config.json` from the single header manifest.
- Generated `render.yaml` header block between the maintained markers.
- Static `404.html` and patched `__spa-fallback.html` head metadata.
- `public/icons.svg` with one generated symbol.
- 55 gzip and 55 Brotli variants.
- No font-resolution warnings. The only build notice is the expected React Router message that the `*` SPA fallback path cannot be prerendered.

Browser checks after the FAQ/tablet corrections at 1000 px and 1048 px confirmed six white, bordered FAQ cards in balanced 2- and 3-column grids and the real `Work Note` tablet card on Home and `/portfolio`; no `Data Sync Engine` string remains. Earlier checks at 1440, 1024, 768 and 390 px showed no horizontal overflow, correct navigation/active states and correct mobile drawer behaviour. No new browser pass was run after the final metadata/documentation pass.

---

## Owner action checklist

These cannot be completed from the repository:

1. **S1 — official host headers.** Apply `config/security-headers.json`, `build/client/_headers` and `build/client/host-config.json` on the new hosting/CDN. Verify CSP, clickjacking, referrer, permissions, MIME and cache headers over HTTP.
2. **S5 — official domain.** Supply the final https domain. `VITE_SITE_URL` stays unchanged until then; after the owner provides it, update config, rebuild and verify canonicals, sitemap, robots and social URLs.
3. **P6 — CDN compression.** Confirm Brotli/gzip is served for text assets and that the CDN does not strip generated headers.
4. **Form delivery.** Submit one real test enquiry and confirm it reaches the business inbox. Keep Web3Forms strict spam filtering and hCaptcha active.
5. **Legal review.** Have Privacy and Terms reviewed for UAE requirements.
6. **Optional content.** Supply LinkedIn and Behance URLs if those channels should become clickable.
7. **Dependencies.** `npm audit` was re-run after the tooling change and found 0 vulnerabilities; re-run it immediately before release if the dependency tree changes again.

---

## Notes

- All changes remain uncommitted and unpushed; the owner controls release and commits.
- The root `PRE_PRODUCTION_REVIEW.md` is removed only after this sanitized report was created.
- The Web3Forms hCaptcha site key is public by design and may remain visible. The Web3Forms access key, business phone number and specific `.env` secret values are not reproduced here.
- Generated hashes, CSS filenames and compressed asset names change per build and are not permanent facts.
