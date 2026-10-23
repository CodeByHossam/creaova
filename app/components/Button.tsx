import type { ReactNode } from "react";
import { Link } from "react-router";

/**
 * The one button in the system.
 *
 * Reference: plans/UI_UX_ENHANCEMENT_PLAN.md (Phase 1), MULTIPAGE_UI_PLAN §4.3
 *
 * Colour rule that this file exists to enforce: orange is a FILL, never text on
 * a light background. `primary` pairs `bg-primary` (#EA580C) with
 * `text-on-primary` (ink, 5.2:1) — and the resting state is ink, with orange
 * arriving only on hover, so the single primary action never fights the page.
 * No shadows and no glow anywhere (plan M6): separation is hairlines + space.
 */

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-dark hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary",
  // Outline style: ink text on ink hairline. On hover it inverts rather than
  // turning orange, so the orange stays reserved for the single primary action.
  secondary: "border border-ink text-ink hover:bg-ink hover:text-on-dark",
  ghost: "text-primary-text hover:text-ink",
  dark: "bg-ink text-on-dark hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary",
  light: "bg-surface text-ink hover:bg-primary hover:text-on-primary",
};

// h-11 = 44px, the minimum touch target from §9 (the old h-10 = 40px missed it).
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Internal route — renders a react-router <Link>, so Cmd/middle-click work. */
  to?: string;
  /** External URL or mailto: — renders a plain <a>. */
  href?: string;
  /** Open `href` in a new tab with a safe rel. Ignored for internal `to` links. */
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Swaps in a spinner and disables the control. Used by the contact form. */
  loading?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  href,
  external = false,
  type = "button",
  disabled = false,
  loading = false,
  onClick,
}: Props) {
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </>
  );

  // Navigation never "loads" — a route button is always a live link.
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
