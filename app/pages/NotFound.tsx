import { Button } from "~/components/Button";
import { Container } from "~/components/Container";

/**
 * 404 — the catch-all route (`route("*", ...)` in app/routes.ts).
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §6.7
 *
 * "One line, one link home, links to Services/Portfolio/Contact. Never a blank
 * or default page." So: one clear statement, the homepage as the single
 * dominant action, and the three likely destinations as secondary.
 *
 * This renders inside the shared layout, so the header and footer are present
 * and the visitor can navigate normally — no dead end.
 */

export function meta() {
  return [
    { title: "Page not found | Creaova" },
    {
      name: "description",
      content:
        "That page could not be found. Browse Creaova's services, portfolio, or get in touch about a project.",
    },
    // A 404 must never be indexed, and must not be treated as a soft duplicate.
    { name: "robots", content: "noindex, follow" },
  ];
}

export default function NotFound() {
  return (
    <Container className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20 lg:min-h-[calc(100vh-5rem)] lg:py-28">
      <p className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">404</p>

      <h1 className="mt-6 max-w-[var(--measure)] text-display font-semibold text-ink">
        We couldn’t find that page.
      </h1>

      <p className="mt-7 max-w-[var(--measure)] text-lede text-muted">
        The link may be out of date, or the page may have moved. Everything else
        is still where you left it.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/">Back to homepage</Button>
        <Button to="/services" variant="secondary">
          Services
        </Button>
        <Button to="/portfolio" variant="secondary">
          Portfolio
        </Button>
        <Button to="/contact" variant="secondary">
          Contact
        </Button>
      </div>
    </Container>
  );
}
