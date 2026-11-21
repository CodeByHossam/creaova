# Sales & Advertising Audit — High-Ticket Client Conversion

**Prepared by:** Senior Sales Director / Advertising Manager (independent review)
**Date:** 21 November 2026
**Scope:** All public-facing copy and conversion paths on the Creaova website (Home, Services, About, Portfolio, Contact, shared CTA band, Footer, contact form).
**Constraint:** Review only. No code or content has been changed. **Awaiting approval before any edits.**

**Implementation status:** <span style="color:#16a34a">🟢 APPROVED AND IMPLEMENTED — 21 November 2026</span>. The original audit findings below are kept intact as a reference. Green `FIXED` markers show what was shipped; amber `FACT PENDING` markers show where a real-world fact is still required before a claim can be published.

---

## 0. Ground rules for this audit

This is a sales audit, not a critique of the visual design system. The visual restraint is deliberate and well executed. The problem is **persuasion**, not craft.

Two hard honesty constraints shape every recommendation:

1. **All portfolio work is explicitly labelled as concept work.** `Terms.tsx` states concepts are "illustrative" and "must not be treated as performance claims, endorsements, or guarantees of results." `clientProjects.ts` states every entry is a concept build, never shipped client work.
2. **Therefore this report will not invent testimonials, client names,metrics, awards, or years in business.** Where a trust signal requires a real fact, I mark it **`[FACT REQUIRED]`** and supply the exact sentence to use once the fact is confirmed. Publishing an invented statistic would create legal and reputational risk that far outweighs any conversion gain.

The strategy below replaces _fake proof_ with **truthful proof substitutes**: process transparency, specificity, response-time promises, scope clarity, and clearly-labelled concept thinking.

---

## 1. Executive summary

**Verdict:** The site reads as a **tasteful, trustworthy, quiet studio** — but it does not read as an **expensive, in-demand partner**. A CEO/Founder comparing Creaova with a freelancer or a larger agency will find very little to justify a premium fee.

The copy consistently describes **what the studio does** ("secure, fast, search-friendly", "clean code", "support after launch") rather than **what changes for the buyer** (fewer stalled projects, no vendor dependency, a launch that does not become a maintenance nightmare).

### Scorecard

| Dimension                             | Score /10 | One-line diagnosis                                                      |
| ------------------------------------- | --------: | ----------------------------------------------------------------------- |
| Hooks (headlines, subheads, badges)   |         4 | Polite and abstract; no pain, no stakes, no differentiation             |
| Value proposition                     |         5 | Clear category, unclear reason to choose Creaova                        |
| Differentiation vs cheaper freelancer |         3 | Never addressed. The word "freelancer" never appears.                   |
| UAE trust signal                      |         4 | Location is stated; longevity, scale and credibility are not            |
| Attractiveness to a CEO/Founder       |         5 | Editorial restraint is elegant but emotionally flat and jargon-heavy    |
| CTA strength                          |         5 | Visible and well-placed, but generic and commitment-heavy               |
| Risk reversal                         |         4 | "No obligation" exists but is buried; no response-time or scope promise |
| Missing sales elements                |         2 | No testimonials, case-study numbers, pricing anchors, FAQ or guarantee  |
| Dark box / Services index             |         6 | Premium _container_, standard _menu_ — the biggest quick win            |
| **Overall**                           |   **4.4** | **A beautiful brochure. Not yet a sales asset.**                        |

### The three changes with the highest commercial impact

1. **Replace the hero with a pain-led, outcome-led statement** and a specific micro-promise under the CTA. (Section 3.1)
2. **Build a "Why a studio, not a freelancer" block** with three explicit contrasts. (Section 4.2)
3. **Reframe the hero Index card from a service menu into a premium outcomes panel.** (Section 8)

---

## 2. What the site currently _actually says_

Quoted verbatim from the live files so the recommendations are auditable.

| Location            | Current copy                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home badge          | `Digital experience architecture`                                                                                                                        |
| Home H1             | `We build websites that build your business`                                                                                                             |
| Home mono sub       | `Secure, fast, search-friendly websites and apps.`                                                                                                       |
| Home lede           | `An established digital studio in the UAE. We design and build secure, high-performing websites and apps — and stay with you as a partner after launch.` |
| Home CTAs           | `Start a project` / `View our work`                                                                                                                      |
| Home facts          | `Established in / United Arab Emirates` · `After launch / We stay involved`                                                                              |
| Home Index card     | `Index — what we build` → `Web design` / `Web development` / `Mobile app development` → footer `A UAE studio` · `All services`                           |
| Services badge      | `High-performance disciplines`                                                                                                                           |
| Services H1         | `Web. Product. Mobile.`                                                                                                                                  |
| Services mono sub   | `Secure, fast, search-friendly builds, with real support after launch.`                                                                                  |
| Services lede       | `Design and engineering under one roof — secure, fast, search-friendly builds, with real support after launch.`                                          |
| Services process    | `Our four-step process.`                                                                                                                                 |
| About H1            | `We build digital experiences that earn trust and make ambitious businesses easier to choose.`                                                           |
| About quote         | `Every decision should make the experience more coherent for the people using it.`                                                                       |
| Portfolio H1        | `Concept builds, shown end to end.`                                                                                                                      |
| Contact H1          | `Let's build something you can rely on.`                                                                                                                 |
| Contact mono        | `Clear next steps, no obligation.`                                                                                                                       |
| Contact form budget | `Under AED 5,000` / `5,000–10,000` / `10,000–25,000` / `25,000+`                                                                                         |
| Contact success     | `Thanks — your enquiry has been submitted. We'll be in touch soon.`                                                                                      |
| CTA band            | `Start a conversation` / `Let's build something reliable.`                                                                                               |
| Footer brand line   | `An established digital studio in the UAE... and stay with you as a partner after launch.`                                                               |

