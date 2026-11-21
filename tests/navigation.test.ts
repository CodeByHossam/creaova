import { describe, expect, it } from "vitest";

import type { NavItem } from "~/data/constants";
import { getActiveNavHref } from "~/utils/navigation";

const nav: NavItem[] = [
  { label: "Home", to: "/#home" },
  { label: "Services", to: "/services#all-services" },
  { label: "Portfolio", to: "/portfolio#projects" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
];

describe("getActiveNavHref", () => {
  it("prefers an exact hash match on the current path", () => {
    expect(getActiveNavHref(nav, "/services", "#process")).toBe("/services#all-services");
    expect(getActiveNavHref(nav, "/portfolio", "projects")).toBe("/portfolio#projects");
  });

  it("falls back to the page-level hash item without a matching hash", () => {
    expect(getActiveNavHref(nav, "/portfolio", "#something-else")).toBe("/portfolio#projects");
  });

  it("marks path-only routes directly", () => {
    expect(getActiveNavHref(nav, "/about", "")).toBe("/about");
    expect(getActiveNavHref(nav, "/careers/", "")).toBe("/careers");
  });

  it("returns undefined outside the public navigation", () => {
    expect(getActiveNavHref(nav, "/unknown", "")).toBeUndefined();
  });
});
