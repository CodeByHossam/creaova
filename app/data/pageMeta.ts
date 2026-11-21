import siteConfig from "../../config/site.json";

import { absoluteUrl } from "./constants";

/**
 * Shared social metadata for every public route.
 *
 * The document shell owns the site-wide tags (`og:site_name`, `og:type`,
 * `twitter:card`). Routes own their title, description, canonical URL and
 * large-image card, so a route cannot forget the OG image again.
 */
export function pageMeta({
  path,
  title,
  description,
  robots,
}: {
  /** Omit for non-canonical states such as the 404 route. */
  path?: string | null;
  title: string;
  description: string;
  robots?: string;
}) {
  const url = path ? absoluteUrl(path) : null;
  const image = `${absoluteUrl(siteConfig.ogImage)}?v=${siteConfig.assetVersion}`;

  return [
    { title },
    { name: "description", content: description },
    ...(url
      ? [
          { tagName: "link", rel: "canonical", href: url },
          { property: "og:url", content: url },
        ]
      : []),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    ...(robots ? [{ name: "robots", content: robots }] : []),
  ];
}
