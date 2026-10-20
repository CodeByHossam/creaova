import { Link } from "react-router";

import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import type { FooterLink } from "~/data/constants";
import { site } from "~/data/constants";

/**
 * Site footer — dark editorial panel, rendered from `site.footer.columns`.
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

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="border-t border-dark-line bg-dark pb-10 pt-16 text-on-dark-muted"
    >
      <Container>
        <div className="grid gap-10 border-b border-dark-line pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" aria-label="Creaova — home" className="inline-flex">
              <Logo variant="inverse" alt="Creaova" className="h-9" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-on-dark-muted">
              {site.footer.brandLine}
            </p>
            <div className="pt-2 text-xs text-on-dark-muted">
              {site.footer.location}
            </div>
            <nav
              aria-label="Social links"
              className="flex flex-wrap gap-4 pt-2 text-xs font-semibold"
            >
              {site.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 ease-out hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </nav>
          </div>

          {site.footer.columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h4 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary">
                {column.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row">
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
      </Container>
    </footer>
  );
}
