import type { ReactNode } from "react";

/**
 * The editorial section header — the "Editorial Studio" signature move:
 * a mono, numbered eyebrow (`01 — SERVICES`) above a serif display title and
 * an optional lede. Replaces the hand-rolled heading blocks that were copied
 * into every section of Home, Services and About (plan M3 / H3).
 *
 * Title always renders in the Fraunces display face with the token type ramp
 * (`text-h2`), sentence case, weight 600 — never the old 900 extrabold.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  lede,
  align = "center",
  dark = false,
}: {
  /** Zero-padded step number, e.g. "01". Rendered before the eyebrow. */
  number?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${
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
      <h2 className="mt-4 text-h2 font-semibold">{title}</h2>
      {lede ? (
        <p
          className={`mt-4 text-lede ${dark ? "text-on-dark-muted" : "text-muted"}`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
