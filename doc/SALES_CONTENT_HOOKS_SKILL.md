---
name: sales-content-hooks
description: >-
  Write and audit high-ticket sales content: client hooks, headline and offer
  positioning, value proposition, proof without fabrication, objection handling,
  FAQ, CTA ladders, risk reversal, and a nine-dimension conversion scorecard.
  Use for website copy, landing pages, outreach, and sales/content audits.
  Trigger phrases: "sales audit", "conversion copy", "write hooks", "client
  hook", "content strategy", "high-ticket website", "score the sales copy",
  "CTA copy", "objection handling", "lead capture copy".
---

# Sales Content & Client Hooks

> **Portable edition — works with any AI agent.**
> Copy this entire file into the agent's skills folder, paste it into the
> project instructions, or attach it as a reference. It has no tool-specific
> dependencies. To use it, tell the agent:
> "Read this file and apply it as your sales/content standard for this project."

A reusable content-and-conversion skill for high-ticket services. It covers the
whole persuasion chain: who the buyer is, what hook earns attention, what proof
is allowed, what objection must be answered, what CTA asks for the next step,
and how to score the result without inventing facts.

This skill writes and evaluates **words and conversion structure**. For visual
craft or layout, use `design/design-review`; for brand voice and page voice, use
`design/taste`; for audience discovery, use `design/ux-research`.

## When to use

- Auditing a site or landing page for sales and conversion strength.
- Writing or rewriting headlines, subheads, service copy, about copy, FAQ,
  CTAs, form microcopy, and closing sections.
- Creating client-acquisition hooks: outreach lines, email subjects, lead
  magnets, and follow-ups.
- Positioning a studio/agency against cheaper alternatives without disparaging
  them.
- Re-scoring existing copy after changes while preserving the original audit.
- Trigger phrases: "sales audit", "conversion copy", "client hook", "content
  strategy", "high-ticket website", "score the sales copy", "CTA copy",
  "objection handling".

## Ground rules (non-negotiable)

1. **Fact-gate everything.** Never invent a testimonial, client name, logo,
   metric, award, founding year, team name, certification, partner, pricing
   range, reply promise, guarantee, or performance result.
2. **Mark unknowns.** Use `🟢 FIXED` for shipped, verified changes and
   `🟠 FACT PENDING` for claims that need a real-world fact. A pending fact is
   never written into public copy as if it were true.
3. **Substitute honest proof.** Process proof (written scope, agreed changes,
   named next step), verified location/hours, qualification panels, and clearly
   labelled concept work are safer than fabricated social proof.
4. **Preserve previous observations.** When re-scoring, append a new section.
   Never delete or overwrite the baseline audit or its original scorecard.
5. **One job per page.** One primary H1, one dominant CTA, one clear next step.
6. **No fake urgency, no false scarcity, no invented authority.**
7. **Verify in a browser** when copy is live. A claim in source is not proof it
   renders; a claimed fix is not done until the rendered page and checks pass.

## Instructions

### 1. Define the buyer before writing a line

Record five inputs before drafting:

| Input           | Question                                                                         |
| --------------- | -------------------------------------------------------------------------------- |
| Buyer           | Who signs or influences the decision? Founder, marketing lead, operations owner? |
| Trigger         | What event makes them look for a provider now?                                   |
| Pain            | What is costing them money, time, trust, or enquiries?                           |
| Desired outcome | What does "working" look like in their words?                                    |
| Objection       | What would stop them replying? Price, risk, timing, ownership, trust?            |

If an answer is unknown, ask or mark it as an assumption. Do not fill the gap
with a clever line.

### 2. Build the message spine

Use this order for every sales page or major section:

1. **Hook** — name the pain or desired outcome in the buyer's language.
2. **Outcome** — state the result, not the deliverable.
3. **Mechanism** — say _how_ the result is pursued (process, structure, team).
4. **Proof** — only verified facts or process proof.
5. **Differentiation** — why this is not the cheapest option, stated calmly.
6. **Risk reversal** — what the buyer is protected from before committing.
7. **CTA + microcopy** — one next step, low friction, no pressure.
8. **Qualification** — who it is for and who it is not for.

Template:

```markdown
H1: [Desired outcome] without [the painful status quo].
Subhead: [Who it is for] get [mechanism] and [next visible result].
Proof: [Verified fact OR process fact]. [FACT PENDING if unverified.]
CTA: [Next step, verb-first] + [honest friction-reducer].
Fit: Good fit — [...]. Not a fit — [...].
```

### 3. Write hooks that earn the next line

Hook families:

