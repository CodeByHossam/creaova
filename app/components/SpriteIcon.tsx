import type { SVGProps } from "react";

import { ASSET_VERSION } from "~/data/constants";

export const SPRITE_ICON_NAMES = ["arrow-up-right"] as const;
export type SpriteIconName = (typeof SPRITE_ICON_NAMES)[number];

/**
 * Compact <use> reference to the shared sprite. Used only for icons repeated
 * across many cards, where inlining the same lucide paths inflates every
 * prerendered page. One-off icons remain inline.
 */
export function SpriteIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: SpriteIconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`/icons.svg?v=${ASSET_VERSION}#${name}`} />
    </svg>
  );
}
