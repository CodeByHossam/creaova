import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function MainLayout() {
  const { pathname, hash } = useLocation();

  // A fragment is never sent to the server, and React Router does not scroll to
  // a target when a hash link crosses routes (or lands after hydration). Without
  // this, "See web design" on Home opens /services#web-design at the top of the
  // page instead of on that service. Run after paint, and use the document's
  // scroll-padding as the offset so the sticky header never covers the target.
  useEffect(() => {
    if (!hash || hash.length < 2) return;

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;

      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = window.scrollY + target.getBoundingClientRect().top - padding;
      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
