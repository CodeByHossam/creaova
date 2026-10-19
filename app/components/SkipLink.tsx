/**
 * Skip link — the first tab stop on every page.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §9
 *
 * It is `sr-only` until focused, at which point it becomes a real, visible
 * button in the top-left corner. Without this, a keyboard user has to tab
 * through the logo, five nav links and the header CTA on every single page
 * before reaching the content.
 *
 * `href="#main"` is a plain anchor, not a router Link: it must move focus within
 * the current document, not navigate. The matching `<main id="main">` lives in
 * app/root.tsx, and `scroll-margin-top` is set globally in app.css so the sticky
 * header can never cover the target.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-control focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-dark"
    >
      Skip to content
    </a>
  );
}
