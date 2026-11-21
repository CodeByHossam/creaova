/**
 * Site-wide configuration — the single source of truth for identity, navigation,
 * footer structure and contact details.
 *
 * The canonical origin lives in `.env` as `VITE_SITE_URL` and reaches
 * `site.url` through `env.siteUrl`; `npm run sync:site-url` propagates it into
 * the static files in `public/` that cannot read env vars (sitemap, robots).
 *
 * Everything that varies per business lives in the `contact` and `socialLinks`
 * blocks below. Nothing else in the app hard-codes a contact detail: the
 * footer, mobile drawer, contact page and JSON-LD all read from here.
 */

import { env } from "./env";

/**
 * Cache-busting version for shipped rasters and fonts.
 *
 * Browsers cache icons and fonts per origin and never re-fetch them on a
 * normal reload, so a replaced file would keep serving the old bytes. Every
 * versioned URL carries `?v=<version>`.
 *
 * Keep this in step with `assetVersion` in `config/site.json`, which drives
 * the generated static pages and the CSS font URLs.
 */
export const ASSET_VERSION = "2026-11-21";

export type NavItem = {
  label: string;
  to: string;
  /** Decorative glyph for the primary nav; see `NavIcon.tsx`. */
  icon?: NavIconId;
};

/** Primary-nav glyphs — ids live next to the destinations they belong to. */
export type NavIconId = "home" | "services" | "portfolio" | "about" | "contact" | "careers";

/**
 * The brand mark that belongs to a social profile.
 *
 * lucide-react has no brand icons, so the marks are inlined in
 * `~/components/BrandIcon.tsx` and picked by id — a profile can never end up
 * with a URL but no glyph.
 */
export type SocialIconId = "instagram" | "linkedin" | "behance";

export type SocialLink = {
  label: string;
  /**
   * `null` when the profile has not been supplied yet → the footer renders it
   * as plain text rather than a link to a platform homepage, which would look
   * like a working contact route but lead nowhere.
   */
  href: string | null;
  icon: SocialIconId;
};

/**
 * The glyph that belongs to a contact channel (see `contactChannels`).
 */
export type ContactIconId = "email" | "phone" | "whatsapp" | "hours" | "location";

/**
 * One way to reach the studio.
 *
 * The footer and the contact page both render this list, so the two can never
 * drift apart: a channel added here appears in both places, with the same
 * label, the same value and the same icon.
 *
 * `href: null` means that route has no confirmed destination yet and the
 * value renders as plain text instead of a link that leads nowhere.
 */
export type ContactChannel = {
  id: ContactIconId;
  label: string;
  value: string;
  href: string | null;
};

/**
 * A footer link is one of three things, and the shape says which:
 *   - `to`            internal route → react-router <Link>
 *   - `href`          external / mailto: → plain <a>
 *   - `href: null`    segment disabled because the data is still a placeholder
 *                     → renders as non-interactive text, never a dead link
 */
export type FooterLink = {
  label: string;
  to?: string;
  href?: string | null;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type Site = {
  name: string;
  legalName: string;
  /** Canonical origin, no trailing slash. */
  url: string;
  /**
   * Cache-busting version for the brand raster URLs - see `ASSET_VERSION`.
   * Bump it whenever shipped raster or font artwork changes.
   */
  assetVersion: string;
  nav: NavItem[];
  socialLinks: SocialLink[];
  logo: {
    /**
     * The brand lockup: the orange "C"-and-key mark with the "CREAOVA"
     * wordmark beside it.
     *
     * The wordmark is artwork, not live DOM text. The supplied wordmark is a
     * bold geometric sans; the site sets its headings in Roboto Slab, a slab
     * serif, so setting the same word as text would show two different brands - and two
     * "CREAOVA"s on screen. The brand name is announced by the link label
     * around the image instead.
     */
    src: string;
    /** Flat white variant, for the dark footer and CTA bands. */
    inverseSrc: string;
    /**
     * Intrinsic pixels. These exist to reserve layout space and prevent CLS.
     * They must match the real file if the artwork changes.
     */
    width: number;
    height: number;
  };
  contact: {
    email: string;
    /** Display form. Always present. */
    phoneDisplay: string;
    /** `null` disables the link entirely — see the note above. */
    phoneHref: string | null;
    whatsappDisplay: string;
    /** `null` disables the link entirely — see the note above. */
    whatsappHref: string | null;
    hours: string;
    address: {
      /**
       * The studio serves the whole country rather than from one base city,
       * so the address names the country — the site never claims a city it
       * does not state anywhere else.
       */
      region: string;
    };
  };
  footer: {
    brandLine: string;
    location: string;
    columns: FooterColumn[];
    legal: FooterLink[];
  };
};

/**
 * Turn one raw international number into the four values the UI needs.
 *
 * Passing `null` keeps the unresolved state: the visible `5X XXX XXXX`
 * template is shown and both hrefs stay `null`, so a placeholder can never
 * dial a phone or open a chat with a stranger. Passing a real number produces
 * a `tel:` link and a `wa.me` link that both point at the same number.
 *
 * `display` is how the number is written for humans; it
 * defaults to the raw value. The hrefs are always built from the digits, so
 * the two can never disagree about which number is being dialled.
 */
export function phoneDetails(
  raw: string | null,
  display?: string,
): {
  phoneDisplay: string;
  phoneHref: string | null;
  whatsappDisplay: string;
  whatsappHref: string | null;
} {
  if (!raw) {
    return {
      phoneDisplay: "+971 5X XXX XXXX",
      phoneHref: null,
      whatsappDisplay: "+971 5X XXX XXXX",
      whatsappHref: null,
    };
  }
  const digits = raw.replace(/\D/g, "");
  const label = (display ?? raw).trim();
  return {
    phoneDisplay: label,
    phoneHref: `tel:+${digits}`,
    whatsappDisplay: label,
    whatsappHref: `https://wa.me/${digits}`,
  };
}

const CONTACT_PHONE = "+97152525982";
const CONTACT_PHONE_DISPLAY = "+971 52 525 982";

const contact: Site["contact"] = {
  email: "creaova.co@gmail.com",
  // One source produces the display text, `tel:` link and `wa.me` link, so
  // the channels cannot drift apart when the number changes.
  ...phoneDetails(CONTACT_PHONE, CONTACT_PHONE_DISPLAY),
  hours: "Sun–Thu, 9am–6pm (GST)",
  address: {
    region: "United Arab Emirates",
  },
};

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/creaova.co/", icon: "instagram" },
  // Profiles not supplied yet — `href: null` keeps them off the link list
  // until the real URLs are confirmed.
  { label: "LinkedIn", href: null, icon: "linkedin" },
  { label: "Behance", href: null, icon: "behance" },
];

