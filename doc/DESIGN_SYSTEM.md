# Design system

## Locked identity

The approved direction is **Mockup 01**: a warm, monochromatic editorial system with one controlled orange hue family. No standalone mockup file exists in this repository. Current implementation details in `Navbar.tsx`, `MobileNav.tsx`, `Home.tsx`, `Careers.tsx` and `globals.css` are the shipped contract.

Do not change palette, type families, art direction or CTA hierarchy without explicit owner approval. The former root `design.md` was removed as superseded history; this file is the visual authority.

The approved rationale is a warmed near-white canvas, restrained single accent, editorial type and asymmetric composition, work shown prominently, hairlines/tints instead of decorative effects, one quiet motion idea, reduced-motion support and no invented proof.

## Colour tokens

Defined in `app/styles/globals.css`.

| Token                          | Value                         | Role                                  |
| ------------------------------ | ----------------------------- | ------------------------------------- |
| `--color-bg`                   | `#fff8f2`                     | Page canvas, 60% ground               |
| `--color-surface`              | `#fffbf6`                     | Cards and light sections              |
| `--color-surface-subtle`       | `#fbe3cc`                     | Tints, concept badges, index surfaces |
| `--color-line`                 | `#efd9c2`                     | Hairlines on light ground             |
| `--color-ink` / `--color-dark` | `#241000`                     | Body text and dark bands, 30% ground  |
| `--color-muted`                | `#5a3418`                     | Secondary text on light               |
| `--color-primary`              | `#fd6e00`                     | Fill/marker orange only               |
| `--color-primary-hover`        | `#a94a00`                     | Darker fill hover                     |
| `--color-primary-text`         | `#a94a00`                     | Orange **text** on light surfaces     |
| `--color-primary-text-hover`   | `#7a5230`                     | Darker orange text hover              |
| `--color-cta-fill`             | `#d25f00`                     | Primary button resting fill           |
| `--color-cta-label`            | `#140800`                     | Primary button resting label, 5.05:1  |
| `--color-dark-surface`         | `#5a3418`                     | Panels inside dark bands              |
| `--color-dark-line`            | `#7a5230`                     | Hairlines on dark                     |
| `--color-on-dark`              | `#fff8f2`                     | Text on dark                          |
| `--color-on-dark-muted`        | `#e8c9ac`                     | Secondary text on dark                |
| `--focus-ring`                 | ink on light / canvas on dark | Adaptive focus indicator              |
| `--color-success`              | `#15803d`                     | Form success only                     |
| `--color-error`                | `#b91c1c`                     | Form error only                       |

Rules:

- Orange is a **fill**, never plain text on a light background. Use `--color-primary-text` for orange text.
- Primary CTA hover inverts to `#fff8f2` on `#a94a00`; keeping the dark label there would fail contrast.
- Maintain the 60-30-10 ratio **inside every section**: roughly 60% light ground, 30% ink/dark structure, 10% orange action/marker.
- No gradients, glass effects, random off-palette colours, decorative animation, glow or excessive shadows. Separation comes from surface steps, hairlines and space.

## Typography

All families are self-hosted under `public/fonts/` with licences.

| Role                   | Family         | Notes                                                                        |
| ---------------------- | -------------- | ---------------------------------------------------------------------------- |
| Display / headings     | Roboto Slab    | Editorial slab voice; headings render 600 where they are part of the system. |
| Body / UI / subheading | Roboto         | Default reading and control face.                                            |
| Meta / eyebrows        | JetBrains Mono | Approximately `0.12em`–`0.18em` tracking for labels.                         |

Type scale from `globals.css`:

- `display`: `clamp(2.25rem, 4.5vw, 3.5rem)`, line-height `1.1`, tracking `-0.01em`
- `h2`: `clamp(1.625rem, 3vw, 2.5rem)`, line-height `1.15`, tracking `-0.005em`
- `h3`: `1.25rem`, line-height `1.25`
- `lede`: `1.0625rem`, line-height `1.6`
- `body`: `1rem`, line-height `1.65`
- `meta`: `0.8125rem`, line-height `1.5`
- Reading measure: `--measure: 68ch`

