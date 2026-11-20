import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Send } from "lucide-react";

import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import { MobileNav } from "~/components/MobileNav";
import { NavIcon } from "~/components/NavIcon";
import { TextLink } from "~/components/TextLink";
import { navCta, site } from "~/data/constants";
import { useHydratedLocationHash } from "~/hooks/useHydratedLocationHash";
import { getActiveNavHref } from "~/utils/navigation";

/**
 * Site header — sticky, hairline-separated, editorial text-only links.
 *
 * Reference: plans/UI_UX_ENHANCEMENT_PLAN.md (Phase 2, findings H4/H7).
 *
 * - The logo is the supplied lockup — the orange mark with the "CREAOVA"
 *   wordmark baked into the artwork — at h-6/lg:h-7, sized to sit quietly in
 *   the 64/80px bar without competing with the nav links. The wordmark is
 *   image, not live text: as DOM text it would render in the site's serif and
 *   put two "CREAOVA"s on the screen.
 * - Small decorative icons precede each label, using the glyph vocabulary from
 *   Mockup 01. They are `aria-hidden`, so the text still names the destination.
 *   The active state is marked by ink text + an orange underline — a non-colour
 *   cue as well as colour (WCAG 1.4.1). The underline uses the accessible burnt
 *   orange (`primary-text`); the fill orange would be only 2.7:1 on paper.
 * - The CTA is a quiet TextLink ("Inquiries"); the header never repeats the
 *   orange primary action. Home's hero owns "Start a project" and About's hero
 *   owns "Discuss a project"; the other routes carry their single action in
 *   the closing band.
 */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return `relative inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-body font-medium text-sm transition-colors duration-200 ease-out ${
    isActive
      ? "text-ink underline decoration-primary-text decoration-2 underline-offset-[6px]"
      : "text-muted hover:text-ink"
  }`;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const hash = useHydratedLocationHash();
  const activeNavHref = getActiveNavHref(site.nav, location.pathname, hash);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-xl"
          : "border-transparent bg-bg/70 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20 lg:gap-2">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Creaova Digital Solutions — Home"
          className="group flex min-h-11 min-w-11 shrink-0 items-center rounded-xl"
        >
          <Logo priority className="h-6 lg:h-7" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const isActive = item.to === activeNavHref;

              return (
                <li key={item.to}>
                  {/* NavLink derives aria-current from the pathname alone, so the
                      two hash links that share /services both get "page". Use a
                      plain Link and drive the active state (and aria-current)
                      from the shared hash-aware helper as the underline. */}
                  <Link
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className={navLinkClass({ isActive })}
                  >
                    <NavIcon id={item.icon} className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-1">
          {/* A quiet text invitation, not a second orange button — the header
              never repeats the primary action wherever it appears. */}
          <span className="hidden sm:block">
            <TextLink
              to={navCta.to}
              className="min-h-11 gap-1.5 rounded-lg px-3 text-sm font-semibold"
            >
              <Send aria-hidden="true" className="size-4 shrink-0" />
              {navCta.label}
            </TextLink>
          </span>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}