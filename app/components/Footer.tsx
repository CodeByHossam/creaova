
import type { ReactNode } from "react";
import { Link } from "react-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ContactIcon, SocialIcon } from "~/components/ContactIcon";
import { Logo } from "~/components/Logo";
import type {
  ContactChannel,
  ContactIconId,
  FooterLink,
  SocialLink,
} from "~/data/constants";
import { contactChannels, primaryCta, site } from "~/data/constants";

const linkClass =
  "text-on-dark-muted transition-colors duration-200 hover:text-primary";

const iconClass =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-dark-line text-primary";

const labelClass =
  "block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-on-dark-muted";

const valueClass =
  "mt-1 block break-words text-sm text-on-dark transition-colors duration-200 hover:text-primary";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-primary">
      {children}
    </h2>
  );
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {link.label}
      </Link>
    );
  }

  if (link.href) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    );
  }

  return <span className="text-on-dark-muted">{link.label}</span>;
}

function getChannels(ids: ContactIconId[]): ContactChannel[] {
  return ids.flatMap((id) => {
    const channel = contactChannels.find((item) => item.id === id);
    return channel ? [channel] : [];
  });
}

function ContactCell({ channel }: { channel: ContactChannel }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className={iconClass}>
        <ContactIcon id={channel.id} className="size-4" />
      </span>

      <div className="min-w-0">
        <span className={labelClass}>{channel.label}</span>

        {channel.href ? (
          <a href={channel.href} className={valueClass}>
            {channel.value}
          </a>
        ) : (
          <span className="mt-1 block break-words text-sm text-on-dark-muted">
            {channel.value}
          </span>
        )}
      </div>
    </li>
  );
}

function SocialCell({ social }: { social: SocialLink }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className={iconClass}>
        <SocialIcon id={social.icon} className="size-4" />
      </span>

      <div className="min-w-0">
        <span className={labelClass}>Follow</span>

        {social.href ? (
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={valueClass}
          >
            {social.label}
          </a>
        ) : (
          <span className="mt-1 block break-words text-sm text-on-dark-muted">
            {social.label}
          </span>
        )}
      </div>
    </li>
  );
}

function FooterLinkGroup({
  column,
}: {
  column: (typeof site.footer.columns)[number];
}) {
  return (
    <div className="min-w-0 mx-4">
      <FooterHeading>{column.title}</FooterHeading>

      <ul className="mt-3 space-y-2 text-sm">
        {column.links.map((link) => (
          <li key={link.label}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const phoneChannels = getChannels(["phone", "whatsapp"]);
  const locationChannels = getChannels(["location", "hours"]);
  const emailChannels = getChannels(["email"]);

  const socialLinks = site.socialLinks.filter((social) => social.href);

  return (
    <footer
      id="contact"
      className="border-t border-dark-line bg-dark py-12 text-on-dark-muted sm:py-16"
    >
      <Container>
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10">

          {/* Row 1: Brand and primary action */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" aria-label="Creaova home" className="inline-flex">
              <Logo variant="inverse" alt="Creaova" className="h-9" />
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-on-dark-muted">
              {site.footer.brandLine}
            </p>
          </div>

          <div className="flex items-center md:justify-start">
            <Button to={primaryCta.to} variant="light" size="md">
              {primaryCta.label}
            </Button>
          </div>

          {/* Row 2: Contact information */}
          <section className="border-t border-dark-line pt-8 md:col-span-3">
            <FooterHeading>Get in touch</FooterHeading>

            <div className="mt-6 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-10">
              <ul className="space-y-6">
                {phoneChannels.map((channel) => (
                  <ContactCell key={channel.id} channel={channel} />
                ))}
              </ul>

              <ul className="space-y-6">
                {locationChannels.map((channel) => (
                  <ContactCell key={channel.id} channel={channel} />
                ))}
              </ul>

              <div className="space-y-6">
                <ul className="space-y-6">
                  {emailChannels.map((channel) => (
                    <ContactCell key={channel.id} channel={channel} />
                  ))}
                </ul>

                <ul className="space-y-6">
                  {socialLinks.map((social) => (
                    <SocialCell key={social.label} social={social} />
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Row 3: Navigation groups aligned with contact columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-1 gap-y-8 border-t border-dark-line pt-8 sm:grid-cols-2 md:col-span-3 md:grid-cols-3 md:gap-x-10"
          >
            {site.footer.columns.map((column) => (
              <FooterLinkGroup key={column.title} column={column} />
            ))}
          </nav>

          {/* Copyright and legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-dark-line pt-8 text-center text-xs md:col-span-3">
            <p>
              © {year} {site.legalName} [ CDS ]. All rights reserved.
            </p>

            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap items-center justify-center gap-6">
                {site.footer.legal.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>
      </Container>
    </footer>
  );
}
