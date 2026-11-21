import { CARD_SIZES } from "~/data/breakpoints";
import { site } from "~/data/constants";

const RESPONSIVE_WIDTHS = [480, 768] as const;
const SOURCE_WIDTH = 1376;
const SOURCE_HEIGHT = 768;

function versioned(path: string): string {
  return `${path}?v=${site.assetVersion}`;
}

function variantPath(src: string, width: number): string {
  return src.replace(/\.webp$/i, `-${width}.webp`);
}

/**
 * Intrinsic dimensions and responsive sources for a shipped raster.
 *
 * Project and service screenshots are generated at 480, 768 and 1376 pixels
 * wide. Non-WebP artwork is returned versioned but unvaried. The version query
 * keeps immutable caching safe when an image is replaced.
 */
export function responsiveImageProps(
  src: string,
  {
    sizes = CARD_SIZES,
    eager = false,
    width = SOURCE_WIDTH,
    height = SOURCE_HEIGHT,
  }: {
    sizes?: string;
    eager?: boolean;
    width?: number;
    height?: number;
  } = {},
) {
  const isWebp = /\.webp$/i.test(src);
  const candidates = isWebp
    ? RESPONSIVE_WIDTHS.map((variantWidth) => ({
        path: variantPath(src, variantWidth),
        width: variantWidth,
        height: Math.round((height * variantWidth) / width),
      }))
    : [];
  const srcSet = [
    ...candidates.map(({ path, width: variantWidth }) => `${versioned(path)} ${variantWidth}w`),
    `${versioned(src)} ${width}w`,
  ].join(", ");

  return {
    src: versioned(src),
    srcSet: isWebp ? srcSet : undefined,
    sizes: isWebp ? sizes : undefined,
    width,
    height,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    fetchPriority: eager ? ("high" as const) : undefined,
  };
}
