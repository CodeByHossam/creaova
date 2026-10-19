import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

import logoFull from "~/assets/logo-full.svg";
import { Container } from "~/components/Container";
import { MobileNav } from "~/components/MobileNav";
import { primaryCta, site } from "~/data/constants";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isActive ? "bg-neutral-100 text-[#111111]" : "text-neutral-600 hover:bg-neutral-100 hover:text-[#111111]"}`;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}>
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link to="/" aria-label="Creaova — home" className="group flex items-center gap-3 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-[#F97316]">
          <img src={logoFull} alt="Creaova" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center space-x-1">
            {site.nav.map((item) => <li key={item.to}><NavLink to={item.to} end={item.to === "/"} className={navLinkClass}>{item.label}</NavLink></li>)}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link to={primaryCta.to} className="group hidden items-center justify-center rounded-full bg-[#111111] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F97316] sm:inline-flex">
            <span className="flex items-center gap-2">Get a Quote <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span></span>
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
