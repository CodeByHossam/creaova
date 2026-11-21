import { LegalPage, type LegalSection } from "~/components/LegalPage";
import { site } from "~/data/constants";
import { pageMeta } from "~/data/pageMeta";

export function meta() {
  return pageMeta({
    path: "/terms",
    title: "Terms of Service | Creaova",
    description: "Terms of use for the Creaova Digital Solutions website.",
  });
}

const email = site.contact.email;

const sections: LegalSection[] = [
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
    <LegalPage
      eyebrow="Legal · Terms"
      title="Terms of service"
      lede="These terms govern your use of the Creaova Digital Solutions website."
      sections={sections}
    />
  );
}