**Immediate observation:** the same four adjectives — _secure, fast, search-friendly, reliable_ — are repeated across Home, Services, About, Portfolio, CTA band and Footer. Repetition builds category recognition, but here it has crossed into **semantic monotony**: after the sixth mention, the buyer stops encoding it as a benefit and starts encoding it as boilerplate.

---

## 3. The Hooks

### 3.1 Home hero headline <span style="color:#16a34a">🟢 FIXED</span>

> `We build websites that build your business`

**Diagnosis.** This is tautological. It uses "build" twice and "websites" twice, and the promised outcome ("your business") is so large that it means nothing. It does not name a pain, a stake, or a mechanism.

**Psychology.** High-ticket buyers use the first 3–5 seconds to answer: _"Do they understand a problem like mine?"_ A generic value statement fails the **specificity heuristic** — specific claims are processed as evidence of expertise; abstract claims are processed as advertising. The headline also misses **loss aversion**: the buyer is more motivated by "stop losing enquiries to a slow, confusing site" than by "build your business."

**Recommended replacements (pick one, test all three):**

- **A — Pain-led (recommended):**
  `Your website should be winning enquiries, not quietly losing them.`
- **B — Stakes-led:**
  `A slow, unclear website costs you trust before anyone speaks to you.`
- **C — Outcome-led, still safe:**
  `Websites and apps that make your business easier to choose.`

**Supporting mono sub (replaces "Secure, fast, search-friendly websites and apps."):**

- `Built for speed, clarity and the moment a visitor decides whether to trust you.`

### 3.2 Home badge <span style="color:#16a34a">🟢 FIXED</span>

> `Digital experience architecture`

**Diagnosis.** This is internal agency language. "Architecture" signals complexity to a buyer who wants simplicity. A badge should create _relevance_, not _awe_.

**Psychology.** Badges work as **categorisation cues** — they tell the visitor which mental file to open. "Digital experience architecture" opens a vendor file. A client-benefit badge opens a buyer file.

**Replacements:**

- `For businesses that need their website to perform` ← recommended
- `UAE web & app studio · Strategy to support`
- `Websites, apps, and the team behind them`

### 3.3 Services hero <span style="color:#16a34a">🟢 FIXED</span>

> `Web. Product. Mobile.` + a mono line and lede that say **the same thing twice**.

**Diagnosis.** This is the clearest copy defect on the site. Two adjacent paragraphs both read: _"Secure, fast, search-friendly builds, with real support after launch."_ That is not emphasis; it is duplication. "Web. Product. Mobile." is punchy but product-centric, not buyer-centric.

**Psychology.** Repetition inside the same visual breath increases **processing fluency** at first, then triggers **banner blindness** and signals low editorial quality. A founder reads duplication as "no one reviewed this page" — which quietly undermines the premium positioning.

**Replacement set:**

- Badge: `What we build`
- H1: `The right build for the job — and a team that stays.`
- Mono sub: `Strategy, design, engineering and support. One studio.`
- Lede (single, no duplicate): `We take a rough idea or an underperforming site and turn it into a clear, fast, dependable product your team can actually use — with the same people available after launch.`

### 3.4 About hero <span style="color:#16a34a">🟢 FIXED</span>

> `We build digital experiences that earn trust and make ambitious businesses easier to choose.`

**Diagnosis.** Twenty-one words, three abstractions ("digital experiences", "trust", "easier to choose"), no subject-specific proof. It sounds like an agency manifesto, not a reason to hire.

**Replacement:**

- `A UAE studio for teams that need the work done properly — and kept working.`
- Sub: `Small enough that you speak to the people building it. Structured enough to deliver.`

### 3.5 Portfolio hero <span style="color:#16a34a">🟢 FIXED</span>

> `Concept builds, shown end to end.` / `A closer look at what each concept explores, and the thinking behind it.`

**Diagnosis.** Honest, but commercially self-defeating. Both lines foreground _concept_ and _exploration_ rather than _capability_. The word "concept" is necessary for compliance, but it currently leads every message instead of sitting in a label.

**Replacement:**

- H1: `See how we think before you decide who to trust.`
- Lede: `These are concept builds — illustrative work that shows our process, decisions and craft. They are not client case studies.`
- Keep the `Concept` badge on each card; move honesty into the label, not the headline.

---

## 4. Value proposition & differentiation

### 4.1 Is the value proposition clear?

**Partly.** The site clearly communicates _category_ (UAE digital studio, web + mobile, secure/fast/search-friendly, support after launch). It does **not** communicate _why Creaova over the alternatives_.

The current proposition decomposes to:

> "We are a UAE studio that makes secure, fast websites and apps and stays involved after launch."

Every competent agency and most freelancers could sign that sentence. It is a **category description**, not a **positioning statement**.

**Recommended positioning statement (internal — use to align all copy):**

> For UAE businesses that have been burned by a slow, abandoned, or hard-to-maintain digital project, Creaova is a studio that takes responsibility from first conversation to after launch — with one team, visible decisions, and no disappearing act.

