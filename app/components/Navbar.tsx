import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import { MobileNav } from "~/components/MobileNav";
import { primaryCta, site } from "~/data/constants";

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
 * - No per-item icons: they added noise without aiding recognition (Hick's Law),
 *   and the active state is marked by ink text + an orange underline — a
 *   non-colour cue as well as colour (WCAG 1.4.1).
 * - The CTA is the shared Button, so it keeps the system's contrast rule.
 */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return `relative inline-flex items-center rounded-lg px-3 py-2 font-body font-medium text-sm transition-colors duration-200 ease-out ${
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
              const isActive = isNavItemActive(item.to, location.pathname, location.hash);

              return (
                <li key={item.to}>
                  <NavLink to={item.to} end className={() => navLinkClass({ isActive })}>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-1">
          {/* Wrapped so `hidden` can't fight the Button's own `inline-flex`
              (different elements → the media query wins cleanly). */}
          <span className="hidden sm:block">
            <Button to={primaryCta.to} variant="primary" size="md">
              {primaryCta.label}
            </Button>
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
