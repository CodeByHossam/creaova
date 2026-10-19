import type { ReactNode } from "react";
import { Link } from "react-router";

/**
 * The one button in the system.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §4.3, §5.1
 *
 * Colour rule that this file exists to enforce: orange is a FILL, never text on
 * a light background. `primary` therefore always pairs `bg-primary` with
 * `text-on-primary` (#111111), which measures 6.74:1. The prototype's
 * white-on-orange CTA was 2.80:1 and failed WCAG AA (§12.1) — binding the two
 * tokens together means that defect cannot be reintroduced by hand.
 *
 * `secondary` is a hairline outline; `ghost` is for tertiary actions like
 * "back". No shadows and no glow anywhere (§5.4).
 */

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-dark hover:bg-primary hover:text-on-primary",
  // Outline style: ink text on ink hairline. On hover it inverts rather than
  // turning orange, so the orange stays reserved for the single primary action.
  secondary: "border border-ink text-ink hover:bg-ink hover:text-on-dark",
  ghost: "text-primary-text hover:text-ink",
  dark: "bg-ink text-on-dark hover:bg-primary hover:text-on-primary",
  light: "bg-white text-ink hover:bg-primary hover:text-on-primary",
};

// min-h-11 = 44px, the minimum touch target from §9.
const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "min-h-12 px-7 py-4 text-base",
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
      <a href={href} className={classes} onClick={onClick}>
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
