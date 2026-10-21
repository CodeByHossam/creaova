import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ContactIcon } from "~/components/ContactIcon";
import { Logo } from "~/components/Logo";
import { contactChannels, primaryCta, site } from "~/data/constants";

function isNavItemActive(to: string, pathname: string, hash: string) {
  const [path, targetHash] = to.split("#");
  if (targetHash) return pathname === path && hash === `#${targetHash}`;
  return path === "/" ? pathname === "/" && !hash : pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * The mobile navigation drawer.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §3.2, §9
 *
 * Built on the native `<dialog>` element rather than a hand-rolled overlay. That
 * buys four things for free that are otherwise easy to get subtly wrong:
 *   - focus is trapped inside while open;
 *   - `Esc` closes it (the `cancel` event);
 *   - focus returns to the trigger on close;
 *   - the rest of the page is inert to screen readers and pointers.
 *
 * On top of that this component handles two things `<dialog>` does not:
 *   - locking body scroll while open;
 *   - closing if the viewport grows past the `md` breakpoint. Without that, the
 *     dialog would become `display: none` (it is `md:hidden`) while still being
 *     modal, which leaves the page in a state the user cannot escape.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  // Drive the native dialog from React state, and keep them from disagreeing.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock the page behind the drawer.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Never leave a modal open behind a hidden trigger.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-out hover:border-ink lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="nav-drawer fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-bg p-0 text-ink lg:hidden"
      >
        <div className="flex min-h-full flex-col">
          <Container className="flex h-16 shrink-0 items-center justify-between border-b border-line">
            <Link to="/" aria-label="Creaova home" className="flex items-center gap-3"><Logo className="h-9" /></Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-out hover:border-ink"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col py-6">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {site.nav.map((item) => (
                  <li key={item.to} className="border-b border-line last:border-0">
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setOpen(false)}
                      className={() =>
                        [
                          "flex min-h-14 items-center justify-between gap-4 py-4 font-display text-h3 transition-colors duration-200 ease-out",
                          isNavItemActive(item.to, location.pathname, location.hash) ? "text-ink" : "text-muted hover:text-ink",
                        ].join(" ")
                      }
                    >
                      {() => (
                        <>
                          <span>{item.label}</span>
                          {/* Non-colour cue: active state must not rely on colour alone (WCAG 1.4.1). */}
                          {isNavItemActive(item.to, location.pathname, location.hash) ? (
                            <span className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
                              Current
                            </span>
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <Button
                to={primaryCta.to}
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {primaryCta.label}
              </Button>
            </div>

            <div className="mt-auto space-y-4 pt-10">
              {contactChannels
                .filter((channel) =>
                  ["email", "phone", "whatsapp"].includes(channel.id),
                )
                .map((channel) => (
                  <div key={channel.id} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-primary-text">
                      <ContactIcon id={channel.id} className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                        {channel.label}
                      </p>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="mt-1 inline-block text-sm text-ink underline underline-offset-4"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        /*
                          Deliberately inert while the number is a placeholder:
                          a plausible-looking invented UAE mobile could belong
                          to a real person. It becomes a wa.me link once href
                          is set (§15b).
                        */
                        <p className="mt-1 text-sm text-muted">{channel.value}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </Container>
        </div>
      </dialog>
    </>
  );
}
