import type { ReactNode } from "react";

/**
 * The single eyebrow badge across the site — replaces the three inline pill
 * styles that were duplicated in Home, Services, About and Portfolio (plan M3).
 *
 * Light  = hairline chip on paper (label in ink).
 * Dark   = translucent chip on an ink panel. The label is off-white: orange
 *          text on the translucent dark chip measured ~4.0:1, below AA. The
 *          orange accent stays as the dot's fill, never as text here.
 * The dot is always orange fill, never text.
 */
export function Badge({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-meta font-medium uppercase tracking-[0.18em] ${
        dark
          ? "border-on-dark/20 bg-on-dark/10 text-on-dark"
          : "border-line bg-surface-subtle text-ink"
      }`}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
      {children}
    </span>
  );
}
