import { Briefcase, House, Layers, Mail, Route, UserRound } from "lucide-react";

import type { NavIconId } from "~/data/constants";

/**
 * The one place where a primary-nav destination gets its glyph.
 *
 * The ids live in `data/constants.ts` beside the destinations, so a nav item
 * can never end up with a label but no icon. The vocabulary follows the locked
 * Mockup 01 reference where it defines one: briefcase = work/portfolio,
 * layers = services, route = process, user = about. Home and Contact use the
 * standard house and mail marks.
 *
 * The icons are decorative — `aria-hidden` — because the link text already
 * names the destination.
 */
export function NavIcon({
  id,
  className,
}: {
  id?: NavIconId;
  className?: string;
}) {
  const props = { "aria-hidden": true, className, strokeWidth: 1.75 } as const;

  switch (id) {
    case "home":
      return <House {...props} />;
    case "services":
      return <Layers {...props} />;
    case "portfolio":
      return <Briefcase {...props} />;
    case "process":
      return <Route {...props} />;
    case "about":
      return <UserRound {...props} />;
    case "contact":
      return <Mail {...props} />;
    default:
      return null;
  }
}