### 4.2 Why choose Creaova over a cheaper freelancer? <span style="color:#16a34a">🟢 FIXED</span>

**This is the single biggest gap in the site.** The word "freelancer" never appears. The comparison is never made. Yet it is the _actual_ decision the buyer is making.

**Psychology.** Buyers do not evaluate absolute quality; they evaluate **relative risk**. A cheaper freelancer appears lower-cost but carries hidden risks: single point of failure, unclear process, no handover, no one to call in month six. Creaova's real advantage is **continuity and accountability** — but the site only hints at it with "we stay involved."

**Recommended new section for Home (after Services, before Work):**

> **Eyebrow:** Studio, not a single point of failure
> **H2:** `The cheaper option can cost more by month six.`
> **Lede:** `A freelancer can be a good fit for a small, contained task. When the site is central to your business, the risk is not the build — it's what happens when something breaks and no one owns it.`
>
> **Three contrast cards:**
>
> 1. **One team, not one person.** `Design, engineering and support under one roof. No chasing three separate contacts when something needs to change.` _(tag: Continuity)_
> 2. **Decisions you can see.** `You review and approve each step. No black box, no surprise invoice at the end.` _(tag: Visibility)_
> 3. **Still here after launch.** `Fixes, guidance and the next improvement — from the people who built it.` _(tag: Accountability)_
>
> **Footer line under cards:** `Not sure which route you need? Ask us. We'll tell you honestly if a studio is overkill.`

That last line is a **disqualification cue** — counter-intuitively, telling some buyers _not_ to buy increases trust with the buyers you want (the "honesty signal").

### 4.3 Is the "UAE established studio" signal strong enough? <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING: founding year</span>

**No.** Current hero fact: `Established in / United Arab Emirates`. This conflates **location** with **longevity**. It tells the buyer where the studio is, not how long it has been credible. "Established in [country]" is not a standard trust phrase and reads slightly awkward.

**What is missing:** a year, a scale signal, a local-presence signal, and a responsiveness promise.

**Truthful upgrades (use only what is verifiable):**

- `UAE-based studio · [FACT REQUIRED: founded YEAR]`
- `Working with businesses across the GCC · [FACT REQUIRED if true]`
- `Sun–Thu, 9am–6pm GST · Direct line and WhatsApp` — **this is already true** (contact hours + phone/WhatsApp exist in `constants.ts`) but is not used as a trust signal on the hero.
- `Response within one business day` — **only if the team can actually honour it.**

**Recommended hero fact block:**

| Current                                 | Recommended                                              |
| --------------------------------------- | -------------------------------------------------------- |
| `Established in / United Arab Emirates` | `Based in / United Arab Emirates`                        |
| `After launch / We stay involved`       | `Reply time / Within one business day` `[FACT REQUIRED]` |

Move longevity to a separate, verifiable line only if a real year exists: `Building for businesses since [YEAR].`

---

## 5. Attractiveness & friction for a CEO / Founder

### 5.1 Language that is too technical <span style="color:#16a34a">🟢 FIXED</span>

These are real strings from the site:

- `Conversion-focused web platforms on modern infrastructure`
- `Elastic foundations, measurable experiments, and dependable systems`
- `Clean architecture`, `Hardened Development`
- `React and TypeScript with clean, secure code and strong performance and SEO foundations`
- `SEO-ready foundations`

A founder does not buy "elastic foundations." They buy _not having to think about it again_. Translate each into business language:

| Technical                                 | Buyer language                                                 |
| ----------------------------------------- | -------------------------------------------------------------- |
| Conversion-focused web platforms          | `A site built to turn visitors into enquiries`                 |
| Elastic foundations                       | `A site that won't need rebuilding when you grow`              |
| Clean architecture / hardened development | `Fewer bugs, safer data, cheaper changes later`                |
| React and TypeScript                      | _Remove from marketing copy. Keep in technical documentation._ |
| SEO-ready foundations                     | `Built so people can find you on search`                       |
| Measurable experiments                    | `Clear evidence of what is working`                            |

### 5.2 Emotional flatness <span style="color:#16a34a">🟢 FIXED</span>

The site is almost entirely **functional benefit** (secure, fast, clean, on time). Missing is the **emotional benefit**: relief, confidence, pride, the feeling of finally having a vendor who picks up the phone.

The About quote — `Every decision should make the experience more coherent for the people using it.` — is a _design_ belief, not a _business_ belief. It is aimed at designers, not founders.

**Replacement quote (still honest):**

> `You should never have to chase the people who built your site.`

### 5.3 Repetition and cognitive load <span style="color:#16a34a">🟢 FIXED</span>

"Support after launch" / "we stay involved" / "partner beyond launch" appears in Home hero, Home services lede, Home confidence section, Services hero, Services engagement, About principles, About working model, CTA band and Footer. Nine occurrences of the same idea.

**Psychology.** The **serial-position effect** means the first mention lands; later mentions are filtered as repetition. Vary the expression and move the strongest version to the point of decision (the CTA band), not every section.

### 5.4 The contact form is the highest-friction point on the site <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING: one-business-day reply promise</span>

Current friction stack:

1. Required `Service needed` dropdown — forces a buyer who is not sure yet to guess.
2. Budget dropdown capped at **`AED 25,000+`** — see below.
3. Required `Tell us about the project` with a `minLength={20}` — reasonable, but not signposted as helpful.
4. **hCaptcha** — explicit friction, visible spam/privacy copy.
5. Button says `Send enquiry`.
6. Success message: `We'll be in touch soon.` — no timeframe.

