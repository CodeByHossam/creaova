import { Link, useLocation } from "react-router";

import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import { MobileNav } from "~/components/MobileNav";
import { NavIcon } from "~/components/NavIcon";
import { site } from "~/data/constants";
import { useHydratedLocationHash } from "~/hooks/useHydratedLocationHash";
import { getActiveNavHref } from "~/utils/navigation";

/**
 * Site header — sticky, hairline-separated, editorial text-only links.
 *
 * The desktop half of the shared six-link navigation.
 *
 * - The logo is the supplied lockup — the orange mark with the "CREAOVA"
 *   wordmark baked into the artwork — at h-6/lg:h-7, sized to sit quietly in
 *   the 64/80px bar without competing with the nav links. The wordmark is
 *   image, not live text: as DOM text it would render in the site's serif and
 *   put two "CREAOVA"s on the screen.
 * - Small decorative icons precede all six labels, using the glyph vocabulary
 *   from Mockup 01. They are `aria-hidden`, so the text still names the
 *   destination. The active state is marked by ink text + an orange underline
 *   — a non-colour cue as well as colour (WCAG 1.4.1). The underline uses the
 *   accessible burnt orange (`primary-text`); the fill orange would be only
 *   2.7:1 on paper.
 * - At lg the bar is a 1fr / auto / 1fr grid: the logo pins left, the six
 *   links centre as one group, and the right slot stays empty. There is no
 *   secondary button — the hero owns the primary action.
 */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return `relative inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-body font-medium text-sm leading-[1.4] transition-colors duration-200 ease-out ${
    isActive
      ? "text-ink underline decoration-primary-text decoration-2 underline-offset-[6px]"
      : "text-muted hover:text-ink"
  }`;
}

export function Navbar() {
  const location = useLocation();
  const hash = useHydratedLocationHash();
  const activeNavHref = getActiveNavHref(site.nav, location.pathname, hash);

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-line bg-bg lg:h-20">
      <Container className="flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-2">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Creaova Digital Solutions — Home"
          className="group flex min-h-11 min-w-11 shrink-0 items-center rounded-xl"
        >
          <Logo className="h-6 lg:h-7" />
        </Link>

        {/* Desktop Navigation — one centred group of six text links */}
        <nav aria-label="Primary" className="hidden lg:block lg:justify-self-center">
          <ul className="flex items-center gap-5">
            {site.nav.map((item) => {
              const isActive = item.to === activeNavHref;

              return (
                <li key={item.to}>
                  {/* NavLink derives aria-current from the pathname alone, so the
                      hash links that share a path can both get "page". A plain
                      Link drives the active state from the hash-aware helper. */}
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

        {/* Empty right slot at lg; the mobile trigger lives here below lg. */}
        <div className="flex items-center lg:justify-self-end">
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
