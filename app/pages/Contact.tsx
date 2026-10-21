import { Badge } from "~/components/Badge";
import { Container } from "~/components/Container";
import { ContactForm } from "~/components/ContactForm";
import { site } from "~/data/constants";

export function meta() {
  return [
    { title: "Contact | Creaova Digital Solutions" },
    { name: "description", content: "Start a conversation with Creaova about your next digital product — clear next steps, no obligation." },
  ];
}

/**
 * Contact — paper hero + the site's single real form (the CTABand duplicate
 * was removed in plan H7). Light by design: `form-input` and the Button
 * tokens are built for paper, and the old floating #111111 card with
 * shadow-2xl belonged to the pre-token system.
 */
const contactDetails: { label: string; value: string; href?: string }[] = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  {
    label: "Based in",
    value: `${site.contact.address.city}, ${site.contact.address.country}`,
  },
  { label: "Hours", value: site.contact.hours },
];

export default function Contact() {
  return (
    <section className="bg-bg py-16 sm:py-20 lg:py-28">
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

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-10">
            <ContactForm />
          </div>

          <aside className="grid content-start gap-7 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-2">
            {contactDetails.map(({ label, value, href }) => (
              <div key={label}>
                <p className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 inline-block text-sm font-medium text-ink underline underline-offset-4 transition-colors duration-200 ease-out hover:text-primary-text"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-ink">{value}</p>
                )}
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </section>
  );
}