**The budget anchor is actively damaging.** For a high-ticket buyer, a top tier of `AED 25,000+` anchors the entire engagement at "small local project." It is a **price ceiling disguised as an option**. Two options:

- **If Creaova's typical engagements exceed AED 25k:** raise the top tiers to reflect reality, e.g. `AED 25k–50k`, `AED 50k–100k`, `AED 100k+`. `[FACT REQUIRED: real ranges]`
- **If not ready to publish numbers:** remove the field entirely and replace with `What stage are you at?` → `Just an idea` / `Scope is clear` / `Ready to start`. This gives segmentation without anchoring low.

**Recommended form microcopy:**

- Service label: `What do you need? (best guess is fine)`
- Budget/message: `Not sure about budget yet? Leave it blank — we'll ask.`
- Button: `Get a clear next step` (replaces `Send enquiry`)
- Under button: `One short form. A direct reply within one business day.` `[FACT REQUIRED]`
- Success: `Thanks — we've got it. Expect a reply within one business day (Sun–Thu, 9am–6pm GST).`

**hCaptcha:** keep it for spam control, but move the explanatory paragraph _below_ the submit button and shorten it to one line. Its current position adds anxiety at the exact moment of commitment.

---

## 6. Calls to action

### 6.1 Current CTAs <span style="color:#16a34a">🟢 FIXED</span>

| Placement                               | Label                                   | Issue                                    |
| --------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Home hero                               | `Start a project`                       | Commitment-heavy; assumes buyer is ready |
| Home hero secondary                     | `View our work`                         | Generic; does not say why                |
| Services / About / Portfolio / CTA band | `Start a project` / `Discuss a project` | Same label everywhere loses urgency      |
| Contact submit                          | `Send enquiry`                          | Administrative, not outcome-led          |
| Footer                                  | no primary CTA, only contact details    | Missed final conversion point            |

**Psychology.** "Start a project" asks the buyer to imagine a contract, a budget meeting and a sales call. A lower-commitment **micro-yes** ("get a clear scope", "tell us what you're building") converts more visitors into enquiries, because it matches their actual stage.

### 6.2 Recommended CTA ladder <span style="color:#16a34a">🟢 FIXED</span>

| Stage          | Replace with                                  |
| -------------- | --------------------------------------------- |
| Hero primary   | `Get a clear scope`                           |
| Hero secondary | `See the thinking`                            |
| Services       | `Tell us what you need`                       |
| About          | `Talk to the team directly`                   |
| Portfolio      | `Discuss a direction`                         |
| CTA band       | `Get your project outline`                    |
| Contact submit | `Send my brief`                               |
| Footer (new)   | `Not ready to talk? Start with our process →` |

**Always pair the primary CTA with a risk-reversal line:**

> `No obligation. One short form. A real reply, not a sales sequence.`

---

## 7. Missing sales elements

Ranked by commercial impact. All must be truthful.

### P0 — Missing now, highest impact <span style="color:#16a34a">🟢 FIXED / SUBSTITUTED</span>

1. **Social proof.** No testimonials, no client names, no endorsements. `[FACT REQUIRED: 3–5 real quotes from real clients, with permission.]` Until those exist, use a **process-proof panel** instead: three verifiable commitments (response time, named contacts, written scope). <span style="color:#16a34a">🟢 FIXED — process-proof panel shipped</span> <span style="color:#b45309">🟠 FACT PENDING — real testimonials</span>
2. **Case study numbers.** No "before → after" metrics. Cannot be fabricated. Interim substitute: **case-study structure without performance claims** — `Brief → Decision → Build → What changed in the product` for each concept, clearly labelled illustrative. <span style="color:#16a34a">🟢 FIXED — concept walkthroughs shipped for three featured concepts</span>
3. **Risk reversal.** "No obligation" exists but is buried in Contact. Promote it to the hero and CTA band; add a **written-scope promise**: `You approve the scope and price before any work begins.` This is a process fact, not a performance claim, and is the strongest high-ticket risk reverser available. <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING — one-business-day reply promise</span>
4. **"Why us vs freelancer" comparison.** Entirely absent. See 4.2. <span style="color:#16a34a">🟢 FIXED</span>

### P1 — Strong supporting elements <span style="color:#16a34a">🟢 FIXED</span> <span style="color:#b45309">🟠 FACT PENDING: testimonials, named team</span>

5. **Pricing anchors** — currently misleadingly low. See 5.4. <span style="color:#16a34a">🟢 FIXED</span>
6. **FAQ / objection handling** — no answer to "How long?", "What does it cost?", "Do you work with our existing brand?", "What if we need changes later?", "Who owns the code?". A five-question FAQ near the CTA band would remove the last-minute hesitation. <span style="color:#16a34a">🟢 FIXED</span>
7. **Response-time promise** — the site has real contact hours and WhatsApp but does not turn them into a service promise. <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE — hours now used as a trust signal</span> <span style="color:#b45309">🟠 FACT PENDING — one-business-day promise</span>
8. **Named people / team** — a founder selling high-ticket work is buying _who_ will do it. Even a two-person studio benefits from names and roles. `[FACT REQUIRED]` <span style="color:#b45309">🟠 FACT PENDING — no names invented</span>
9. **"Who it's for / not for"** — e.g. `Good fit: established businesses replacing an underperforming site. Not a fit: one-page brochures or same-day turnarounds.` This is a powerful credibility signal. <span style="color:#16a34a">🟢 FIXED</span>