/**
 * Every way to reach the studio, in one list.
 *
 * The footer column and the contact page aside both read from here, so an
 * email, a number or an opening hour is written once and rendered twice —
 * with the same icon in both places.
 */
export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: "phone",
    label: "Phone",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: contact.whatsappDisplay,
    href: contact.whatsappHref,
  },
  {
    id: "hours",
    label: "Office hours",
    value: contact.hours,
    href: null,
  },
  {
    id: "location",
    label: "Based in",
    value: contact.address.region,
    href: null,
  },
];

export const site: Site = {
  name: "Creaova",
  legalName: "Creaova Digital Solutions",
  // Canonical origin, from .env → VITE_SITE_URL. Never hard-code it here.
  url: env.siteUrl,
  assetVersion: ASSET_VERSION,

  nav: [
    { label: "Home", to: "/#home", icon: "home" },
    { label: "Services", to: "/services#all-services", icon: "services" },
    { label: "Portfolio", to: "/portfolio#projects", icon: "portfolio" },
    { label: "About", to: "/about", icon: "about" },
    { label: "Contact", to: "/contact", icon: "contact" },
    { label: "Careers", to: "/careers", icon: "careers" },
  ],

  socialLinks,

  logo: {
    // The supplied lockup ships with the "CREAOVA" wordmark baked into the
    // image - never as live text - at 420x96. The `?v=` on every path busts
    // the browser's image cache when the artwork changes.
    src: `/logo.png?v=${ASSET_VERSION}`,
    inverseSrc: `/logo-inverse.png?v=${ASSET_VERSION}`,
    width: 420,
    height: 96,
  },

  contact,

  footer: {
    brandLine:
      "A UAE studio that takes a project from first conversation to after launch — with one team, visible decisions, and no disappearing act.",
    location: "United Arab Emirates",

    // Three quick-access groups, kept deliberately short (§3.2). Every footer
    // link is a second chance to navigate, but each one also costs attention.
    // The contact routes are NOT here: they have their own band in the footer,
    // built from `contactChannels`.
    columns: [
      {
        title: "Services",
        links: [
          { label: "Web Design", to: "/services#web-design" },
          { label: "Web Development", to: "/services#web-development" },
          { label: "Mobile Apps", to: "/services#mobile-apps" },
        ],
      },
      {
        title: "Studio",
        links: [
          { label: "Portfolio", to: "/portfolio" },
          { label: "About", to: "/about" },
          { label: "Our approach", to: "/services#process" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Contact", to: "/contact" },
          { label: "Home", to: "/#home" },
        ],
      },
    ],

    legal: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
};

/** The primary call to action in the hero. The header stays text-only. */
export const primaryCta: NavItem = { label: "Get a clear scope", to: "/contact" };

/**
 * Absolute URL for a route, built from the canonical origin in `.env`
 * (`VITE_SITE_URL`). Use it for canonical links, Open Graph URLs and anything
 * else that must point at the live domain rather than a relative path.
 *
 * The homepage keeps its trailing slash so it does not collide with the
 * `https://domain` / `https://domain/` pair that search engines treat as two
 * different URLs.
 */
export function absoluteUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return suffix === "/" ? `${site.url}/` : `${site.url}${suffix}`;
}
