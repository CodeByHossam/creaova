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
 */

export type NavItem = {
  label: string;
  to: string;
};

export type SocialLink = {
  label: string;
  href: string;
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
  nav: NavItem[];
  socialLinks: SocialLink[];
  logo: {
    /** Raster lockup (mark + wordmark), two-tone as supplied. */
    src: string;
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
      city: string;
      country: string;
    };
  };
  footer: {
    brandLine: string;
    location: string;
    columns: FooterColumn[];
    legal: FooterLink[];
  };
};

const contact: Site["contact"] = {
  email: "hello@example.com",
  phoneDisplay: "+971 5X XXX XXXX",
  phoneHref: null,
  whatsappDisplay: "+971 5X XXX XXXX",
  whatsappHref: null,
  hours: "Sun–Thu, 9am–6pm (GST)",
  address: {
    city: "Sharjah",
    country: "United Arab Emirates",
  },
};

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Behance", href: "https://www.behance.net/" },
];

export const site: Site = {
  name: "Creaova",
  legalName: "Creaova Digital Solutions",
  tagline: "Creativity meets innovation.",
  url: "https://creaova.example.com",
  isPlaceholder: true,

  nav: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Process", to: "/#process" },
    { label: "Reviews", to: "/#testimonials" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],

  socialLinks,

  logo: {
    src: "/assets/images/logo/Creaova_Logo1-transparent.png",
    inverseSrc: "/assets/images/logo/Creaova_Logo1-transparent.png",
    width: 1254,
    height: 1254,
    alt: "Creaova",
  },

  contact,

  footer: {
    brandLine:
      "Web design, web development and mobile apps — made in the UAE for businesses that need to be taken seriously online.",
    location: "Sharjah · Dubai · UAE",

    // Four columns, kept deliberately short (§3.2). Every footer link is a
    // second chance to navigate, but each one also costs attention.
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
        title: "Contact",
        links: [
          { label: "Start a project", to: "/contact" },
          { label: contact.email, href: `mailto:${contact.email}` },
          // href is null while the number is a placeholder, so this renders as
          // text. It becomes a real wa.me link the moment a number is supplied.
          { label: `WhatsApp ${contact.whatsappDisplay}`, href: contact.whatsappHref },
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