### P2 — Nice to have <span style="color:#16a34a">🟢 FIXED IN PART</span> <span style="color:#b45309">🟠 FACT PENDING: recognition, lead-magnet delivery</span>

10. **Guarantee** — e.g. a fixed-scope agreement or a post-launch support window. Only if operationally real. <span style="color:#16a34a">🟢 FIXED — written-scope/price approval shipped</span> <span style="color:#b45309">🟠 FACT PENDING — formal post-launch support window</span>
11. **Recognition / certifications / partners** — `[FACT REQUIRED]`, none currently shown. <span style="color:#b45309">🟠 FACT PENDING — none invented</span>
12. **Lead magnet** — a short "Website readiness checklist" in exchange for an email. Useful, but lower priority than fixing the core promise. <span style="color:#b45309">🟠 FACT PENDING — needs an email-capture delivery flow; not shipped as a false promise</span>

---

## 8. The Dark Box / Services Index <span style="color:#16a34a">🟢 FIXED</span>

**Question asked:** does the right-hand Index card make services feel premium, or like a standard list?

**Answer:** It has **premium bones but a standard-list soul.**

### What already works

- Dark ink panel against a light hero — strong figure/ground separation.
- Display-face row labels at large size — feels editorial.
- Hairline dividers, generous vertical rhythm, arrow reveal on hover — refined.
- Footer line bottom-aligned — visually settled after the earlier fix.

### What makes it read as a menu

- The label literally says `Index — what we build`. "Index" is a navigation word, not a value word.
- The rows are bare service names: `Web design`, `Web development`, `Mobile app development`. That is a menu, identical in structure to a restaurant list.
- No outcome, no proof fragment, no differentiation per row.
- The footer `A UAE studio` understates the trust signal; `All services` is a weak closing action.

### Recommended reframing

> **Eyebrow:** `Three ways we help` _(replaces `Index — what we build`)_
>
> **Row 01** — `Websites that earn the enquiry`
> `Clear journeys, fast load, built to be found.` → `Web design →`
>
> **Row 02** — `Development that holds up`
> `Secure, maintainable, ready to grow.` → `Web development →`
>
> **Row 03** — `Mobile products people keep using`
> `Useful first. Native-feeling always.` → `Mobile apps →`
>
> **Footer:** `Not sure which you need? [Talk it through →]`

**Psychology.** Naming the _outcome_ rather than the _deliverable_ activates the buyer's **goal frame**. Adding a one-line mechanism beneath each outcome supplies **processing fluency** — the buyer can see _how_ the promise is kept, which is what separates premium positioning from a price list. Changing the footer to a conversation invitation converts a directory into a **consultation entry point**.

---

## 9. Ready-to-use copy deck

All strings below are drop-in replacements. Items marked `[FACT REQUIRED]` must be verified before publishing.

### 9.1 Home hero <span style="color:#16a34a">🟢 FIXED</span> <span style="color:#b45309">🟠 FACT PENDING — reply-time line replaced with verified office hours</span>

```
Badge:      For businesses that need their website to perform
H1:         Your website should be winning enquiries, not quietly losing them.
Mono sub:   Built for speed, clarity and the moment a visitor decides whether to trust you.
Lede:       A UAE studio that takes a project from first conversation to after launch —
            with one team, visible decisions, and no disappearing act.
Primary:    Get a clear scope
Secondary:  See the thinking
Microcopy:  No obligation. One short form. A real reply, not a sales sequence.
Fact 1:     Based in / United Arab Emirates
Fact 2:     Reply time / Within one business day   [FACT REQUIRED]
```

### 9.2 Services hero <span style="color:#16a34a">🟢 FIXED</span>

```
Badge:      What we build
H1:         The right build for the job — and a team that stays.
Mono sub:   Strategy, design, engineering and support. One studio.
Lede:       We take a rough idea or an underperforming site and turn it into a clear,
            fast, dependable product your team can actually use — with the same people
            available after launch.
Section H2: Built for the outcome, not the deliverable.
```

### 9.3 About hero <span style="color:#16a34a">🟢 FIXED</span>

```
Badge:      About Creaova
H1:         A UAE studio for teams that need the work done properly — and kept working.
Mono sub:   Small enough to stay close. Structured enough to deliver.
Lede:       Creaova Digital Solutions [CDS] pairs strategy, design and engineering,
            then stays with you after launch. You speak to the people doing the work.
CTA:        Talk to the team directly
Quote:      You should never have to chase the people who built your site.
```

### 9.4 Portfolio hero <span style="color:#16a34a">🟢 FIXED</span>

```
H1:         See how we think before you decide who to trust.
Lede:       These are concept builds — illustrative work that shows our process,
            decisions and craft. They are not client case studies.
Filter label: Explore concepts by industry
CTA:        Discuss a direction
```

### 9.5 CTA band <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING — one-business-day microcopy</span>

```
Eyebrow:    Start a conversation
H2:         Get a clear plan before you commit to anything.
Body:       Tell us what you're trying to launch or fix. We'll come back with the
            questions that matter, a sensible scope, and an honest answer on fit.
Button:     Get your project outline
Microcopy:  No obligation. Reply within one business day.   [FACT REQUIRED]
```

### 9.6 Contact page <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING — one-business-day success message</span>

