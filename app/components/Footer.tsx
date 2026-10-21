import { Link } from "react-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ContactIcon, SocialIcon } from "~/components/ContactIcon";
import { Logo } from "~/components/Logo";
import type { ContactChannel, ContactIconId, FooterLink, SocialLink } from "~/data/constants";
import { contactChannels, primaryCta, site } from "~/data/constants";

/**
 * Site footer — dark editorial panel, in three horizontal bands.
 *
 * Reference: plans/UI_UX_ENHANCEMENT_PLAN.md (Phase 2, finding C3).
 *
 * The previous version hard-coded its own columns, whose labels were shifted
 * against their anchors ("Mobile Engineering" → #web-development,
 * "Conversion Rate CRO" → #mobile-apps, a #cloud target that does not exist)
 * and shipped a newsletter form that only ever called preventDefault. Both are
 * gone: the columns now come from constants.ts — the single source of truth —
 * where every label matches the real section id, and the white logo variant
 * (prepare-logo.ps1) guarantees the lockup reads on the ink panel.
 *
 * ARRANGEMENT (the fix): the old footer was a five-column grid whose columns
 * were wildly different heights — a two-line brand block next to three short
 * link lists next to a tall stack of contact rows — so the eye had nothing to
 * land on. It is now three bands:
 *
 *   1. company + action     (logo, promise, one "Start a project" button)
 *   2. contact strip        (three columns from medium screens up: the
 *                            numbers, the place and the hours, the email
 *                            and the Instagram mark)
 *   3. link groups + legal  (Services, Studio and Company as one continuous
 *                            strip of columns, then the centred legal line)
 *
 * Band 2 is a row of equal-height columns, so nothing is ragged, and the link
 * groups sit together in band 3 instead of competing with the contacts.
 */
function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "text-on-dark-muted transition-colors duration-200 ease-out hover:text-primary";
  if (link.to)
    return (
      <Link to={link.to} className={className}>
        {link.label}
      </Link>
    );
  if (link.href)
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  // href is null → a placeholder segment: plain text, never a dead link.
  return <span className="text-on-dark-muted">{link.label}</span>;
}

/**
 * Pull the named channels out of the shared list, in the given order.
 *
 * The footer groups the channels into columns (numbers / place and time /
 * write and follow), but the values still come from `contactChannels` — one
 * list, so the footer and the contact page can never disagree.
 */
function pickChannels(ids: ContactIconId[]): ContactChannel[] {
  return ids
    .map((id) => contactChannels.find((channel) => channel.id === id))
    .filter((channel): channel is ContactChannel => channel !== undefined);
}

/**
 * One contact channel: the channel's glyph, its label, and the value.
 *
 * The glyph is decorative (`aria-hidden`) — the label says what the row is,
 * so nothing is announced twice.
 */
function ContactCell({
  channel,
}: {
  channel: (typeof contactChannels)[number];
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-dark-line text-primary">
        <ContactIcon id={channel.id} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-on-dark-muted">
          {channel.label}
        </span>
        {channel.href ? (
          <a
            href={channel.href}
            className="mt-1 block break-words text-sm text-on-dark transition-colors duration-200 ease-out hover:text-primary"
          >
            {channel.value}
          </a>
        ) : (
          <span className="mt-1 block break-words text-sm text-on-dark-muted">
            {channel.value}
          </span>
        )}
      </span>
    </li>
  );
}

/**
 * One social profile: the platform's glyph, then two rows of words beside it.
 *
 * Shaped exactly like `ContactCell` — badge on the left, label and value on
 * the right — because the mark used to float under a bare "Follow" heading
 * and looked like a caption instead of a row. Now it reads as
 * "FOLLOW / Instagram" and lines up with the email, phone and hours rows.
 */
function SocialCell({ social }: { social: SocialLink }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-dark-line text-primary">
        <SocialIcon id={social.icon} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-on-dark-muted">
          Follow
        </span>
        {social.href ? (
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-words text-sm text-on-dark transition-colors duration-200 ease-out hover:text-primary"
          >
            {social.label}
          </a>
        ) : (
          <span className="mt-1 block break-words text-sm text-on-dark-muted">
            {social.label}
          </span>
        )}
      </span>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-dark-line bg-dark pb-10 pt-16 text-on-dark-muted"
    >
      <Container>
        {/* Band 1 — the company: who we are, and the one action. */}
        <div className="flex flex-col gap-7 border-b border-dark-line pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-4">
            <Link to="/" aria-label="Creaova — home" className="inline-flex">
              <Logo variant="inverse" alt="Creaova" className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed text-on-dark-muted">
              {site.footer.brandLine}
            </p>
          </div>

          {/*
            The one action of the footer. The shared Button, not a text link,
            so it keeps the system's contrast rule: `light` is the white fill
            that reads on an ink panel (the same treatment as the CTA band
            above).
          */}
          <Button to={primaryCta.to} variant="light" size="md">
            {primaryCta.label}
          </Button>
        </div>

        {/* Band 2 — every way to reach the studio, in three columns. */}
        <div className="border-b border-dark-line py-10">
          <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary">
            Get in touch
          </h2>

          {/*
            Three columns, from medium screens up (one column on phones):
              1. the numbers you can call   (phone, WhatsApp)
              2. where we are and when      (location, hours)
              3. how to write and follow    (email, social)
            Every row still comes from `contactChannels`, so the footer and the
            contact page can never show different details.
          */}
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <ul className="space-y-6">
              {pickChannels(["phone", "whatsapp"]).map((channel) => (
                <ContactCell key={channel.id} channel={channel} />
              ))}
            </ul>

            <ul className="space-y-6">
              {pickChannels(["location", "hours"]).map((channel) => (
                <ContactCell key={channel.id} channel={channel} />
              ))}
            </ul>

            <div className="space-y-6">
              <ul className="space-y-6">
                {pickChannels(["email"]).map((channel) => (
                  <ContactCell key={channel.id} channel={channel} />
                ))}
              </ul>

              {/*
                The social profiles are rows like any other — the same badge,
                the same two lines of words — so this column holds two rows,
                exactly like the columns beside it.
              */}
              <ul className="space-y-6">
                {site.socialLinks
                  .filter((social) => social.href)
                  .map((social) => (
                    <SocialCell key={social.label} social={social} />
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Band 3 — a continuous row of quick-access groups, then the legal line. */}
        <div className="pt-8">
          {/*
            `justify-between` so the groups run the full width of the panel
            instead of clustering at the left with dead space beside them -
            one continuous strip of columns, each a different kind of access.
          */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-between gap-x-10 gap-y-8"
          >
            {site.footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/*
            The very last line of the footer: copyright, Privacy and Terms on
            ONE row, centred on the page, and separated from the link groups
            above it by a hairline so the panel ends on a clean rule.
          */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-dark-line pt-8 text-center text-xs">
            <p>
              © {year} {site.legalName} [ CDS ]. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex items-center gap-6">
                {site.footer.legal.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
