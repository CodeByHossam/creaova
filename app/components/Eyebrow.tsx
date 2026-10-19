import type { ReactNode } from "react";

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`font-mono text-meta uppercase tracking-[0.18em] ${dark ? "text-primary" : "text-primary-text"}`}>{children}</p>;
}
