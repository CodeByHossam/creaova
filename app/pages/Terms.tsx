import { Container } from "~/components/Container";
import { absoluteUrl, site } from "~/data/constants";

export function meta() {
  return [
    { title: "Terms of Service | Creaova" },
    {
      name: "description",
      content: "Terms of use for the Creaova Digital Solutions website.",
    },
    { tagName: "link", rel: "canonical", href: absoluteUrl("/terms") },
  ];
}

type Section = { title: string; body: string[] };

const email = site.contact.email;

const sections: Section[] = [
  {
    title: "Acceptance of terms",
    body: [
      "By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, do not use the site.",
      "These terms may be updated from time to time; continued use constitutes acceptance of the current version.",
    ],
  },
  {
    title: "Use of the website",
    body: [
      "You may use this website to learn about Creaova's services and contact the studio about a possible project. You agree not to misuse the website, attempt to disrupt its operation, probe for vulnerabilities, submit malicious content, or use automated means to scrape or abuse it.",
      "We may restrict or block access if we reasonably believe these terms are being violated.",
    ],
  },
  {
    title: "Project discussions",
    body: [
      "Information on this website is general and does not create a project agreement, service level, estimate, warranty, or guarantee. Any engagement requires a separate written proposal or contract signed by both parties.",
      "Scope, deliverables, fees, timelines, ownership, confidentiality, support, and any other terms will be set out in that agreement.",
    ],
  },
  {
    title: "Concept work and portfolio",
    body: [
      "Portfolio examples and visual directions labelled as concepts are illustrative. They are not presented as client work unless stated otherwise, and they must not be treated as performance claims, endorsements, or guarantees of results.",
      "Third-party marks and images remain the property of their respective owners.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Creaova name, visual identity, logos, interface design, code, copy, and other original materials are protected by applicable intellectual property laws. You may not reproduce, modify, distribute, or create derivative works without prior written permission.",
      "Content you submit through the contact form remains yours, but you grant Creaova a limited right to use it to respond to your enquiry and evaluate a potential engagement.",
    ],
  },
  {
    title: "Submissions and spam protection",
    body: [
      "The contact form uses honeypots and hCaptcha to help reduce spam. You agree not to submit false, misleading, or unlawful information, or to bypass those protections.",
      "We reserve the right to filter or disregard submissions that appear to be spam or abusive.",
    ],
  },
  {
    title: "Disclaimer and limitation of liability",
    body: [
      "This website is provided 'as is' and 'as available' without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or secure.",
      "To the fullest extent permitted by law, Creaova shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or reliance on its content.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of the United Arab Emirates, without regard to conflict-of-law rules. Any disputes will be subject to the exclusive jurisdiction of the courts of the United Arab Emirates, unless applicable law requires otherwise.",
    ],
  },
  {
    title: "Changes and contact",
    body: [
      "We may revise these terms at any time. The current version will be posted on this page with the effective date below.",
      `Questions about these terms can be sent to ${email}.`,
    ],
  },
];

export default function Terms() {
  return (
    <Container className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-3xl">
        <p className="font-mono text-meta uppercase tracking-[0.18em] text-primary-text">
          Legal · Terms
        </p>
        <h1 className="mt-6 text-display font-semibold tracking-tight text-ink">
          Terms of service
        </h1>
        <p className="mt-7 text-lede text-muted">
          These terms govern your use of the Creaova Digital Solutions website.
        </p>
        <p className="mt-3 text-sm text-muted">Effective 23 October 2026.</p>

        <div className="mt-14 space-y-10">
          {sections.map((section, index) => (
            <section key={section.title} className="border-t border-line pt-7">
              <p className="font-mono text-sm text-primary-text">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{section.title}</h2>
              <div className="mt-3 space-y-3 leading-7 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