## Layout and rhythm

- `--container-page`: `80rem`; shared `Container` keeps headings and cards on one left edge.
- Spacing base: `4px`; use the established 4/8/12/16/24/32/48/64/96 rhythm.
- Radii: control `0.5rem`, card `0.75rem`, panel `1rem`, hero `1.5rem`.
- Elevation is almost absent: at most the small card-clean/card-float shadows already tokenised.
- Section transitions use surface changes and compact ink bands, not decorative dividers.
- The composition is editorial and asymmetric where useful, but all reading sections share the container edge.

## Navigation

- Header height: `64px` mobile, `80px` desktop; sticky solid `bg-bg` with a hairline bottom border. No blur/glass treatment.
- At `lg`, the bar is a `1fr / auto / 1fr` grid: logo left, one centred group of six text links, right slot empty.
- Links: Home, Services, Portfolio, About, Contact, Careers, in that order. Each has a small decorative `NavIcon`; text still names the destination.
- Targets: `/#home`, `/services#all-services`, `/portfolio#projects`, `/about`, `/contact`, `/careers`.
- Careers uses the briefcase icon. Active state is ink text plus an accessible burnt-orange underline; the mobile drawer adds a text “Current” cue.
- There is no header CTA and no secondary button in the right slot.
- Mobile drawer uses the native `<dialog>` with focus trap, `Esc` close, focus return, body-scroll lock and close on resize to desktop.

## Hero

Current Home hero source of truth is `app/pages/Home.tsx`; this locked direction is the reference.

- Desktop block: `lg:min-h-[calc(100vh-5rem)]`, vertically centred in the viewport; mobile and tablet keep natural flow.
- Badge: `SECURE, HIGH-PERFORMANCE WEB-APP` (uppercase in source).
- H1: sentence case, `Your website should be winning more enquiries.`, with the highlighted clause in `--color-primary-text`.
- Lede: a direct paragraph about speed, clarity and end-to-end accountability, written in `Home.tsx` rather than pulled from `site.footer.brandLine`.
- Actions: primary `Get a clear scope` → `/contact`; secondary `See the thinking` → `/portfolio`; risk-reversal microcopy beneath both.
- The dark index panel uses outcome-led rows derived from `services.ts` and ends with `Talk it through` plus an arrow. It is an index, not a normal card.

## Components and actions

- `Button`: one component; `primary` fill, `secondary` outline on light, `light` outline on dark. Sizes are `md` (44px) and `lg` (48px). No shadows or glow.
- `Badge`: compact eyebrow marker for section identity.
- `SectionHeading`: mono eyebrow with the shared 6px orange dot marker. Decorative card numbers are removed; do not reintroduce them.
- Cards: `rounded-card border-line bg-surface`, mono meta, 20px/600 titles, restrained body tiers.
- CTA hierarchy: `primaryCta` (`Get a clear scope`) is shared by the hero’s orange primary and the closing `#quote` band; About’s hero uses `Talk to the team directly` plus a quiet `See concept work` link. No CTA in the header or footer.

## Careers

The shipped page keeps the same tokens and typography: `Join the studio` badge, `We're hiring.` heading, three role cards, a dark “How to apply” panel and the real `creaova.co@gmail.com` mail link. It is a normal nav destination with a briefcase icon and active underline, not an external or hidden page. Each role card carries an experience band and a `What you'll bring` list (stack, shipped-work evidence such as Behance or GitHub, and role-specific skills) using mono meta labels and small orange bullet dots.

## Accessibility

- Target WCAG AA. Orange fill text always uses the accessible pair documented above.
- Focus ring adapts to its ground; never use an orange focus ring on cream.
- Interactive targets are at least 44px; primary buttons are 48px.
- Skip link, semantic landmarks, labelled form fields, `role="status"`/`role="alert"` feedback and descriptive image alts are required.
- Hidden state must remain non-colour cues where possible; the mobile drawer uses a text “Current” marker.
- Motion is restrained and disabled under `prefers-reduced-motion`.
