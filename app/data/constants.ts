/**
 * Site-wide configuration — the single source of truth for identity, navigation,
 * footer structure and contact details.
 *
 * Reference: plans/MULTIPAGE_UI_PLAN.md §3.2, §15b
 *
 * ⚠️  DEMO DATA. Every value below is deliberately non-routable:
 *
 *   - `.example.com` / `example.com` are reserved by RFC 2606 and can never
 *     resolve or receive mail.
 *   - Phone and WhatsApp are a visible template (`5X XXX XXXX`) with their
 *     `href` set to `null`. A plausible-looking invented UAE mobile number is
 *     the one thing demo data must never contain: it may belong to a real
 *     person. Components render these as plain text while `href` is null, so a
 *     placeholder can never dial or open a chat.
 *
 * Replacing these before launch is a RELEASE BLOCKER (§16).
 *
 * ── HOW TO PATCH IN THE REAL DATA ─────────────────────────────────────────
 * Everything that varies per business lives in the two blocks below:
 *
 *   1. `contact`  — email, phone, WhatsApp, hours, address.
 *   2. `socialLinks` — the real profile URLs.
 *
 * The canonical origin lives in `.env` as `VITE_SITE_URL` and reaches
 * `site.url` through `env.siteUrl`; `npm run sync:site-url` propagates it into
 * the static files in `public/` that cannot read env vars (sitemap, robots,
 * email signature).
 *
 * Nothing else in the app hard-codes a contact detail: the footer, mobile
 * drawer, contact page, JSON-LD and Open Graph tags all read from here.
 */

import { env } from "./env";

/**
 * Cache-busting version for the brand raster URLs.
 *
 * Browsers cache favicons and app icons per origin and never re-fetch them on
 * a normal reload - a replaced artwork file keeps serving the old image until
 * the user hard-refreshes, which is exactly the "the icon did not change"
 * bug. Every brand raster URL therefore carries `?v=<version>`.
 *
 * Bump this whenever `scripts/prepare-logo.ps1` regenerates the artwork.
 * Keep it in sync with the `?v=` in `scripts/email-signature.template.html`.
 */
export const ASSET_VERSION = "2026-10-22";

export type NavItem = {
  label: string;
  to: string;
};

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
  tagline: string;
  /** Canonical origin, no trailing slash. */
  url: string;
  /** True while any demo value below is still in place. */
  isPlaceholder: boolean;
  /**
   * Cache-busting version for the brand raster URLs - see `ASSET_VERSION`.
   * Bump it when `scripts/prepare-logo.ps1` regenerates the artwork.
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
     * bold geometric sans; the site sets its headings in Fraunces, a serif, so
     * setting the same word as text would show two different brands - and two
     * "CREAOVA"s on screen. The brand name is announced by the link label
     * around the image instead.
     */
    src: string;
    /** Colour lockup at 841x192, for print, social cards and high-density screens. */
    masterSrc: string;
    /** Flat ink variant, for one-colour print and white backgrounds. */
    darkSrc: string;
    /** Flat white variant, for the dark footer and CTA bands. */
    inverseSrc: string;
    /**
     * Intrinsic pixels. These exist to reserve layout space and prevent CLS.
     * They must match the real file — regenerate with scripts/prepare-logo.ps1
     * if the artwork changes.
     */
    width: number;
    height: number;
    alt: string;
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
 * Passing `null` keeps the demo state: the visible `5X XXX XXXX` template is
 * shown and both hrefs stay `null`, so a placeholder can never dial a phone or
 * open a chat with a stranger. Passing a real number produces a `tel:` link
 * and a `wa.me` link that both point at the same number.
 *
 * `display` is how the number is written for humans ("+971 52 525 982"); it
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

const contact: Site["contact"] = {
  email: "creaova.co@gmail.com",
  // One number produces all four values. Swap `null` for the real number
  // (e.g. "+971501234567") and the display text, the `tel:` link and the
  // `wa.me` link all update together — they can no longer drift apart.
  ...phoneDetails("+97152525982", "+971 52 525 982"),
  hours: "Sun–Thu, 9am–6pm (GST)",
  address: {
    region: "United Arab Emirates",
  },
};

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/creaova.co/", icon: "instagram" },
  // Profiles not supplied yet — `href: null` keeps them off the link list
  // until the real URLs are confirmed. See `stillHasDemoData` below.
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
    label: "Hours",
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

/**
 * True while any demo value is still in place.
 *
 * Derived instead of hand-set on purpose: the flag flips to false only once
 * every placeholder is genuinely gone, so it can never drift out of date and
 * leave the launch checklist (§16) reading "done" when it is not.
 */
function stillHasDemoData(): boolean {
  return (
    contact.email.endsWith("@example.com") ||
    contact.phoneHref === null ||
    contact.whatsappHref === null ||
    socialLinks.some((link) => link.href === null)
  );
}

export const site: Site = {
  name: "Creaova",
  legalName: "Creaova Digital Solutions",
  tagline: "Creativity meets innovation.",
  // Canonical origin, from .env → VITE_SITE_URL. Never hard-code it here.
  url: env.siteUrl,
  isPlaceholder: stillHasDemoData(),
  assetVersion: ASSET_VERSION,

  nav: [
    { label: "Home", to: "/#home" },
    { label: "Services", to: "/services#all-services" },
    { label: "Portfolio", to: "/portfolio/#projects" },
    { label: "Process", to: "/services#process" },
    { label: "Reviews", to: "/#testimonials" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],

  socialLinks,

  logo: {
    // Prepared by scripts/prepare-logo.ps1 from app/assets/logo/logo.png (the
    // supplied artwork). The lockup ships with the "CREAOVA" wordmark baked
    // into the image - never as live text - 420x96 for the web, 841x192 for
    // print. The `?v=` on every path busts the browser's image cache when the
    // artwork is regenerated; see ASSET_VERSION above.
    src: `/logo.png?v=${ASSET_VERSION}`,
    masterSrc: `/logo-master.png?v=${ASSET_VERSION}`,
    darkSrc: `/logo-dark.png?v=${ASSET_VERSION}`,
    inverseSrc: `/logo-inverse.png?v=${ASSET_VERSION}`,
    width: 420,
    height: 96,
    alt: "Creaova",
  },

  contact,

  footer: {
    brandLine:
      "An established digital studio in the UAE. We design and build secure, high-performing websites and apps — and stay with you as a partner after launch.",
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
          { label: "Process", to: "/services#process" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Reviews", to: "/#testimonials" },
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

/** The primary header call to action, used by both Navbar and MobileNav. */
export const primaryCta: NavItem = { label: "Start a project", to: "/contact" };

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