```
Badge:      Contact
H1:         Tell us what you're building. We'll tell you what it takes.
Mono sub:   Clear next steps, no obligation.
Lede:       A few sentences is enough. We'll reply with the questions that matter
            and a sensible next step — not a sales sequence.
Field:      What do you need? (best guess is fine)
Second:     What stage are you at? → Just an idea / Scope is clear / Ready to start
Message:    Tell us about the project
Hint:       A few sentences is plenty. What are you trying to launch or fix?
Button:     Send my brief
Success:    Thanks — we've got it. Expect a reply within one business day
            (Sun–Thu, 9am–6pm GST).   [FACT REQUIRED]
```

### 9.7 New section — Why a studio, not a single freelancer <span style="color:#16a34a">🟢 FIXED</span>

```
Eyebrow:    STUDIO, NOT A SINGLE POINT OF FAILURE
H2:         The cheaper option can cost more by month six.
Lede:       A freelancer can be right for a small, contained task. When the site is
            central to your business, the risk isn't the build — it's what happens
            when something breaks and no one owns it.

Card 1 — One team, not one person.
         Design, engineering and support under one roof. No chasing three contacts.
Card 2 — Decisions you can see.
         You review and approve each step. No black box, no surprise invoice.
Card 3 — Still here after launch.
         Fixes, guidance and the next improvement from the people who built it.

Closing:    Not sure which route you need? Ask us. We'll tell you honestly if a
            studio is overkill.
```

---

## 10. Priority roadmap (awaiting approval)

| Priority | Action                                                                   | Effort                    | Expected impact                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Replace Home hero headline, badge, sub and CTA microcopy                 | Low                       | Highest — changes first impression and click-through <span style="color:#16a34a">🟢 FIXED</span>                                                                             |
| P0       | Add "Studio, not a single point of failure" section                      | Medium                    | Answers the real buying objection <span style="color:#16a34a">🟢 FIXED</span>                                                                                                |
| P0       | Promote risk reversal (`scope + price approved first`, `reply in 1 day`) | Low                       | Reduces exit rate at CTA <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE</span> <span style="color:#b45309">🟠 FACT PENDING — 1-day reply</span>               |
| P0       | Remove or raise the AED 25k budget anchor                                | Low                       | Stops under-pricing perception <span style="color:#16a34a">🟢 FIXED</span>                                                                                                   |
| P1       | Reframe hero Index card to outcome-led rows                              | Low                       | Premium perception, clarity <span style="color:#16a34a">🟢 FIXED</span>                                                                                                      |
| P1       | Fix duplicated Services lede; replace technical jargon                   | Low                       | credibility <span style="color:#16a34a">🟢 FIXED</span>                                                                                                                      |
| P1       | Rewrite CTA band + all CTA labels                                        | Low                       | Higher form starts <span style="color:#16a34a">🟢 FIXED</span>                                                                                                               |
| P1       | Add 5-question FAQ near final CTA                                        | Medium                    | Removes last hesitation <span style="color:#16a34a">🟢 FIXED</span>                                                                                                          |
| P1       | Collect and publish 3 real testimonials                                  | Medium (client-dependent) | Largest single trust gain <span style="color:#16a34a">🟢 FIXED — process-proof panel shipped instead</span> <span style="color:#b45309">🟠 FACT PENDING — real quotes</span> |
| P2       | Add named team, recognition, "who it's for / not for"                    | Medium                    | Differentiation <span style="color:#16a34a">🟢 FIXED — "who it's for / not for" shipped</span> <span style="color:#b45309">🟠 FACT PENDING — names and recognition</span>    |
| P2       | Build concept case-study structure (brief → decision → build)            | Medium                    | Turns concepts into credible proof <span style="color:#16a34a">🟢 FIXED</span>                                                                                               |

---

## 11. Measurement plan

Once changes are approved and shipped, track:

- **Hero CTA click-through rate** — primary indicator that the hook works.
- **Contact form start → submit completion** — isolates form friction (hCaptcha, budget field).
- **Scroll depth to CTA band** — whether the middle sections hold attention.
- **Enquiry quality** — proportion of enquiries with a clear scope/budget (not just volume).
- **Time to first reply** — must match whatever promise is published.

Run A/B tests on the hero headline (options A/B/C in 3.1) and the primary CTA label before standardising.

---

## 12. What NOT to do

- Do **not** invent client names, logos, testimonials, years in business, team size, awards or performance metrics.
- Do **not** present concept builds as shipped client work. Keep the `Concept` badge and the Terms disclosure.
- Do **not** promise "guaranteed results", specific ROI, or ranking positions.
- Do **not** publish a response-time or pricing promise the studio cannot honour operationally.
- Do **not** add scarcity or countdown tactics. They are transparently false for a studio of this positioning and would damage trust.

---

## 13. Approval request

**No changes have been made to the website.** This report is for review only.

Please confirm:

1. Which of the P0 actions to implement now.
2. Whether real testimonials, a founding year, team names and typical engagement ranges are available — these unlock the strongest remaining conversions.
3. Whether a one-business-day reply promise can be operationally honoured.

On approval, I will implement only the agreed items and leave all other content and code untouched.

---

## 14. Implementation status — approved 21 November 2026

All original findings above are retained unchanged as a reference. The table below records what was shipped after approval.

