import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { ContactForm } from "~/components/ContactForm";
import { ContactIcon, SocialIcon } from "~/components/ContactIcon";
import { absoluteUrl, contactChannels, site } from "~/data/constants";

export function meta() {
  return [
    { title: "Contact | Creaova Digital Solutions" },
    { name: "description", content: "Start a conversation with Creaova about your next digital product — clear next steps, no obligation." },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/contact") },
  ];
}

/**
 * Contact — paper hero + the site's single real form (the CTABand duplicate
 * was removed in plan H7). Light by design: `form-input` and the Button
 * tokens are built for paper, and the old floating #111111 card with
 * shadow-2xl belonged to the pre-token system.
 *
 * Every detail here is read from `contactChannels`, so the page shows the real
 * routes — email, phone, WhatsApp, hours, location — rather than a subset of
 * them, and shows the same ones the footer does. Each row carries the glyph
 * of its channel (mail, phone, WhatsApp, clock, map pin) so the list is
 * scannable at a glance; the glyphs are decorative, the label says what the
 * row is. A `href` of `null` means that route has no confirmed destination
 * yet, and the value renders as plain text instead of a link that leads
 * nowhere.
 */
export default function Contact() {
  return (
    <section className="bg-bg py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge>Contact</Badge>
          <h1 className="text-display font-semibold text-ink">
            Let’s build something you can rely on.
          </h1>
          <p className="mx-auto max-w-2xl text-lede text-muted">
            Tell us what you are looking to launch. A few useful details are
            enough to start — we will reply with clear next steps and no
            obligation.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-10">
            <ContactForm />
          </div>

          <aside className="grid content-start gap-7 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-2">
            {contactChannels.map((channel) => (
              <div key={channel.id} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface-subtle text-primary-text">
                  <ContactIcon id={channel.id} className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                    {channel.label}
                  </p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-1 inline-block text-sm font-medium text-ink underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary-text"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-ink">{channel.value}</p>
                  )}
                </div>
              </div>
            ))}

            {site.socialLinks.some((social) => social.href) ? (
              <div className="border-t border-line pt-6">
                {/*
                  The social profiles are rows like the channels above them:
                  badge on the left, "Follow" and the platform name beside it.
                  No separate heading — each row carries its own label, which
                  keeps the block the same shape as the rows above.
                */}
                <ul className="space-y-6">
                  {site.socialLinks.map((social) =>
                    social.href ? (
                      <li key={social.label} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface-subtle text-primary-text">
                          <SocialIcon id={social.icon} className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                            Follow
                          </p>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-sm font-medium text-ink underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary-text"
                          >
                            {social.label}
                          </a>
                        </div>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </section>

  );
}
