# Product and content

## What the site is

Creaova Digital Solutions [CDS] is an established digital studio in the United Arab Emirates offering web design, web development and mobile app development. This site is its public marketing presence: it explains the studio’s work, lets a visitor judge credibility through honest concept work, and routes that visitor to a project enquiry.

The positioning is “a partner, not a vendor”: clear process, secure and fast builds, search-friendly foundations, and support after launch. Success is an informed visitor who trusts the studio and a qualified enquiry reaching the business inbox.

## Users

- **Prospective client:** a UAE SME, startup, clinic or consultant deciding whether Creaova is credible and competent.
- **The same person on a phone:** often arriving from search or a shared link, wanting a short path to contact.
- **Job seeker:** a designer or developer looking for open studio roles and a way to apply.
- **Search crawler:** must discover and understand every public page.
- **Site owner:** needs services presented honestly and project enquiries delivered by email.

## Core user needs

| Need                                                  | Current implementation                                                                                                           |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Understand what the studio does from the first screen | Home hero states the offer, audience language, primary action, risk-reversal microcopy and an outcome-led services panel.        |
| Judge quality before contacting                       | Concept work appears in the Home selected-work area and has a dedicated Portfolio route.                                         |
| Understand services and process                       | `/services` covers the three offerings, engagement model and four-step approach.                                                 |
| Contact without friction                              | Primary action goes to `/contact`; direct email, phone, WhatsApp, hours and region are repeated in the footer and Contact aside. |
| Apply for a role                                      | `/careers` lists three roles and uses the real studio email.                                                                     |
| Trust what is read                                    | All portfolio work is labelled as concept work; no invented proof is presented.                                                  |

## Honesty rules

These are binding for all content changes:

- Do not invent testimonials, metrics, awards, client logos, city names or shipped-client claims.
- Every portfolio item is a **concept/demo build**, never a real client product. A public demo link does not change that status.
- Keep the visible “Concept” label on concept work and use descriptive alt text.
- The tablet-only card in the two concept-work grids (Home → Selected work and `/portfolio` → Featured builds) is the real `Work Note` concept build. It is selected from `clientProjects.ts` by slug in `app/data/projects.ts`, renders only at `sm`–`lg` to balance the 2-column grid, and takes its title, category, year, description and screenshot from that canonical record.
- Contact copy must not promise response times or delivery that has not been verified. The current success message says the enquiry was submitted and that the studio will be in touch soon.
- Use “United Arab Emirates” / “the UAE”, not a city name; do not use “Made in the UAE”.
- Do not add a header CTA. The primary CTA belongs to the hero and the closing band.

## Content sources

| Concern                                          | Source of truth                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| Navigation labels, targets and icons             | `app/data/constants.ts` (`site.nav`)                               |
| Contact details, footer structure, site identity | `app/data/constants.ts`                                            |
| Services and process steps                       | `app/data/services.ts`                                             |
| Portfolio entries                                | `app/data/clientProjects.ts`                                       |
| Home/About concept subset                        | `app/data/projects.ts`                                             |
| Tablet-only concept card selection               | `app/data/projects.ts`                                             |
| Shared page metadata                             | `app/data/pageMeta.ts` + `config/site.json`                        |
| Legal effective date                             | `config/site.json` → `app/data/legal.ts`                           |
| Page copy and section order                      | `app/pages/*`                                                      |
| Canonical origin                                 | `VITE_SITE_URL` → `app/data/env.ts` → `site.url` → `absoluteUrl()` |

## Contact details

- Email: `creaova.co@gmail.com`
- Phone and WhatsApp: `+971 52 525 982`; both links are generated from the same raw number.
- Hours: `Sun–Thu, 9am–6pm (GST)`
- Region: `United Arab Emirates`
- Instagram: live profile in `site.socialLinks`
- LinkedIn and Behance: deliberately rendered as plain text until real URLs are supplied.

LinkedIn and Behance have no URL yet, so they are omitted from the rendered social links. There is no derived placeholder flag on `site`; unresolved channels simply stay non-clickable until the owner supplies real destinations.

## Known content gaps

- Web3Forms delivery to `creaova.co@gmail.com` has not been verified end to end.
- Privacy and Terms need legal review before public launch.
- LinkedIn and Behance URLs are missing.
- There are no verified client testimonials, metrics, awards or logos; do not add any by implication.