| Area                                                                                   | Status                                                                                                             | Where it landed                                                                                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Home hero, badge, mono sub, lede, CTA labels and microcopy                             | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`, `app/data/constants.ts`                                                                        |
| Hero fact block (`Based in`, verified office hours)                                    | <span style="color:#16a34a">🟢 FIXED WITH VERIFIED SUBSTITUTE — moved out of hero to keep it viewport-tight</span> | `app/data/constants.ts`, `app/components/Footer.tsx`                                                                 |
| Hero vertical rhythm and dark-box padding balance                                      | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`                                                                                                 |
| Laptop hero breathing room, positive-outcome highlight and trimmed line gaps           | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`                                                                                                 |
| Left hero block lifted slightly on laptop/desktop                                      | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`                                                                                                 |
| Desktop navigation link spacing                                                        | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/components/Navbar.tsx`                                                                                          |
| Full hero recheck — positive-outcome highlight scope, laptop lead gap, dark-box height | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`                                                                                                 |
| Laptop hero vertical centring, symmetric padding and breathing room                    | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`                                                                                                 |
| "Studio, not a single point of failure" section                                        | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | New `app/components/StudioVsFreelancer.tsx`, rendered on Home                                                        |
| Hero Index reframed to outcomes                                                        | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/data/services.ts`, `app/pages/Home.tsx`                                                                         |
| Jargon and unsupported performance strings removed                                     | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`, `app/pages/Services.tsx`, `app/data/services.ts`                                               |
| Duplicated Services lede fixed                                                         | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Services.tsx`                                                                                             |
| About hero and point-of-view quote                                                     | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/About.tsx`                                                                                                |
| Portfolio hero and filter label                                                        | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Portfolio.tsx`                                                                                            |
| CTA band and all CTA labels, including footer CTA                                      | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/components/CTABand.tsx`, `app/components/ServiceCard.tsx`, `app/components/Footer.tsx`, `app/data/constants.ts` |
| Contact page and form friction (stage selector replaces low budget anchor)             | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Contact.tsx`, `app/components/ContactForm.tsx`                                                            |
| Written-scope / price-approved-first risk reversal                                     | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Contact.tsx`, `app/components/ProofPanel.tsx`, `app/components/FAQ.tsx`                                   |
| hCaptcha note moved below submit and shortened                                         | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/components/ContactForm.tsx`                                                                                     |
| Process-proof panel in place of invented testimonials                                  | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | New `app/components/ProofPanel.tsx`, rendered on Home and Services                                                   |
| Five-question FAQ near the CTA                                                         | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | New `app/components/FAQ.tsx`, rendered on Home, Services, About and Portfolio                                        |
| "Who it's for / not for" panel                                                         | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | New `app/components/FitPanel.tsx`, rendered on About                                                                 |
| Concept case-study structure (Brief → Decision → Build → What changed)                 | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | New `app/components/ConceptCaseStudy.tsx`, rendered on Portfolio                                                     |
| Page metadata refreshed to match new positioning                                       | <span style="color:#16a34a">🟢 FIXED</span>                                                                        | `app/pages/Home.tsx`, `Services.tsx`, `About.tsx`, `Portfolio.tsx`, `Contact.tsx`                                    |
| Real testimonials / client names                                                       | <span style="color:#b45309">🟠 FACT PENDING — nothing invented</span>                                              | Needs 3–5 real quotes with permission                                                                                |
| Founding year / longevity claim                                                        | <span style="color:#b45309">🟠 FACT PENDING — nothing invented</span>                                              | Needs a verified year before publishing                                                                              |
| Named team and roles                                                                   | <span style="color:#b45309">🟠 FACT PENDING — nothing invented</span>                                              | Needs real names and roles                                                                                           |
| Typical engagement ranges / pricing numbers                                            | <span style="color:#b45309">🟠 FACT PENDING — low anchor removed, no new numbers invented</span>                   | Needs real ranges before publishing                                                                                  |
| One-business-day reply promise                                                         | <span style="color:#b45309">🟠 FACT PENDING — replaced with verified office-hours signal</span>                    | Needs operational confirmation                                                                                       |
| Recognition / certifications / partners                                                | <span style="color:#b45309">🟠 FACT PENDING — nothing invented</span>                                              | Needs verified proof                                                                                                 |
| Website readiness checklist lead magnet                                                | <span style="color:#b45309">🟠 FACT PENDING — needs email-capture delivery</span>                                  | Not shipped as a false promise                                                                                       |

**Verification:** `npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test` (2 files, 22 tests), `npm run build` and `npm run check:host-config` pass. Browser checks for rendered copy and interaction states are recorded in the delivery message.

---

## 15. Post-implementation content retest — updated sales score

**Date:** 21 November 2026 (after the completed implementation and hero refinement pass)
**Method:** Live browser retest of `/`, `/services`, `/about`, `/portfolio` and `/contact` against the required copy markers from Section 14, plus a banned-string sweep for every old / invented claim listed in Section 2 and the honesty constraints in Section 0.
**Preservation note:** Sections 0–14 above are retained verbatim. The original Section 1 scorecard below is **not** overwritten — it stays as the pre-implementation baseline. This section adds a new, post-implementation score alongside it.

### 15.1 Retest evidence

