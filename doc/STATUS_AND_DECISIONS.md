# Status and decisions

**Snapshot:** 2026-11-21

## Working-tree status

- Current task changes are uncommitted and untracked. No commit or push has been performed.
- The tree contains pre-existing owner modifications across many files and untracked assets/mockups. Treat them as owner work.
- The approved pre-production fixes intentionally modified `app/components/ProjectCard.tsx` for the shared project data, responsive images and sprite; treat that part of the current task as approved.
- Do not clean, stash, reset or otherwise rearrange the working tree as part of documentation work.

## Authoritative decisions

| Decision          | Current state                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual direction  | Monochromatic Mockup 01 is locked site-wide. The former root `design.md` direction was removed as superseded history.                                                                             |
| Header            | Solid sticky `bg-bg`, 64px mobile / 80px desktop, hairline border, one centred group of six text links, empty right slot, no header CTA.                                                          |
| Navigation        | Home, Services, Portfolio, About, Contact, Careers. Careers is a normal route with a briefcase icon and active underline.                                                                         |
| Hero              | `lg:min-h-[calc(100vh-5rem)]`, vertically centred desktop block, sentence-case h1, primary `Get a clear scope`, secondary `See the thinking`, outcome-led dark panel and risk-reversal microcopy. |
| CTA hierarchy     | `primaryCta` is hero/closing-band only. About’s hero uses `Talk to the team directly` plus a quiet `See concept work` link. Contact submits `Send my brief`. Footer has no CTA.                   |
| CTA colours       | Primary fill `#d25f00` with `#140800` label; hover `#a94a00` with `#fff8f2` label.                                                                                                                |
| Type and assets   | Self-hosted Roboto Slab / Roboto / JetBrains Mono; local fonts and WebP project images; no third-party font/image requests.                                                                       |
| Portfolio honesty | All entries are real concept builds. The tablet-only card uses `Work Note` from the canonical portfolio data, not placeholder content.                                                            |
| Platform          | Static prerendered site only: no backend, database, authentication or runtime server.                                                                                                             |
| Testing           | ESLint, Prettier, Vitest smoke tests, typecheck, build and browser checks are the verification path.                                                                                              |
| Navigation state  | `getActiveNavHref()` is the one hash-aware rule for desktop and mobile current markers.                                                                                                           |
| Deep links        | Static CSS injection and deferred hash handling prevent hydration mismatch on direct fragment links.                                                                                              |
| Focus             | Focus ring is ground-adaptive, never orange on cream.                                                                                                                                             |
| Icons             | `ArrowUpRight` is served from a generated external sprite where repeated; one-off icons stay inline.                                                                                              |
| Headers           | `config/security-headers.json` is the single CSP/header source; generated `_headers`, host config and `render.yaml` blocks must be applied by the final host.                                     |
| Git               | Owner controls all commits and pushes; every remediation change stays uncommitted and unpushed.                                                                                                   |

## Verification baseline

Current verification baseline after the final documentation consolidation and formatting pass:

- `npm run format:check` passes.
- `npm run typecheck` passes.
- `npm run lint` passes with zero warnings.
- `npm test` passes: 2 test files, 22 tests.
- `npm run build` passes with no unresolved-font warnings. The only build notice is the expected React Router message that the `*` SPA fallback path cannot be prerendered.
- `npm run check:host-config` passes; generated `render.yaml` headers match `build/client/host-config.json`.
- `npm audit` passes with 0 vulnerabilities.
- Build emits 10 hardened HTML files: eight public routes, `404.html` and `__spa-fallback.html`, with one stylesheet and 18 inline-script hashes.
- Build writes `build/client/_headers`, `host-config.json`, `icons.svg`, the static 404, patched SPA fallback head metadata, and 55 gzip plus 55 Brotli variants.
- `/careers` prerenders with title `Careers | Creaova Digital Solutions` and canonical `/careers`.
- Browser checks after the FAQ/tablet corrections at 1000 px and 1048 px confirmed six white cards and the real `Work Note` tablet card; earlier checks at 1440, 1024, 768 and 390 px showed no horizontal overflow, correct nav/active states, mobile drawer behaviour and Careers content. No new browser pass was run after the final metadata/documentation pass.
- CSS filename and inline-script hashes change per build; they are not stable facts.

## Open items and release blockers

- Supply the official domain; keep `VITE_SITE_URL` unchanged until then and rebuild after the owner provides it.
- Apply generated header/MIME/cache rules on the official host and verify them over HTTP; verify CDN compression.
- Verify Web3Forms delivery to `creaova.co@gmail.com` end to end.
- Keep Web3Forms strict spam filtering and hCaptcha active; the access key is public by design and no rotation is required.
- Legal review of Privacy and Terms.
- Supply LinkedIn and Behance URLs when available; until then those channels are omitted from rendered links.

## Deferred optional cleanup

- Inert `:where()` heading declarations in `globals.css`.
- Near-duplicate type sizes in the global scale.
- Root `README.md` is superseded; the historical root `design.md` and root `PRODUCT.md` were removed. This folder is the current developer reference.

Historical session logs are intentionally not carried forward. Current behaviour is documented in the other files in this folder and verified against source.
