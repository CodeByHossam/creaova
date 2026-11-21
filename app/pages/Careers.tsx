import { AppWindow, ArrowLeft, ArrowRight, Code, Mail, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { TextLink } from "~/components/TextLink";
import { site } from "~/data/constants";
import { pageMeta } from "~/data/pageMeta";

export function meta() {
  return pageMeta({
    path: "/careers",
    title: "Careers | Creaova Digital Solutions",
    description:
      "Join Creaova, a UAE digital studio building websites and apps that mean business. See our open roles and how to apply.",
  });
}

type Role = {
  title: string;
  description: string;
  experience: string;
  requirements: string[];
  Icon: LucideIcon;
};

/** Open roles mirror the three services the studio actually offers.
 *  Experience bands and requirements reflect current hiring norms for a
 *  small studio: evidence of shipped work matters more than a long CV. */
const roles: Role[] = [
  {
    title: "Web Designer",
    description: "Shape the visual language behind every build.",
    experience: "2–4 years",
    requirements: [
      "Strong Figma — design systems, responsive layouts and prototypes",
      "A Behance or live portfolio with shipped web work",
      "Sharp typography, colour and spacing judgement",
      "Clean handoff to developers with specs and edge states",
    ],
    Icon: AppWindow,
  },
  {
    title: "Web Developer",
    description: "Turn design into fast, secure, search-friendly sites.",
    experience: "2–5 years",
    requirements: [
      "React, TypeScript and modern CSS (Tailwind a plus)",
      "REST APIs, Git and an active GitHub profile",
      "Core Web Vitals, SEO and accessibility in the build",
      "Node.js or MongoDB exposure is a bonus",
    ],
    Icon: Code,
  },
  {
    title: "Mobile App Developer",
    description: "Build polished mobile experiences people keep using.",
    experience: "2–4 years",
    requirements: [
      "React Native in production; Flutter is a strong plus",
      "Apps shipped to the App Store or Google Play",
      "REST APIs, Firebase and a clean GitHub workflow",
      "Expo, push notifications and store releases",
    ],
    Icon: Smartphone,
  },
];

export default function Careers() {
  const applicationHref = `mailto:${site.contact.email}`;

  return (
    <section
      aria-labelledby="careers-title"
      className="flex min-h-[calc(100vh-4rem)] flex-col bg-bg sm:min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-5rem)]"
    >
      <Container className="flex flex-1 flex-col py-12 sm:py-16 lg:py-20">
        {/* Header — one tight unit: eyebrow → title → lede. The gaps inside the
            unit are deliberately smaller than the gap to the next section so
            the three lines read as one idea (proximity). */}
        <div className="max-w-3xl">
          <Badge>Join the studio</Badge>
          <h1
            id="careers-title"
            className="mt-5 text-display font-semibold text-ink lg:text-[3.75rem] lg:leading-[1.05]"
          >
            We're <span className="text-primary-text">hiring.</span>
          </h1>
          <p className="mt-5 max-w-[60ch] text-lede leading-relaxed text-muted sm:text-lg">
            We're a digital studio in the UAE building websites and apps that mean business. If you
            care about craft, clarity, and work that lasts, we'd like to hear from you.
          </p>
        </div>

        {/* Open roles — each card is one real link to the application details.
            The whole card is the target (Fitts' law) and focus gets the same
            feedback as hover, so the affordance works with a keyboard too. */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-line pb-3">
            <h2 className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-muted">
              Open roles
            </h2>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {roles.map(({ title, description, experience, requirements, Icon }, index) => (
              <li key={title} className="h-full">
                <a
                  href="#how-to-apply"
                  aria-label={`Read how to apply for ${title}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-ink hover:bg-surface-subtle active:translate-y-0"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-ink text-on-dark transition-colors duration-200 ease-out group-hover:bg-primary group-hover:text-on-primary">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-meta tabular-nums tracking-[0.14em] text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-sans text-h3 font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

                  {/* What a tech screen actually checks: evidence of shipped
                      work, the right stack and a realistic experience band. */}
                  <div className="mt-5">
                    <p className="font-mono text-meta font-medium uppercase tracking-[0.14em] text-ink">
                      What you'll bring
                    </p>
                    <ul className="mt-3 space-y-2">
                      {requirements.map((requirement) => (
                        <li
                          key={requirement}
                          className="flex gap-2.5 text-[13px] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                          />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      Experience · <span className="text-ink">{experience}</span>
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <span className="flex min-h-11 items-center gap-2 border-t border-line pt-3 text-sm font-semibold text-ink transition-colors duration-200 ease-out group-hover:text-primary-text group-focus-visible:text-primary-text">
                      See how to apply
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* How to apply — the anchor target for every role card. Tighter panel
            padding and a two-column grid keep the dark band from reading as a
            large empty box on wide screens. */}
        <div id="how-to-apply" className="mt-12 rounded-panel bg-ink p-6 sm:mt-16 sm:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:gap-10">
            <div>
              <p className="font-mono text-meta font-medium uppercase tracking-[0.18em] text-on-dark-muted">
                How to apply
              </p>
              <h2 className="mt-3 max-w-xl text-h2 font-semibold text-on-dark">
                Ready to build things that last?
              </h2>
              <p className="mt-3 max-w-[60ch] text-body text-on-dark-muted">
                We review every application carefully. If your skills and mindset align with our
                studio, we'll get back to you to schedule a conversation.
              </p>
            </div>

            <div className="rounded-panel border border-dark-line bg-dark-surface p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-on-primary">
                  <Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-dark">
                    Send your CV, portfolio and GitHub or Behance links to:
                  </p>
                  <a
                    href={applicationHref}
                    className="mt-2 inline-block break-words text-h3 font-semibold text-on-dark underline decoration-on-dark/50 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-primary focus-visible:decoration-primary"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>
              <Button href={applicationHref} variant="light" className="mt-5 w-full sm:w-auto">
                Email your application
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 sm:mt-10">
          <TextLink
            to="/"
            className="min-h-11 gap-2 font-mono text-meta uppercase tracking-[0.14em]"
          >
            <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
            Back to home
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
