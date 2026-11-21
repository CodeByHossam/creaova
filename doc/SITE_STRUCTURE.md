# Site structure and user flows

## Route map

| Route        | Purpose                                                  | Primary action                           |
| ------------ | -------------------------------------------------------- | ---------------------------------------- |
| `/`          | Explain the studio and surface proof quickly             | `Get a clear scope` → `/contact`         |
| `/services`  | Three offerings, engagement model and four-step approach | Service cards → `/contact`               |
| `/portfolio` | Concept work, featured first then grouped by category    | Concept demo/API links where available   |
| `/about`     | Studio principles, working model and concept example     | `Talk to the team directly` → `/contact` |
| `/careers`   | Open roles and application instructions                  | Email `creaova.co@gmail.com`             |
| `/contact`   | Project enquiry form and direct channels                 | `Send my brief` → Web3Forms              |
| `/privacy`   | Data handling disclosure                                 | Read                                     |
| `/terms`     | Site terms                                               | Read                                     |
| `*`          | Custom 404/error boundary                                | Back to homepage                         |

## Navigation

Desktop and mobile both render the six links from `site.nav`:

| Label     | Target                   | Icon id   |
| --------- | ------------------------ | --------- |
| Home      | `/#home`                 | home      |
| Services  | `/services#all-services` | services  |
| Portfolio | `/portfolio#projects`    | portfolio |
| About     | `/about`                 | about     |
| Contact   | `/contact`               | contact   |
| Careers   | `/careers`               | careers   |

`getActiveNavHref()` gives one current marker per nav landmark: an exact hash match wins; otherwise a path-only item wins; otherwise the first hash item for that path is the page-level destination. This keeps `/services` on Services and `/services#process` on the process item. The footer uses `Our approach` for `/services#process`; it does not use the old ambiguous label.

The header has no CTA. The mobile drawer repeats the six links and ends with email, phone and WhatsApp channels.

## Page anatomy

### Home

1. Hero: badge, h1, lede, `Get a clear scope`, `See the thinking`, risk-reversal microcopy and the dark outcome-led services panel.
2. `01 Services`: compact ink heading band, lede and three discipline cards linking to service anchors.
3. Studio-vs-freelancer proof band.
4. Selected work: concept cards with visible Concept badges and descriptive alts; tablet-only concept filler at `sm`–`lg`.
5. `03 Quality`: heading inside the light section with shared `ProcessCard`s.
6. `04 Confidence`: dark intro column plus three quality cards using partnership, reliability and growth icons.
7. Proof/FAQ panels and a closing `#quote` band using `primaryCta`.

### Services

- Hero at `#all-services`: badge, `The right build for the job` / `and a team that stays.`, mono line and lede.
- Service cards at `#services`: Web Design, Web Development, Mobile Apps, each linking to Contact.
- Engagement section: three quiet notes.
- `#process`: four-step approach — understand, shape, build, launch and support.
- Closing `#quote` band.

Defined anchors: `#all-services`, `#services`, `#web-design`, `#web-development`, `#mobile-apps`, `#process`.

### Portfolio

- Dark work band at `#projects`: `See how we think before you decide who to trust.` and an explicit concept disclaimer.
- Featured builds: first three entries from `clientProjects.ts`.
- Remaining entries grouped by their existing `category` strings, with category filters and live count.
- Tablet-only `Work Note` card appears only in the two featured grids at `sm`–`lg`.
- Every card is labelled concept work; demos/APIs link out where available.
- Closing `#quote` band.

### About

- Centred hero at every width: badge, h1, mono line, lede, `Talk to the team directly` and `See concept work`.
- Labelled Mentora Learning concept frame below the copy, capped at 768px.
- Principles as a hairline ledger.
- Working model using the shared `ProcessCard` grammar.
- Point-of-view copy.
- Single dark closing `#quote` band.

### Careers

- Badge, hiring headline and short studio intro.
- Three open roles: Web Designer, Web Developer, Mobile App Developer.
- Dark “How to apply” panel with the real studio email.
- Back-to-home link. No closing CTA band.

### Contact

- Compact hero with mono line `Clear next steps, no obligation.`
- Project enquiry form: name, email, service, optional project stage, message, honeypots, hCaptcha and submit.
- Aside repeating `contactChannels` from constants plus the live Instagram profile.
- Privacy notice beside the form.

### Privacy, Terms and 404

Privacy and Terms are full reading pages built from the shared `LegalPage` component and `config/site.json` effective date. They name the actual providers and need legal review before publication. The 404 route uses the `ErrorBoundary` in `app/root.tsx`; the host-level `public/404.html` and SPA fallback head are generated from the same `config/site.json` metadata.

## Footer

- Logo/lockup and brand line.
- Three short link groups: Services, Studio, Company.
- Legal links: Privacy, Terms.
- Contact channels from `contactChannels`: email, phone, WhatsApp, hours and region.
- All contact text uses `text-on-dark-muted`; there is no footer CTA button.

## Main user flows

1. **Evaluate and enquire:** search/referral → Home hero → selected work or Services → Contact form → Web3Forms/direct email fallback.
2. **Mobile evaluate and enquire:** phone → menu drawer → Portfolio/Services/Contact → form or direct channel.
3. **Apply:** Careers nav link → role list → email application to `creaova.co@gmail.com`.
4. **Crawler:** per-route metadata and canonicals → generated sitemap/robots → prerendered HTML for every public route.

Hash deep links must land on the target below the sticky header; `MainLayout.tsx` handles this after paint and respects reduced motion.
