import type { ReactNode } from "react";
import { Container } from "~/components/Container";

export function Section({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <section className={`${dark ? "bg-dark text-on-dark" : ""} ${className}`}><Container>{children}</Container></section>;
}
