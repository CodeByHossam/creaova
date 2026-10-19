import type { ReactNode } from "react";

/**
 * The single horizontal rhythm for the whole site.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §5.3
 *
 * Every full-width band wraps its content in this, so the left edge of the
 * navbar, the page body and the footer line up exactly. Gutters are 20px on
 * mobile and 32px from 640px up — matching the page container token rather than
 * inventing a per-section padding.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
