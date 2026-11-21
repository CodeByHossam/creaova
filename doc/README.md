# Creaova developer documentation

This folder is the developer reference for the current Creaova web project. It replaces the older planning, map, story, audit and design-template files with one non-duplicated set of documents.

**Last consolidated:** 2026-11-21  
**Last verified after pre-production fixes:** 2026-11-21

## Read in this order

1. [GETTING_STARTED.md](./GETTING_STARTED.md) — setup, commands, environment variables, build pipeline and verification.
2. [PRODUCT_AND_CONTENT.md](./PRODUCT_AND_CONTENT.md) — what the site is for, who it serves, honesty rules and content sources.
3. [ARCHITECTURE.md](./ARCHITECTURE.md) — stack, routes, folders, data flow, scripts and deployment topology.
4. [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — the locked visual system, tokens, typography, layout and components.
5. [SITE_STRUCTURE.md](./SITE_STRUCTURE.md) — routes, page anatomy, navigation, footer and user flows.
6. [SECURITY.md](./SECURITY.md) — in-repo controls, external provider/hosting actions and release blockers.
7. [STATUS_AND_DECISIONS.md](./STATUS_AND_DECISIONS.md) — current state, authoritative decisions, verification baseline and open items.
8. [PRE_PRODUCTION_REVIEW.md](./PRE_PRODUCTION_REVIEW.md) — final sanitized remediation record and owner action list.

## Supporting record

- [SALES_MARKETING_AUDIT.md](./SALES_MARKETING_AUDIT.md) — original conversion audit with implementation status in section 14 and later corrections in section 16. It explains why the current copy was chosen; it is not a source for reopening locked decisions.
- [SALES_CONTENT_HOOKS_SKILL.md](./SALES_CONTENT_HOOKS_SKILL.md) — portable content/conversion skill used for that audit. It is a reusable reference, not a project authority or a report.

## Authority order

When documentation and code disagree, use this order:

1. **Current source and configuration** — `config/*.json`, `app/routes.ts`, `app/data/constants.ts`, `app/components/Navbar.tsx`, `app/components/MobileNav.tsx`, `app/pages/*`, `app/styles/globals.css`, `package.json`, `react-router.config.ts`, `vite.config.ts` and `scripts/*`.
2. **Locked visual and content decisions** — recorded in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md), [PRODUCT_AND_CONTENT.md](./PRODUCT_AND_CONTENT.md) and [STATUS_AND_DECISIONS.md](./STATUS_AND_DECISIONS.md). No standalone mockup file is present in this repository.
3. **This documentation folder** — explanations of the current state.

The root `README.md` contains older or superseded claims and is not the developer reference. The superseded root `PRODUCT.md` and historical root `design.md` have been removed; do not copy details from any remaining root brief without checking the source.

## Current snapshot

- Static, prerendered React Router 8 marketing site; no backend, database or authentication. ESLint, Prettier and Vitest are configured.
- Eight public routes plus a generated custom 404 and SPA fallback. The build hardens 10 HTML files.
- Six-link text-only navigation with no header CTA. Careers is a normal nav destination.
- Locked Mockup 01 visual identity: cream `#fff8f2`, espresso `#241000`, controlled orange accents, self-hosted Roboto Slab / Roboto / JetBrains Mono.
- Web3Forms contact form with hCaptcha and honeypots; provider-side anti-spam is owner-confirmed, end-to-end delivery remains an owner check.
- `VITE_SITE_URL` intentionally remains `https://creaova.onrender.com` until the owner supplies the official domain. The owner is moving to official web hosting; generated header rules must be applied there.
- All remediation work remains uncommitted and unpushed. Do not commit or push unless the owner asks.

The AI base/assistance folders are being removed by the owner. Nothing in this reference depends on them.