| Family              | Pattern                                                       | Use when                              |
| ------------------- | ------------------------------------------------------------- | ------------------------------------- |
| Pain-led outcome    | `Your [asset] should be [desired outcome].`                   | Buyer already feels the problem.      |
| Outcome + mechanism | `[Outcome] through [specific mechanism].`                     | You need to explain _why you_.        |
| Qualifier           | `For [buyer] who [situation]: [outcome].`                     | Traffic is mixed; qualify early.      |
| Contrast            | `[Cheap route] gives [output]. [Your route] gives [outcome].` | Competing with freelancers/templates. |
| Diagnostic question | `Why does [asset] still [pain]?`                              | Buyer has not named the pain yet.     |
| Stage-aware         | `Not sure which you need? Start with [small step].`           | Buyer is unsure which service fits.   |

Rules:

- Highlight only the **positive outcome** in an H1. Keep the pain or neutral
  framing in the darker base text.
- Avoid "We build…", "High-performance…", "Digital experience
  architecture…", "Web. Product. Mobile." and other capability-first openers.
  They describe the seller, not the buyer's outcome.
- A hook must be specific enough that a competitor could not paste it onto
  their site unchanged.
- One idea per headline. If it needs a comma and a dash, split it into H1 +
  subhead.

### 4. Position against cheaper alternatives without attacking them

Use a "studio vs single point of failure" frame:

- Name the structural difference: one accountable team vs several handoffs.
- Name the buyer benefit: continuity after launch, clearer scope, shared
  context.
- Add a fit panel: `A good fit` / `Not a fit`. Disqualifying the wrong buyer
  raises trust with the right one.
- Never claim superiority in metrics, speed, awards, or client count unless
  verified.

### 5. Substitute proof when social proof is unavailable

If real testimonials are absent, do **not** write placeholder quotes. Use:

- Written scope and price approved before work starts.
- Changes scoped and agreed before implementation.
- Clear ownership terms in the signed agreement.
- After-launch availability _only if operationally true_; otherwise
  `🟠 FACT PENDING`.
- Verified location and office hours.
- A concept case study structure: `Brief → Decision → Build`, explicitly
  labelled concept work.
- A process walkthrough that shows judgement, not claimed results.

Mark every unavailable item `🟠 FACT PENDING` in the audit, not in public copy.

### 6. Handle objections in plain language

Cover the objections the buyer actually has:

| Objection         | Answer shape                                                       |
| ----------------- | ------------------------------------------------------------------ |
| Cost              | "Fees are set in the written proposal, not on this site."          |
| Timing            | "Timelines are agreed in the written proposal before work begins." |
| Existing brand    | "We can work from your current direction or refine it first."      |
| Changes later     | "Changes are scoped and agreed before work starts."                |
| Ownership         | "Ownership is set out in the signed agreement."                    |
| Fit               | "A good fit… / Not a fit…"                                         |
| What happens next | "Tell us X → written scope → approval → work."                     |

Turn the top five into an FAQ. Answer in one or two sentences. No legalistic
padding, no invented guarantees.

### 7. Build a CTA ladder, not one hard ask

Match the CTA to buyer readiness:

| Readiness     | CTA               | Example                  |
| ------------- | ----------------- | ------------------------ |
| Researching   | Soft, educational | `See the thinking`       |
| Comparing     | Clarifying        | `See which service fits` |
| Ready to talk | Primary           | `Get a clear scope`      |
| Unsure        | Fallback          | `Talk it through`        |

Microcopy rules:

- Reduce friction honestly: "One short form. No obligation…" **only** if that
  is operationally true.
- Put sensitive mechanics (e.g. captcha notices) below the submit button, not
  above it.
- Repeat the primary CTA in the hero, a mid-page band, and the footer.
- Every CTA must lead somewhere specific; never link to a generic "contact"
  dead end when a scoped form exists.

### 8. Offer, risk reversal, and lead capture

- Define what the buyer receives at each step: conversation → written scope →
  approval → work.
- State risk reversal as process, not guarantee: written scope and price first,
  no surprise invoice, no work started on an assumption.
- Lead magnets must be real and delivered by a named mechanism. If automated
  email delivery is not configured, mark it `🟠 FACT PENDING` instead of
  promising it.
- Measure replies, qualified conversations, scope acceptance, and conversion
  by source. Do not publish a metric you have not measured.

### 9. Client-acquisition hooks (outreach and follow-up)

Three-touch structure:

1. **Observation** — one specific, true thing about their current site,
   service, or situation.
2. **Useful insight** — one outcome they are likely missing and why.
3. **Low-friction ask** — one question or one short call, no pressure.

Rules:

