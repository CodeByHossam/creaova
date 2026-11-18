import type { ReactNode } from "react";

/**
 * The editorial section header — the "Editorial Studio" signature move:
 * a mono, numbered eyebrow (`01 — SERVICES`) above a display title and
 * an optional lede. Replaces hand-rolled heading blocks that had copied
 * into every section of Home, Services and About.
 *
 * Tier rule: `as="h1"` renders the page tier (`text-display`); the default
 * `h2` renders the section tier (`text-h2`). That keeps a Services page title
 * visibly above its section headings instead of collapsing to the same size.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  lede,
  align = "center",
  dark = false,
  ledeClassName = "",
  as = "h2",
}: {
  /** Zero-padded step number, e.g. "01". Rendered before the eyebrow. */
  number?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  /** Override the lede colour where the section ground needs a darker ink. */
  ledeClassName?: string;
  /** Page title (`h1`) or section title (`h2`). Drives the type tier. */
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  const Heading = as === "h1" ? "h1" : "h2";
  const headingTier = as === "h1" ? "text-display" : "text-h2";

  return (
    <div
      className={`${centered ? "mx-auto w-full max-w-2xl text-center" : "w-full max-w-2xl"} ${
        dark ? "text-on-dark" : "text-ink"
      }`}
    >
      {eyebrow ? (
        <p
          className={`inline-flex items-center gap-3 font-mono text-meta font-medium uppercase tracking-[0.18em] ${
            dark ? "text-primary" : "text-primary-text"
          }`}
        >
          {number ? <span className="tabular-nums">{number} —</span> : null}
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`mt-4 ${headingTier} font-medium`}>{title}</Heading>
      {lede ? (
        <p
          className={`mt-4 text-lede ${
            ledeClassName || (dark ? "text-on-dark-muted" : "text-muted")
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
