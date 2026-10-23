/**
 * DeveloperSignature — the studio's signed mark on a project card.
 *
 * Visual language matches the "Editorial Studio" system:
 *   - warm paper / ink surfaces, hairlines instead of heavy borders
 *   - Fraunces italic for the name (a human, signed-off feel)
 *   - JetBrains Mono for the small uppercase metadata
 *   - a single burnt-orange accent used as a fill, never as light-on-light text
 *
 * Two tones are provided so the same signature works on dark project cards and
 * on light surfaces. No raw hex values are used outside the design tokens.
 */

type Tone = "dark" | "light";

type Props = {
  /** `dark` for ink cards, `light` for paper surfaces. */
  tone?: Tone;
  /** Hide the small "Signed" pill on narrow cards. */
  compact?: boolean;
  className?: string;
};

export function DeveloperSignature({
  tone = "dark",
  compact = false,
  className = "",
}: Props) {
  const isDark = tone === "dark";
  const rule = isDark ? "border-dark-line" : "border-line";
  const meta = isDark ? "text-on-dark-muted" : "text-muted";
  const name = isDark ? "text-on-dark" : "text-ink";

  return (
    <div
      aria-label="Developer signature: Creaova Digital Solutions"
      className={`flex items-center justify-between gap-3 border-t ${rule} pt-4 ${className}`}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {/* Monogram seal: orange fill + ink text, matching the Button rule. */}
        <span
          aria-hidden="true"
          className="relative grid size-8 shrink-0 place-items-center rounded-full bg-primary font-mono text-[10px] font-bold tracking-tight text-on-primary"
        >
          CDS
          <svg
            viewBox="0 0 12 12"
            className={`absolute -right-1 -bottom-1 size-4 rounded-full ${
              isDark ? "bg-dark" : "bg-surface"
            } p-0.5`}
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5.5" fill="currentColor" className="text-primary-text" />
            <path
              d="M3.4 6.2 5.1 7.9 8.7 4.1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isDark ? "text-on-dark" : "text-surface"}
            />
          </svg>
        </span>

        <div className="min-w-0">
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.2em] ${meta}`}
          >
            Designed &amp; built by
          </p>
          <p className={`truncate font-display text-sm italic leading-tight ${name}`}>
            Creaova Digital Solutions
            <span className="not-italic text-primary-text">.</span>
          </p>
          {/* Hand-drawn flourish: the "signature" without a script font. */}
          <svg
            viewBox="0 0 120 8"
            aria-hidden="true"
            className="mt-0.5 h-1.5 w-20 text-primary-text/70"
          >
            <path
              d="M1 5.6C19 2.4 36 6.9 55 4.6 73 2.3 91 6.7 119 3.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {compact ? null : (
        <span
          className={`hidden shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:inline-block ${
            isDark
              ? "border-on-dark/15 bg-on-dark/5 text-on-dark-muted"
              : "border-line bg-surface-subtle text-muted"
          }`}
        >
          Signed
        </span>
      )}
    </div>
  );
}
