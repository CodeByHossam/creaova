import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { ArrowUpRight } from "lucide-react";

import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import { MobileNav } from "~/components/MobileNav";
import { NavIcon } from "~/components/NavIcon";
import { TextLink } from "~/components/TextLink";
import { navCta, site } from "~/data/constants";
import { useHydratedLocationHash } from "~/hooks/useHydratedLocationHash";

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
 *   cue as well as colour (WCAG 1.4.1).
 * - The CTA is a quiet TextLink ("Say hello"); the hero owns the one primary
 *   "Start a project" button, so the header does not repeat the same action.
 */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return `relative inline-flex items-center gap-2 rounded-lg px-3 py-2 font-body font-medium text-sm transition-colors duration-200 ease-out ${
    isActive
      ? "text-ink underline decoration-primary decoration-2 underline-offset-[6px]"
      : "text-muted hover:text-ink"
  }`;
}

function isNavItemActive(to: string, pathname: string, hash: string) {
  const [path, targetHash] = to.split("#");
  if (targetHash) return pathname === path && hash === `#${targetHash}`;
  return path === "/" ? pathname === "/" && !hash : pathname === path || pathname.startsWith(`${path}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const hash = useHydratedLocationHash();

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
          className="group flex shrink-0 items-center rounded-xl"
        >
          <Logo priority className="h-6 lg:h-7" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const isActive = isNavItemActive(item.to, location.pathname, hash);

              return (
                <li key={item.to}>
                  <NavLink to={item.to} end className={() => navLinkClass({ isActive })}>
                    <NavIcon id={item.icon} className="size-4 shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-1">
          {/* A quiet text invitation, not a second orange button — the hero
              keeps the single primary action on this page. */}
          <span className="hidden sm:block">
            <TextLink
              to={navCta.to}
              className="min-h-11 gap-1.5 rounded-lg px-3 text-sm font-semibold"
            >
              {navCta.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
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