| Page      | Rendered H1                                                                   | Required copy markers                                                                                                                                                                                                                                                                     | Old / invented strings | FAQ Qs | Console errors |
| --------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -----: | -------------: |
| Home      | `Your website should be winning more enquiries.`                              | 9/9 present — positive-outcome highlight, `Built for speed, clarity…`, `No obligation. One short form. A real reply, not a sales sequence.`, `Studio, not a single point of failure`, `Three ways we help`, `Common questions`, `The answers before you ask.`, `Based in`, `Office hours` | none                   |      5 |              0 |
| Services  | `The right build for the job and a team that stays.`                          | 4/4 present — outcome-led H1, FAQ, `support after launch`                                                                                                                                                                                                                                 | none                   |      5 |              0 |
| About     | `A UAE studio for teams that need the work done properly — and kept working.` | 4/4 present — H1, `A good fit`, `Not a fit`, FAQ                                                                                                                                                                                                                                          | none                   |      5 |              0 |
| Portfolio | `See how we think before you decide who to trust.`                            | 5/5 present — H1, `Brief`, `Decision`, `Build`, FAQ                                                                                                                                                                                                                                       | none                   |      5 |              0 |
| Contact   | `Tell us what you're building. We'll tell you what it takes.`                 | 6/6 present — H1, `Before any work begins`, `You approve the scope and price in a written proposal first`, `One short form. No obligation. A real reply, not a sales sequence.`, `Based in`, `Office hours`                                                                               | none                   |    n/a |              0 |

Banned strings checked and absent on every route: `Digital experience architecture`, `We build websites that build your business`, `Secure, fast, search-friendly websites and apps.`, `An established digital studio in the UAE`, `Start a project`, `View our work`, `Established in`, `Web. Product. Mobile.`, `High-performance disciplines`, `Index — what we build`, `award-winning`, `testimonials from our clients`.

### 15.2 Updated scorecard — post-implementation

| Dimension                             | Baseline (Sec. 1) | Retest now |    Delta | Evidence for the new score                                                                                                                                                                                                  |
| ------------------------------------- | ----------------: | ---------: | -------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hooks (headlines, subheads, badges)   |                 4 |          8 |       +4 | Pain-led outcome H1 on Home; every page has its own outcome-led H1; positive-outcome highlight only; badge still scoped to the buyer.                                                                                       |
| Value proposition                     |                 5 |          8 |       +3 | Outcome + mechanism + `written scope before work` is stated on Home, Services and Contact; no jargon strings remain.                                                                                                        |
| Differentiation vs cheaper freelancer |                 3 |          8 |       +5 | Dedicated `Studio, not a single point of failure` section plus `A good fit` / `Not a fit` qualification panel.                                                                                                              |
| UAE trust signal                      |                 4 |          6 |       +2 | Verified location and office hours moved to the footer; process proof and written-scope promise added. Still capped because founding year, named team and real testimonials remain `FACT PENDING`.                          |
| Attractiveness to a CEO/Founder       |                 5 |          8 |       +3 | Buyer-first language, fit qualification, five-question FAQ, no low-budget anchor, no unsupported performance claims.                                                                                                        |
| CTA strength                          |                 5 |          9 |       +4 | CTA ladder (`Get a clear scope` / `See the thinking` / `Talk it through`), microcopy under CTAs, repeated CTA band and footer CTA.                                                                                          |
| Risk reversal                         |                 4 |          8 |       +4 | `Before any work begins` panel: scope and price approved in writing first, no surprise invoice; FAQ covers changes, ownership and timing. Capped below 10 because no formal guarantee exists.                               |
| Missing sales elements                |                 2 |          7 |       +5 | FAQ, process-proof panel, fit panel, concept case-study structure and risk reversal are live. Still capped because real testimonials, metrics, pricing ranges and recognition are fact-gated and deliberately not invented. |
| Dark box / Services index             |                 6 |          9 |       +3 | Reframed as an outcomes panel with three real services, `Not sure which you need?` route to Contact, and a balanced, edge-to-edge laptop/desktop layout.                                                                    |
| **Overall**                           |           **4.4** |    **7.9** | **+3.5** | Simple mean of the nine retest scores (71/9 = 7.9). The site now reads as a credible, specific sales asset rather than a brochure.                                                                                          |

### 15.3 What still holds the score back

Nothing in this retest changed the honesty constraints in Section 0. The following remain <span style="color:#b45309">🟠 FACT PENDING</span> and are the only route from 7.9 to the high 8s/9s:

1. Three to five real testimonials with permission.
2. A verified founding year.
3. Named team members and roles.
4. Typical engagement ranges.
5. Operational confirmation of a one-business-day reply promise.
6. Verified recognition, certifications or partners.

All concept work remains labelled as concept work; no performance claim, client name or metric was introduced during implementation.

## 16. Post-implementation layout corrections — 21 November 2026

**Preservation note:** Sections 0–15 remain unchanged. This section records later corrections without rewriting the baseline or the Section 15 retest.

| Correction                 | Status | Evidence                                                                                                                                                                                                                                                                    |
| -------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sixth FAQ card             | Fixed  | `app/components/FAQ.tsx` now renders six questions, including `How do we get started?`, and the lede no longer says “Five”. Browser checks at 1000px and 1048px showed six white cards with `border-line` in a balanced 2-column / 3-column grid.                           |
| Tablet-only portfolio card | Fixed  | The invented `Data Sync Engine` record and its SVG were removed. Both tablet slots now select the real `Work Note` record from `clientProjects.ts` through `getClientProjectBySlug`; title, category, year, description and screenshot all come from that canonical record. |

**Verification:** `npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test` (2 files, 22 tests) and `npm run build` pass. Browser checks confirmed no `Data Sync Engine` string remains on Home or `/portfolio`.
