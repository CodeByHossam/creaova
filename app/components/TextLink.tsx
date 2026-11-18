import type { ReactNode } from "react";
import { Link } from "react-router";

/**
 * The one text-link interaction primitive.
 *
 * One hover palette with two surface tones: ink → primary-text on paper,
 * off-white-muted → off-white on dark. Every text link gets the same focus
 * treatment and a pressed state so taps are visibly acknowledged.
 */
const base =
  "group inline-flex items-center transition-all duration-200 ease-out active:translate-y-px active:opacity-80";

const tones = {
  light: "text-ink hover:text-primary-text focus-visible:text-primary-text active:text-primary-text",
  dark: "text-on-dark-muted hover:text-on-dark focus-visible:text-on-dark active:text-on-dark",
};

export function TextLink({
  to,
  children,
  tone = "light",
  className = "",
}: {
  to: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <Link to={to} className={`${base} ${tones[tone]} ${className}`}>
      {children}
    </Link>
  );
}
