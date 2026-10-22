import { site } from "~/data/constants";

/**
 * The Creaova brand lockup - the orange "C"-and-key mark with the "CREAOVA"
 * wordmark beside it.
 *
 * The artwork is the pair of files the brand supplied:
 * `app/assets/logo/logo.png` (the lockup) and `app/assets/icon/icon.png` (the
 * mark on its own, for the app icons and the browser tab).
 * `scripts/prepare-logo.ps1` derives every web raster from them, so there is
 * exactly one place the artwork is defined.
 *
 * Three things this component is responsible for:
 *
 * 1. **Intrinsic dimensions are always present.** Without them the header
 *    reflows the moment the image decodes. They live in `site.logo` next to the
 *    paths and must stay in sync with the real files.
 *
 * 2. **`alt` defaults to empty, deliberately.** In the navbar this sits inside a
 *    link that is already labelled "Creaova Digital Solutions - Home". Giving
 *    the image alt="Creaova" as well makes a screen reader announce the brand
 *    twice for one link. Pass an explicit `alt` only where the image carries the
 *    meaning on its own.
 *
 * 3. **The wordmark is artwork, not text.** The supplied lockup types "CREAOVA"
 *    in a geometric sans that is not in the site's font stack - the site sets
 *    its headings in Fraunces, a serif. Setting the same word as live DOM text
 *    would put two different brands side by side, and two "CREAOVA"s on the
 *    screen. The word stays in the image and the brand name is announced by the
 *    link label instead.
 */
export type LogoVariant = "color" | "dark" | "white";

function variantSource(variant: LogoVariant): string {
  if (variant === "white") return site.logo.inverseSrc;
  if (variant === "dark") return site.logo.darkSrc;
  return site.logo.src;
}

export function Logo({
  variant = "color",
  alt = "",
  priority = false,
  className = "h-6",
}: {
  /**
   * `color` - the supplied artwork: orange mark, navy wordmark. For light
   *   surfaces.
   * `dark`  - flat ink, for one-colour print on white.
   * `white` - flat white, for the dark footer panel.
   */
  variant?: LogoVariant;
  alt?: string;
  /** Above-the-fold only: opts out of lazy loading and raises fetch priority. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={variantSource(variant)}
      alt={alt}
      width={site.logo.width}
      height={site.logo.height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`w-auto ${className}`}
    />
  );
}
