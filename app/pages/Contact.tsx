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

export default function Contact() {
  return (
    <section className="bg-bg py-16 sm:py-20 lg:py-24">
      {/* Same band rhythm as the other interior pages — this is the site's
          closing conversion surface, not a deliberately compact exception. */}
      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge>Contact</Badge>
          <h1 className="text-display font-medium text-ink">
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

          {/* `lg:pt-10` matches the form's `sm:p-10`, so the first channel row
              starts on the same line as the first form field. */}
          <aside className="grid content-start gap-7 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-10">
            <ul className="grid content-start gap-7">
              {contactChannels.map((channel) => (
                <li key={channel.id} className="flex items-start gap-3">
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
                </li>
              ))}
            </ul>

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
