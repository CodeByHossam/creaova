import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  BriefcaseBusiness,
  Circle,
  FolderKanban,
  House,
  Mail,
  MessageCircle,
  Users,
  Workflow,
} from "lucide-react";

// Assuming this is the correct path to your final Black/Orange logo
import logoFull from "~/assets/images/logo/Creaova_Logo1-transparent.png";
import { Container } from "~/components/Container";
import { MobileNav } from "~/components/MobileNav";
import { primaryCta, site } from "~/data/constants";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-body text-sm font-medium transition-colors duration-200 group ${
    isActive 
      ? "text-[#111111] bg-neutral-100/80" 
      : "text-neutral-600 hover:text-[#111111] hover:bg-neutral-100/50"
  }`;
}

function isNavItemActive(to: string, pathname: string, hash: string) {
  const [path, targetHash] = to.split("#");
  if (targetHash) return pathname === path && hash === `#${targetHash}`;
  return path === "/" ? pathname === "/" && !hash : pathname === path || pathname.startsWith(`${path}/`);
}

const navIcons = {
  "/": House,
  "/services": BriefcaseBusiness,
  "/portfolio": FolderKanban,
  "/#process": Workflow,
  "/#testimonials": MessageCircle,
  "/about": Users,
  "/contact": Mail,
} as const;

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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "border-neutral-200/80 bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]" 
          : "border-transparent bg-white/50 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20 lg:gap-2">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          aria-label="Creaova Digital Solutions — Home" 
          className="group flex shrink-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2"
        >
          <img src={logoFull} alt="Creaova Logo" className="h-16 w-auto transition-transform duration-300 group-hover:scale-[1.02] lg:h-28" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {site.nav.map((item) => {
              const isActive = isNavItemActive(item.to, location.pathname, location.hash);
              const Icon = navIcons[item.to as keyof typeof navIcons] ?? Circle;

              return (
                <li key={item.to}>
                  <NavLink to={item.to} end className={() => navLinkClass({ isActive })}>
                    <Icon
                      aria-hidden="true"
                      className={`size-[1.05rem] shrink-0 transition-colors duration-200 group-hover:text-[#F97316] ${
                        isActive ? "text-[#F97316]" : "text-neutral-500"
                      }`}
                      strokeWidth={1.9}
                    />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-1">
          <Link 
            to={primaryCta.to} 
            className="group relative hidden items-center justify-center overflow-hidden rounded-full bg-[#111111] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition-[transform,color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#F97316] hover:shadow-[0_4px_20px_-4px_rgba(249,115,22,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 sm:inline-flex"
          >
            <span className="relative z-10 flex items-center gap-2">
              {primaryCta.label || "Get a Quote"} 
              <span 
                className="transition-transform duration-300 group-hover:translate-x-1" 
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </Link>
          
          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