- No fake personalisation ("I loved your recent post") unless it is true.
- No invented mutual connections, no fabricated urgency.
- No "just checking in" without new value.
- Personalise the problem, not the flattery.
- Keep the ask smaller than the meeting: reply, then call.

### 10. Audit and re-score workflow

1. **Freeze the baseline.** Record the current score and all existing
   observations. Do not delete them.
2. **Inventory every route** and the live copy markers expected on each.
3. **Banned-string sweep.** Check rendered pages for previously rejected and
   invented claims.
4. **Score nine dimensions**, 0–10 each:

   | Dimension                  | What it measures                                    |
   | -------------------------- | --------------------------------------------------- |
   | Hooks                      | Headline, subhead, badge clarity and buyer language |
   | Value proposition          | Outcome + mechanism + next step                     |
   | Differentiation            | Specific reason not to choose the cheapest option   |
   | Trust signals              | Verified facts and honest proof                     |
   | CEO/Founder appeal         | Buyer-first framing and qualification               |
   | CTA strength               | Ladder, microcopy, placement and destination        |
   | Risk reversal              | What is protected before commitment                 |
   | Missing sales elements     | FAQ, fit panel, proof, case-study structure         |
   | Primary conversion surface | Hero/index or landing block doing sales work        |

   Overall = simple mean of the nine scores, one decimal place.

5. **Prioritise findings** as P0 (blocking), P1 (high), P2 (polish). Each
   finding: what, why it matters, concrete fix, status marker.
6. **Retest after changes** on rendered pages: required markers present, banned
   strings absent, FAQ/questions render, no console errors.
7. **Append a new section** with the retest evidence and updated score. Keep
   the baseline scorecard intact and show baseline → now → delta.
8. **List what still caps the score** as `🟠 FACT PENDING` items.

## Output shape

```markdown
**Verdict:** <one line — does the copy sell, or merely describe?>

## Scorecard

| Dimension | Score /10 | Diagnosis |
| --------- | --------: | --------- |

## Top fixes

1. <Finding> — P0 — fix: ... — status: 🟢 FIXED / 🟠 FACT PENDING
2. ...

## Copy deck

- H1: ...
- Subhead: ...
- CTA + microcopy: ...
- FAQ: ...
- Fit panel: ...

## Fact gates still open

- 🟠 ...

## Next step

<Single highest-leverage action>
```

## Examples

### Good — buyer-led, honest, specific

> **H1:** Your website should be winning more enquiries.
> **Subhead:** Built for speed, clarity, and the moment a visitor decides to
> trust you.
> **CTA:** Get a clear scope. No obligation. One short form.
> **Proof:** Written scope and price approved before work begins.

Why it works: outcome first, mechanism second, proof is a process fact, CTA asks
for a small next step, nothing is invented.

### Bad — seller-led and invented

> "Award-winning digital architects with 20 years of experience. Trusted by 500
> clients. Start a project."

Why it fails: three unverifiable claims, no buyer outcome, no next-step
friction reducer, and "start a project" asks for commitment before trust.

### Good — re-score without erasing history

> "Baseline 4.4 retained in Section 1. Section 15 adds post-implementation
> 7.9 with per-page evidence and six `FACT PENDING` items."

### Bad — replacing the old score

> "Updated overall score: 7.9" with the original scorecard deleted.

## Anti-patterns

| Anti-pattern                               | Why it hurts                          | Do instead                             |
| ------------------------------------------ | ------------------------------------- | -------------------------------------- |
| Feature lists as hooks                     | Buyer cannot see their outcome        | Lead with pain/outcome, then mechanism |
| Invented testimonials or metrics           | Destroys trust and creates legal risk | Use process proof; mark facts pending  |
| One generic CTA on every page              | Ignores buyer readiness               | Build a CTA ladder                     |
| Overwriting the baseline audit             | Loses evidence and trend              | Append the new score                   |
| Fabricated urgency or scarcity             | Pushy, dishonest                      | State a real next step                 |
| Keyword stuffing in H1                     | Reads like SEO, not sales             | One idea, buyer language               |
| Hiding "not a fit"                         | Attracts bad-fit enquiries            | Publish a fit panel                    |
| Claiming a fix before browser verification | False completion                      | Render, test, then mark 🟢 FIXED       |
| Applying design critique to sales          | Wrong lens                            | Use `design/design-review` for visuals |

## Related skills (optional)

If the agent has other skills available, pair this with:

- a design/UX review skill — for visual critique, not sales scoring;
- a brand-voice skill — for tone when the UI is being built;
- a user-research skill — for buyer and audience discovery;
- a planning skill — for page inventory and acceptance criteria.

None are required. This file is complete on its own.
